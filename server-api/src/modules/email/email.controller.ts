import type { NextFunction, Request, Response } from 'express';
import { z } from 'zod';

import { AppError } from '../../common/errors/AppError.js';
import { fail, ok, created } from '../../common/utils/response.js';
import { EmailService } from './email.service.js';
import { createEmailSchema, emailListQuerySchema } from './email.validator.js';

const emailService = new EmailService();

export class EmailController {
  async list(req: Request, res: Response, next: NextFunction) {
    try {
      const parsed = emailListQuerySchema.parse(req.body ?? {});
      const { items, total } = await emailService.list(parsed);
      return ok(res, 'Email list fetched successfully.', items, {
        total,
        skip: parsed.skip ?? 0,
        take: parsed.take ?? items.length,
      });
    } catch (error) {
      if (error instanceof AppError) return fail(res, error.statusCode, error.message);
      return next(error);
    }
  }

  async getAll(_req: Request, res: Response, next: NextFunction) {
    try {
      const emails = await emailService.getAll();
      return ok(res, 'Email list fetched successfully.', emails);
    } catch (error) {
      if (error instanceof AppError) return fail(res, error.statusCode, error.message);
      return next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const payload = createEmailSchema.parse(req.body);
      const email = await emailService.create(payload);
      return created(res, 'Email has been successfully created.', email);
    } catch (error) {
      if (error instanceof AppError) return fail(res, error.statusCode, error.message);
      return next(error);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const email = await emailService.getById(id);
      if (!email) {
        return fail(res, 404, 'Email not found');
      }
      return ok(res, 'Email has been fetched successfully.', email);
    } catch (error) {
      if (error instanceof AppError) return fail(res, error.statusCode, error.message);
      return next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const payload = createEmailSchema.parse(req.body);
      const email = await emailService.update(id, payload);
      return ok(res, 'Email has been updated successfully.', email);
    } catch (error) {
      if (error instanceof AppError) return fail(res, error.statusCode, error.message);
      return next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      await emailService.delete(id);
      return ok(res, 'Email has been deleted successfully.');
    } catch (error) {
      if (error instanceof AppError) return fail(res, error.statusCode, error.message);
      return next(error);
    }
  }

  async deleteRange(req: Request, res: Response, next: NextFunction) {
    try {
      const ids = z.array(z.number().int().positive()).parse(req.body.ids ?? []);
      if (!ids.length) {
        return fail(res, 400, 'At least one email id is required');
      }

      await emailService.deleteRange(ids);
      return ok(res, 'Emails have been deleted successfully.');
    } catch (error) {
      if (error instanceof AppError) return fail(res, error.statusCode, error.message);
      return next(error);
    }
  }
}
