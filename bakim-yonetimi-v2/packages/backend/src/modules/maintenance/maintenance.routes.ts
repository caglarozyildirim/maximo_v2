import { Router } from 'express';
import { authMiddleware } from '../../common/middleware/auth.middleware';
import { maintenanceController } from './maintenance.controller';

const router = Router();

router.use(authMiddleware);

router.get('/statistics', maintenanceController.getStatistics.bind(maintenanceController));
router.post('/', maintenanceController.create.bind(maintenanceController));
router.get('/', maintenanceController.findAll.bind(maintenanceController));
router.get('/:id', maintenanceController.findOne.bind(maintenanceController));
router.patch('/:id', maintenanceController.update.bind(maintenanceController));
router.delete('/:id', maintenanceController.remove.bind(maintenanceController));

export default router;
