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

  async create(payload: TaskPayload, userId?: number) {
    return this.taskRepository.create({
      ...payload,
      createdBy: userId ?? payload.createdBy ?? null,
      updatedBy: userId ?? payload.updatedBy ?? null,
    });
  }

  async update(id: number, payload: TaskPayload, userId?: number) {
    const task = await this.taskRepository.findById(id);
    if (!task) {
      throw new AppError('Task not found', 404);
    }

    return this.taskRepository.update(id, {
      ...payload,
      createdBy: payload.createdBy ?? task.createdBy ?? null,
      updatedBy: userId ?? payload.updatedBy ?? task.updatedBy ?? null,
    });
  }

  async delete(id: number) {
    const task = await this.taskRepository.findById(id);
    if (!task) {
      throw new AppError('Task not found', 404);
    }

    return this.taskRepository.delete(id);
  }

  async deleteRange(ids: number[]) {
    if (!ids.length) {
      throw new AppError('At least one task id is required', 400);
    }

    return this.taskRepository.deleteRange(ids);
  }
}
