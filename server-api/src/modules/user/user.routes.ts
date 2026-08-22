import { Router } from 'express';

import { authenticate } from '../../common/middleware/authenticate.js';
import { validate } from '../../common/middleware/validate.js';
import { UserController } from './user.controller.js';
import { updatePasswordSchema, updateProfileSchema } from './user.validator.js';

export const userRouter = Router();
const userController = new UserController();

userRouter.use(authenticate);

userRouter.get('/detail', (req, res, next) => {
  userController.getDetail(req, res, next);
});

userRouter.post('/update', validate(updateProfileSchema), (req, res, next) => {
  userController.updateProfile(req, res, next);
});

userRouter.post('/updatePassword', validate(updatePasswordSchema), (req, res, next) => {
  userController.updatePassword(req, res, next);
});

userRouter.post('/uploadProfileImage', (req, res, next) => {
  userController.uploadProfileImage(req, res, next);
});
