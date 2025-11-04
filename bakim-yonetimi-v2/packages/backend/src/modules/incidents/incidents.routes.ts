import { Router } from 'express';
import { authMiddleware } from '../../common/middleware/auth.middleware';
import { incidentsController } from './incidents.controller';

const router = Router();

router.use(authMiddleware);

router.get('/statistics', incidentsController.getStatistics.bind(incidentsController));
router.post('/', incidentsController.create.bind(incidentsController));
router.get('/', incidentsController.findAll.bind(incidentsController));
router.get('/:id', incidentsController.findOne.bind(incidentsController));
router.patch('/:id', incidentsController.update.bind(incidentsController));
router.delete('/:id', incidentsController.remove.bind(incidentsController));

export default router;
