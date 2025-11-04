import { Request, Response } from 'express';
import { maintenanceService } from './maintenance.service';
import { CreateMaintenanceDutyDto } from './dto/create-maintenance-duty.dto';
import { UpdateMaintenanceDutyDto } from './dto/update-maintenance-duty.dto';
import { MaintenanceDutyQueryDto } from './dto/maintenance-duty-query.dto';

export class MaintenanceController {
  async create(req: Request, res: Response) {
    try {
      const data: CreateMaintenanceDutyDto = req.body;
      const createdById = req.user!.id;

      const duty = await maintenanceService.create(data, createdById);

      res.status(201).json({
        success: true,
        message: 'Bakım görevi başarıyla oluşturuldu',
        data: duty,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message || 'Bakım görevi oluşturulurken hata oluştu',
      });
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      const query: MaintenanceDutyQueryDto = {
        page: req.query.page ? parseInt(req.query.page as string) : undefined,
        limit: req.query.limit ? parseInt(req.query.limit as string) : undefined,
        search: req.query.search as string,
        assetId: req.query.assetId ? parseInt(req.query.assetId as string) : undefined,
        maintenanceTypeId: req.query.maintenanceTypeId
          ? parseInt(req.query.maintenanceTypeId as string)
          : undefined,
        statusId: req.query.statusId ? parseInt(req.query.statusId as string) : undefined,
        assignedToUserId: req.query.assignedToUserId
          ? parseInt(req.query.assignedToUserId as string)
          : undefined,
        priority: req.query.priority as any,
        startDate: req.query.startDate as string,
        endDate: req.query.endDate as string,
      };

      const result = await maintenanceService.findAll(query);

      res.json({
        success: true,
        data: result.data,
        pagination: result.pagination,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message || 'Bakım görevleri getirilirken hata oluştu',
      });
    }
  }

  async findOne(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const duty = await maintenanceService.findOne(id);

      res.json({
        success: true,
        data: duty,
      });
    } catch (error: any) {
      res.status(404).json({
        success: false,
        message: error.message || 'Bakım görevi bulunamadı',
      });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const data: UpdateMaintenanceDutyDto = req.body;

      const duty = await maintenanceService.update(id, data);

      res.json({
        success: true,
        message: 'Bakım görevi başarıyla güncellendi',
        data: duty,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message || 'Bakım görevi güncellenirken hata oluştu',
      });
    }
  }

  async remove(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      await maintenanceService.remove(id);

      res.json({
        success: true,
        message: 'Bakım görevi başarıyla silindi',
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message || 'Bakım görevi silinirken hata oluştu',
      });
    }
  }

  async getStatistics(req: Request, res: Response) {
    try {
      const statistics = await maintenanceService.getStatistics();

      res.json({
        success: true,
        data: statistics,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message || 'İstatistikler getirilirken hata oluştu',
      });
    }
  }
}

export const maintenanceController = new MaintenanceController();
