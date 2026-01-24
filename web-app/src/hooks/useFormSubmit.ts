import { useCallback } from "react";
import toast from "../utils/toast.util";
import { ResponseModel } from "../models/common.model";

interface UseFormSubmitOptions {
  onSuccess?: (response?: ResponseModel) => void;
  onError?: (error?: any) => void;
  successMessage?: string;
}

/**
 * Custom hook for handling form submissions with consistent error/success handling
 * Provides standardized toast notifications and callbacks
 * 
 * @example
 * const { handleSubmit, isSubmitting } = useFormSubmit({
 *   onSuccess: () => {
 *     refresh();
 *     closeDrawer();
 *   }
 * });
 * 
 * const onSubmit = async (data) => {
 *   await handleSubmit(() => CompanyService.create(data));
 * };
 */
export const useFormSubmit = ({
  onSuccess,
  onError,
  successMessage,
}: UseFormSubmitOptions = {}) => {
  
  const handleSubmit = useCallback(async (
    submitFn: () => Promise<ResponseModel | any>
  ): Promise<boolean> => {
    try {
      const response = await submitFn();
      
      // Handle ResponseModel pattern
      if (response && typeof response === 'object' && 'status' in response) {
        if (response.status) {
          // Success toast already shown by BaseService if configured
          onSuccess?.(response);
          return true;
        } else {
          // Error case - service should handle toast, but fallback just in case
          if (!response.message) {
            toast.error("Operation failed");
          }
          onError?.(response);
          return false;
        }
      }
      
      // Handle direct success (no ResponseModel wrapper)
      // Only show toast if successMessage is explicitly provided
      if (successMessage) {
        toast.success(successMessage);
      }
      onSuccess?.(response);
      return true;
      
    } catch (error: any) {
      // Error toast already shown by BaseService in most cases
      onError?.(error);
      return false;
    }
  }, [onSuccess, onError, successMessage]);

  return {
    handleSubmit,
  };
};
