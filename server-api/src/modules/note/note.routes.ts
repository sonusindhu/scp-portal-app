import { Router } from 'express';

import { authenticate } from '../../common/middleware/authenticate.js';
import { validate } from '../../common/middleware/validate.js';
import { NoteController } from './note.controller.js';
import { createNoteSchema, noteListQuerySchema } from './note.validator.js';

export const noteRouter = Router();
const noteController = new NoteController();

noteRouter.use(authenticate);

noteRouter.get('/', (req, res, next) => {
  noteController.getAll(req, res, next);
});

noteRouter.post('/', validate(createNoteSchema), (req, res, next) => {
  noteController.create(req, res, next);
});

noteRouter.get('/:id', (req, res, next) => {
  noteController.getById(req, res, next);
});

noteRouter.put('/:id', validate(createNoteSchema), (req, res, next) => {
  noteController.update(req, res, next);
});

noteRouter.delete('/:id', (req, res, next) => {
  noteController.delete(req, res, next);
});

noteRouter.post('/delete-range', (req, res, next) => {
  noteController.deleteRange(req, res, next);
});

noteRouter.post('/list', validate(noteListQuerySchema), (req, res, next) => {
  noteController.list(req, res, next);
});
