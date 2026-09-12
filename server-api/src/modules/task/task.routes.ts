import { Router } from 'express';

import { authenticate } from '../../common/middleware/authenticate.js';
import { validate } from '../../common/middleware/validate.js';
import { TaskController } from './task.controller.js';
import { createTaskSchema, taskListQuerySchema } from './task.validator.js';

export const taskRouter = Router();
const taskController = new TaskController();

taskRouter.use(authenticate);

taskRouter.get('/get', (req, res, next) => {
  taskController.getAll(req, res, next);
});

taskRouter.post('/create', validate(createTaskSchema), (req, res, next) => {
  taskController.create(req, res, next);
});

taskRouter.post('/update', validate(createTaskSchema), (req, res, next) => {
  taskController.update(req, res, next);
});

taskRouter.get('/find/:id', (req, res, next) => {
  taskController.getById(req, res, next);
});

taskRouter.post('/list', validate(taskListQuerySchema), (req, res, next) => {
  taskController.list(req, res, next);
});

taskRouter.delete('/delete/:id', (req, res, next) => {
  taskController.delete(req, res, next);
});

taskRouter.post('/deleteRange', (req, res, next) => {
  taskController.deleteRange(req, res, next);
});

taskRouter.post('/delete-range', (req, res, next) => {
  taskController.deleteRange(req, res, next);
});

taskRouter.get('/', (req, res, next) => {
  taskController.getAll(req, res, next);
});

taskRouter.post('/', validate(createTaskSchema), (req, res, next) => {
  taskController.create(req, res, next);
});

taskRouter.get('/:id', (req, res, next) => {
  taskController.getById(req, res, next);
});

taskRouter.put('/:id', validate(createTaskSchema), (req, res, next) => {
  taskController.update(req, res, next);
});

taskRouter.delete('/:id', (req, res, next) => {
  taskController.delete(req, res, next);
});
