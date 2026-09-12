import type { Request, Response, NextFunction } from 'express';
import type { z } from 'zod';

import { fail } from '../utils/response.js';

export function validate<T>(schema: z.ZodType<T>) {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      return fail(res, 400, result.error.issues[0]?.message || 'Validation failed', {
        issues: result.error.issues,
      });
    }

    req.body = result.data;
    return next();
  };
}
