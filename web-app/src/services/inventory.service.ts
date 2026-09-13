import BaseService, { ApiResponse } from "./BaseService";
import { COMMON_STATUS, PACKAGE_TYPES, API_ENDPOINTS, ListItem } from "../utils/constants.util";

/**
 * Inventory data model
 */
export interface Inventory {
  id: number;
  tracking?: string;
  companyId?: number;
  package?: string;
  length?: number;
  width?: number;
  height?: number;
  weight?: number;
  notes?: string;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
}

const toNumberOrUndefined = (value: number | string | null | undefined): number | undefined => {
  if (value === undefined || value === null || value === "") {
    return undefined;
  }

  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : undefined;
};

const normalizeInventoryPayload = (payload: Record<string, any>): Record<string, any> => {
  const normalized = { ...payload };

  if (normalized.id !== undefined) {
    normalized.id = toNumberOrUndefined(normalized.id);
  }

  if (normalized.companyId !== undefined) {
    normalized.companyId = toNumberOrUndefined(normalized.companyId);
  }

  if (normalized.length !== undefined) {
    normalized.length = toNumberOrUndefined(normalized.length);
  }

  if (normalized.width !== undefined) {
    normalized.width = toNumberOrUndefined(normalized.width);
  }

  if (normalized.height !== undefined) {
    normalized.height = toNumberOrUndefined(normalized.height);
  }

  if (normalized.weight !== undefined) {
    normalized.weight = toNumberOrUndefined(normalized.weight);
  }

  if (normalized.createdBy !== undefined) {
    normalized.createdBy = toNumberOrUndefined(normalized.createdBy);
  }

  if (normalized.updatedBy !== undefined) {
    normalized.updatedBy = toNumberOrUndefined(normalized.updatedBy);
  }

  return normalized;
};

/**
 * Inventory Service - handles all inventory-related API operations
 * Extends BaseService for common HTTP methods and error handling
 */
class InventoryService extends BaseService {
  /**
   * Data constants for dropdowns
   */
  data = { statusList: COMMON_STATUS, packages: PACKAGE_TYPES };

  /**
   * Find an inventory by ID
   * @param id - Inventory ID
   * @returns Promise with inventory details
   */
  async find(id: number): Promise<ApiResponse<Inventory>> {
    return this.get<Inventory>(API_ENDPOINTS.INVENTORY.FIND(id));
  }

  /**
   * Create a new inventory
   * @param payload - Inventory data
   * @returns Promise with created inventory
   */
  async create(payload: any): Promise<ApiResponse<Inventory>> {
    const normalizedPayload = normalizeInventoryPayload(payload);
    return this.post<Inventory>(API_ENDPOINTS.INVENTORY.CREATE, normalizedPayload, {
      showSuccessToast: true,
    });
  }

  /**
   * Update an existing inventory
   * @param payload - Updated inventory data
   * @returns Promise with updated inventory
   */
  async update(payload: any): Promise<ApiResponse<Inventory>> {
    const normalizedPayload = normalizeInventoryPayload(payload);
    return this.post<Inventory>(API_ENDPOINTS.INVENTORY.UPDATE, normalizedPayload, {
      showSuccessToast: true,
    });
  }

  /**
   * Delete multiple inventories
   * @param ids - Array of inventory IDs to delete
   * @returns Promise with deletion result
   */
  async deleteInventories(ids: number[]): Promise<ApiResponse<void>> {
    return this.post<void>(API_ENDPOINTS.INVENTORY.DELETE, { ids }, {
      showSuccessToast: true,
    });
  }

  /**
   * Get companies list for inventory association
   * @returns Promise with companies list
   */
  async getCompanies(): Promise<ApiResponse<any[]>> {
    return this.get<any[]>(API_ENDPOINTS.COMPANY.LIST_OF_NAMES);
  }
}

// Export as singleton
export default new InventoryService();
