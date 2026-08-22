import { AppError } from '../../common/errors/AppError.js';
import { CompanyRepository } from './company.repository.js';

export type SortDirection = 'asc' | 'desc';

export interface CompanyPayload {
  name: string;
  email: string;
  type?: string | null;
  status?: string | null;
  phone?: string | null;
  extension?: string | null;
  address1?: string | null;
  address2?: string | null;
  city?: string | null;
  state?: string | null;
  zipcode?: string | null;
  country?: string | null;
  employeesCount?: number | null;
  revenue?: number | null;
  mainContactId?: number | null;
  createdBy?: number | null;
  updatedBy?: number | null;
  isDeleted?: boolean;
}

export interface CompanyListQuery {
  skip?: number;
  take?: number;
  orderBy?: string;
  sortDirection?: SortDirection;
}

export class CompanyService {
  constructor(private readonly companyRepository = new CompanyRepository()) {}

  async getAll() {
    return this.companyRepository.findAll();
  }

  async getById(id: number) {
    return this.companyRepository.findById(id);
  }

  async listOfNames() {
    return this.companyRepository.findAllNames();
  }

  async list(params: { skip?: number; take?: number; orderBy?: string; sortDirection?: 'asc' | 'desc' }) {
    return this.companyRepository.list(params);
  }

  async create(payload: CompanyPayload) {
    const existingByName = await this.companyRepository.findByName(payload.name);
    if (existingByName) {
      throw new AppError('Company name is already taken', 409);
    }

    const existingByEmail = await this.companyRepository.findByEmail(payload.email);
    if (existingByEmail) {
      throw new AppError('Company email is already taken', 409);
    }

    return this.companyRepository.create(payload);
  }

  async update(id: number, payload: CompanyPayload) {
    const company = await this.companyRepository.findById(id);
    if (!company) {
      throw new AppError('Company not found', 404);
    }

    if (payload.name && payload.name !== company.name) {
      const existingByName = await this.companyRepository.findByName(payload.name);
      if (existingByName) {
        throw new AppError('Company name is already taken', 409);
      }
    }

    if (payload.email && payload.email !== company.email) {
      const existingByEmail = await this.companyRepository.findByEmail(payload.email);
      if (existingByEmail) {
        throw new AppError('Company email is already taken', 409);
      }
    }

    return this.companyRepository.update(id, payload);
  }

  async delete(id: number) {
    const company = await this.companyRepository.findById(id);
    if (!company) {
      throw new AppError('Company not found', 404);
    }

    return this.companyRepository.delete(id);
  }
}
