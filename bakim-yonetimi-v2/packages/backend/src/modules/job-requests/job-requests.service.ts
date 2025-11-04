import { PrismaClient, JobRequestStatus, Prisma } from '@prisma/client';
import { CreateJobRequestDto, UpdateJobRequestDto, JobRequestQueryDto } from './dto';

const prisma = new PrismaClient();

export class JobRequestsService {
  /**
   * Generate unique request number
   */
  private async generateRequestNumber(): Promise<string> {
    const year = new Date().getFullYear();
    const prefix = `JR${year}`;

    const lastRequest = await prisma.jobRequest.findFirst({
      where: {
        requestNumber: {
          startsWith: prefix,
        },
      },
      orderBy: {
        requestNumber: 'desc',
      },
    });

    let sequence = 1;
    if (lastRequest) {
      const lastSequence = parseInt(lastRequest.requestNumber.substring(prefix.length));
      sequence = lastSequence + 1;
    }

    return `${prefix}${sequence.toString().padStart(5, '0')}`;
  }

  /**
   * Create a new job request
   */
  async create(data: CreateJobRequestDto, userId: number) {
    const requestNumber = await this.generateRequestNumber();

    const jobRequest = await prisma.jobRequest.create({
      data: {
        requestNumber,
        title: data.title,
        description: data.description,
        requestType: data.requestType,
        priority: data.priority || 'MEDIUM',
        status: 'PENDING',
        departmentId: data.departmentId,
        locationId: data.locationId,
        assetId: data.assetId,
        costCenterId: data.costCenterId,
        requestedById: userId,
        requestedStartDate: data.requestedStartDate ? new Date(data.requestedStartDate) : null,
        requestedEndDate: data.requestedEndDate ? new Date(data.requestedEndDate) : null,
        estimatedCost: data.estimatedCost,
        estimatedHours: data.estimatedHours,
        notes: data.notes,
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
        department: true,
        location: true,
        asset: true,
        costCenter: true,
      },
    });

    // Create workflow history entry
    await prisma.workflowHistory.create({
      data: {
        entityType: 'JOB_REQUEST',
        entityId: jobRequest.id,
        action: 'CREATED',
        fromStatus: null,
        toStatus: 'PENDING',
        comment: 'Job request created',
        performedById: userId,
      },
    });

    return jobRequest;
  }

