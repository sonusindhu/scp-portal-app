import { Router } from 'express';

import { authenticate } from '../../common/middleware/authenticate.js';
import { validate } from '../../common/middleware/validate.js';
import { CompanyController } from './company.controller.js';
import { createCompanySchema, companyListQuerySchema } from './company.validator.js';

export const companyRouter = Router();
const companyController = new CompanyController();

companyRouter.use(authenticate);

companyRouter.get('/list-of-names', (req, res, next) => {
  companyController.listOfNames(req, res, next);
});

companyRouter.get('/', (req, res, next) => {
  companyController.getAll(req, res, next);
});

companyRouter.post('/', validate(createCompanySchema), (req, res, next) => {
  companyController.create(req, res, next);
});

companyRouter.get('/:id', (req, res, next) => {
  companyController.getById(req, res, next);
});

companyRouter.put('/:id', validate(createCompanySchema), (req, res, next) => {
  companyController.update(req, res, next);
});

companyRouter.delete('/:id', (req, res, next) => {
  companyController.delete(req, res, next);
});

companyRouter.post('/delete-range', (req, res, next) => {
  companyController.deleteRange(req, res, next);
});

companyRouter.post('/list', validate(companyListQuerySchema), (req, res, next) => {
  companyController.list(req, res, next);
});
