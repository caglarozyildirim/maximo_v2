import { Router } from 'express';
import jobRequestsController from './job-requests.controller';
import { authMiddleware } from '../../common/middleware/auth.middleware';

const router = Router();

// All routes require authentication
router.use(authMiddleware);

// Statistics endpoint (must be before :id route)
router.get('/statistics', jobRequestsController.getStatistics.bind(jobRequestsController));

// CRUD routes
router.get('/', jobRequestsController.findAll.bind(jobRequestsController));
router.get('/:id', jobRequestsController.findOne.bind(jobRequestsController));
router.post('/', jobRequestsController.create.bind(jobRequestsController));
router.patch('/:id', jobRequestsController.update.bind(jobRequestsController));
router.delete('/:id', jobRequestsController.remove.bind(jobRequestsController));

// Workflow routes
router.post('/:id/submit', jobRequestsController.submit.bind(jobRequestsController));
router.post('/:id/approve', jobRequestsController.approve.bind(jobRequestsController));
router.post('/:id/reject', jobRequestsController.reject.bind(jobRequestsController));
router.post('/:id/cancel', jobRequestsController.cancel.bind(jobRequestsController));

export default router;