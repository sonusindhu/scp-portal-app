import BaseService, { ApiResponse } from "./BaseService";
import { COMMON_STATUS, API_ENDPOINTS } from "../utils/constants.util";

/**
 * Status list model
 */
interface StatusListModel {
  id: string;
  title: string;
}

/**
 * Contact data model
 */
export interface Contact {
  id: number;
  firstName?: string;
  lastName?: string;
  fullName?: string;
  email?: string;
  phone?: string;
  extension?: string;
  jobTitle?: string;
  department?: string;
  companyId?: number;
  address1?: string;
  address2?: string;
  city?: string;
  state?: string;
  country?: string;
  zipcode?: string;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
}

/**
 * Contact Service - handles all contact-related API operations
 * Extends BaseService for common HTTP methods and error handling
 */
class ContactService extends BaseService {
  /**
   * Status list constant
   */
  CONST = { statusList: COMMON_STATUS };

  /**
   * Get contacts with optional filters
   * @param filters - Optional filter parameters
   * @returns Promise with contacts list
   */
  async getContacts(filters: any = {}): Promise<ApiResponse<Contact[]>> {
    return this.post<Contact[]>(API_ENDPOINTS.CONTACT.LIST, filters);
  }

  /**
   * Find a contact by ID
   * @param id - Contact ID
   * @returns Promise with contact details
   */
  async find(id: number): Promise<ApiResponse<Contact>> {
    return this.get<Contact>(API_ENDPOINTS.CONTACT.FIND(id));
  }

  /**
   * Create a new contact
   * @param payload - Contact data
   * @returns Promise with created contact
   */
  async create(payload: any): Promise<ApiResponse<Contact>> {
    return this.post<Contact>(API_ENDPOINTS.CONTACT.CREATE, payload, {
      showSuccessToast: true,
    });
  }

  /**
   * Update an existing contact
   * @param payload - Updated contact data
   * @returns Promise with updated contact
   */
  async update(payload: any): Promise<ApiResponse<Contact>> {
    return this.post<Contact>("contact/update", payload, {
      showSuccessToast: true,
    });
  }

  /**
   * Delete multiple contacts
   * @param ids - Array of contact IDs to delete
   * @returns Promise with deletion result
   */
  async deleteContacts(ids: number[]): Promise<ApiResponse<void>> {
    return this.post<void>(API_ENDPOINTS.CONTACT.DELETE, { ids }, {
      showSuccessToast: true,
    });
  }

  /**
   * Get companies list for contact association
   * @returns Promise with companies list
   */
  async getCompanies(): Promise<any[]> {
    const response = await this.get<any[]>(API_ENDPOINTS.COMPANY.LIST_OF_NAMES);
    return response.result || [];
  }
}

// Export as singleton
export default new ContactService();
