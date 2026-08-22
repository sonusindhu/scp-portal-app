import { AppError } from '../../common/errors/AppError.js';
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
}
