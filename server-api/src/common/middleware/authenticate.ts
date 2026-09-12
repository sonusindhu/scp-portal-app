import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import { env } from '../../config/env.js';
import { fail } from '../utils/response.js';

export function authenticate(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return fail(res, 401, 'Authentication required');
  }

  const token = authHeader.replace('Bearer ', '');

  try {
    const decoded = jwt.verify(token, env.JWT_SECRET);
    if (typeof decoded !== 'object' || decoded === null || typeof decoded.id !== 'number') {
      return fail(res, 401, 'Invalid or expired token');
    }

    req.user = { id: decoded.id };
    return next();
  } catch (error) {
    return fail(res, 401, 'Invalid or expired token');
  }
}
