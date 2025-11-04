import prisma from '../../database/prisma';
import { CreateRetirementDto } from './dto/create-retirement.dto';
import { UpdateRetirementDto } from './dto/update-retirement.dto';
import { RetirementQueryDto } from './dto/retirement-query.dto';

export class RetirementsService {
  private async generateRetirementNumber(): Promise<string> {
    const year = new Date().getFullYear();
    const lastRetirement = await prisma.assetRetirement.findFirst({
      where: { retirementNumber: { startsWith: `RET${year}` } },
      orderBy: { retirementNumber: 'desc' },
    });
    if (!lastRetirement) return `RET${year}00001`;
    const lastNumber = parseInt(lastRetirement.retirementNumber.slice(-5));
    return `RET${year}${(lastNumber + 1).toString().padStart(5, '0')}`;
  }

  async create(data: CreateRetirementDto, createdById: number) {
    const retirementNumber = await this.generateRetirementNumber();
    return await prisma.assetRetirement.create({
      data: {
        retirementNumber,
        assetId: data.assetId,
        reason: data.reason,
        retirementDate: new Date(data.retirementDate),
        estimatedValue: data.estimatedValue,
        notes: data.notes,
        statusId: 1,
        createdById,
      },
      include: { asset: { include: { assetType: true } }, status: true, createdBy: { select: { id: true, firstName: true, lastName: true } } },
    });
  }

  async findAll(query: RetirementQueryDto) {
    const { page = 1, limit = 10, search, assetId, statusId, startDate, endDate } = query;
    const skip = (page - 1) * limit;
    const where: any = { deletedAt: null };
    if (search) where.OR = [{ retirementNumber: { contains: search, mode: 'insensitive' } }, { reason: { contains: search, mode: 'insensitive' } }, { asset: { assetName: { contains: search, mode: 'insensitive' } } }];
    if (assetId) where.assetId = assetId;
    if (statusId) where.statusId = statusId;
    if (startDate && endDate) where.AND = [{ retirementDate: { gte: new Date(startDate) } }, { retirementDate: { lte: new Date(endDate) } }];
    const [retirements, total] = await Promise.all([
      prisma.assetRetirement.findMany({ where, skip, take: limit, orderBy: { retirementDate: 'desc' }, include: { asset: { include: { assetType: true } }, status: true, createdBy: { select: { id: true, firstName: true, lastName: true } } } }),
      prisma.assetRetirement.count({ where }),
    ]);
    return { data: retirements, pagination: { total, page, limit, totalPages: Math.ceil(total / limit) } };
  }

  async findOne(id: number) {
    const retirement = await prisma.assetRetirement.findUnique({
      where: { id },
      include: { asset: { include: { assetType: true, assetStatus: true } }, status: true, createdBy: { select: { id: true, firstName: true, lastName: true } } },
    });
    if (!retirement || retirement.deletedAt) throw new Error('Hurda kaydı bulunamadı');
    return retirement;
  }

  async update(id: number, data: UpdateRetirementDto) {
    await this.findOne(id);
    return await prisma.assetRetirement.update({
      where: { id },
      data: { reason: data.reason, retirementDate: data.retirementDate ? new Date(data.retirementDate) : undefined, estimatedValue: data.estimatedValue, actualValue: data.actualValue, notes: data.notes, statusId: data.statusId },
      include: { asset: { include: { assetType: true } }, status: true },
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    await prisma.assetRetirement.update({ where: { id }, data: { deletedAt: new Date() } });
    return { message: 'Hurda kaydı silindi' };
  }

  async getStatistics() {
    const [total, pending, approved, rejected] = await Promise.all([
      prisma.assetRetirement.count({ where: { deletedAt: null } }),
      prisma.assetRetirement.count({ where: { deletedAt: null, statusId: 1 } }),
      prisma.assetRetirement.count({ where: { deletedAt: null, statusId: 2 } }),
      prisma.assetRetirement.count({ where: { deletedAt: null, statusId: 3 } }),
    ]);
    return { total, pending, approved, rejected };
  }
}

export const retirementsService = new RetirementsService();
