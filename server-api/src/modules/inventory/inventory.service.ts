import { AppError } from '../../common/errors/AppError.js';
import { InventoryRepository } from './inventory.repository.js';
import type { InventoryListQuery, InventoryPayload } from './inventory.types.js';

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

  async create(payload: InventoryPayload, userId?: number) {
    const existing = await this.inventoryRepository.findByTrackingNumber(payload.trackingNumber);
    if (existing) {
      throw new AppError('Inventory tracking number is already taken', 409);
    }

    return this.inventoryRepository.create({
      ...payload,
      packageId: payload.packageId ?? undefined,
      createdBy: userId ?? payload.createdBy ?? null,
      updatedBy: userId ?? payload.updatedBy ?? null,
    });
  }

  async update(id: number, payload: InventoryPayload, userId?: number) {
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

    return this.inventoryRepository.update(id, {
      ...payload,
      createdBy: payload.createdBy ?? inventory.createdBy ?? null,
      updatedBy: userId ?? payload.updatedBy ?? inventory.updatedBy ?? null,
    });
  }

  async delete(id: number) {
    const inventory = await this.inventoryRepository.findById(id);
    if (!inventory) {
      throw new AppError('Inventory not found', 404);
    }

    return this.inventoryRepository.delete(id);
  }

  async deleteRange(ids: number[]) {
    if (!ids.length) {
      throw new AppError('At least one inventory id is required', 400);
    }

    return this.inventoryRepository.deleteRange(ids);
  }
}
