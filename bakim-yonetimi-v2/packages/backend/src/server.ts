import app from './app';
import { config } from './config';
import prisma from './database/prisma';
import { WorkflowEngine } from './modules/workflow/workflow.engine';

const workflowEngine = new WorkflowEngine();

async function startServer() {
  try {
    // Test database connection
    await prisma.$connect();
    console.log('✅ Database connected successfully');

    // Initialize workflows (disabled for now - will be implemented later)
    // await workflowEngine.initializeWorkflows();
    // console.log('✅ Workflows initialized');

    // Start server
    app.listen(config.port, () => {
      console.log(`🚀 Server running on port ${config.port}`);
      console.log(`📝 Environment: ${config.nodeEnv}`);
      console.log(`🌐 CORS origin: ${config.corsOrigin}`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
}

// Handle graceful shutdown
process.on('SIGTERM', async () => {
  console.log('SIGTERM received, closing server...');
  await prisma.$disconnect();
  process.exit(0);
});

process.on('SIGINT', async () => {
  console.log('SIGINT received, closing server...');
  await prisma.$disconnect();
  process.exit(0);
});

startServer();
