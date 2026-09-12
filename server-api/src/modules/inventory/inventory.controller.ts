import type { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

import { AppError } from '../../common/errors/AppError.js';
import { fail, ok, created } from '../../common/utils/response.js';
import { InventoryService } from './inventory.service.js';
import { createInventorySchema, inventoryListQuerySchema } from './inventory.validator.js';

const inventoryService = new InventoryService();

export class InventoryController {
  async list(req: Request, res: Response, next: NextFunction) {
    try {
      const parsed = inventoryListQuerySchema.parse(req.body ?? {});
      const { items, total } = await inventoryService.list(parsed);
      return ok(res, 'Inventory list fetched successfully.', items, {
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
      const inventories = await inventoryService.getAll();
      return ok(res, 'Inventory list fetched successfully.', inventories);
    } catch (error) {
      if (error instanceof AppError) return fail(res, error.statusCode, error.message);
      return next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const payload = createInventorySchema.parse(req.body);
      const inventory = await inventoryService.create(payload);
      return created(res, 'Inventory has been successfully created.', inventory);
    } catch (error) {
      if (error instanceof AppError) return fail(res, error.statusCode, error.message);
      return next(error);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const inventory = await inventoryService.getById(id);
      if (!inventory) {
        return fail(res, 404, 'Inventory not found');
      }
      return ok(res, 'Inventory has been fetched successfully.', inventory);
    } catch (error) {
      if (error instanceof AppError) return fail(res, error.statusCode, error.message);
      return next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const payload = createInventorySchema.parse(req.body);
      const inventory = await inventoryService.update(id, payload);
      return ok(res, 'Inventory has been updated successfully.', inventory);
    } catch (error) {
      if (error instanceof AppError) return fail(res, error.statusCode, error.message);
      return next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      await inventoryService.delete(id);
      return ok(res, 'Inventory has been deleted successfully.');
    } catch (error) {
      if (error instanceof AppError) return fail(res, error.statusCode, error.message);
      return next(error);
    }
  }

  async deleteRange(req: Request, res: Response, next: NextFunction) {
    try {
      const ids = z.array(z.number().int().positive()).parse(req.body.ids ?? []);
      if (!ids.length) {
        return fail(res, 400, 'At least one inventory id is required');
      }

      await inventoryService.deleteRange(ids);
      return ok(res, 'Inventory items have been deleted successfully.');
    } catch (error) {
      if (error instanceof AppError) return fail(res, error.statusCode, error.message);
      return next(error);
    }
  }
}
