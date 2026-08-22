import type { Response } from 'express';

export function ok(res: Response, message: string, result?: unknown, meta?: Record<string, unknown>) {
  return res.status(200).json({
    status: true,
    message,
    result,
    ...(meta ? { meta } : {}),
  });
}

export function created(res: Response, message: string, result?: unknown) {
  return res.status(201).json({
    status: true,
    message,
    result,
  });
}

export function fail(res: Response, statusCode: number, message: string, result?: unknown) {
  return res.status(statusCode).json({
    status: false,
    message,
    ...(result !== undefined ? { result } : {}),
  });
}
