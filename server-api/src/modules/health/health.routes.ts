import { Router } from 'express';

import { ok } from '../../common/utils/response.js';

export const healthRouter = Router();

healthRouter.get('/health', (_req, res) => {
  return ok(res, 'server-api is healthy', {
    timestamp: new Date().toISOString(),
  });
});
