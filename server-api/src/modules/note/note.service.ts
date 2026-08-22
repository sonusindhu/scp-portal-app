import { AppError } from '../../common/errors/AppError.js';
import { NoteRepository } from './note.repository.js';
import type { NoteListQuery, NotePayload } from './note.types.js';

export class NoteService {
  constructor(private readonly noteRepository = new NoteRepository()) {}

  async getAll() {
    return this.noteRepository.findAll();
  }

  async getById(id: number) {
    return this.noteRepository.findById(id);
  }

  async list(params: NoteListQuery) {
    return this.noteRepository.list(params);
  }

  async create(payload: NotePayload) {
    return this.noteRepository.create(payload);
  }

  async update(id: number, payload: NotePayload) {
    const note = await this.noteRepository.findById(id);
    if (!note) {
      throw new AppError('Note not found', 404);
    }

    return this.noteRepository.update(id, payload);
  }

  async delete(id: number) {
    const note = await this.noteRepository.findById(id);
    if (!note) {
      throw new AppError('Note not found', 404);
    }

    return this.noteRepository.delete(id);
  }
}
