import { Router } from 'express';
import { authMiddleware } from '../../common/middleware/auth.middleware';
import { assignmentsController } from './assignments.controller';

const router = Router();

router.use(authMiddleware);

router.get('/statistics', assignmentsController.getStatistics.bind(assignmentsController));
router.post('/', assignmentsController.create.bind(assignmentsController));
router.get('/', assignmentsController.findAll.bind(assignmentsController));
router.get('/:id', assignmentsController.findOne.bind(assignmentsController));
router.patch('/:id', assignmentsController.update.bind(assignmentsController));
router.post('/:id/return', assignmentsController.returnAssignment.bind(assignmentsController));
router.delete('/:id', assignmentsController.remove.bind(assignmentsController));

export default router;
