import type { Request, Response, NextFunction } from 'express';

import { AppError } from '../../common/errors/AppError.js';
import { fail, ok, created } from '../../common/utils/response.js';
import { ContactService } from './contact.service.js';
import { createContactSchema, contactListQuerySchema } from './contact.validator.js';

const contactService = new ContactService();

export class ContactController {
  async list(req: Request, res: Response, next: NextFunction) {
    try {
      const parsed = contactListQuerySchema.parse(req.body ?? {});
      const { items, total } = await contactService.list(parsed);
      return ok(res, 'Contact list fetched successfully.', items, {
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
      const contacts = await contactService.getAll();
      return ok(res, 'Contact list fetched successfully.', contacts);
    } catch (error) {
      if (error instanceof AppError) return fail(res, error.statusCode, error.message);
      return next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const payload = createContactSchema.parse(req.body);
      const contact = await contactService.create(payload);
      return created(res, 'Contact has been successfully created.', contact);
    } catch (error) {
      if (error instanceof AppError) return fail(res, error.statusCode, error.message);
      return next(error);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const contact = await contactService.getById(id);
      if (!contact) {
        return fail(res, 404, 'Contact not found');
      }
      return ok(res, 'Contact has been fetched successfully.', contact);
    } catch (error) {
      if (error instanceof AppError) return fail(res, error.statusCode, error.message);
      return next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const payload = createContactSchema.parse(req.body);
      const contact = await contactService.update(id, payload);
      return ok(res, 'Contact has been updated successfully.', contact);
    } catch (error) {
      if (error instanceof AppError) return fail(res, error.statusCode, error.message);
      return next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      await contactService.delete(id);
      return ok(res, 'Contact has been deleted successfully.');
    } catch (error) {
      if (error instanceof AppError) return fail(res, error.statusCode, error.message);
      return next(error);
    }
  }
}
