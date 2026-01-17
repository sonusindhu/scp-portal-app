import BaseService, { ApiResponse } from "./BaseService";

/**
 * List item model for dropdown options
 */
interface ListItem {
  id: string;
  title: string;
}

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

/**
 * Status list for inventory
 */
const statusList: ListItem[] = [
  {
    id: "",
    title: "Select",
  },
  {
    id: "active",
    title: "Active",
  },
  {
    id: "inactive",
    title: "Inactive",
  },
];

/**
 * Package types list
 */
const packages: ListItem[] = [
  {
    id: "",
    title: "Select",
  },
  {
    id: "parcel",
    title: "Parcel",
  },
  {
    id: "pallet",
    title: "Pallet",
  },
  {
    id: "bale",
    title: "Bale",
  },
];

/**
 * Inventory Service - handles all inventory-related API operations
 * Extends BaseService for common HTTP methods and error handling
 */
class InventoryService extends BaseService {
  /**
   * Data constants for dropdowns
   */
  data = { statusList, packages };

  /**
   * Find an inventory by ID
   * @param id - Inventory ID
   * @returns Promise with inventory details
   */
  async find(id: number): Promise<ApiResponse<Inventory>> {
    return this.get<Inventory>(`inventory/find/${id}`);
  }

  /**
   * Create a new inventory
   * @param payload - Inventory data
   * @returns Promise with created inventory
   */
  async create(payload: any): Promise<ApiResponse<Inventory>> {
    return this.post<Inventory>("inventory/create", payload, {
      showSuccessToast: true,
    });
  }

  /**
   * Update an existing inventory
   * @param payload - Updated inventory data
   * @returns Promise with updated inventory
   */
  async update(payload: any): Promise<ApiResponse<Inventory>> {
    return this.post<Inventory>("inventory/update", payload, {
      showSuccessToast: true,
    });
  }

  /**
   * Delete multiple inventories
   * @param ids - Array of inventory IDs to delete
   * @returns Promise with deletion result
   */
  async deleteInventories(ids: number[]): Promise<ApiResponse<void>> {
    return this.post<void>("inventory/deleteRange", { ids }, {
      showSuccessToast: true,
    });
  }

  /**
   * Get companies list for inventory association
   * @returns Promise with companies list
   */
  async getCompanies(): Promise<ApiResponse<any[]>> {
    return this.get<any[]>("company/listOfNames");
  }
}

// Export as singleton
export default new InventoryService();
