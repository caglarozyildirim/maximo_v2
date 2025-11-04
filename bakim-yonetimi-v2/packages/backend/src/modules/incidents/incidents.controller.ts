import { Request, Response } from 'express';
import { incidentsService } from './incidents.service';
import { CreateIncidentDto } from './dto/create-incident.dto';
import { UpdateIncidentDto } from './dto/update-incident.dto';
import { IncidentQueryDto } from './dto/incident-query.dto';

export class IncidentsController {
  async create(req: Request, res: Response) {
    try {
      const data: CreateIncidentDto = req.body;
      const incident = await incidentsService.create(data);

      res.status(201).json({
        success: true,
        message: 'Olay kaydı başarıyla oluşturuldu',
        data: incident,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message || 'Olay kaydı oluşturulurken hata oluştu',
      });
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      const query: IncidentQueryDto = {
        page: req.query.page ? parseInt(req.query.page as string) : undefined,
        limit: req.query.limit ? parseInt(req.query.limit as string) : undefined,
        search: req.query.search as string,
        assetId: req.query.assetId ? parseInt(req.query.assetId as string) : undefined,
        incidentTypeId: req.query.incidentTypeId
          ? parseInt(req.query.incidentTypeId as string)
          : undefined,
        statusId: req.query.statusId ? parseInt(req.query.statusId as string) : undefined,
        severity: req.query.severity as any,
        reportedByUserId: req.query.reportedByUserId
          ? parseInt(req.query.reportedByUserId as string)
          : undefined,
        assignedToUserId: req.query.assignedToUserId
          ? parseInt(req.query.assignedToUserId as string)
          : undefined,
        startDate: req.query.startDate as string,
        endDate: req.query.endDate as string,
      };

      const result = await incidentsService.findAll(query);

      res.json({
        success: true,
        data: result.data,
        pagination: result.pagination,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message || 'Olay kayıtları getirilirken hata oluştu',
      });
    }
  }

  async findOne(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const incident = await incidentsService.findOne(id);

      res.json({
        success: true,
        data: incident,
      });
    } catch (error: any) {
      res.status(404).json({
        success: false,
        message: error.message || 'Olay kaydı bulunamadı',
      });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const data: UpdateIncidentDto = req.body;

      const incident = await incidentsService.update(id, data);

      res.json({
        success: true,
        message: 'Olay kaydı başarıyla güncellendi',
        data: incident,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message || 'Olay kaydı güncellenirken hata oluştu',
      });
    }
  }

  async remove(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      await incidentsService.remove(id);

      res.json({
        success: true,
        message: 'Olay kaydı başarıyla silindi',
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message || 'Olay kaydı silinirken hata oluştu',
      });
    }
  }

  async getStatistics(req: Request, res: Response) {
    try {
      const statistics = await incidentsService.getStatistics();

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

export const incidentsController = new IncidentsController();
