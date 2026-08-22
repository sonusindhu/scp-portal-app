import express, { type Express } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';

import { env } from './config/env.js';
import { logger } from './config/logger.js';
import { swaggerSpec } from './config/swagger.js';
import { healthRouter } from './modules/health/health.routes.js';
import { authRouter } from './modules/auth/auth.routes.js';
import { companyRouter } from './modules/company/company.routes.js';
import { notFoundHandler } from './common/middleware/notFoundHandler.js';
import { errorHandler } from './common/middleware/errorHandler.js';
import { ok } from './common/utils/response.js';

export function createApp(): Express {
  const app = express();

  app.use(
    cors({
      origin: env.CORS_ORIGIN,
      credentials: true,
    })
  );
  app.use(helmet());
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true }));
  app.use(morgan(env.NODE_ENV === 'production' ? 'combined' : 'dev'));

  app.get('/api/health', (_req, res) => {
    return ok(res, 'server-api is healthy', {
      service: 'server-api',
    });
  });

  app.use('/api', healthRouter);
  app.use('/api/auth', authRouter);
  app.use('/api/company', companyRouter);
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.get('/api-docs.json', (_req, res) => {
    return res.json(swaggerSpec);
  });

  app.use(notFoundHandler);
  app.use(errorHandler);

  logger.info('Express app initialized');

  return app;
}
