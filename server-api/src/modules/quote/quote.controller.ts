import type { NextFunction, Request, Response } from 'express';
import { z } from 'zod';

import { AppError } from '../../common/errors/AppError.js';
import { fail, ok, created } from '../../common/utils/response.js';
import { QuoteService } from './quote.service.js';
import { createQuoteSchema, quoteListQuerySchema } from './quote.validator.js';

const quoteService = new QuoteService();

export class QuoteController {
  async list(req: Request, res: Response, next: NextFunction) {
    try {
      const parsed = quoteListQuerySchema.parse(req.body ?? {});
      const { items, total } = await quoteService.list(parsed);
      return ok(res, 'Quote list fetched successfully.', items, {
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
      const quotes = await quoteService.getAll();
      return ok(res, 'Quote list fetched successfully.', quotes);
    } catch (error) {
      if (error instanceof AppError) return fail(res, error.statusCode, error.message);
      return next(error);
    }
  }

  async getCompanies(_req: Request, res: Response, next: NextFunction) {
    try {
      const companies = await quoteService.getCompanies();
      return ok(res, 'Companies fetched successfully.', companies);
    } catch (error) {
      if (error instanceof AppError) return fail(res, error.statusCode, error.message);
      return next(error);
    }
  }

  async getContactsByCompany(req: Request, res: Response, next: NextFunction) {
    try {
      const companyId = Number(req.params.id);
      const contacts = await quoteService.getContactsByCompany(companyId);
      return ok(res, 'Contacts fetched successfully.', contacts);
    } catch (error) {
      if (error instanceof AppError) return fail(res, error.statusCode, error.message);
      return next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const payload = createQuoteSchema.parse(req.body);
      const quote = await quoteService.create(payload);
      return created(res, 'Quote has been successfully created.', quote);
    } catch (error) {
      if (error instanceof AppError) return fail(res, error.statusCode, error.message);
      return next(error);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const quote = await quoteService.getById(id);
      if (!quote) {
        return fail(res, 404, 'Quote not found');
      }
      return ok(res, 'Quote has been fetched successfully.', quote);
    } catch (error) {
      if (error instanceof AppError) return fail(res, error.statusCode, error.message);
      return next(error);
    }
  }

  async getQuoteDetails(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const quote = await quoteService.getQuoteDetails(id);
      if (!quote) {
        return fail(res, 404, 'Quote not found');
      }
      return ok(res, 'Quote has been fetched successfully.', quote);
    } catch (error) {
      if (error instanceof AppError) return fail(res, error.statusCode, error.message);
      return next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const payload = createQuoteSchema.parse(req.body);
      const quote = await quoteService.update(id, payload);
      return ok(res, 'Quote has been updated successfully.', quote);
    } catch (error) {
      if (error instanceof AppError) return fail(res, error.statusCode, error.message);
      return next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      await quoteService.delete(id);
      return ok(res, 'Quote has been deleted successfully.');
    } catch (error) {
      if (error instanceof AppError) return fail(res, error.statusCode, error.message);
      return next(error);
    }
  }

  async deleteRange(req: Request, res: Response, next: NextFunction) {
    try {
      const ids = z.array(z.number().int().positive()).parse(req.body.ids ?? []);
      if (!ids.length) {
        return fail(res, 400, 'At least one quote id is required');
      }

      await quoteService.deleteRange(ids);
      return ok(res, 'Quotes have been deleted successfully.');
    } catch (error) {
      if (error instanceof AppError) return fail(res, error.statusCode, error.message);
      return next(error);
    }
  }

  async createNote(req: Request, res: Response, next: NextFunction) {
    try {
      const note = await quoteService.createNote(req.body, req.user?.id);
      return created(res, 'Note has been successfully created.', note);
    } catch (error) {
      if (error instanceof AppError) return fail(res, error.statusCode, error.message);
      return next(error);
    }
  }

  async getNotes(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const notes = await quoteService.getNotes(id);
      return ok(res, 'Notes has been fetched successfully.', notes);
    } catch (error) {
      if (error instanceof AppError) return fail(res, error.statusCode, error.message);
      return next(error);
    }
  }

  async createTask(req: Request, res: Response, next: NextFunction) {
    try {
      const task = await quoteService.createTask(req.body, req.user?.id);
      return created(res, 'Task has been successfully created.', task);
    } catch (error) {
      if (error instanceof AppError) return fail(res, error.statusCode, error.message);
      return next(error);
    }
  }

  async getTasks(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const tasks = await quoteService.getTasks(id);
      return ok(res, 'Tasks has been fetched successfully.', tasks);
    } catch (error) {
      if (error instanceof AppError) return fail(res, error.statusCode, error.message);
      return next(error);
    }
  }
}
