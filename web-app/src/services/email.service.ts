import BaseService, { ApiResponse } from "./BaseService";
import { API_ENDPOINTS } from "../constants/api.constants";
import { Email } from "../shared/models/Email";

/**
 * Email create payload
 */
export interface EmailCreatePayload {
  title: string;
  message: string;
  type?: string;
  companyId?: number;
  contactId?: number;
  inventoryId?: number;
  quoteId?: number;
  isCritical?: boolean;
}

const toNumberOrUndefined = (value: number | string | null | undefined): number | undefined => {
  if (value === undefined || value === null || value === "") {
    return undefined;
  }

  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : undefined;
};

const normalizeEmailPayload = (payload: Record<string, any>): Record<string, any> => {
  const normalized = { ...payload };

  if (normalized.id !== undefined) {
    normalized.id = toNumberOrUndefined(normalized.id);
  }

  if (normalized.companyId !== undefined) {
    normalized.companyId = toNumberOrUndefined(normalized.companyId);
  }

  if (normalized.contactId !== undefined) {
    normalized.contactId = toNumberOrUndefined(normalized.contactId);
  }

  if (normalized.inventoryId !== undefined) {
    normalized.inventoryId = toNumberOrUndefined(normalized.inventoryId);
  }

  if (normalized.quoteId !== undefined) {
    normalized.quoteId = toNumberOrUndefined(normalized.quoteId);
  }

  if (normalized.userId !== undefined) {
    normalized.userId = toNumberOrUndefined(normalized.userId);
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
 * Email update payload
 */
export interface EmailUpdatePayload extends EmailCreatePayload {
  id: number;
}

/**
 * Email Service - handles all email-related API operations
 * Extends BaseService for common HTTP methods and error handling
 */
class EmailService extends BaseService {
  /**
   * Get list of emails with optional filters
   * @param filters - Optional filters for email list
   * @returns Promise with list of emails
   */
  async list(filters = {}): Promise<ApiResponse<Email[]>> {
    return this.post<Email[]>(API_ENDPOINTS.EMAIL.LIST, filters);
  }

  /**
   * Find an email by ID
   * @param id - Email ID
   * @returns Promise with email details
   */
  async find(id: number): Promise<ApiResponse<Email>> {
    return super.get<Email>(API_ENDPOINTS.EMAIL.FIND(id));
  }

  /**
   * Create a new email
   * @param payload - Email data
   * @returns Promise with created email
   */
  async create(payload: EmailCreatePayload): Promise<ApiResponse<Email>> {
    const normalizedPayload = normalizeEmailPayload(payload as Record<string, any>);
    return this.post<Email>(API_ENDPOINTS.EMAIL.CREATE, normalizedPayload, {
      showSuccessToast: true,
    });
  }

  /**
   * Update an existing email
   * @param payload - Updated email data including ID
   * @returns Promise with updated email
   */
  async update(payload: EmailUpdatePayload): Promise<ApiResponse<Email>> {
    const normalizedPayload = normalizeEmailPayload(payload as Record<string, any>);
    return this.post<Email>(API_ENDPOINTS.EMAIL.UPDATE, normalizedPayload, {
      showSuccessToast: true,
    });
  }

  /**
   * Delete multiple emails by IDs
   * @param ids - Array of email IDs to delete
   * @returns Promise with deletion result
   */
  async deleteRange(ids: number[]): Promise<ApiResponse<void>> {
    return this.post<void>(API_ENDPOINTS.EMAIL.DELETE, { ids }, {
      showSuccessToast: true,
    });
  }
}

export default new EmailService();
