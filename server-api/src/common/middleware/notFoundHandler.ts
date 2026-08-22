import type { Request, Response, NextFunction } from 'express';

export function notFoundHandler(_req: Request, res: Response, _next: NextFunction) {
  res.status(404).json({
    status: false,
    message: 'Route not found',
  });
}
