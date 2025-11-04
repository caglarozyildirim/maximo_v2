import { Router } from 'express';
import assetsController from './assets.controller';
import { authenticate } from '../../common/middleware/auth.middleware';

const router = Router();

// All routes require authentication
router.use(authenticate);

// Statistics
router.get('/statistics', assetsController.getStatistics.bind(assetsController));

// CRUD routes
router.post('/', assetsController.create.bind(assetsController));
router.get('/', assetsController.findAll.bind(assetsController));
router.get('/:id', assetsController.findOne.bind(assetsController));
router.patch('/:id', assetsController.update.bind(assetsController));
router.delete('/:id', assetsController.remove.bind(assetsController));

export default router;
