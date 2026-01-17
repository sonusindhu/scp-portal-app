import axios from "../utils/config.util";
import { AxiosRequestConfig, AxiosError, AxiosResponse } from "axios";
import toast from "../utils/toast.util";
import EventBus, { AppEvents } from "../common/EventBus";

/**
 * Standard API response structure
 */
export interface ApiResponse<T = any> {
  status: boolean;
  message: string;
  result?: T;
  error?: any;
}

/**
 * Base configuration for API requests
 */
export interface RequestConfig extends AxiosRequestConfig {
  showErrorToast?: boolean;
  showSuccessToast?: boolean;
}

/**
 * Base Service class providing common HTTP operations
 * with centralized error handling and response processing
 */
class BaseService {
  protected apiUrl: string;

  constructor() {
    this.apiUrl = import.meta.env.VITE_API_ENDPOINT || "";
  }

  /**
   * Centralized error handler
   * @param error - The error object from axios
   * @param showToast - Whether to show error toast
   * @returns Rejected promise with formatted error
   */
  protected handleError(error: AxiosError<ApiResponse>, showToast: boolean = true): never {
    let errorMessage = "An unexpected error occurred";
    let statusCode = 500;

    if (error.response) {
      // Server responded with error status
      statusCode = error.response.status;
      const responseData = error.response.data;

      if (responseData?.message) {
        errorMessage = responseData.message;
      } else if (typeof responseData === "string") {
        errorMessage = responseData;
      } else {
        errorMessage = `Server error: ${statusCode}`;
      }

      // Handle unauthorized access
      if (statusCode === 401 || statusCode === 403) {
        EventBus.dispatch<void>(AppEvents.LOGOUT);
        errorMessage = "Your session has expired. Please login again.";
      }
    } else if (error.request) {
      // Request was made but no response received
      errorMessage = "Network error: Unable to connect to server";
    } else if (error.message) {
      // Something else happened
      errorMessage = error.message;
    }

    if (showToast) {
      toast.error(errorMessage);
    }

    // Create a consistent error object
    const formattedError = {
      message: errorMessage,
      statusCode,
      originalError: error,
    };

    throw formattedError;
  }

  /**
   * Process successful response
   * @param response - Axios response
   * @param showToast - Whether to show success toast
   * @returns Processed response data
   */
  protected handleResponse<T>(
    response: AxiosResponse<ApiResponse<T>>,
    showToast: boolean = false
  ): ApiResponse<T> {
    const data = response.data;

    if (showToast && data.status && data.message) {
      toast.success(data.message);
    }

    return data;
  }

  /**
   * Generic GET request
   * @param endpoint - API endpoint (relative to base URL)
   * @param config - Optional request configuration
   * @returns Promise with typed response
   */
  protected async get<T = any>(
    endpoint: string,
    config: RequestConfig = {}
  ): Promise<ApiResponse<T>> {
    const { showErrorToast = true, showSuccessToast = false, ...axiosConfig } = config;

    try {
      const response = await axios.get<ApiResponse<T>>(`${this.apiUrl}${endpoint}`, axiosConfig);
      return this.handleResponse(response, showSuccessToast);
    } catch (error) {
      return this.handleError(error as AxiosError<ApiResponse>, showErrorToast);
    }
  }

  /**
   * Generic POST request
   * @param endpoint - API endpoint (relative to base URL)
   * @param data - Request payload
   * @param config - Optional request configuration
   * @returns Promise with typed response
   */
  protected async post<T = any>(
    endpoint: string,
    data?: any,
    config: RequestConfig = {}
  ): Promise<ApiResponse<T>> {
    const { showErrorToast = true, showSuccessToast = false, ...axiosConfig } = config;

    try {
      const response = await axios.post<ApiResponse<T>>(
        `${this.apiUrl}${endpoint}`,
        data,
        axiosConfig
      );
      return this.handleResponse(response, showSuccessToast);
    } catch (error) {
      return this.handleError(error as AxiosError<ApiResponse>, showErrorToast);
    }
  }

