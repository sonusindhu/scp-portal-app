import type { Response } from 'express';

import type { ApiErrorResponse, ApiSuccessResponse } from '../types/api.js';

export type ApiResponse<T = unknown> = ApiSuccessResponse<T> | ApiErrorResponse<T>;

export function ok<T>(res: Response, message: string, data?: T, meta?: Record<string, unknown>) {
  return res.status(200).json({
    status: true,
    message,
    ...(data !== undefined ? { data } : {}),
    ...(meta ? { meta } : {}),
  } satisfies ApiSuccessResponse<T>);
}

export function created<T>(res: Response, message: string, data?: T) {
  return res.status(201).json({
    status: true,
    message,
    ...(data !== undefined ? { data } : {}),
  } satisfies ApiSuccessResponse<T>);
}

export function fail<T>(res: Response, statusCode: number, message: string, data?: T) {
  return res.status(statusCode).json({
    status: false,
    message,
    ...(data !== undefined ? { data } : {}),
  } satisfies ApiErrorResponse<T>);
}
