import { Router } from 'express';

import { authenticate } from '../../common/middleware/authenticate.js';
import { CommonController } from './common.controller.js';

export const commonRouter = Router();
const commonController = new CommonController();

commonRouter.use(authenticate);

commonRouter.get('/equipments', (req, res, next) => {
  commonController.getEquipments(req, res, next);
});

commonRouter.get('/cargos', (req, res, next) => {
  commonController.getCargos(req, res, next);
});

commonRouter.get('/commodities', (req, res, next) => {
  commonController.getCommodities(req, res, next);
});
