import prisma from '../../database/prisma';
import { CreateIncidentDto } from './dto/create-incident.dto';
import { UpdateIncidentDto } from './dto/update-incident.dto';
import { IncidentQueryDto } from './dto/incident-query.dto';

export class IncidentsService {
  private async generateIncidentNumber(): Promise<string> {
    const year = new Date().getFullYear();
    const lastIncident = await prisma.incident.findFirst({
      where: {
        incidentNumber: {
          startsWith: `INC${year}`,
        },
      },
      orderBy: {
        incidentNumber: 'desc',
      },
    });

    if (!lastIncident) {
      return `INC${year}00001`;
    }

    const lastNumber = parseInt(lastIncident.incidentNumber.slice(-5));
    const newNumber = (lastNumber + 1).toString().padStart(5, '0');
    return `INC${year}${newNumber}`;
  }

  async create(data: CreateIncidentDto) {
    const incidentNumber = await this.generateIncidentNumber();

    // Default status is "Reported" (1)
    const incident = await prisma.incident.create({
      data: {
        incidentNumber,
        assetId: data.assetId,
        incidentTypeId: data.incidentTypeId,
        title: data.title,
        description: data.description,
        incidentDate: new Date(data.incidentDate),
        severity: data.severity || 'medium',
        reportedByUserId: data.reportedByUserId,
        locationId: data.locationId,
        immediateAction: data.immediateAction,
        statusId: 1, // Reported
      },
      include: {
        asset: {
          include: {
            assetType: true,
            location: true,
          },
        },
        incidentType: true,
        status: true,
        reportedByUser: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
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
        location: true,
      },
    });

    return incident;
  }

  async findAll(query: IncidentQueryDto) {
    const {
      page = 1,
      limit = 10,
      search,
      assetId,
      incidentTypeId,
      statusId,
      severity,
      reportedByUserId,
      assignedToUserId,
      startDate,
      endDate,
    } = query;

    const skip = (page - 1) * limit;

    const where: any = {
      deletedAt: null,
    };

    if (search) {
      where.OR = [
        { incidentNumber: { contains: search, mode: 'insensitive' } },
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { asset: { assetName: { contains: search, mode: 'insensitive' } } },
        { asset: { assetNumber: { contains: search, mode: 'insensitive' } } },
      ];
    }

    if (assetId) {
      where.assetId = assetId;
    }

    if (incidentTypeId) {
      where.incidentTypeId = incidentTypeId;
    }

    if (statusId) {
      where.statusId = statusId;
    }

    if (severity) {
      where.severity = severity;
    }

    if (reportedByUserId) {
      where.reportedByUserId = reportedByUserId;
    }

    if (assignedToUserId) {
      where.assignedToUserId = assignedToUserId;
    }

    if (startDate && endDate) {
      where.AND = [
        { incidentDate: { gte: new Date(startDate) } },
        { incidentDate: { lte: new Date(endDate) } },
      ];
    }

    const [incidents, total] = await Promise.all([
      prisma.incident.findMany({
        where,
        skip,
        take: limit,
        orderBy: {
          incidentDate: 'desc',
        },
        include: {
          asset: {
            include: {
              assetType: true,
              location: true,
            },
          },
          incidentType: true,
          status: true,
          reportedByUser: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
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
          location: true,
        },
      }),
      prisma.incident.count({ where }),
    ]);

    return {
      data: incidents,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: number) {
    const incident = await prisma.incident.findUnique({
      where: { id },
      include: {
        asset: {
          include: {
            assetType: true,
            assetStatus: true,
            location: true,
          },
        },
        incidentType: true,
        status: true,
        reportedByUser: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
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
        location: true,
      },
    });

    if (!incident || incident.deletedAt) {
      throw new Error('Olay kaydı bulunamadı');
    }

    return incident;
  }

  async update(id: number, data: UpdateIncidentDto) {
    await this.findOne(id);

    const updateData: any = {
      title: data.title,
      description: data.description,
      severity: data.severity,
      statusId: data.statusId,
      assignedToUserId: data.assignedToUserId,
      immediateAction: data.immediateAction,
      rootCause: data.rootCause,
      correctiveAction: data.correctiveAction,
      preventiveAction: data.preventiveAction,
      resolvedDate: data.resolvedDate ? new Date(data.resolvedDate) : undefined,
    };

    const updated = await prisma.incident.update({
      where: { id },
      data: updateData,
      include: {
        asset: {
          include: {
            assetType: true,
            location: true,
          },
        },
        incidentType: true,
        status: true,
        reportedByUser: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
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
        location: true,
      },
    });

    return updated;
  }

  async remove(id: number) {
    await this.findOne(id);

    await prisma.incident.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });

    return { message: 'Olay kaydı silindi' };
  }

  async getStatistics() {
    const [
      totalIncidents,
      reportedIncidents,
      inProgressIncidents,
      resolvedIncidents,
      criticalIncidents,
      incidentsBySeverity,
    ] = await Promise.all([
      prisma.incident.count({
        where: { deletedAt: null },
      }),
      prisma.incident.count({
        where: {
          deletedAt: null,
          statusId: 1, // Reported
        },
      }),
      prisma.incident.count({
        where: {
          deletedAt: null,
          statusId: 2, // In Progress
        },
      }),
      prisma.incident.count({
        where: {
          deletedAt: null,
          statusId: 3, // Resolved
        },
      }),
      prisma.incident.count({
        where: {
          deletedAt: null,
          severity: 'critical',
          statusId: {
            in: [1, 2], // Reported or In Progress
          },
        },
      }),
      prisma.incident.groupBy({
        by: ['severity'],
        where: {
          deletedAt: null,
          statusId: {
            in: [1, 2], // Reported or In Progress
          },
        },
        _count: true,
      }),
    ]);

    return {
      totalIncidents,
      reportedIncidents,
      inProgressIncidents,
      resolvedIncidents,
      criticalIncidents,
      incidentsBySeverity,
    };
  }
}

export const incidentsService = new IncidentsService();
