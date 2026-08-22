import type { NextFunction, Request, Response } from 'express';

import { prisma } from '../../config/database.js';
import { AppError } from '../../common/errors/AppError.js';
import { fail, ok } from '../../common/utils/response.js';

export class CommonController {
  async getEquipments(_req: Request, res: Response, next: NextFunction) {
    try {
      const equipments = await prisma.equipment.findMany({
        select: { id: true, name: true },
        orderBy: { name: 'asc' },
      });

      return ok(res, 'Equipments fetched successfully.', equipments);
    } catch (error) {
      if (error instanceof AppError) return fail(res, error.statusCode, error.message);
      return next(error);
    }
  }

  async getCargos(_req: Request, res: Response, next: NextFunction) {
    try {
      const cargos = await prisma.cargoType.findMany({
        select: { id: true, name: true },
        orderBy: { name: 'asc' },
      });

      return ok(res, 'Cargos fetched successfully.', cargos);
    } catch (error) {
      if (error instanceof AppError) return fail(res, error.statusCode, error.message);
      return next(error);
    }
  }

  async getCommodities(_req: Request, res: Response, next: NextFunction) {
    try {
      const commodities = await prisma.commodity.findMany({
        select: { id: true, name: true },
        orderBy: { name: 'asc' },
      });

      return ok(res, 'Commodities fetched successfully.', commodities);
    } catch (error) {
      if (error instanceof AppError) return fail(res, error.statusCode, error.message);
      return next(error);
    }
  }
}
