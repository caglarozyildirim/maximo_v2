import { Request, Response } from 'express';
import { assignmentsService } from './assignments.service';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { UpdateAssignmentDto } from './dto/update-assignment.dto';
import { AssignmentQueryDto } from './dto/assignment-query.dto';

export class AssignmentsController {
  async create(req: Request, res: Response) {
    try {
      const data: CreateAssignmentDto = req.body;
      const createdById = req.user!.id;

      const assignment = await assignmentsService.create(data, createdById);

      res.status(201).json({
        success: true,
        message: 'Zimmet başarıyla oluşturuldu',
        data: assignment,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message || 'Zimmet oluşturulurken hata oluştu',
      });
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      const query: AssignmentQueryDto = {
        page: req.query.page ? parseInt(req.query.page as string) : undefined,
        limit: req.query.limit ? parseInt(req.query.limit as string) : undefined,
        search: req.query.search as string,
        assetId: req.query.assetId ? parseInt(req.query.assetId as string) : undefined,
        assignedToUserId: req.query.assignedToUserId
          ? parseInt(req.query.assignedToUserId as string)
          : undefined,
        isActive: req.query.isActive
          ? req.query.isActive === 'true'
          : undefined,
        assignmentTypeId: req.query.assignmentTypeId
          ? parseInt(req.query.assignmentTypeId as string)
          : undefined,
        departmentId: req.query.departmentId
          ? parseInt(req.query.departmentId as string)
          : undefined,
        locationId: req.query.locationId
          ? parseInt(req.query.locationId as string)
          : undefined,
      };

      const result = await assignmentsService.findAll(query);

      res.json({
        success: true,
        data: result.data,
        pagination: result.pagination,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message || 'Zimmetler getirilirken hata oluştu',
      });
    }
  }

  async findOne(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const assignment = await assignmentsService.findOne(id);

      res.json({
        success: true,
        data: assignment,
      });
    } catch (error: any) {
      res.status(404).json({
        success: false,
        message: error.message || 'Zimmet bulunamadı',
      });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const data: UpdateAssignmentDto = req.body;

      const assignment = await assignmentsService.update(id, data);

      res.json({
        success: true,
        message: 'Zimmet başarıyla güncellendi',
        data: assignment,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message || 'Zimmet güncellenirken hata oluştu',
      });
    }
  }

  async returnAssignment(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const { returnNotes } = req.body;
      const returnedById = req.user!.id;

      const assignment = await assignmentsService.returnAssignment(
        id,
        returnedById,
        returnNotes
      );

      res.json({
        success: true,
        message: 'Zimmet başarıyla iade edildi',
        data: assignment,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message || 'Zimmet iade edilirken hata oluştu',
      });
    }
  }

  async remove(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      await assignmentsService.remove(id);

      res.json({
        success: true,
        message: 'Zimmet başarıyla silindi',
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message || 'Zimmet silinirken hata oluştu',
      });
    }
  }

  async getStatistics(req: Request, res: Response) {
    try {
      const statistics = await assignmentsService.getStatistics();

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

export const assignmentsController = new AssignmentsController();
