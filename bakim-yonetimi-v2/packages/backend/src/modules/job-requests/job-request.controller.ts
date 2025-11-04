import { Request, Response, NextFunction } from 'express';
import { JobRequestService } from './job-request.service';
import { successResponse, paginatedResponse } from '../../common/utils/response.util';
import { AuthRequest } from '../../common/middleware/auth.middleware';

const jobRequestService = new JobRequestService();

export class JobRequestController {
  async create(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const jobRequest = await jobRequestService.create({
        ...req.body,
        requestedById: req.user!.userId,
      });
      successResponse(res, jobRequest, 'Job request created successfully', 201);
    } catch (error) {
      next(error);
    }
  }

  async findAll(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { page, limit, status, priority, search, department } = req.query;
      const result = await jobRequestService.findAll({
        page: page ? parseInt(page as string) : undefined,
        limit: limit ? parseInt(limit as string) : undefined,
        status: status as any,
        priority: priority as any,
        search: search as string,
        department: department as string,
      });
      paginatedResponse(
        res,
        result.data,
        result.total,
        result.page,
        result.limit,
        'Job requests retrieved successfully'
      );
    } catch (error) {
      next(error);
    }
  }

  async findById(req: Request, res: Response, next: NextFunction) {
    try {
      const jobRequest = await jobRequestService.findById(req.params.id);
      successResponse(res, jobRequest, 'Job request retrieved successfully');
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const jobRequest = await jobRequestService.update(req.params.id, req.body);
      successResponse(res, jobRequest, 'Job request updated successfully');
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      await jobRequestService.delete(req.params.id);
      successResponse(res, null, 'Job request deleted successfully');
    } catch (error) {
      next(error);
    }
  }

  async assign(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { assignedToId } = req.body;
      const jobRequest = await jobRequestService.assign(
        req.params.id,
        assignedToId,
        req.user!.userId
      );
      successResponse(res, jobRequest, 'Job request assigned successfully');
    } catch (error) {
      next(error);
    }
  }

  async submitForApproval(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const jobRequest = await jobRequestService.submitForApproval(
        req.params.id,
        req.user!.userId
      );
      successResponse(res, jobRequest, 'Job request submitted for approval');
    } catch (error) {
      next(error);
    }
  }

  async approve(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { approvalId, comment } = req.body;
      const jobRequest = await jobRequestService.approve(
        req.params.id,
        approvalId,
        req.user!.userId,
        comment
      );
      successResponse(res, jobRequest, 'Job request approved successfully');
    } catch (error) {
      next(error);
    }
  }

  async reject(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { approvalId, comment } = req.body;
      const jobRequest = await jobRequestService.reject(
        req.params.id,
        approvalId,
        req.user!.userId,
        comment
      );
      successResponse(res, jobRequest, 'Job request rejected');
    } catch (error) {
      next(error);
    }
  }

  async cancel(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { reason } = req.body;
      const jobRequest = await jobRequestService.cancel(
        req.params.id,
        req.user!.userId,
        reason
      );
      successResponse(res, jobRequest, 'Job request cancelled');
    } catch (error) {
      next(error);
    }
  }

  async addComment(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { content } = req.body;
      const comment = await jobRequestService.addComment(
        req.params.id,
        content,
        req.user!.userId,
        `${req.user!.email}`
      );
      successResponse(res, comment, 'Comment added successfully');
    } catch (error) {
      next(error);
    }
  }

  async getStatistics(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const stats = await jobRequestService.getStatistics(
        req.user!.userId,
        req.user!.role
      );
      successResponse(res, stats, 'Statistics retrieved successfully');
    } catch (error) {
      next(error);
    }
  }
}