  /**
   * Generic PUT request
   * @param endpoint - API endpoint (relative to base URL)
   * @param data - Request payload
   * @param config - Optional request configuration
   * @returns Promise with typed response
   */
  protected async put<T = any>(
    endpoint: string,
    data?: any,
    config: RequestConfig = {}
  ): Promise<ApiResponse<T>> {
    const { showErrorToast = true, showSuccessToast = false, ...axiosConfig } = config;

    try {
      const response = await axios.put<ApiResponse<T>>(
        `${this.apiUrl}${endpoint}`,
        data,
        axiosConfig
      );
      return this.handleResponse(response, showSuccessToast);
    } catch (error) {
      return this.handleError(error as AxiosError<ApiResponse>, showErrorToast);
    }
  }

  /**
   * Generic PATCH request
   * @param endpoint - API endpoint (relative to base URL)
   * @param data - Request payload
   * @param config - Optional request configuration
   * @returns Promise with typed response
   */
  protected async patch<T = any>(
    endpoint: string,
    data?: any,
    config: RequestConfig = {}
  ): Promise<ApiResponse<T>> {
    const { showErrorToast = true, showSuccessToast = false, ...axiosConfig } = config;

    try {
      const response = await axios.patch<ApiResponse<T>>(
        `${this.apiUrl}${endpoint}`,
        data,
        axiosConfig
      );
      return this.handleResponse(response, showSuccessToast);
    } catch (error) {
      return this.handleError(error as AxiosError<ApiResponse>, showErrorToast);
    }
  }

  /**
   * Generic DELETE request
   * @param endpoint - API endpoint (relative to base URL)
   * @param config - Optional request configuration
   * @returns Promise with typed response
   */
  protected async delete<T = any>(
    endpoint: string,
    config: RequestConfig = {}
  ): Promise<ApiResponse<T>> {
    const { showErrorToast = true, showSuccessToast = false, ...axiosConfig } = config;

    try {
      const response = await axios.delete<ApiResponse<T>>(
        `${this.apiUrl}${endpoint}`,
        axiosConfig
      );
      return this.handleResponse(response, showSuccessToast);
    } catch (error) {
      return this.handleError(error as AxiosError<ApiResponse>, showErrorToast);
    }
  }

  /**
   * Upload file with multipart/form-data
   * @param endpoint - API endpoint (relative to base URL)
   * @param formData - FormData object with files
   * @param config - Optional request configuration
   * @returns Promise with typed response
   */
  protected async upload<T = any>(
    endpoint: string,
    formData: FormData,
    config: RequestConfig = {}
  ): Promise<ApiResponse<T>> {
    const { showErrorToast = true, showSuccessToast = false, ...axiosConfig } = config;

    try {
      const response = await axios.post<ApiResponse<T>>(
        `${this.apiUrl}${endpoint}`,
        formData,
        {
          ...axiosConfig,
          headers: {
            ...axiosConfig.headers,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return this.handleResponse(response, showSuccessToast);
    } catch (error) {
      return this.handleError(error as AxiosError<ApiResponse>, showErrorToast);
    }
  }

  /**
   * Download file as blob
   * @param endpoint - API endpoint (relative to base URL)
   * @param config - Optional request configuration
   * @returns Promise with blob response
   */
  protected async download(
    endpoint: string,
    config: RequestConfig = {}
  ): Promise<Blob> {
    const { showErrorToast = true, ...axiosConfig } = config;

    try {
      const response = await axios.get(`${this.apiUrl}${endpoint}`, {
        ...axiosConfig,
        responseType: "blob",
      });
      return response.data;
    } catch (error) {
      return this.handleError(error as AxiosError<ApiResponse>, showErrorToast);
    }
  }
}

export default BaseService;
