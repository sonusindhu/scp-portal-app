import { Router } from 'express';

import { AuthController } from './auth.controller.js';
import { validate } from '../../common/middleware/validate.js';
import { loginSchema, signupSchema } from './auth.validator.js';

export const authRouter = Router();
const authController = new AuthController();

authRouter.post('/login', validate(loginSchema), (req, res, next) => {
  authController.login(req, res, next);
});

authRouter.post('/signup', validate(signupSchema), (req, res, next) => {
  authController.signup(req, res, next);
});
