import type { NextFunction, Request, Response } from 'express';
import { z } from 'zod';

import { AppError } from '../../common/errors/AppError.js';
import { fail, ok, created } from '../../common/utils/response.js';
import { TaskService } from './task.service.js';
import { createTaskSchema, taskListQuerySchema } from './task.validator.js';

const taskService = new TaskService();

export class TaskController {
  async list(req: Request, res: Response, next: NextFunction) {
    try {
      const parsed = taskListQuerySchema.parse(req.body ?? {});
      const { items, total } = await taskService.list(parsed);
      return ok(res, 'Task list fetched successfully.', items, {
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
      const tasks = await taskService.getAll();
      return ok(res, 'Task list fetched successfully.', tasks);
    } catch (error) {
      if (error instanceof AppError) return fail(res, error.statusCode, error.message);
      return next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const payload = createTaskSchema.parse(req.body);
      const task = await taskService.create(payload);
      return created(res, 'Task has been successfully created.', task);
    } catch (error) {
      if (error instanceof AppError) return fail(res, error.statusCode, error.message);
      return next(error);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const task = await taskService.getById(id);
      if (!task) {
        return fail(res, 404, 'Task not found');
      }
      return ok(res, 'Task has been fetched successfully.', task);
    } catch (error) {
      if (error instanceof AppError) return fail(res, error.statusCode, error.message);
      return next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const payload = createTaskSchema.parse(req.body);
      const task = await taskService.update(id, payload);
      return ok(res, 'Task has been updated successfully.', task);
    } catch (error) {
      if (error instanceof AppError) return fail(res, error.statusCode, error.message);
      return next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      await taskService.delete(id);
      return ok(res, 'Task has been deleted successfully.');
    } catch (error) {
      if (error instanceof AppError) return fail(res, error.statusCode, error.message);
      return next(error);
    }
  }

  async deleteRange(req: Request, res: Response, next: NextFunction) {
    try {
      const ids = z.array(z.number().int().positive()).parse(req.body.ids ?? []);
      if (!ids.length) {
        return fail(res, 400, 'At least one task id is required');
      }

      await taskService.deleteRange(ids);
      return ok(res, 'Tasks have been deleted successfully.');
    } catch (error) {
      if (error instanceof AppError) return fail(res, error.statusCode, error.message);
      return next(error);
    }
  }
}
