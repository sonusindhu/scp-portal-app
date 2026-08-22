import { Router } from 'express';

import { authenticate } from '../../common/middleware/authenticate.js';
import { validate } from '../../common/middleware/validate.js';
import { ContactController } from './contact.controller.js';
import { createContactSchema, contactListQuerySchema } from './contact.validator.js';

export const contactRouter = Router();
const contactController = new ContactController();

contactRouter.use(authenticate);

contactRouter.get('/get', (req, res, next) => {
  contactController.getAll(req, res, next);
});

contactRouter.post('/create', validate(createContactSchema), (req, res, next) => {
  contactController.create(req, res, next);
});

contactRouter.post('/update', validate(createContactSchema), (req, res, next) => {
  contactController.update(req, res, next);
});

contactRouter.get('/find/:id', (req, res, next) => {
  contactController.getById(req, res, next);
});

contactRouter.post('/list', validate(contactListQuerySchema), (req, res, next) => {
  contactController.list(req, res, next);
});

contactRouter.delete('/delete/:id', (req, res, next) => {
  contactController.delete(req, res, next);
});

contactRouter.post('/deleteRange', (req, res, next) => {
  contactController.deleteRange(req, res, next);
});

contactRouter.post('/delete-range', (req, res, next) => {
  contactController.deleteRange(req, res, next);
});

contactRouter.get('/', (req, res, next) => {
  contactController.getAll(req, res, next);
});

contactRouter.post('/', validate(createContactSchema), (req, res, next) => {
  contactController.create(req, res, next);
});

contactRouter.get('/:id', (req, res, next) => {
  contactController.getById(req, res, next);
});

contactRouter.put('/:id', validate(createContactSchema), (req, res, next) => {
  contactController.update(req, res, next);
});

contactRouter.delete('/:id', (req, res, next) => {
  contactController.delete(req, res, next);
});
