import { AppError } from '../../common/errors/AppError.js';
import { TaskRepository } from './task.repository.js';
import type { TaskListQuery, TaskPayload } from './task.types.js';

export class TaskService {
  constructor(private readonly taskRepository = new TaskRepository()) {}

  async getAll() {
    return this.taskRepository.findAll();
  }

  async getById(id: number) {
    return this.taskRepository.findById(id);
  }

  async list(params: TaskListQuery) {
    return this.taskRepository.list(params);
  }

  async create(payload: TaskPayload) {
    return this.taskRepository.create(payload);
  }

  async update(id: number, payload: TaskPayload) {
    const task = await this.taskRepository.findById(id);
    if (!task) {
      throw new AppError('Task not found', 404);
    }

    return this.taskRepository.update(id, payload);
  }

  async delete(id: number) {
    const task = await this.taskRepository.findById(id);
    if (!task) {
      throw new AppError('Task not found', 404);
    }

    return this.taskRepository.delete(id);
  }
}
