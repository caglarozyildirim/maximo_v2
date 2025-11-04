import { Request, Response, NextFunction } from 'express';
import assetsService from './assets.service';
import { CreateAssetDto } from './dto/create-asset.dto';
import { UpdateAssetDto } from './dto/update-asset.dto';
import { AssetQueryDto } from './dto/asset-query.dto';

export class AssetsController {
  // Create asset
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const data: CreateAssetDto = req.body;
      const userId = (req as any).user.userId;

      const asset = await assetsService.create(data, userId);

      res.status(201).json({
        success: true,
        data: asset,
      });
    } catch (error) {
      next(error);
    }
  }

  // Get all assets
  async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const query: AssetQueryDto = {
        page: req.query.page ? parseInt(req.query.page as string) : 1,
        limit: req.query.limit ? parseInt(req.query.limit as string) : 20,
        search: req.query.search as string,
        assetTypeId: req.query.assetTypeId ? parseInt(req.query.assetTypeId as string) : undefined,
        assetStatusId: req.query.assetStatusId ? parseInt(req.query.assetStatusId as string) : undefined,
        locationId: req.query.locationId ? parseInt(req.query.locationId as string) : undefined,
        departmentId: req.query.departmentId ? parseInt(req.query.departmentId as string) : undefined,
        sortBy: req.query.sortBy as string,
        sortOrder: req.query.sortOrder as 'asc' | 'desc',
      };

      const result = await assetsService.findAll(query);

      res.json({
        success: true,
        ...result,
      });
    } catch (error) {
      next(error);
    }
  }

  // Get one asset
  async findOne(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id);
      const asset = await assetsService.findOne(id);

      res.json({
        success: true,
        data: asset,
      });
    } catch (error) {
      next(error);
    }
  }

  // Update asset
  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id);
      const data: UpdateAssetDto = req.body;
      const userId = (req as any).user.userId;

      const asset = await assetsService.update(id, data, userId);

      res.json({
        success: true,
        data: asset,
      });
    } catch (error) {
      next(error);
    }
  }

  // Delete asset
  async remove(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id);
      const userId = (req as any).user.userId;

      await assetsService.remove(id, userId);

      res.json({
        success: true,
        message: 'Asset deleted successfully',
      });
    } catch (error) {
      next(error);
    }
  }

  // Get statistics
  async getStatistics(req: Request, res: Response, next: NextFunction) {
    try {
      const stats = await assetsService.getStatistics();

      res.json({
        success: true,
        data: stats,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new AssetsController();
