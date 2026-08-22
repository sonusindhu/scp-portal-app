import type { NextFunction, Request, Response } from 'express';

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
}
