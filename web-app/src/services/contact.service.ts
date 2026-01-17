import BaseService, { ApiResponse } from "./BaseService";

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
 * Status list for contacts
 */
const statusList: StatusListModel[] = [
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
 * Contact Service - handles all contact-related API operations
 * Extends BaseService for common HTTP methods and error handling
 */
class ContactService extends BaseService {
  /**
   * Status list constant
   */
  CONST = { statusList };

  /**
   * Get contacts with optional filters
   * @param filters - Optional filter parameters
   * @returns Promise with contacts list
   */
  async get(filters: any = {}): Promise<ApiResponse<Contact[]>> {
    return this.post<Contact[]>("contact/get", filters);
  }

  /**
   * Find a contact by ID
   * @param id - Contact ID
   * @returns Promise with contact details
   */
  async find(id: number): Promise<ApiResponse<Contact>> {
    return this.get<Contact>(`contact/find/${id}`);
  }

  /**
   * Create a new contact
   * @param payload - Contact data
   * @returns Promise with created contact
   */
  async create(payload: any): Promise<ApiResponse<Contact>> {
    return this.post<Contact>("contact/create", payload, {
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
    return this.post<void>("contact/deleteRange", { ids }, {
      showSuccessToast: true,
    });
  }

  /**
   * Get companies list for contact association
   * @returns Promise with companies list
   */
  async getCompanies(): Promise<any[]> {
    const response = await this.get<any[]>("company/listOfNames");
    return response.result || [];
  }
}

// Export as singleton
export default new ContactService();
