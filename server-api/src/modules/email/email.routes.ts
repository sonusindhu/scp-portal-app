import { Router } from 'express';

import { authenticate } from '../../common/middleware/authenticate.js';
import { validate } from '../../common/middleware/validate.js';
import { EmailController } from './email.controller.js';
import { createEmailSchema, emailListQuerySchema } from './email.validator.js';

export const emailRouter = Router();
const emailController = new EmailController();

emailRouter.use(authenticate);

emailRouter.get('/', (req, res, next) => {
  emailController.getAll(req, res, next);
});

emailRouter.post('/', validate(createEmailSchema), (req, res, next) => {
  emailController.create(req, res, next);
});

emailRouter.get('/:id', (req, res, next) => {
  emailController.getById(req, res, next);
});

emailRouter.put('/:id', validate(createEmailSchema), (req, res, next) => {
  emailController.update(req, res, next);
});

emailRouter.delete('/:id', (req, res, next) => {
  emailController.delete(req, res, next);
});

emailRouter.post('/list', validate(emailListQuerySchema), (req, res, next) => {
  emailController.list(req, res, next);
});
