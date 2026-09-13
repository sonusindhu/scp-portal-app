import { AppError } from '../../common/errors/AppError.js';
import { EmailRepository } from './email.repository.js';
import type { EmailListQuery, EmailPayload } from './email.types.js';

export class EmailService {
  constructor(private readonly emailRepository = new EmailRepository()) {}

  async getAll() {
    return this.emailRepository.findAll();
  }

  async getById(id: number) {
    return this.emailRepository.findById(id);
  }

  async list(params: EmailListQuery) {
    return this.emailRepository.list(params);
  }

  async create(payload: EmailPayload, userId?: number) {
    return this.emailRepository.create({
      ...payload,
      createdBy: userId ?? payload.createdBy ?? null,
      updatedBy: userId ?? payload.updatedBy ?? null,
    });
  }

  async update(id: number, payload: EmailPayload, userId?: number) {
    const email = await this.emailRepository.findById(id);
    if (!email) {
      throw new AppError('Email not found', 404);
    }

    return this.emailRepository.update(id, {
      ...payload,
      createdBy: payload.createdBy ?? email.createdBy ?? null,
      updatedBy: userId ?? payload.updatedBy ?? email.updatedBy ?? null,
    });
  }

  async delete(id: number) {
    const email = await this.emailRepository.findById(id);
    if (!email) {
      throw new AppError('Email not found', 404);
    }

    return this.emailRepository.delete(id);
  }

  async deleteRange(ids: number[]) {
    if (!ids.length) {
      throw new AppError('At least one email id is required', 400);
    }

    return this.emailRepository.deleteRange(ids);
  }
}
