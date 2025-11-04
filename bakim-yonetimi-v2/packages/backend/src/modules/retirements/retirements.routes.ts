import { Router } from 'express';
import { authMiddleware } from '../../common/middleware/auth.middleware';
import { retirementsController } from './retirements.controller';

const router = Router();
router.use(authMiddleware);

router.get('/statistics', retirementsController.getStatistics.bind(retirementsController));
router.post('/', retirementsController.create.bind(retirementsController));
router.get('/', retirementsController.findAll.bind(retirementsController));
router.get('/:id', retirementsController.findOne.bind(retirementsController));
router.patch('/:id', retirementsController.update.bind(retirementsController));
router.delete('/:id', retirementsController.remove.bind(retirementsController));

export default router;
