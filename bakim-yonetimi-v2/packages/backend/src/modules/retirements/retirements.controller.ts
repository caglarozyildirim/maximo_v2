import { Request, Response } from 'express';
import { retirementsService } from './retirements.service';
import { CreateRetirementDto } from './dto/create-retirement.dto';
import { UpdateRetirementDto } from './dto/update-retirement.dto';
import { RetirementQueryDto } from './dto/retirement-query.dto';

export class RetirementsController {
  async create(req: Request, res: Response) {
    try {
      const data: CreateRetirementDto = req.body;
      const retirement = await retirementsService.create(data, req.user!.id);
      res.status(201).json({ success: true, message: 'Hurda kaydı başarıyla oluşturuldu', data: retirement });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message || 'Hurda kaydı oluşturulurken hata oluştu' });
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      const query: RetirementQueryDto = {
        page: req.query.page ? parseInt(req.query.page as string) : undefined,
        limit: req.query.limit ? parseInt(req.query.limit as string) : undefined,
        search: req.query.search as string,
        assetId: req.query.assetId ? parseInt(req.query.assetId as string) : undefined,
        statusId: req.query.statusId ? parseInt(req.query.statusId as string) : undefined,
        startDate: req.query.startDate as string,
        endDate: req.query.endDate as string,
      };
      const result = await retirementsService.findAll(query);
      res.json({ success: true, data: result.data, pagination: result.pagination });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message || 'Hurda kayıtları getirilirken hata oluştu' });
    }
  }

  async findOne(req: Request, res: Response) {
    try {
      const retirement = await retirementsService.findOne(parseInt(req.params.id));
      res.json({ success: true, data: retirement });
    } catch (error: any) {
      res.status(404).json({ success: false, message: error.message || 'Hurda kaydı bulunamadı' });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const retirement = await retirementsService.update(parseInt(req.params.id), req.body);
      res.json({ success: true, message: 'Hurda kaydı başarıyla güncellendi', data: retirement });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message || 'Hurda kaydı güncellenirken hata oluştu' });
    }
  }

  async remove(req: Request, res: Response) {
    try {
      await retirementsService.remove(parseInt(req.params.id));
      res.json({ success: true, message: 'Hurda kaydı başarıyla silindi' });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message || 'Hurda kaydı silinirken hata oluştu' });
    }
  }

  async getStatistics(req: Request, res: Response) {
    try {
      const statistics = await retirementsService.getStatistics();
      res.json({ success: true, data: statistics });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message || 'İstatistikler getirilirken hata oluştu' });
    }
  }
}

export const retirementsController = new RetirementsController();
