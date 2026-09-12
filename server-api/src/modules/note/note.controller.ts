import type { NextFunction, Request, Response } from 'express';
import { z } from 'zod';

import { AppError } from '../../common/errors/AppError.js';
import { fail, ok, created } from '../../common/utils/response.js';
import { NoteService } from './note.service.js';
import { createNoteSchema, noteListQuerySchema } from './note.validator.js';

const noteService = new NoteService();

export class NoteController {
  async list(req: Request, res: Response, next: NextFunction) {
    try {
      const parsed = noteListQuerySchema.parse(req.body ?? {});
      const { items, total } = await noteService.list(parsed);
      return ok(res, 'Note list fetched successfully.', items, {
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
      const notes = await noteService.getAll();
      return ok(res, 'Note list fetched successfully.', notes);
    } catch (error) {
      if (error instanceof AppError) return fail(res, error.statusCode, error.message);
      return next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const payload = createNoteSchema.parse(req.body);
      const note = await noteService.create(payload);
      return created(res, 'Note has been successfully created.', note);
    } catch (error) {
      if (error instanceof AppError) return fail(res, error.statusCode, error.message);
      return next(error);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const note = await noteService.getById(id);
      if (!note) {
        return fail(res, 404, 'Note not found');
      }
      return ok(res, 'Note has been fetched successfully.', note);
    } catch (error) {
      if (error instanceof AppError) return fail(res, error.statusCode, error.message);
      return next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const payload = createNoteSchema.parse(req.body);
      const note = await noteService.update(id, payload);
      return ok(res, 'Note has been updated successfully.', note);
    } catch (error) {
      if (error instanceof AppError) return fail(res, error.statusCode, error.message);
      return next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      await noteService.delete(id);
      return ok(res, 'Note has been deleted successfully.');
    } catch (error) {
      if (error instanceof AppError) return fail(res, error.statusCode, error.message);
      return next(error);
    }
  }

  async deleteRange(req: Request, res: Response, next: NextFunction) {
    try {
      const ids = z.array(z.number().int().positive()).parse(req.body.ids ?? []);
      if (!ids.length) {
        return fail(res, 400, 'At least one note id is required');
      }

      await noteService.deleteRange(ids);
      return ok(res, 'Notes have been deleted successfully.');
    } catch (error) {
      if (error instanceof AppError) return fail(res, error.statusCode, error.message);
      return next(error);
    }
  }
}
