import BaseService, { ApiResponse } from "./BaseService";
import { API_ENDPOINTS } from "../constants/api.constants";

/**
 * User data model
 */
export interface User {
  id?: number;
  username?: string;
  email: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  createdAt?: string;
  updatedAt?: string;
}

/**
 * Auth login response
 */
export interface AuthResponse extends User {
  token?: string;
}

/**
 * Registration payload
 */
export interface RegisterPayload {
  username: string;
  email: string;
  password: string;
}

/**
 * Login payload
 */
export interface LoginPayload {
  email: string;
  password: string;
}

/**
 * Update profile payload
 */
export interface UpdateProfilePayload {
  firstName?: string;
  lastName?: string;
  phone?: string;
  email?: string;
}

/**
 * Update password payload
 */
export interface UpdatePasswordPayload {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

/**
 * Auth Service - handles all authentication and user-related API operations
 * Extends BaseService for common HTTP methods and error handling
 */
class AuthService extends BaseService {
  /**
   * Register a new user
   * @param payload - Registration data
   * @returns Promise with registration result
   */
  async register(payload: RegisterPayload): Promise<ApiResponse<User>> {
    return this.post<User>(API_ENDPOINTS.AUTH.SIGNUP, payload, {
      showSuccessToast: true,
    });
  }

  /**
   * Login user and store credentials
   * @param email - User email
   * @param password - User password
   * @returns Promise with auth response including token
   */
  async login(email: string, password: string): Promise<ApiResponse<AuthResponse>> {
    const payload: LoginPayload = { email, password };
    const response = await this.post<AuthResponse>(API_ENDPOINTS.AUTH.LOGIN, payload);

    // Server API uses `data` as the canonical payload field.
    const data: any = response.data ?? null;
    if (response.status && data) {
      localStorage.setItem("user", JSON.stringify(data));
    }

    return response;
  }

  /**
   * Get current user details
   * @returns Promise with user details
   */
  async getUserDetail(): Promise<ApiResponse<User>> {
    return this.get<User>("user/detail");
  }

  /**
   * Update user profile
   * @param payload - Profile update data
   * @returns Promise with updated user
   */
  async updateProfile(payload: UpdateProfilePayload): Promise<ApiResponse<User>> {
    return this.post<User>("user/update", payload, {
      showSuccessToast: true,
    });
  }

  /**
   * Update user password
   * @param payload - Password update data
   * @returns Promise with result
   */
  async updatePassword(payload: UpdatePasswordPayload): Promise<ApiResponse<void>> {
    return this.post<void>("user/updatePassword", payload, {
      showSuccessToast: true,
    });
  }

  /**
   * Logout user and clear local storage
   */
  logout(): void {
    localStorage.removeItem("user");
  }

  /**
   * Get current user from local storage
   * @returns User object or null
   */
  getCurrentUser(): AuthResponse | null {
    const userAuth = localStorage.getItem("user");
    return userAuth ? JSON.parse(userAuth) : null;
  }
}

export default new AuthService();
