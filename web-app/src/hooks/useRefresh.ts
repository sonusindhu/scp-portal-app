import { useState, useCallback } from "react";

/**
 * Custom hook for managing component refresh state
 * Useful for triggering re-fetches in grid lists after CRUD operations
 * 
 * @example
 * const { refreshKey, refresh } = useRefresh();
 * 
 * // Use refreshKey as a dependency or prop
 * <GridListView refreshKey={refreshKey} />
 * 
 * // Call refresh after successful operations
 * await createCompany(data);
 * refresh();
 */
export const useRefresh = (initialValue = 0) => {
  const [refreshKey, setRefreshKey] = useState(initialValue);

  const refresh = useCallback(() => {
    setRefreshKey((prev) => prev + 1);
  }, []);

  const reset = useCallback(() => {
    setRefreshKey(0);
  }, []);

  return {
    refreshKey,
    refresh,
    reset,
  };
};
