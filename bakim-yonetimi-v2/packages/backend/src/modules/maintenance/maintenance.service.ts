import prisma from '../../database/prisma';
import { CreateMaintenanceDutyDto } from './dto/create-maintenance-duty.dto';
import { UpdateMaintenanceDutyDto } from './dto/update-maintenance-duty.dto';
import { MaintenanceDutyQueryDto } from './dto/maintenance-duty-query.dto';

export class MaintenanceService {
  private async generateMaintenanceNumber(): Promise<string> {
    const year = new Date().getFullYear();
    const lastMaintenance = await prisma.maintenanceDuty.findFirst({
      where: {
        maintenanceNumber: {
          startsWith: `MTN${year}`,
        },
      },
      orderBy: {
        maintenanceNumber: 'desc',
      },
    });

    if (!lastMaintenance) {
      return `MTN${year}00001`;
    }

    const lastNumber = parseInt(lastMaintenance.maintenanceNumber.slice(-5));
    const newNumber = (lastNumber + 1).toString().padStart(5, '0');
    return `MTN${year}${newNumber}`;
  }

  async create(data: CreateMaintenanceDutyDto, createdById: number) {
    const maintenanceNumber = await this.generateMaintenanceNumber();

    // Default status is "Planned" (1)
    const duty = await prisma.maintenanceDuty.create({
      data: {
        maintenanceNumber,
        assetId: data.assetId,
        maintenanceTypeId: data.maintenanceTypeId,
        description: data.description,
        plannedStartDate: new Date(data.plannedStartDate),
        plannedEndDate: new Date(data.plannedEndDate),
        assignedToUserId: data.assignedToUserId,
        priority: data.priority || 'medium',
        estimatedCost: data.estimatedCost,
        notes: data.notes,
        statusId: 1, // Planned
        createdById,
      },
      include: {
        asset: {
          include: {
            assetType: true,
            location: true,
          },
        },
        maintenanceType: true,
        status: true,
        assignedToUser: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
        createdBy: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
      },
    });

    return duty;
  }

  async findAll(query: MaintenanceDutyQueryDto) {
    const {
      page = 1,
      limit = 10,
      search,
      assetId,
      maintenanceTypeId,
      statusId,
      assignedToUserId,
      priority,
      startDate,
      endDate,
    } = query;

    const skip = (page - 1) * limit;

    const where: any = {
      deletedAt: null,
    };

    if (search) {
      where.OR = [
        { maintenanceNumber: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { notes: { contains: search, mode: 'insensitive' } },
        { asset: { assetName: { contains: search, mode: 'insensitive' } } },
        { asset: { assetNumber: { contains: search, mode: 'insensitive' } } },
      ];
    }

    if (assetId) {
      where.assetId = assetId;
    }

    if (maintenanceTypeId) {
      where.maintenanceTypeId = maintenanceTypeId;
    }

    if (statusId) {
      where.statusId = statusId;
    }

    if (assignedToUserId) {
      where.assignedToUserId = assignedToUserId;
    }

    if (priority) {
      where.priority = priority;
    }

    if (startDate && endDate) {
      where.AND = [
        { plannedStartDate: { gte: new Date(startDate) } },
        { plannedEndDate: { lte: new Date(endDate) } },
      ];
    }

    const [duties, total] = await Promise.all([
      prisma.maintenanceDuty.findMany({
        where,
        skip,
        take: limit,
        orderBy: {
          plannedStartDate: 'desc',
        },
        include: {
          asset: {
            include: {
              assetType: true,
              location: true,
            },
          },
          maintenanceType: true,
          status: true,
          assignedToUser: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
            },
          },
          createdBy: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
            },
          },
        },
      }),
      prisma.maintenanceDuty.count({ where }),
    ]);

    return {
      data: duties,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: number) {
    const duty = await prisma.maintenanceDuty.findUnique({
      where: { id },
      include: {
        asset: {
          include: {
            assetType: true,
            assetStatus: true,
            location: true,
          },
        },
        maintenanceType: true,
        status: true,
        assignedToUser: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
        createdBy: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
        tasks: {
          where: {
            deletedAt: null,
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    });

    if (!duty || duty.deletedAt) {
      throw new Error('Bakım görevi bulunamadı');
    }

    return duty;
  }

  async update(id: number, data: UpdateMaintenanceDutyDto) {
    await this.findOne(id);

    const updateData: any = {
      description: data.description,
      plannedStartDate: data.plannedStartDate ? new Date(data.plannedStartDate) : undefined,
      plannedEndDate: data.plannedEndDate ? new Date(data.plannedEndDate) : undefined,
      actualStartDate: data.actualStartDate ? new Date(data.actualStartDate) : undefined,
      actualEndDate: data.actualEndDate ? new Date(data.actualEndDate) : undefined,
      assignedToUserId: data.assignedToUserId,
      priority: data.priority,
      statusId: data.statusId,
      estimatedCost: data.estimatedCost,
      actualCost: data.actualCost,
      notes: data.notes,
    };

    const updated = await prisma.maintenanceDuty.update({
      where: { id },
      data: updateData,
      include: {
        asset: {
          include: {
            assetType: true,
            location: true,
          },
        },
        maintenanceType: true,
        status: true,
        assignedToUser: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
    });

    return updated;
  }

  async remove(id: number) {
    await this.findOne(id);

    await prisma.maintenanceDuty.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });

    return { message: 'Bakım görevi silindi' };
  }

  async getStatistics() {
    const [
      totalDuties,
      plannedDuties,
      inProgressDuties,
      completedDuties,
      overdueCount,
      dutiesByPriority,
    ] = await Promise.all([
      prisma.maintenanceDuty.count({
        where: { deletedAt: null },
      }),
      prisma.maintenanceDuty.count({
        where: {
          deletedAt: null,
          statusId: 1, // Planned
        },
      }),
      prisma.maintenanceDuty.count({
        where: {
          deletedAt: null,
          statusId: 2, // In Progress
        },
      }),
      prisma.maintenanceDuty.count({
        where: {
          deletedAt: null,
          statusId: 3, // Completed
        },
      }),
      prisma.maintenanceDuty.count({
        where: {
          deletedAt: null,
          plannedEndDate: {
            lt: new Date(),
          },
          statusId: {
            in: [1, 2], // Planned or In Progress
          },
        },
      }),
      prisma.maintenanceDuty.groupBy({
        by: ['priority'],
        where: {
          deletedAt: null,
          statusId: {
            in: [1, 2], // Planned or In Progress
          },
        },
        _count: true,
      }),
    ]);

    return {
      totalDuties,
      plannedDuties,
      inProgressDuties,
      completedDuties,
      overdueCount,
      dutiesByPriority,
    };
  }
}

export const maintenanceService = new MaintenanceService();
