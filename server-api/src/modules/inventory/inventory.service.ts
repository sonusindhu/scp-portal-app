import { AppError } from '../../common/errors/AppError.js';
import { InventoryRepository } from './inventory.repository.js';

export type SortDirection = 'asc' | 'desc';

export interface InventoryPayload {
  trackingNumber: string;
  companyId: number;
  type?: string | null;
  deviceType?: string | null;
  status?: string | null;
  length?: number | null;
  width?: number | null;
  height?: number | null;
  lwhType?: string | null;
  weight?: number | null;
  weightType?: string | null;
  location?: string | null;
  notes?: string | null;
  createdBy?: number | null;
  updatedBy?: number | null;
  isDeleted?: boolean;
  packageId?: string | null;
}

export interface InventoryListQuery {
  skip?: number;
  take?: number;
  orderBy?: string;
  sortDirection?: SortDirection;
}

export class InventoryService {
  constructor(private readonly inventoryRepository = new InventoryRepository()) {}

  async getAll() {
    return this.inventoryRepository.findAll();
  }

  async getById(id: number) {
    return this.inventoryRepository.findById(id);
  }

  async list(params: { skip?: number; take?: number; orderBy?: string; sortDirection?: 'asc' | 'desc' }) {
    return this.inventoryRepository.list(params);
  }

  async create(payload: InventoryPayload) {
    const existing = await this.inventoryRepository.findByTrackingNumber(payload.trackingNumber);
    if (existing) {
      throw new AppError('Inventory tracking number is already taken', 409);
    }

    return this.inventoryRepository.create({
      ...payload,
      packageId: payload.packageId ?? undefined,
    });
  }

  async update(id: number, payload: InventoryPayload) {
    const inventory = await this.inventoryRepository.findById(id);
    if (!inventory) {
      throw new AppError('Inventory not found', 404);
    }

    if (payload.trackingNumber && payload.trackingNumber !== inventory.trackingNumber) {
      const existing = await this.inventoryRepository.findByTrackingNumber(payload.trackingNumber);
      if (existing) {
        throw new AppError('Inventory tracking number is already taken', 409);
      }
    }

    return this.inventoryRepository.update(id, payload);
  }

  async delete(id: number) {
    const inventory = await this.inventoryRepository.findById(id);
    if (!inventory) {
      throw new AppError('Inventory not found', 404);
    }

    return this.inventoryRepository.delete(id);
  }
}
