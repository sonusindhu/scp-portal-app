import { AppError } from '../../common/errors/AppError.js';
import { ContactRepository } from './contact.repository.js';

export type SortDirection = 'asc' | 'desc';

export interface ContactPayload {
  firstName: string;
  lastName: string;
  email: string;
  companyId: number;
  status?: string | null;
  department?: string | null;
  jobTitle?: string | null;
  phone?: string | null;
  extension?: string | null;
  address1?: string | null;
  address2?: string | null;
  city?: string | null;
  state?: string | null;
  zipcode?: string | null;
  country?: string | null;
  birthDate?: string | null;
  createdBy?: number | null;
  updatedBy?: number | null;
  isDeleted?: boolean;
}

export interface ContactListQuery {
  skip?: number;
  take?: number;
  orderBy?: string;
  sortDirection?: SortDirection;
}

export class ContactService {
  constructor(private readonly contactRepository = new ContactRepository()) {}

  async getAll() {
    return this.contactRepository.findAll();
  }

  async getById(id: number) {
    return this.contactRepository.findById(id);
  }

  async list(params: { skip?: number; take?: number; orderBy?: string; sortDirection?: 'asc' | 'desc' }) {
    return this.contactRepository.list(params);
  }

  async create(payload: ContactPayload) {
    const existingByEmail = await this.contactRepository.findByEmail(payload.email);
    if (existingByEmail) {
      throw new AppError('Contact email is already taken', 409);
    }

    return this.contactRepository.create(payload);
  }

  async update(id: number, payload: ContactPayload) {
    const contact = await this.contactRepository.findById(id);
    if (!contact) {
      throw new AppError('Contact not found', 404);
    }

    if (payload.email && payload.email !== contact.email) {
      const existingByEmail = await this.contactRepository.findByEmail(payload.email);
      if (existingByEmail) {
        throw new AppError('Contact email is already taken', 409);
      }
    }

    return this.contactRepository.update(id, payload);
  }

  async delete(id: number) {
    const contact = await this.contactRepository.findById(id);
    if (!contact) {
      throw new AppError('Contact not found', 404);
    }

    return this.contactRepository.delete(id);
  }
}
