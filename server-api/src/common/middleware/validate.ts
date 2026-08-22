import type { Request, Response, NextFunction } from 'express';
import type { z } from 'zod';

export function validate<T>(schema: z.ZodType<T>) {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        status: false,
        message: result.error.issues[0]?.message || 'Validation failed',
      });
    }

    req.body = result.data;
    return next();
  };
}
