import { PrismaClient } from '@prisma/client';
import { CreateAssetDto } from './dto/create-asset.dto';
import { UpdateAssetDto } from './dto/update-asset.dto';
import { AssetQueryDto } from './dto/asset-query.dto';

const prisma = new PrismaClient();

export class AssetsService {
  // Generate asset number
  private async generateAssetNumber(): Promise<string> {
    const year = new Date().getFullYear();
    const lastAsset = await prisma.asset.findFirst({
      where: {
        assetNumber: {
          startsWith: `AST${year}`,
        },
      },
      orderBy: {
        assetNumber: 'desc',
      },
    });

    if (!lastAsset) {
      return `AST${year}00001`;
    }

    const lastNumber = parseInt(lastAsset.assetNumber.slice(-5));
    const newNumber = (lastNumber + 1).toString().padStart(5, '0');
    return `AST${year}${newNumber}`;
  }

  // Create asset
  async create(data: CreateAssetDto, userId: number) {
    const assetNumber = await this.generateAssetNumber();

    const asset = await prisma.asset.create({
      data: {
        assetNumber,
        assetName: data.assetName,
        description: data.description,
        assetTypeId: data.assetTypeId,
        assetStatusId: data.assetStatusId,
        assetClassId: data.assetClassId,
        assetGroupHeaderId: data.assetGroupHeaderId,
        locationId: data.locationId,
        costCenterId: data.costCenterId,
        departmentId: data.departmentId,
        purchasePrice: data.purchasePrice,
        currentValue: data.currentValue,
        purchaseDate: data.purchaseDate ? new Date(data.purchaseDate) : undefined,
        warrantyStartDate: data.warrantyStartDate ? new Date(data.warrantyStartDate) : undefined,
        warrantyEndDate: data.warrantyEndDate ? new Date(data.warrantyEndDate) : undefined,
        serialNumber: data.serialNumber,
        model: data.model,
        manufacturer: data.manufacturer,
        specifications: data.specifications,
        notes: data.notes,
        createdById: userId,
        updatedById: userId,
      },
      include: {
        assetType: true,
        assetStatus: true,
        assetClass: true,
        assetGroupHeader: true,
        location: true,
        costCenter: true,
        department: true,
        createdBy: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
    });

    return asset;
  }

  // Find all assets with filters
  async findAll(query: AssetQueryDto) {
    const {
      page = 1,
      limit = 20,
      search,
      assetTypeId,
      assetStatusId,
      locationId,
      departmentId,
      sortBy = 'createdAt',
      sortOrder = 'desc',
    } = query;

    const skip = (page - 1) * limit;

    // Build where clause
    const where: any = {
      deletedAt: null,
    };

    if (search) {
      where.OR = [
        { assetNumber: { contains: search, mode: 'insensitive' } },
        { assetName: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { serialNumber: { contains: search, mode: 'insensitive' } },
        { model: { contains: search, mode: 'insensitive' } },
        { manufacturer: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (assetTypeId) where.assetTypeId = assetTypeId;
    if (assetStatusId) where.assetStatusId = assetStatusId;
    if (locationId) where.locationId = locationId;
    if (departmentId) where.departmentId = departmentId;

    // Get total count
    const total = await prisma.asset.count({ where });

    // Get assets
    const assets = await prisma.asset.findMany({
      where,
      skip,
      take: limit,
      orderBy: {
        [sortBy]: sortOrder,
      },
      include: {
        assetType: true,
        assetStatus: true,
        assetClass: true,
        location: true,
        department: true,
        costCenter: true,
      },
    });

    return {
      data: assets,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  // Find one asset by ID
  async findOne(id: number) {
    const asset = await prisma.asset.findUnique({
      where: { id },
      include: {
        assetType: true,
        assetStatus: true,
        assetClass: true,
        assetGroupHeader: true,
        location: true,
        costCenter: true,
        department: true,
        createdBy: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
        updatedBy: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
    });

    if (!asset || asset.deletedAt) {
      throw new Error('Asset not found');
    }

    return asset;
  }

  // Update asset
  async update(id: number, data: UpdateAssetDto, userId: number) {
    const asset = await this.findOne(id);

    const updated = await prisma.asset.update({
      where: { id },
      data: {
        ...data,
        purchaseDate: data.purchaseDate ? new Date(data.purchaseDate) : undefined,
        warrantyStartDate: data.warrantyStartDate ? new Date(data.warrantyStartDate) : undefined,
        warrantyEndDate: data.warrantyEndDate ? new Date(data.warrantyEndDate) : undefined,
        updatedById: userId,
      },
      include: {
        assetType: true,
        assetStatus: true,
        assetClass: true,
        assetGroupHeader: true,
        location: true,
        costCenter: true,
        department: true,
      },
    });

    return updated;
  }

  // Soft delete asset
  async remove(id: number, userId: number) {
    const asset = await this.findOne(id);

    await prisma.asset.update({
      where: { id },
      data: {
        deletedAt: new Date(),
        updatedById: userId,
      },
    });

    return { message: 'Asset deleted successfully' };
  }

  // Get statistics
  async getStatistics() {
    const total = await prisma.asset.count({
      where: { deletedAt: null },
    });

    const byStatus = await prisma.asset.groupBy({
      by: ['assetStatusId'],
      where: { deletedAt: null },
      _count: true,
    });

    const byType = await prisma.asset.groupBy({
      by: ['assetTypeId'],
      where: { deletedAt: null },
      _count: true,
    });

    const byLocation = await prisma.asset.groupBy({
      by: ['locationId'],
      where: { deletedAt: null, locationId: { not: null } },
      _count: true,
    });

    return {
      total,
      byStatus,
      byType,
      byLocation,
    };
  }
}

export default new AssetsService();