  /**
   * Find all job requests with pagination and filters
   */
  async findAll(query: JobRequestQueryDto) {
    const {
      page = 1,
      limit = 10,
      search,
      status,
      priority,
      requestType,
      departmentId,
      locationId,
      assignedToId,
      requestedById,
      startDate,
      endDate,
      sortBy = 'createdAt',
      sortOrder = 'desc',
    } = query;

    const skip = (page - 1) * limit;

    // Build where clause
    const where: Prisma.JobRequestWhereInput = {};

    if (search) {
      where.OR = [
        { requestNumber: { contains: search, mode: 'insensitive' } },
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (status) where.status = status;
    if (priority) where.priority = priority;
    if (requestType) where.requestType = requestType;
    if (departmentId) where.departmentId = departmentId;
    if (locationId) where.locationId = locationId;
    if (assignedToId) where.assignedToId = assignedToId;
    if (requestedById) where.requestedById = requestedById;

    if (startDate || endDate) {
      where.createdAt = {};
      if (startDate) where.createdAt.gte = new Date(startDate);
      if (endDate) where.createdAt.lte = new Date(endDate);
    }

    // Get total count
    const total = await prisma.jobRequest.count({ where });

    // Get paginated data
    const data = await prisma.jobRequest.findMany({
      where,
      skip,
      take: limit,
      orderBy: { [sortBy]: sortOrder },
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
        department: true,
        location: true,
        asset: true,
        costCenter: true,
        _count: {
          select: {
            approvals: true,
            comments: true,
            attachments: true,
          },
        },
      },
    });

    return {
      data,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  /**
   * Find one job request by ID
   */
  async findOne(id: number) {
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
        department: true,
        location: true,
        asset: {
          include: {
            assetType: true,
            assetStatus: true,
          },
        },
        costCenter: true,
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
        comments: {
          include: {
            user: {
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
        },
        attachments: {
          orderBy: {
            createdAt: 'desc',
          },
        },
        workflowHistories: {
          include: {
            performedBy: {
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
        },
      },
    });

    if (!jobRequest) {
      throw new Error('Job request not found');
    }

    return jobRequest;
  }

  /**
   * Update a job request
   */
  async update(id: number, data: UpdateJobRequestDto, userId: number) {
    const existingRequest = await prisma.jobRequest.findUnique({
      where: { id },
      select: { status: true },
    });

    if (!existingRequest) {
      throw new Error('Job request not found');
    }

    const updatedRequest = await prisma.jobRequest.update({
      where: { id },
      data: {
        title: data.title,
        description: data.description,
        requestType: data.requestType,
        status: data.status,
        priority: data.priority,
        departmentId: data.departmentId,
        locationId: data.locationId,
        assetId: data.assetId,
        costCenterId: data.costCenterId,
        assignedToId: data.assignedToId,
        requestedStartDate: data.requestedStartDate ? new Date(data.requestedStartDate) : undefined,
        requestedEndDate: data.requestedEndDate ? new Date(data.requestedEndDate) : undefined,
        actualStartDate: data.actualStartDate ? new Date(data.actualStartDate) : undefined,
        actualEndDate: data.actualEndDate ? new Date(data.actualEndDate) : undefined,
        estimatedCost: data.estimatedCost,
        actualCost: data.actualCost,
        estimatedHours: data.estimatedHours,
        actualHours: data.actualHours,
        rejectionReason: data.rejectionReason,
        completionNotes: data.completionNotes,
        notes: data.notes,
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
        assignedTo: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
        department: true,
        location: true,
        asset: true,
        costCenter: true,
      },
    });

    // Create workflow history if status changed
    if (data.status && data.status !== existingRequest.status) {
      await prisma.workflowHistory.create({
        data: {
          entityType: 'JOB_REQUEST',
          entityId: id,
          action: 'STATUS_CHANGED',
          fromStatus: existingRequest.status,
          toStatus: data.status,
          comment: data.rejectionReason || `Status changed to ${data.status}`,
          performedById: userId,
        },
      });
    }

    return updatedRequest;
  }

  /**
   * Delete a job request
   */
  async remove(id: number) {
    const jobRequest = await prisma.jobRequest.findUnique({
      where: { id },
    });

    if (!jobRequest) {
      throw new Error('Job request not found');
    }

    // Only allow deletion of pending requests
    if (jobRequest.status !== 'PENDING') {
      throw new Error('Only pending job requests can be deleted');
    }

    await prisma.jobRequest.delete({
      where: { id },
    });

    return { message: 'Job request deleted successfully' };
  }

  /**
   * Get job request statistics
   */
  async getStatistics(departmentId?: number) {
    const where: Prisma.JobRequestWhereInput = departmentId ? { departmentId } : {};

    const [
      total,
      pending,
      inProgress,
      completed,
      rejected,
      byPriority,
      byType,
    ] = await Promise.all([
      prisma.jobRequest.count({ where }),
      prisma.jobRequest.count({ where: { ...where, status: 'PENDING' } }),
      prisma.jobRequest.count({
        where: {
          ...where,
          status: {
            in: ['MANAGER_APPROVAL', 'ENGINEER_TAKEOVER', 'TECHNICAL_APPROVAL',
                 'COST_CALCULATION', 'BUSINESS_APPROVAL', 'SOLUTION_ASSIGNMENT',
                 'IMPLEMENTATION', 'SOLUTION_APPROVAL']
          }
        }
      }),
      prisma.jobRequest.count({ where: { ...where, status: 'COMPLETED' } }),
      prisma.jobRequest.count({ where: { ...where, status: 'REJECTED' } }),
      prisma.jobRequest.groupBy({
        by: ['priority'],
        where,
        _count: true,
      }),
      prisma.jobRequest.groupBy({
        by: ['requestType'],
        where,
        _count: true,
      }),
    ]);

    return {
      total,
      byStatus: {
        pending,
        inProgress,
        completed,
        rejected,
      },
      byPriority: byPriority.reduce((acc, item) => {
        acc[item.priority] = item._count;
        return acc;
      }, {} as Record<string, number>),
      byType: byType.reduce((acc, item) => {
        acc[item.requestType] = item._count;
        return acc;
      }, {} as Record<string, number>),
    };
  }

  /**
   * Submit job request for approval
   */
  async submit(id: number, userId: number) {
    const jobRequest = await prisma.jobRequest.findUnique({
      where: { id },
    });

    if (!jobRequest) {
      throw new Error('Job request not found');
    }

    if (jobRequest.status !== 'PENDING') {
      throw new Error('Only pending requests can be submitted');
    }

    const updated = await prisma.jobRequest.update({
      where: { id },
      data: {
        status: 'MANAGER_APPROVAL',
        submittedAt: new Date(),
      },
      include: {
        requestedBy: {
          select: { id: true, firstName: true, lastName: true, email: true },
        },
        department: true,
        location: true,
        asset: true,
      },
    });

    // Create workflow history
    await prisma.workflowHistory.create({
      data: {
        entityType: 'JOB_REQUEST',
        entityId: id,
        action: 'SUBMITTED',
        fromStatus: 'PENDING',
        toStatus: 'MANAGER_APPROVAL',
        comment: 'Job request submitted for approval',
        performedById: userId,
      },
    });

    return updated;
  }

  /**
   * Approve job request
   */
  async approve(id: number, userId: number, comment?: string) {
    const jobRequest = await prisma.jobRequest.findUnique({
      where: { id },
    });

    if (!jobRequest) {
      throw new Error('Job request not found');
    }

    // Determine next status based on current status
    let nextStatus: JobRequestStatus;
    switch (jobRequest.status) {
      case 'MANAGER_APPROVAL':
        nextStatus = 'ENGINEER_TAKEOVER';
        break;
      case 'TECHNICAL_APPROVAL':
        nextStatus = 'COST_CALCULATION';
        break;
      case 'BUSINESS_APPROVAL':
        nextStatus = 'SOLUTION_ASSIGNMENT';
        break;
      case 'SOLUTION_APPROVAL':
        nextStatus = 'COMPLETED';
        break;
      default:
        throw new Error(`Cannot approve request in status: ${jobRequest.status}`);
    }

    const updated = await prisma.jobRequest.update({
      where: { id },
      data: {
        status: nextStatus,
        approvedAt: nextStatus === 'COMPLETED' ? new Date() : jobRequest.approvedAt,
      },
      include: {
        requestedBy: {
          select: { id: true, firstName: true, lastName: true, email: true },
        },
        department: true,
        location: true,
        asset: true,
      },
    });

    // Create workflow history
    await prisma.workflowHistory.create({
      data: {
        entityType: 'JOB_REQUEST',
        entityId: id,
        action: 'APPROVED',
        fromStatus: jobRequest.status,
        toStatus: nextStatus,
        comment: comment || 'Approved',
        performedById: userId,
      },
    });

    return updated;
  }

  /**
   * Reject job request
   */
  async reject(id: number, userId: number, comment: string) {
    const jobRequest = await prisma.jobRequest.findUnique({
      where: { id },
    });

    if (!jobRequest) {
      throw new Error('Job request not found');
    }

    const updated = await prisma.jobRequest.update({
      where: { id },
      data: {
        status: 'REJECTED',
        rejectedAt: new Date(),
      },
      include: {
        requestedBy: {
          select: { id: true, firstName: true, lastName: true, email: true },
        },
        department: true,
        location: true,
        asset: true,
      },
    });

    // Create workflow history
    await prisma.workflowHistory.create({
      data: {
        entityType: 'JOB_REQUEST',
        entityId: id,
        action: 'REJECTED',
        fromStatus: jobRequest.status,
        toStatus: 'REJECTED',
        comment: comment,
        performedById: userId,
      },
    });

    return updated;
  }

  /**
   * Cancel job request
   */
  async cancel(id: number, userId: number, reason?: string) {
    const jobRequest = await prisma.jobRequest.findUnique({
      where: { id },
    });

    if (!jobRequest) {
      throw new Error('Job request not found');
    }

    if (['COMPLETED', 'REJECTED', 'CANCELLED'].includes(jobRequest.status)) {
      throw new Error('Cannot cancel completed, rejected, or already cancelled requests');
    }

    const updated = await prisma.jobRequest.update({
      where: { id },
      data: {
        status: 'CANCELLED',
        cancelledAt: new Date(),
      },
      include: {
        requestedBy: {
          select: { id: true, firstName: true, lastName: true, email: true },
        },
        department: true,
        location: true,
        asset: true,
      },
    });

    // Create workflow history
    await prisma.workflowHistory.create({
      data: {
        entityType: 'JOB_REQUEST',
        entityId: id,
        action: 'CANCELLED',
        fromStatus: jobRequest.status,
        toStatus: 'CANCELLED',
        comment: reason || 'Cancelled by user',
        performedById: userId,
      },
    });

    return updated;
  }
}

export default new JobRequestsService();