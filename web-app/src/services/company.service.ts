import BaseService, { ApiResponse } from "./BaseService";

/**
 * Company data model
 */
export interface Company {
  id: number;
  name: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  zip?: string;
  country?: string;
  website?: string;
  industry?: string;
  notes?: string;
  createdAt?: string;
  updatedAt?: string;
}

/**
 * Payload for creating a new company
 */
export interface CompanyCreatePayload {
  name: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  zip?: string;
  country?: string;
  website?: string;
  industry?: string;
  notes?: string;
}

/**
 * Payload for updating an existing company
 */
export interface CompanyUpdatePayload extends CompanyCreatePayload {
  id: number;
}

/**
 * Company Service - handles all company-related API operations
 * Extends BaseService for common HTTP methods and error handling
 */
class CompanyService extends BaseService {
  /**
   * Find a company by ID
   * @param id - Company ID (optional for listing all)
   * @returns Promise with company details or list
   */
  async find(id?: number): Promise<ApiResponse<Company | Company[]>> {
    const endpoint = id ? `company/find/${id}` : "company/find";
    return this.get<Company | Company[]>(endpoint);
  }

  /**
   * Create a new company
   * @param payload - Company data
   * @returns Promise with created company
   */
  async create(payload: CompanyCreatePayload): Promise<ApiResponse<Company>> {
    return this.post<Company>("company/create", payload, {
      showSuccessToast: true,
    });
  }

  /**
   * Update an existing company
   * @param payload - Updated company data including ID
   * @returns Promise with updated company
   */
  async update(payload: CompanyUpdatePayload): Promise<ApiResponse<Company>> {
    return this.post<Company>("company/update", payload, {
      showSuccessToast: true,
    });
  }

  /**
   * Delete multiple companies
   * @param ids - Array of company IDs to delete
   * @returns Promise with deletion result
   */
  async deleteCompanies(ids: number[]): Promise<ApiResponse<void>> {
    return this.post<void>("company/deleteRange", { ids }, {
      showSuccessToast: true,
    });
  }
}

// Export as singleton
export default new CompanyService();
