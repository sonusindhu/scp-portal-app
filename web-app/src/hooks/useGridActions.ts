import { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MenuItem } from "../shared/models/MenuItem";

interface UseGridActionsOptions<T = any> {
  onDelete: (ids: number[]) => void;
  editRoute: (id: number) => string;
  mainMenus: MenuItem[];
}

/**
 * Custom hook for managing grid actions (edit, delete, row selection)
 * Provides common functionality used across list components
 * 
 * @example
 * const { menuCallbackFun, selectedIds, mainMenus } = useGridActions({
 *   onDelete: deleteCompany,
 *   editRoute: (id) => `/app/company/${id}/details`,
 *   mainMenus: CompanyConfig.mainMenus
 * });
 */
export const useGridActions = <T = any>({
  onDelete,
  editRoute,
  mainMenus: initialMenus,
}: UseGridActionsOptions<T>) => {
  const navigate = useNavigate();
  const [mainMenus, setMainMenus] = useState<MenuItem[]>(initialMenus);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [selectedRows, setSelectedRows] = useState<T[]>([]);

  // Update menu disabled state when selection changes
  useEffect(() => {
    setMainMenus((prevMenus) =>
      prevMenus.map((menu) => {
        if (!menu.alwaysEnable) {
          menu.disabled = selectedIds.length === 0;
        }
        return menu;
      })
    );
  }, [selectedIds]);

  const menuCallbackFun = useCallback(
    ({ event, data, menu }: { event: React.MouseEvent; data: any; menu: MenuItem }) => {
      switch (menu?.key) {
        case "edit":
          navigate(editRoute(data.id));
          break;
        case "delete":
          onDelete([data.id]);
          break;
        case "deletes":
          if (selectedIds.length > 0) {
            onDelete(selectedIds);
          }
          break;
        case "selectRow":
          setSelectedIds(data);
          setMainMenus((prevMenus) =>
            prevMenus.map((menu) => {
              if (!menu.alwaysEnable) {
                menu.disabled = data.length === 0;
              }
              return menu;
            })
          );
          break;
      }
    },
    [navigate, onDelete, selectedIds, editRoute]
  );

  const handleRowSelectionChange = useCallback((rows: T[]) => {
    setSelectedRows(rows);
    setSelectedIds(rows.map((row: any) => row.id));
  }, []);

  return {
    menuCallbackFun,
    selectedIds,
    selectedRows,
    mainMenus,
    setSelectedIds,
    setSelectedRows,
    handleRowSelectionChange,
  };
};
