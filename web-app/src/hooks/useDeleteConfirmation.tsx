import React, { useCallback, Fragment } from "react";
import { Button } from "@mui/material";
import toast from "../utils/toast.util";

interface UseDeleteConfirmationOptions {
  onDelete: (ids: number[]) => Promise<void>;
  onSuccess?: () => void;
  confirmMessage?: string;
}

/**
 * Custom hook for handling delete confirmation dialogs
 * Provides consistent delete confirmation pattern across the app
 * 
 * @example
 * const { deleteWithConfirmation } = useDeleteConfirmation({
 *   onDelete: async (ids) => await CompanyService.deleteCompanies(ids),
 *   onSuccess: () => setRefreshKey(prev => prev + 1)
 * });
 */
export const useDeleteConfirmation = ({
  onDelete,
  onSuccess,
  confirmMessage = "Are you sure, you want to delete?",
}: UseDeleteConfirmationOptions) => {
  const confirmDelete = useCallback(async (ids: number[]) => {
    toast.close();
    try {
      await onDelete(ids);
      onSuccess?.();
    } catch (error) {
      console.error("Failed to delete:", error);
    }
  }, [onDelete, onSuccess]);

  const deleteAction = useCallback((ids: number[]) => (
    <Fragment>
      <Button onClick={() => confirmDelete(ids)} aria-label="Confirm delete">
        Confirm
      </Button>
      <Button onClick={() => toast.close()} aria-label="Close dialog">
        Close
      </Button>
    </Fragment>
  ), [confirmDelete]);

  const deleteWithConfirmation = useCallback((ids: number[]) => {
    toast.warning(confirmMessage, {
      action: () => deleteAction(ids),
    });
  }, [confirmMessage, deleteAction]);

  return {
    deleteWithConfirmation,
    confirmDelete,
  };
};
