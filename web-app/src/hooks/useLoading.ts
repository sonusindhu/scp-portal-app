/**
 * Custom hook for managing loading states
 * Provides a simple API for tracking async operations
 */

import { useState, useCallback } from "react";

interface UseLoadingOptions {
  initialState?: boolean;
}

interface UseLoadingReturn {
  isLoading: boolean;
  startLoading: () => void;
  stopLoading: () => void;
  withLoading: <T>(promise: Promise<T>) => Promise<T>;
}

/**
 * useLoading Hook
 * 
 * @example
 * const { isLoading, withLoading } = useLoading();
 * 
 * const loadData = async () => {
 *   await withLoading(fetchData());
 * };
 * 
 * return <LoadingButton loading={isLoading} onClick={loadData}>Submit</LoadingButton>
 */
export const useLoading = (options: UseLoadingOptions = {}): UseLoadingReturn => {
  const { initialState = false } = options;
  const [isLoading, setIsLoading] = useState(initialState);

  const startLoading = useCallback(() => {
    setIsLoading(true);
  }, []);

  const stopLoading = useCallback(() => {
    setIsLoading(false);
  }, []);

  const withLoading = useCallback(async <T,>(promise: Promise<T>): Promise<T> => {
    setIsLoading(true);
    try {
      const result = await promise;
      return result;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    isLoading,
    startLoading,
    stopLoading,
    withLoading,
  };
};

/**
 * Multiple loading states hook
 * Use when you need to track multiple independent loading operations
 */
interface UseLoadingStatesReturn {
  loading: Record<string, boolean>;
  startLoading: (key: string) => void;
  stopLoading: (key: string) => void;
  isLoading: (key: string) => boolean;
  isAnyLoading: () => boolean;
}

/**
 * useLoadingStates Hook
 * 
 * @example
 * const { loading, startLoading, stopLoading } = useLoadingStates();
 * 
 * const handleSave = async () => {
 *   startLoading('save');
 *   await saveData();
 *   stopLoading('save');
 * };
 * 
 * return <LoadingButton loading={loading.save} onClick={handleSave}>Save</LoadingButton>
 */
export const useLoadingStates = (): UseLoadingStatesReturn => {
  const [loading, setLoading] = useState<Record<string, boolean>>({});

  const startLoading = useCallback((key: string) => {
    setLoading((prev) => ({ ...prev, [key]: true }));
  }, []);

  const stopLoading = useCallback((key: string) => {
    setLoading((prev) => ({ ...prev, [key]: false }));
  }, []);

  const isLoading = useCallback((key: string) => {
    return loading[key] || false;
  }, [loading]);

  const isAnyLoading = useCallback(() => {
    return Object.values(loading).some((val) => val);
  }, [loading]);

  return {
    loading,
    startLoading,
    stopLoading,
    isLoading,
    isAnyLoading,
  };
};
