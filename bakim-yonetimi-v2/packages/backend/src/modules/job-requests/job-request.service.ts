import prisma from '../../database/prisma';
import { AppError } from '../../common/middleware/error.middleware';
import { WorkflowEngine } from '../workflow/workflow.engine';
import { JobRequestStatus, Priority } from '@prisma/client';

const workflowEngine = new WorkflowEngine();

export class JobRequestService {
  async create(data: {
    title: string;
    description: string;
    department: string;
    priority?: Priority;
    location?: string;
    requestedById: string;
  }) {
    // Generate request number
    const count = await prisma.jobRequest.count();
    const requestNumber = `IT-${new Date().getFullYear()}-${String(count + 1).padStart(3, '0')}`;

    // Create job request
    const jobRequest = await prisma.jobRequest.create({
      data: {
        requestNumber,
        title: data.title,
        description: data.description,
        department: data.department,
        priority: data.priority || 'MEDIUM',
        location: data.location,
        status: 'NEW',
        currentStep: 'NEW',
        requestedById: data.requestedById,
      },
      include: {
        requestedBy: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
    });

    // Create workflow history
    await prisma.workflowHistory.create({
      data: {
        entityType: 'job_request',
        entityId: jobRequest.id,
        jobRequestId: jobRequest.id,
        stepName: 'NEW',
        stepNumber: 1,
        action: 'created',
        toStatus: 'NEW',
        actorId: data.requestedById,
      },
    });

    return jobRequest;
  }

  async findAll(params: {
    page?: number;
    limit?: number;
    status?: JobRequestStatus;
    priority?: Priority;
    requestedById?: string;
    assignedToId?: string;
    department?: string;
    search?: string;
  }) {
    const {
      page = 1,
      limit = 20,
      status,
      priority,
      requestedById,
      assignedToId,
      department,
      search,
    } = params;

    const skip = (page - 1) * limit;

    const where: any = {};

    if (status) where.status = status;
    if (priority) where.priority = priority;
    if (requestedById) where.requestedById = requestedById;
    if (assignedToId) where.assignedToId = assignedToId;
    if (department) where.department = department;

    if (search) {
      where.OR = [
        { requestNumber: { contains: search, mode: 'insensitive' } },
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }

    const [data, total] = await Promise.all([
      prisma.jobRequest.findMany({
        where,
        skip,
        take: limit,
        include: {
          requestedBy: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
            },
          },
          assignedTo: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      }),
      prisma.jobRequest.count({ where }),
    ]);

    return { data, total, page, limit };
  }

  async findById(id: string) {
    const jobRequest = await prisma.jobRequest.findUnique({
      where: { id },
      include: {
        requestedBy: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            department: true,
          },
        },
        assignedTo: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            department: true,
          },
        },
        approvals: {
          include: {
            approver: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
              },
            },
          },
          orderBy: {
            createdAt: 'asc',
          },
        },
        workflowHistory: {
          include: {
            actor: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
              },
            },
          },
          orderBy: {
            createdAt: 'asc',
          },
        },
        attachments: {
          include: {
            uploadedBy: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
              },
            },
          },
        },
        comments: {
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    });

    if (!jobRequest) {
      throw new AppError(404, 'Job request not found');
    }

    return jobRequest;
  }

  async update(
    id: string,
    data: {
      title?: string;
      description?: string;
      priority?: Priority;
      location?: string;
      costEstimate?: number;
    }
  ) {
    const jobRequest = await prisma.jobRequest.findUnique({
      where: { id },
    });

    if (!jobRequest) {
      throw new AppError(404, 'Job request not found');
    }

    return await prisma.jobRequest.update({
      where: { id },
      data,
      include: {
        requestedBy: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
        assignedTo: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
    });
  }

  async delete(id: string) {
    const jobRequest = await prisma.jobRequest.findUnique({
      where: { id },
    });

    if (!jobRequest) {
      throw new AppError(404, 'Job request not found');
    }

    return await prisma.jobRequest.delete({
      where: { id },
    });
  }

  async assign(id: string, assignedToId: string, actorId: string) {
    const jobRequest = await prisma.jobRequest.findUnique({
      where: { id },
    });

    if (!jobRequest) {
      throw new AppError(404, 'Job request not found');
    }

    const updated = await prisma.jobRequest.update({
      where: { id },
      data: {
        assignedToId,
      },
      include: {
        assignedTo: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
    });

    // Record in workflow history
    await prisma.workflowHistory.create({
      data: {
        entityType: 'job_request',
        entityId: id,
        jobRequestId: id,
        stepName: jobRequest.status,
        action: 'assigned',
        comment: `Assigned to ${updated.assignedTo?.firstName} ${updated.assignedTo?.lastName}`,
        actorId,
      },
    });

    return updated;
  }

  async submitForApproval(id: string, actorId: string) {
    const jobRequest = await prisma.jobRequest.findUnique({
      where: { id },
    });

    if (!jobRequest) {
      throw new AppError(404, 'Job request not found');
    }

    if (jobRequest.status !== 'NEW') {
      throw new AppError(400, 'Job request can only be submitted from NEW status');
    }

    // Transition to MANAGER_APPROVAL
    const nextStatus = await workflowEngine.transitionToNextStep(
      'job_request',
      id,
      'NEW',
      'complete',
      actorId,
      'Submitted for manager approval'
    );

    // Find manager role users
    const managers = await prisma.user.findMany({
      where: {
        role: {
          name: 'MANAGER',
        },
        department: jobRequest.department,
        isActive: true,
      },
      take: 1,
    });

    const manager = managers[0];

    if (!manager) {
      throw new AppError(400, 'No manager found for this department');
    }

    // Create approval request
    await workflowEngine.createApproval(id, 'MANAGER_APPROVAL', 2, manager.id);

    // Update job request
    return await prisma.jobRequest.update({
      where: { id },
      data: {
        status: nextStatus as JobRequestStatus,
        currentStep: nextStatus,
      },
      include: {
        requestedBy: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
        approvals: {
          where: {
            status: 'PENDING',
          },
          include: {
            approver: true,
          },
        },
      },
    });
  }

  async approve(
    id: string,
    approvalId: string,
    actorId: string,
    comment?: string
  ) {
    await workflowEngine.processApproval(approvalId, 'approve', actorId, comment);

    return await this.findById(id);
  }

  async reject(
    id: string,
    approvalId: string,
    actorId: string,
    comment?: string
  ) {
    await workflowEngine.processApproval(approvalId, 'reject', actorId, comment);

    return await this.findById(id);
  }

  async cancel(id: string, actorId: string, reason: string) {
    const jobRequest = await prisma.jobRequest.findUnique({
      where: { id },
    });

    if (!jobRequest) {
      throw new AppError(404, 'Job request not found');
    }

    if (['DONE', 'REJECTED', 'CANCELLED'].includes(jobRequest.status)) {
      throw new AppError(400, 'Cannot cancel job request in current status');
    }

    const nextStatus = await workflowEngine.transitionToNextStep(
      'job_request',
      id,
      jobRequest.status,
      'cancel',
      actorId,
      reason
    );

    return await prisma.jobRequest.update({
      where: { id },
      data: {
        status: 'CANCELLED',
        currentStep: 'CANCELLED',
      },
    });
  }

  async addComment(id: string, content: string, authorId: string, authorName: string) {
    const jobRequest = await prisma.jobRequest.findUnique({
      where: { id },
    });

    if (!jobRequest) {
      throw new AppError(404, 'Job request not found');
    }

    return await prisma.comment.create({
      data: {
        entityType: 'job_request',
        entityId: id,
        jobRequestId: id,
        content,
        authorId,
        authorName,
      },
    });
  }

  async getStatistics(userId?: string, role?: string) {
    const where: any = {};

    // If user is not admin, show only their department requests
    if (role !== 'ADMIN' && userId) {
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { department: true },
      });

      if (user?.department) {
        where.department = user.department;
      }
    }

    const [total, byStatus, byPriority, recentRequests] = await Promise.all([
      prisma.jobRequest.count({ where }),
      prisma.jobRequest.groupBy({
        by: ['status'],
        where,
        _count: true,
      }),
      prisma.jobRequest.groupBy({
        by: ['priority'],
        where,
        _count: true,
      }),
      prisma.jobRequest.findMany({
        where,
        take: 5,
        orderBy: {
          createdAt: 'desc',
        },
        select: {
          id: true,
          requestNumber: true,
          title: true,
          status: true,
          priority: true,
          createdAt: true,
        },
      }),
    ]);

    return {
      total,
      byStatus: byStatus.map((s) => ({
        status: s.status,
        count: s._count,
      })),
      byPriority: byPriority.map((p) => ({
        priority: p.priority,
        count: p._count,
      })),
      recentRequests,
    };
  }
}
