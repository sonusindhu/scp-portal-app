import { Router } from 'express';

import { authenticate } from '../../common/middleware/authenticate.js';
import { validate } from '../../common/middleware/validate.js';
import { QuoteController } from './quote.controller.js';
import { createQuoteSchema, quoteListQuerySchema } from './quote.validator.js';

export const quoteRouter = Router();
const quoteController = new QuoteController();

quoteRouter.use(authenticate);

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

quoteRouter.post('/list', validate(quoteListQuerySchema), (req, res, next) => {
  quoteController.list(req, res, next);
});
