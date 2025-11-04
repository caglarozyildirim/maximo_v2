import { Request, Response, NextFunction } from 'express';
import jobRequestsService from './job-requests.service';
import { CreateJobRequestDto, UpdateJobRequestDto, JobRequestQueryDto, validateCreateJobRequest } from './dto';

export class JobRequestsController {
  /**
   * GET /api/job-requests
   */
  async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const query: JobRequestQueryDto = {
        page: req.query.page ? parseInt(req.query.page as string) : 1,
        limit: req.query.limit ? parseInt(req.query.limit as string) : 10,
        search: req.query.search as string,
        status: req.query.status as any,
        priority: req.query.priority as any,
        departmentId: req.query.departmentId ? parseInt(req.query.departmentId as string) : undefined,
        locationId: req.query.locationId ? parseInt(req.query.locationId as string) : undefined,
        assignedToId: req.query.assignedToId ? parseInt(req.query.assignedToId as string) : undefined,
        requestedById: req.query.requestedById ? parseInt(req.query.requestedById as string) : undefined,
        startDate: req.query.startDate as string,
        endDate: req.query.endDate as string,
        sortBy: (req.query.sortBy as string) || 'createdAt',
        sortOrder: (req.query.sortOrder as 'asc' | 'desc') || 'desc',
      };

      const result = await jobRequestsService.findAll(query);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /api/job-requests/statistics
   */
  async getStatistics(req: Request, res: Response, next: NextFunction) {
    try {
      const departmentId = req.query.departmentId
        ? parseInt(req.query.departmentId as string)
        : undefined;

      const statistics = await jobRequestsService.getStatistics(departmentId);
      res.json(statistics);
    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /api/job-requests/:id
   */
  async findOne(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id);
      const jobRequest = await jobRequestsService.findOne(id);
      res.json(jobRequest);
    } catch (error) {
      next(error);
    }
  }

  /**
   * POST /api/job-requests
   */
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      // Basit doğrulama
      const validation = validateCreateJobRequest(req.body);
      if (!validation.isValid) {
        return res.status(400).json({
          message: 'Validation failed',
          errors: validation.errors,
        });
      }

      const userId = (req as any).user.userId;
      const jobRequest = await jobRequestsService.create(req.body as CreateJobRequestDto, userId);

      res.status(201).json(jobRequest);
    } catch (error) {
      next(error);
    }
  }

  /**
   * PATCH /api/job-requests/:id
   */
  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id);
      const userId = (req as any).user.userId;
      const jobRequest = await jobRequestsService.update(id, req.body as UpdateJobRequestDto, userId);

      res.json(jobRequest);
    } catch (error) {
      next(error);
    }
  }

  /**
   * DELETE /api/job-requests/:id
   */
  async remove(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id);
      const result = await jobRequestsService.remove(id);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  /**
   * POST /api/job-requests/:id/submit
   * Submit job request for approval
   */
  async submit(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id);
      const userId = (req as any).user.userId;
      const jobRequest = await jobRequestsService.submit(id, userId);
      res.json(jobRequest);
    } catch (error) {
      next(error);
    }
  }

  /**
   * POST /api/job-requests/:id/approve
   * Approve job request
   */
  async approve(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id);
      const userId = (req as any).user.userId;
      const { comment } = req.body;
      const jobRequest = await jobRequestsService.approve(id, userId, comment);
      res.json(jobRequest);
    } catch (error) {
      next(error);
    }
  }

  /**
   * POST /api/job-requests/:id/reject
   * Reject job request
   */
  async reject(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id);
      const userId = (req as any).user.userId;
      const { comment } = req.body;

      if (!comment || comment.trim() === '') {
        return res.status(400).json({
          message: 'Rejection reason is required',
        });
      }

      const jobRequest = await jobRequestsService.reject(id, userId, comment);
      res.json(jobRequest);
    } catch (error) {
      next(error);
    }
  }

  /**
   * POST /api/job-requests/:id/cancel
   * Cancel job request
   */
  async cancel(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id);
      const userId = (req as any).user.userId;
      const { reason } = req.body;
      const jobRequest = await jobRequestsService.cancel(id, userId, reason);
      res.json(jobRequest);
    } catch (error) {
      next(error);
    }
  }
}

export default new JobRequestsController();