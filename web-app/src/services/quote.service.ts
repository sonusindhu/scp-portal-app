import BaseService, { ApiResponse } from "./BaseService";
import { API_ENDPOINTS } from "../constants/api.constants";

/**
 * Quote data model
 */
export interface Quote {
  id: number;
  quoteName?: string;
  serviceTypeId?: string;
  transportMode?: string;
  companyId?: number;
  contactId?: number;
  quotePickUpDate?: string;
  expiryDate?: string;
  cargoDetail?: any;
  createdAt?: string;
  updatedAt?: string;
}

/**
 * Quote Service - handles all quote-related API operations
 * Extends BaseService for common HTTP methods and error handling
 */
class QuoteService extends BaseService {
  /**
   * Find a quote by ID
   * @param id - Quote ID
   * @returns Promise with quote details
   */
  async find(id: number): Promise<ApiResponse<Quote>> {
    const response = await this.get<Quote>(API_ENDPOINTS.QUOTE.FIND(id));
    
    // Transform cargo detail to handle undefined values
    if (response.data?.cargoDetail) {
      response.data.cargoDetail = {
        ...response.data.cargoDetail,
        cargoTypeId: response.data.cargoDetail.cargoTypeId || undefined,
        equipmentId: response.data.cargoDetail.equipmentId || undefined,
        commodityId: response.data.cargoDetail.commodityId || undefined,
      };
    }
    
    return response;
  }

  /**
   * Create a new quote
   * @param payload - Quote data
   * @returns Promise with created quote
   */
  async create(payload: any): Promise<ApiResponse<Quote>> {
    return this.post<Quote>(API_ENDPOINTS.QUOTE.CREATE, payload, {
      showSuccessToast: true,
    });
  }

  /**
   * Update an existing quote
   * @param payload - Updated quote data
   * @returns Promise with updated quote
   */
  async update(payload: any): Promise<ApiResponse<Quote>> {
    return this.post<Quote>(API_ENDPOINTS.QUOTE.UPDATE, payload, {
      showSuccessToast: true,
    });
  }

  /**
   * Delete multiple quotes
   * @param ids - Array of quote IDs to delete
   * @returns Promise with deletion result
   */
  async deleteRange(ids: number[]): Promise<ApiResponse<void>> {
    return this.post<void>(API_ENDPOINTS.QUOTE.DELETE, { ids }, {
      showSuccessToast: true,
    });
  }

  /**
   * Get companies for quote selection
   * @returns Promise with companies list
   */
  async getCompanies(): Promise<ApiResponse<any[]>> {
    return this.get<any[]>(API_ENDPOINTS.QUOTE.GET_COMPANIES);
  }

  /**
   * Get contacts by company ID
   * @param id - Company ID
   * @returns Promise with contacts list
   */
  async getContactsByCompany(id: number): Promise<ApiResponse<any[]>> {
    return this.get<any[]>(API_ENDPOINTS.QUOTE.GET_CONTACTS_BY_COMPANY(id));
  }

  /**
   * Get equipments list
   * @returns Promise with equipments
   */
  async getEquipments(): Promise<ApiResponse<any[]>> {
    return this.get<any[]>(API_ENDPOINTS.COMMON.EQUIPMENTS);
  }

  /**
   * Get commodities list
   * @returns Promise with commodities
   */
  async getCommodities(): Promise<ApiResponse<any[]>> {
    return this.get<any[]>(API_ENDPOINTS.COMMON.COMMODITIES);
  }

  /**
   * Get cargos list
   * @returns Promise with cargos
   */
  async getCargos(): Promise<ApiResponse<any[]>> {
    return this.get<any[]>(API_ENDPOINTS.COMMON.CARGOS);
  }

  /**
   * Create a note for a quote
   * @param payload - Note data
   * @returns Promise with created note
   */
  async createNote(payload: any): Promise<ApiResponse<any>> {
    return this.post<any>(API_ENDPOINTS.QUOTE.CREATE_NOTE, payload, {
      showSuccessToast: true,
    });
  }

  /**
   * Get notes for a quote
   * @param id - Quote ID
   * @param filter - Optional filter parameters
   * @returns Promise with notes list
   */
  async getNotes(id: number, filter?: any): Promise<any[]> {
    const response = await this.post<any[]>(API_ENDPOINTS.QUOTE.NOTES(id), { ...filter });
    return response.data || [];
  }

  /**
   * Create a task for a quote
   * @param payload - Task data
   * @returns Promise with created task
   */
  async createTask(payload: any): Promise<ApiResponse<any>> {
    return this.post<any>(API_ENDPOINTS.QUOTE.CREATE_TASK, payload, {
      showSuccessToast: true,
    });
  }

  /**
   * Get tasks for a quote
   * @param id - Quote ID
   * @param filter - Optional filter parameters
   * @returns Promise with tasks list
   */
  async getTasks(id: string, filter?: any): Promise<any[]> {
    const response = await this.post<any[]>(API_ENDPOINTS.QUOTE.TASKS(id), { ...filter });
    return response.data || [];
  }

  /**
   * Create an email for a quote
   * @param payload - Email data
   * @returns Promise with created email
   */
  async createEmail(payload: any): Promise<ApiResponse<any>> {
    return this.post<any>(API_ENDPOINTS.QUOTE.CREATE_EMAIL, payload, {
      showSuccessToast: true,
    });
  }

  /**
   * Get emails for a quote
   * @param id - Quote ID
   * @param filter - Optional filter parameters
   * @returns Promise with emails list
   */
  async getEmails(id: number, filter?: any): Promise<any[]> {
    const response = await this.post<any[]>(API_ENDPOINTS.QUOTE.EMAILS(id), { ...filter });
    return response.data || [];
  }

  /**
   * Get a specific email by ID
   * @param id - Quote ID
   * @param emailId - Email ID
   * @returns Promise with email details
   */
  async getEmailById(id: number, emailId: number): Promise<any> {
    const response = await this.get<any>(API_ENDPOINTS.QUOTE.EMAIL_BY_ID(id, emailId));
    return response.data;
  }
}

// Export as singleton
export default new QuoteService();
