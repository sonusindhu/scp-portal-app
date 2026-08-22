import type { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

import { AppError } from '../../common/errors/AppError.js';
import { fail, ok, created } from '../../common/utils/response.js';
import { CompanyService } from './company.service.js';
import { createCompanySchema, companyListQuerySchema } from './company.validator.js';

const companyService = new CompanyService();

export class CompanyController {
  async listOfNames(_req: Request, res: Response, next: NextFunction) {
    try {
      const companies = await companyService.listOfNames();
      return ok(res, 'Company list fetched successfully.', companies);
    } catch (error) {
      if (error instanceof AppError) return fail(res, error.statusCode, error.message);
      return next(error);
    }
  }

  async list(req: Request, res: Response, next: NextFunction) {
    try {
      const parsed = localCompanyListQuerySchema.parse(req.body ?? {});
      const { items, total } = await companyService.list(parsed);
      return ok(res, 'Company list fetched successfully.', items, { total, skip: parsed.skip ?? 0, take: parsed.take ?? items.length });
    } catch (error) {
      if (error instanceof AppError) return fail(res, error.statusCode, error.message);
      return next(error);
    }
  }

  async getAll(_req: Request, res: Response, next: NextFunction) {
    try {
      const companies = await companyService.getAll();
      return ok(res, 'Company list fetched successfully.', companies);
    } catch (error) {
      if (error instanceof AppError) return fail(res, error.statusCode, error.message);
      return next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const payload = createCompanySchema.parse(req.body);
      const company = await companyService.create(payload);
      return created(res, 'Company has been successfully created.', company);
    } catch (error) {
      if (error instanceof AppError) return fail(res, error.statusCode, error.message);
      return next(error);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const company = await companyService.getById(id);
      if (!company) {
        return fail(res, 404, 'Company not found');
      }
      return ok(res, 'Company has been fetched successfully.', company);
    } catch (error) {
      if (error instanceof AppError) return fail(res, error.statusCode, error.message);
      return next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const payload = createCompanySchema.parse(req.body);
      const company = await companyService.update(id, payload);
      return ok(res, 'Company has been updated successfully.', company);
    } catch (error) {
      if (error instanceof AppError) return fail(res, error.statusCode, error.message);
      return next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      await companyService.delete(id);
      return ok(res, 'Company has been deleted successfully.');
    } catch (error) {
      if (error instanceof AppError) return fail(res, error.statusCode, error.message);
      return next(error);
    }
  }
}

const localCompanyListQuerySchema = createCompanySchema.partial().extend({
  skip: z.number().int().min(0).optional(),
  take: z.number().int().min(1).max(100).optional(),
  orderBy: z.string().optional(),
  sortDirection: z.enum(['asc', 'desc']).optional(),
});
