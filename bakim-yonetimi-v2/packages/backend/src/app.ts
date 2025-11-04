import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import 'express-async-errors';
import { config } from './config';
import { errorHandler } from './common/middleware/error.middleware';

// Routes
import authRoutes from './modules/auth/auth.routes';
import { jobRequestsRoutes } from './modules/job-requests';
import assetsRoutes from './modules/assets/assets.routes';
import assignmentsRoutes from './modules/assignments/assignments.routes';
import maintenanceRoutes from './modules/maintenance/maintenance.routes';
import incidentsRoutes from './modules/incidents/incidents.routes';
import retirementsRoutes from './modules/retirements/retirements.routes';
import costCentersRoutes from './modules/cost-centers/cost-centers.routes';

const app: Application = express();

// Middlewares
app.use(helmet());
app.use(cors({ origin: config.corsOrigin }));
app.use(morgan(config.nodeEnv === 'development' ? 'dev' : 'combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// API Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/job-requests', jobRequestsRoutes);
app.use('/api/v1/assets', assetsRoutes);
app.use('/api/v1/assignments', assignmentsRoutes);
app.use('/api/v1/maintenance', maintenanceRoutes);
app.use('/api/v1/incidents', incidentsRoutes);
app.use('/api/v1/retirements', retirementsRoutes);
app.use('/api/v1/cost-centers', costCentersRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

// Error handler (must be last)
app.use(errorHandler);

export default app;
