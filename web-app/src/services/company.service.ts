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

const toNumberOrUndefined = (value: number | string | null | undefined): number | undefined => {
  if (value === undefined || value === null || value === "") {
    return undefined;
  }

  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : undefined;
};

const normalizeCompanyPayload = (
  payload: Partial<CompanyCreatePayload> & {
    id?: number | string | null;
    mainContactId?: number | string | null;
    employeesCount?: number | string | null;
    revenue?: number | string | null;
    createdBy?: number | string | null;
    updatedBy?: number | string | null;
  }
) => ({
  ...payload,
  id: toNumberOrUndefined(payload.id),
  employeesCount: toNumberOrUndefined(payload.employeesCount),
  revenue: toNumberOrUndefined(payload.revenue),
  mainContactId: toNumberOrUndefined(payload.mainContactId),
  createdBy: toNumberOrUndefined(payload.createdBy),
  updatedBy: toNumberOrUndefined(payload.updatedBy),
});

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
    const normalizedPayload = normalizeCompanyPayload(payload as any);
    return this.post<Company>("company/create", normalizedPayload, {
      showSuccessToast: true,
    });
  }

  /**
   * Update an existing company
   * @param payload - Updated company data including ID
   * @returns Promise with updated company
   */
  async update(payload: CompanyUpdatePayload): Promise<ApiResponse<Company>> {
    const normalizedPayload = normalizeCompanyPayload(payload as any);
    return this.post<Company>("company/update", normalizedPayload, {
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
