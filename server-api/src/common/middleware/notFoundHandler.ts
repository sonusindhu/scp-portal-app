import type { Request, Response, NextFunction } from 'express';

import { fail } from '../utils/response.js';

export function notFoundHandler(_req: Request, res: Response, _next: NextFunction) {
  return fail(res, 404, 'Route not found');
}
