import { AppError } from '../../common/errors/AppError.js';
import { prisma } from '../../config/database.js';
import { QuoteRepository } from './quote.repository.js';
import type { QuoteListQuery, QuotePayload } from './quote.types.js';

export class QuoteService {
  constructor(private readonly quoteRepository = new QuoteRepository()) {}

  async getAll() {
    return this.quoteRepository.findAll();
  }

  async getById(id: number) {
    return this.quoteRepository.findById(id);
  }

  async getCompanies() {
    return prisma.company.findMany({
      select: { id: true, name: true },
      orderBy: { name: 'asc' },
    });
  }

  async getContactsByCompany(companyId: number) {
    return prisma.contact.findMany({
      where: { companyId },
      select: { id: true, fullName: true },
      orderBy: { fullName: 'asc' },
    });
  }

  async getQuoteDetails(id: number) {
    return this.quoteRepository.findById(id);
  }

  async createNote(data: Record<string, any>, userId?: number) {
    const quote = await this.quoteRepository.findById(Number(data.quoteId));
    if (!quote) {
      throw new AppError('Quote not found', 404);
    }

    const payload = {
      title: data.title,
      message: data.message,
      isCritical: data.isCritical,
      quoteId: Number(data.quoteId),
      createdBy: userId ?? data.createdBy ?? quote.createdBy ?? null,
      companyId: quote.companyId,
      contactId: quote.contactId,
      type: 'quote',
    };

    return prisma.note.create({ data: payload });
  }

  async getNotes(quoteId: number) {
    return prisma.note.findMany({
      where: { quoteId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async createTask(data: Record<string, any>, userId?: number) {
    const quote = await this.quoteRepository.findById(Number(data.quoteId));
    if (!quote) {
      throw new AppError('Quote not found', 404);
    }

    const payload = {
      subject: data.subject,
      description: data.description,
      priority: data.priority,
      quoteId: Number(data.quoteId),
      assignedTo: data.assignedTo,
      dueDateTime: data.dueDateTime,
      reminderDateTime: data.reminderDateTime,
      category: data.category,
      status: data.status,
      createdBy: userId ?? data.createdBy ?? quote.createdBy ?? null,
      pointOfContact: data.pointOfContact,
      companyId: quote.companyId,
      type: 'quote',
    };

    return prisma.task.create({ data: payload });
  }

  async getTasks(quoteId: number) {
    return prisma.task.findMany({
      where: { quoteId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async list(params: QuoteListQuery) {
    return this.quoteRepository.list(params);
  }

  async create(payload: QuotePayload) {
    if (payload.quoteNumber) {
      const existing = await this.quoteRepository.findByQuoteNumber(payload.quoteNumber);
      if (existing) {
        throw new AppError('Quote number is already taken', 409);
      }
    }

    return this.quoteRepository.create(payload);
  }

  async update(id: number, payload: QuotePayload) {
    const quote = await this.quoteRepository.findById(id);
    if (!quote) {
      throw new AppError('Quote not found', 404);
    }

    if (payload.quoteNumber && payload.quoteNumber !== quote.quoteNumber) {
      const existing = await this.quoteRepository.findByQuoteNumber(payload.quoteNumber);
      if (existing) {
        throw new AppError('Quote number is already taken', 409);
      }
    }

    return this.quoteRepository.update(id, payload);
  }

  async delete(id: number) {
    const quote = await this.quoteRepository.findById(id);
    if (!quote) {
      throw new AppError('Quote not found', 404);
    }

    return this.quoteRepository.delete(id);
  }

  async deleteRange(ids: number[]) {
    if (!ids.length) {
      throw new AppError('At least one quote id is required', 400);
    }

    return this.quoteRepository.deleteRange(ids);
  }
}
