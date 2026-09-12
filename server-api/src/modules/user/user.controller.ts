import type { NextFunction, Request, Response } from 'express';

import { AppError } from '../../common/errors/AppError.js';
import { fail, ok } from '../../common/utils/response.js';
import { UserService } from './user.service.js';
import { updatePasswordSchema, updateProfileSchema } from './user.validator.js';

const userService = new UserService();

export class UserController {
  async getDetail(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.id;
      if (!userId) {
        return fail(res, 401, 'Authentication required');
      }

      const user = await userService.getCurrentUser(userId);
      return ok(res, 'User detail fetched successfully.', user);
    } catch (error) {
      if (error instanceof AppError) return fail(res, error.statusCode, error.message);
      return next(error);
    }
  }

  async updateProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.id;
      if (!userId) {
        return fail(res, 401, 'Authentication required');
      }

      const payload = updateProfileSchema.parse(req.body);
      const user = await userService.updateProfile(userId, payload);
      return ok(res, 'User profile updated successfully.', user);
    } catch (error) {
      if (error instanceof AppError) return fail(res, error.statusCode, error.message);
      return next(error);
    }
  }

  async updatePassword(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.id;
      if (!userId) {
        return fail(res, 401, 'Authentication required');
      }

      const payload = updatePasswordSchema.parse(req.body);
      await userService.updatePassword(userId, payload);
      return ok(res, 'Password has been changed successfully.');
    } catch (error) {
      if (error instanceof AppError) return fail(res, error.statusCode, error.message);
      return next(error);
    }
  }

  async uploadProfileImage(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.id;
      if (!userId) {
        return fail(res, 401, 'Authentication required');
      }

      const { preview } = req.body ?? {};
      if (!preview || typeof preview !== 'string') {
        return fail(res, 400, 'Profile image preview is required');
      }

      const user = await userService.uploadProfileImage(userId, preview);
      return ok(res, 'User profile image uploaded successfully.', user);
    } catch (error) {
      if (error instanceof AppError) return fail(res, error.statusCode, error.message);
      return next(error);
    }
  }
}
