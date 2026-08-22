import { Router } from 'express';

export const healthRouter = Router();

healthRouter.get('/health', (_req, res) => {
  res.status(200).json({
    status: true,
    message: 'server-api is healthy',
    timestamp: new Date().toISOString(),
  });
});
