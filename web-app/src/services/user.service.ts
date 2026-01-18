import BaseService, { ApiResponse } from "./BaseService";

/**
 * User profile image upload payload
 */
export interface UploadImagePayload {
  file: File | Blob;
  [key: string]: any;
}

/**
 * User Service - handles user-related API operations
 * Extends BaseService for common HTTP methods and error handling
 */
class UserService extends BaseService {
  /**
   * Upload user profile image
   * @param payload - Image upload data (FormData)
   * @returns Promise with uploaded image result
   */
  async uploadUserImage(payload: any): Promise<ApiResponse<any>> {
    return this.post<any>("user/uploadProfileImage", payload, {
      showSuccessToast: true,
    });
  }
}

export default new UserService();

