import BaseService, { ApiResponse } from "./BaseService";

/**
 * Example of how to extend BaseService
 * 
 * This demonstrates the recommended pattern for creating new services:
 * 1. Extend BaseService
 * 2. Define your data types/interfaces
 * 3. Use the protected HTTP methods (get, post, put, delete, etc.)
 * 4. Add service-specific business logic
 */

// Define your data models
interface ExampleEntity {
  id: number;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

interface ExampleListParams {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

interface ExampleCreatePayload {
  name: string;
  description?: string;
}

interface ExampleUpdatePayload {
  name?: string;
  description?: string;
}

/**
 * Example Service - demonstrates BaseService usage patterns
 */
class ExampleService extends BaseService {
  private endpoint = "example"; // Base endpoint for this resource

  /**
   * Get all examples with optional filtering
   * @param params - Query parameters for filtering and pagination
   * @returns Promise with list of examples
   */
  async getAll(params?: ExampleListParams): Promise<ApiResponse<ExampleEntity[]>> {
    const queryString = params ? this.buildQueryString(params) : "";
    return this.get<ExampleEntity[]>(`${this.endpoint}/list${queryString}`);
  }

  /**
   * Get a single example by ID
   * @param id - Example ID
   * @returns Promise with example details
   */
  async getById(id: number): Promise<ApiResponse<ExampleEntity>> {
    return this.get<ExampleEntity>(`${this.endpoint}/${id}`);
  }

  /**
   * Create a new example
   * @param payload - Data for new example
   * @returns Promise with created example
   */
  async create(payload: ExampleCreatePayload): Promise<ApiResponse<ExampleEntity>> {
    return this.post<ExampleEntity>(`${this.endpoint}/create`, payload, {
      showSuccessToast: true, // Show success message
    });
  }

  /**
   * Update an existing example
   * @param id - Example ID
   * @param payload - Updated data
   * @returns Promise with updated example
   */
  async update(id: number, payload: ExampleUpdatePayload): Promise<ApiResponse<ExampleEntity>> {
    return this.put<ExampleEntity>(`${this.endpoint}/${id}`, payload, {
      showSuccessToast: true,
    });
  }

  /**
   * Delete an example
   * @param id - Example ID
   * @returns Promise with deletion confirmation
   */
  async deleteById(id: number): Promise<ApiResponse<void>> {
    return this.delete<void>(`${this.endpoint}/${id}`, {
      showSuccessToast: true,
    });
  }

  /**
   * Bulk delete examples
   * @param ids - Array of example IDs
   * @returns Promise with deletion confirmation
   */
  async bulkDelete(ids: number[]): Promise<ApiResponse<void>> {
    return this.post<void>(`${this.endpoint}/bulk-delete`, { ids }, {
      showSuccessToast: true,
    });
  }

  /**
   * Search examples
   * @param searchTerm - Search query
   * @returns Promise with search results
   */
  async search(searchTerm: string): Promise<ApiResponse<ExampleEntity[]>> {
    return this.get<ExampleEntity[]>(`${this.endpoint}/search`, {
      params: { q: searchTerm },
    });
  }

  /**
   * Export examples as CSV
   * @param params - Optional filter parameters
   */
  async exportCsv(params?: ExampleListParams): Promise<void> {
    const queryString = params ? this.buildQueryString(params) : "";
    const blob = await this.download(`${this.endpoint}/export${queryString}`);
    
    // Create download link
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `examples-export-${new Date().toISOString()}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  }

  /**
   * Upload file for an example
   * @param id - Example ID
   * @param file - File to upload
   * @returns Promise with upload result
   */
  async uploadFile(id: number, file: File): Promise<ApiResponse<{ url: string }>> {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("exampleId", id.toString());

    return this.upload<{ url: string }>(`${this.endpoint}/upload`, formData, {
      showSuccessToast: true,
    });
  }

  /**
   * Helper method to build query string from params
   * @param params - Object with query parameters
   * @returns Query string
   */
  private buildQueryString(params: Record<string, any>): string {
    const searchParams = new URLSearchParams();
    
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        searchParams.append(key, String(value));
      }
    });

    const queryString = searchParams.toString();
    return queryString ? `?${queryString}` : "";
  }
}

// Export singleton instance
export default new ExampleService();
