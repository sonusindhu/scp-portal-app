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

  async create(payload: EmailPayload) {
    return this.emailRepository.create(payload);
  }

  async update(id: number, payload: EmailPayload) {
    const email = await this.emailRepository.findById(id);
    if (!email) {
      throw new AppError('Email not found', 404);
    }

    return this.emailRepository.update(id, payload);
  }

  async delete(id: number) {
    const email = await this.emailRepository.findById(id);
    if (!email) {
      throw new AppError('Email not found', 404);
    }

    return this.emailRepository.delete(id);
  }
}
