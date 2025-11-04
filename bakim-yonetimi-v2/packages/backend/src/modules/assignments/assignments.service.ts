import prisma from '../../database/prisma';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { UpdateAssignmentDto } from './dto/update-assignment.dto';
import { AssignmentQueryDto } from './dto/assignment-query.dto';

export class AssignmentsService {
  private async generateAssignmentNumber(): Promise<string> {
    const year = new Date().getFullYear();
    const lastAssignment = await prisma.assignment.findFirst({
      where: {
        assignmentNumber: {
          startsWith: `ZIM${year}`,
        },
      },
      orderBy: {
        assignmentNumber: 'desc',
      },
    });

    if (!lastAssignment) {
      return `ZIM${year}00001`;
    }

    const lastNumber = parseInt(lastAssignment.assignmentNumber.slice(-5));
    const newNumber = (lastNumber + 1).toString().padStart(5, '0');
    return `ZIM${year}${newNumber}`;
  }

  async create(data: CreateAssignmentDto, createdById: number) {
    // Check if asset is already assigned
    const existingAssignment = await prisma.assignment.findFirst({
      where: {
        assetId: data.assetId,
        isActive: true,
        returnDate: null,
      },
    });

    if (existingAssignment) {
      throw new Error('Bu varlık zaten zimmetli durumda');
    }

    const assignmentNumber = await this.generateAssignmentNumber();

    const assignment = await prisma.assignment.create({
      data: {
        assignmentNumber,
        assetId: data.assetId,
        assignedToUserId: data.assignedToUserId,
        assignmentDate: new Date(data.assignmentDate),
        notes: data.notes,
        assignmentTypeId: data.assignmentTypeId,
        departmentId: data.departmentId,
        locationId: data.locationId,
        isActive: true,
        createdById,
      },
      include: {
        asset: {
          include: {
            assetType: true,
            assetStatus: true,
          },
        },
        assignedToUser: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
        department: true,
        location: true,
        createdBy: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
      },
    });

    return assignment;
  }

  async findAll(query: AssignmentQueryDto) {
    const {
      page = 1,
      limit = 10,
      search,
      assetId,
      assignedToUserId,
      isActive,
      assignmentTypeId,
      departmentId,
      locationId,
    } = query;

    const skip = (page - 1) * limit;

    const where: any = {
      deletedAt: null,
    };

    if (search) {
      where.OR = [
        { assignmentNumber: { contains: search, mode: 'insensitive' } },
        { notes: { contains: search, mode: 'insensitive' } },
        { asset: { assetName: { contains: search, mode: 'insensitive' } } },
        { asset: { assetNumber: { contains: search, mode: 'insensitive' } } },
        { assignedToUser: { firstName: { contains: search, mode: 'insensitive' } } },
        { assignedToUser: { lastName: { contains: search, mode: 'insensitive' } } },
      ];
    }

    if (assetId) {
      where.assetId = assetId;
    }

    if (assignedToUserId) {
      where.assignedToUserId = assignedToUserId;
    }

    if (isActive !== undefined) {
      where.isActive = isActive;
    }

    if (assignmentTypeId) {
      where.assignmentTypeId = assignmentTypeId;
    }

    if (departmentId) {
      where.departmentId = departmentId;
    }

    if (locationId) {
      where.locationId = locationId;
    }

    const [assignments, total] = await Promise.all([
      prisma.assignment.findMany({
        where,
        skip,
        take: limit,
        orderBy: {
          assignmentDate: 'desc',
        },
        include: {
          asset: {
            include: {
              assetType: true,
              assetStatus: true,
            },
          },
          assignedToUser: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
            },
          },
          department: true,
          location: true,
          createdBy: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
            },
          },
          returnedBy: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
            },
          },
        },
      }),
      prisma.assignment.count({ where }),
    ]);

    return {
      data: assignments,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: number) {
    const assignment = await prisma.assignment.findUnique({
      where: { id },
      include: {
        asset: {
          include: {
            assetType: true,
            assetStatus: true,
            location: true,
          },
        },
        assignedToUser: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
        department: true,
        location: true,
        createdBy: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
        returnedBy: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
      },
    });

    if (!assignment || assignment.deletedAt) {
      throw new Error('Zimmet kaydı bulunamadı');
    }

    return assignment;
  }

  async update(id: number, data: UpdateAssignmentDto) {
    const assignment = await this.findOne(id);

    if (!assignment.isActive) {
      throw new Error('İade edilmiş zimmet kaydı güncellenemez');
    }

    const updated = await prisma.assignment.update({
      where: { id },
      data: {
        notes: data.notes,
        assignmentTypeId: data.assignmentTypeId,
        departmentId: data.departmentId,
        locationId: data.locationId,
      },
      include: {
        asset: {
          include: {
            assetType: true,
            assetStatus: true,
          },
        },
        assignedToUser: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
        department: true,
        location: true,
      },
    });

    return updated;
  }

  async returnAssignment(id: number, returnedById: number, returnNotes?: string) {
    const assignment = await this.findOne(id);

    if (!assignment.isActive) {
      throw new Error('Bu zimmet zaten iade edilmiş');
    }

    const returned = await prisma.assignment.update({
      where: { id },
      data: {
        isActive: false,
        returnDate: new Date(),
        returnNotes,
        returnedById,
      },
      include: {
        asset: {
          include: {
            assetType: true,
            assetStatus: true,
          },
        },
        assignedToUser: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
        returnedBy: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
      },
    });

    return returned;
  }

  async remove(id: number) {
    const assignment = await this.findOne(id);

    if (assignment.isActive) {
      throw new Error('Aktif zimmet kaydı silinemez. Önce iade edilmelidir.');
    }

    await prisma.assignment.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });

    return { message: 'Zimmet kaydı silindi' };
  }

  async getStatistics() {
    const [totalAssignments, activeAssignments, returnedAssignments, assignmentsByUser] =
      await Promise.all([
        prisma.assignment.count({
          where: { deletedAt: null },
        }),
        prisma.assignment.count({
          where: {
            deletedAt: null,
            isActive: true,
          },
        }),
        prisma.assignment.count({
          where: {
            deletedAt: null,
            isActive: false,
          },
        }),
        prisma.assignment.groupBy({
          by: ['assignedToUserId'],
          where: {
            deletedAt: null,
            isActive: true,
          },
          _count: true,
        }),
      ]);

    return {
      totalAssignments,
      activeAssignments,
      returnedAssignments,
      assignmentsByUser: assignmentsByUser.length,
    };
  }
}

export const assignmentsService = new AssignmentsService();
