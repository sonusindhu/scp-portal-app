import { Router } from 'express';

import { authenticate } from '../../common/middleware/authenticate.js';
import { validate } from '../../common/middleware/validate.js';
import { QuoteController } from './quote.controller.js';
import { createQuoteSchema, quoteListQuerySchema } from './quote.validator.js';

export const quoteRouter = Router();
const quoteController = new QuoteController();

quoteRouter.use(authenticate);

quoteRouter.get('/getCompanies', (req, res, next) => {
  quoteController.getCompanies(req, res, next);
});

quoteRouter.get('/getContactsByCompany/:id', (req, res, next) => {
  quoteController.getContactsByCompany(req, res, next);
});

quoteRouter.get('/getQuoteDetails/:id', (req, res, next) => {
  quoteController.getQuoteDetails(req, res, next);
});

quoteRouter.post('/createNote', (req, res, next) => {
  quoteController.createNote(req, res, next);
});

quoteRouter.post('/createTask', (req, res, next) => {
  quoteController.createTask(req, res, next);
});

quoteRouter.get('/:id/notes', (req, res, next) => {
  quoteController.getNotes(req, res, next);
});

quoteRouter.post('/:id/notes', (req, res, next) => {
  quoteController.getNotes(req, res, next);
});

quoteRouter.get('/:id/tasks', (req, res, next) => {
  quoteController.getTasks(req, res, next);
});

quoteRouter.post('/:id/tasks', (req, res, next) => {
  quoteController.getTasks(req, res, next);
});

quoteRouter.get('/', (req, res, next) => {
  quoteController.getAll(req, res, next);
});

quoteRouter.post('/', validate(createQuoteSchema), (req, res, next) => {
  quoteController.create(req, res, next);
});

quoteRouter.get('/:id', (req, res, next) => {
  quoteController.getById(req, res, next);
});

quoteRouter.put('/:id', validate(createQuoteSchema), (req, res, next) => {
  quoteController.update(req, res, next);
});

quoteRouter.delete('/:id', (req, res, next) => {
  quoteController.delete(req, res, next);
});

quoteRouter.post('/deleteRange', (req, res, next) => {
  quoteController.deleteRange(req, res, next);
});

quoteRouter.post('/delete-range', (req, res, next) => {
  quoteController.deleteRange(req, res, next);
});

quoteRouter.post('/list', validate(quoteListQuerySchema), (req, res, next) => {
  quoteController.list(req, res, next);
});
