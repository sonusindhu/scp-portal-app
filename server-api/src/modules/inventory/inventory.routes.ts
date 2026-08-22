import { Router } from 'express';

import { authenticate } from '../../common/middleware/authenticate.js';
import { validate } from '../../common/middleware/validate.js';
import { InventoryController } from './inventory.controller.js';
import { createInventorySchema, inventoryListQuerySchema } from './inventory.validator.js';

export const inventoryRouter = Router();
const inventoryController = new InventoryController();

inventoryRouter.use(authenticate);

inventoryRouter.get('/', (req, res, next) => {
  inventoryController.getAll(req, res, next);
});

inventoryRouter.post('/', validate(createInventorySchema), (req, res, next) => {
  inventoryController.create(req, res, next);
});

inventoryRouter.get('/:id', (req, res, next) => {
  inventoryController.getById(req, res, next);
});

inventoryRouter.put('/:id', validate(createInventorySchema), (req, res, next) => {
  inventoryController.update(req, res, next);
});

inventoryRouter.delete('/:id', (req, res, next) => {
  inventoryController.delete(req, res, next);
});

inventoryRouter.post('/list', validate(inventoryListQuerySchema), (req, res, next) => {
  inventoryController.list(req, res, next);
});
