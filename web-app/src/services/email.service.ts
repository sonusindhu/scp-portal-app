import BaseService, { ApiResponse } from "./BaseService";
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
    return this.post<Email[]>("email/list", filters);
  }

  /**
   * Find an email by ID
   * @param id - Email ID
   * @returns Promise with email details
   */
  async find(id: number): Promise<ApiResponse<Email>> {
    return super.get<Email>(`email/find/${id}`);
  }

  /**
   * Create a new email
   * @param payload - Email data
   * @returns Promise with created email
   */
  async create(payload: EmailCreatePayload): Promise<ApiResponse<Email>> {
    return this.post<Email>("email/create", payload, {
      showSuccessToast: true,
    });
  }

  /**
   * Update an existing email
   * @param payload - Updated email data including ID
   * @returns Promise with updated email
   */
  async update(payload: EmailUpdatePayload): Promise<ApiResponse<Email>> {
    return this.post<Email>("email/update", payload, {
      showSuccessToast: true,
    });
  }

  /**
   * Delete multiple emails by IDs
   * @param ids - Array of email IDs to delete
   * @returns Promise with deletion result
   */
  async deleteRange(ids: number[]): Promise<ApiResponse<void>> {
    return this.post<void>("email/deleteRange", { ids }, {
      showSuccessToast: true,
    });
  }
}

export default new EmailService();
