import { useState, useCallback } from "react";

/**
 * Custom hook for managing drawer state
 * Provides open/close methods and state for Material-UI Drawers
 * 
 * @example
 * const { isOpen, openDrawer, closeDrawer } = useDrawer();
 */
export const useDrawer = (initialState = false) => {
  const [isOpen, setIsOpen] = useState(initialState);

  const openDrawer = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeDrawer = useCallback(() => {
    setIsOpen(false);
  }, []);

  const toggleDrawer = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  return {
    isOpen,
    openDrawer,
    closeDrawer,
    toggleDrawer,
  };
};
