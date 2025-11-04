import { Router } from 'express';
import { JobRequestController } from './job-request.controller';
import { authenticate, authorize } from '../../common/middleware/auth.middleware';

const router = Router();
const controller = new JobRequestController();

// All routes require authentication
router.use(authenticate);

// Statistics
router.get('/statistics', controller.getStatistics);

// CRUD operations
router.post('/', authorize('job_request.create'), controller.create);
router.get('/', authorize('job_request.view'), controller.findAll);
router.get('/:id', authorize('job_request.view'), controller.findById);
router.put('/:id', authorize('job_request.edit'), controller.update);
router.delete('/:id', authorize('job_request.delete'), controller.delete);

// Workflow actions
router.post('/:id/assign', authorize('job_request.assign'), controller.assign);
router.post('/:id/submit', authorize('job_request.submit'), controller.submitForApproval);
router.post('/:id/approve', authorize('job_request.approve'), controller.approve);
router.post('/:id/reject', authorize('job_request.approve'), controller.reject);
router.post('/:id/cancel', authorize('job_request.cancel'), controller.cancel);

// Comments
router.post('/:id/comments', authorize('job_request.comment'), controller.addComment);

export default router;
