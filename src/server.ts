import 'reflect-metadata';
import cors from 'cors';
import express from 'express';
import { useExpressServer } from 'routing-controllers';
import * as swaggerUi from 'swagger-ui-express';
import config from './core/config/config';
import { initRateLimiter } from './core/config/rateLimiter';
import { getSwaggerSpec } from './core/config/swagger';
import { zodValidationErrorMiddleware } from './core/middleware/zodValidationError';
import dbService from './core/services/dbService';
import logger from './core/utils/logger';
import { HealthController } from './modules/health/controllers/healthController';

const startServer = async () => {
  try {
    logger.info('Starting application...');

    // Database connection
    const dbConnection = await dbService.connect();
    logger.info('✨ DATABASE_CONNECTION_SUCCESS', {
      meta: {
        CONNECTION_NAME: dbConnection.name,
      },
    });

    // Initialize rate limiter
    initRateLimiter(dbConnection);
    logger.info('✨ RATE_LIMITER_INITIALIZED');

    // Create Express app
    const app = express();

    // Middleware
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    // Setup routing-controllers
    useExpressServer(app, {
      routePrefix: '/api',
      controllers: [HealthController],
      defaultErrorHandler: false,
      validation: true,
      middlewares: [zodValidationErrorMiddleware],
    });
    logger.info('✨ CONTROLLERS_INITIALIZED');

    // Swagger documentation
    const swaggerSpec = getSwaggerSpec();
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    logger.info('✨ SWAGGER_INITIALIZED');

    // Start server
    const server = app.listen(config.PORT, () => {
      logger.info('✨ APPLICATION_STARTED', {
        meta: {
          PORT: config.PORT,
          ENV: config.ENV,
        },
      });
      logger.info(`API Documentation available at http://localhost:${config.PORT}/api-docs`);
    });

    // Handle shutdown
    const shutdown = () => {
      logger.info('🛑 SHUTDOWN_INITIATED');
      server.close(async () => {
        try {
          await dbService.disconnect();
          logger.info('✨ DATABASE_DISCONNECTED');
          logger.info('✨ SERVER_STOPPED');
          process.exit(0);
        } catch (error) {
          logger.error('❌ ERROR_DURING_SHUTDOWN', { meta: error });
          process.exit(1);
        }
      });
    };

    process.on('SIGTERM', shutdown);
    process.on('SIGINT', shutdown);
  } catch (error) {
    logger.error('❌ APPLICATION_ERROR', { meta: error });
    process.exit(1);
  }
};

// Start the server
startServer();
