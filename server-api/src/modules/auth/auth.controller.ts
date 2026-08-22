import type { Request, Response, NextFunction } from 'express';

import { AuthService } from './auth.service.js';
import { loginSchema, signupSchema } from './auth.validator.js';
import { ok, created, fail } from '../../common/utils/response.js';
import { AppError } from '../../common/errors/AppError.js';

const authService = new AuthService();

export class AuthController {
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const parsed = loginSchema.parse(req.body);
      const user = await authService.login(parsed.email, parsed.password);

      return ok(res, 'User logged in successfully.', {
        token: authService.generateToken(user.id),
        fullName: user.fullName,
      });
    } catch (error) {
      if (error instanceof AppError) {
        return fail(res, error.statusCode, error.message);
      }
      return next(error);
    }
  }

  async signup(req: Request, res: Response, next: NextFunction) {
    try {
      const parsed = signupSchema.parse(req.body);
      const user = await authService.signup(parsed);

      return created(res, 'User has been successfully created.', {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
      });
    } catch (error) {
      if (error instanceof AppError) {
        return fail(res, error.statusCode, error.message);
      }
      return next(error);
    }
  }
}
