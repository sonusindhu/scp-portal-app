/**
 * CUSTOM HOOKS USAGE GUIDE
 * 
 * This file demonstrates how to use the custom hooks in your components
 */

import React, { Fragment } from "react";
import { Button, Drawer } from "@mui/material";
import { useAuth, useDeleteConfirmation, useDrawer, useGridActions, useRefresh } from "../../hooks";
import CompanyService from "../../services/company.service";
import CompanyConfig from "./company.config";

// ============================================================================
// BEFORE: Without Custom Hooks (Original CompanyList)
// ============================================================================
/*
const CompanyListOld: React.FC = () => {
  const navigate = useNavigate();
  const [mainMenus, setMainMenus] = useState<MenuItem[]>(CompanyConfig.mainMenus);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [addDrawer, setAddDrawer] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const confirmDelete = useCallback(async (ids: number[]) => {
    toast.close();
    try {
      const response = await CompanyService.deleteCompanies(ids);
      if (response.status) {
        setRefreshKey((prev) => prev + 1);
      }
    } catch (error) {
      console.error("Failed to delete companies:", error);
    }
  }, []);

  const deleteAction = useCallback((ids: number[]) => (
    <Fragment>
      <Button onClick={() => confirmDelete(ids)}>Confirm</Button>
      <Button onClick={() => toast.close()}>Close</Button>
    </Fragment>
  ), [confirmDelete]);

  const deleteCompany = useCallback((ids: number[]) => {
    toast.warning("Are you sure, you want to delete?", {
      action: () => deleteAction(ids),
    });
  }, [deleteAction]);

  const onCreate = useCallback(() => {
    setAddDrawer(true);
  }, []);

  const closeDrawer = useCallback(() => {
    setAddDrawer(false);
  }, []);

  const onAddSuccess = useCallback(() => {
    setRefreshKey((prev) => prev + 1);
  }, []);

  const menuCallbackFun = useCallback(({ event, data, menu }) => {
    switch (menu?.key) {
      case "delete":
        deleteCompany([data.id]);
        break;
      case "deletes":
        selectedIds.length && deleteCompany(selectedIds);
        break;
      case "edit":
        navigate(`/app/company/${data.id}/details`);
        break;
      case "selectRow":
        setSelectedIds(data);
        setMainMenus(prevMenus => prevMenus.map((menu) => {
          if (!menu.alwaysEnable) menu.disabled = data.length === 0;
          return menu;
        }));
        break;
    }
  }, [navigate, deleteCompany, selectedIds]);

  // ... rest of component (80+ lines total)
};
*/

// ============================================================================
// AFTER: With Custom Hooks (New CompanyList)
// ============================================================================

const CompanyListNew: React.FC = () => {
  // ✅ Use custom hooks - much cleaner and reusable!
  const { refreshKey, refresh } = useRefresh();
  const { isOpen: addDrawer, openDrawer: onCreate, closeDrawer } = useDrawer();

  const { deleteWithConfirmation } = useDeleteConfirmation({
    onDelete: async (ids) => {
      const response = await CompanyService.deleteCompanies(ids);
      if (response.status) refresh();
    },
  });

  const { menuCallbackFun, mainMenus } = useGridActions({
    onDelete: deleteWithConfirmation,
    editRoute: (id) => `/app/company/${id}/details`,
    mainMenus: CompanyConfig.mainMenus,
  });

  const onAddSuccess = () => refresh();

  // ... rest of component (40 lines instead of 80+ lines!)
};

// ============================================================================
// HOOK 1: useAuth - Authentication Management
// ============================================================================

// Usage in App.tsx or any component
const AppExample = () => {
  const { currentUser, isAuthenticated, isLoading, logout } = useAuth();

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      {isAuthenticated ? (
        <>
          <div>Welcome, {currentUser?.name}</div>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <div>Please login</div>
      )}
    </div>
  );
};

// Usage in Login component
const LoginExample = () => {
  const { login } = useAuth();

  const handleLogin = async (email: string, password: string) => {
    const result = await login(email, password);
    if (result.success) {
      console.log("Login successful!");
    } else {
      console.error("Login failed:", result.error);
    }
  };

  return <button onClick={() => handleLogin("user@example.com", "password")}>Login</button>;
};

// ============================================================================
// HOOK 2: useDeleteConfirmation - Delete with Confirmation
// ============================================================================

const DeleteExample = () => {
  const { refreshKey, refresh } = useRefresh();

  const { deleteWithConfirmation } = useDeleteConfirmation({
    onDelete: async (ids) => {
      await CompanyService.deleteCompanies(ids);
      refresh(); // Refresh the list after delete
    },
    confirmMessage: "Delete these companies?", // Optional custom message
  });

  return (
    <button onClick={() => deleteWithConfirmation([1, 2, 3])}>
      Delete Companies
    </button>
  );
};

// ============================================================================
// HOOK 3: useDrawer - Drawer State Management
// ============================================================================

const DrawerExample = () => {
  const { isOpen, openDrawer, closeDrawer, toggleDrawer } = useDrawer();

  return (
    <>
      <button onClick={openDrawer}>Open Drawer</button>
      <button onClick={toggleDrawer}>Toggle Drawer</button>

      <Drawer anchor="right" open={isOpen} onClose={closeDrawer}>
        <div>Drawer content here</div>
      </Drawer>
    </>
  );
};

// ============================================================================
// HOOK 4: useRefresh - Refresh State Management
// ============================================================================

const RefreshExample = () => {
  const { refreshKey, refresh } = useRefresh();

  const handleCreate = async () => {
    await CompanyService.create({ name: "New Company" });
    refresh(); // Triggers re-fetch in GridListView
  };

  return (
    <>
      <button onClick={handleCreate}>Create Company</button>
      {/* GridListView will re-fetch when refreshKey changes */}
      <GridListView refreshKey={refreshKey} />
    </>
  );
};

// ============================================================================
// HOOK 5: useGridActions - Grid Action Management
// ============================================================================

const GridActionsExample = () => {
  const { deleteWithConfirmation } = useDeleteConfirmation({
    onDelete: async (ids) => await CompanyService.deleteCompanies(ids),
  });

  const { menuCallbackFun, selectedIds, mainMenus } = useGridActions({
    onDelete: deleteWithConfirmation,
    editRoute: (id) => `/app/company/${id}/details`,
    mainMenus: CompanyConfig.mainMenus,
  });

  // Create config with menuCallback
  const configWithCallback = {
    ...CompanyConfig,
    columnDefs: CompanyConfig.getColumnDefs(menuCallbackFun),
  };

  return (
    <>
      <div>Selected: {selectedIds.length} items</div>
      <GridListView options={configWithCallback} />
    </>
  );
};

// ============================================================================
// COMBINING MULTIPLE HOOKS
// ============================================================================

const CompleteExample = () => {
  // Authentication
  const { currentUser, isAuthenticated } = useAuth();

  // Refresh management
  const { refreshKey, refresh } = useRefresh();

  // Drawer management
  const { isOpen: addDrawer, openDrawer, closeDrawer } = useDrawer();

  // Delete confirmation
  const { deleteWithConfirmation } = useDeleteConfirmation({
    onDelete: async (ids) => {
      await CompanyService.deleteCompanies(ids);
      refresh();
    },
  });

  // Grid actions
  const { menuCallbackFun, mainMenus, selectedIds } = useGridActions({
    onDelete: deleteWithConfirmation,
    editRoute: (id) => `/app/company/${id}/details`,
    mainMenus: CompanyConfig.mainMenus,
  });

  // Now your component is much cleaner!
  const configWithCallback = {
    ...CompanyConfig,
    columnDefs: CompanyConfig.getColumnDefs(menuCallbackFun),
  };

  if (!isAuthenticated) return <div>Please login</div>;

  return (
    <Fragment>
      <div>Welcome, {currentUser?.name}</div>
      <button onClick={openDrawer}>Create Company</button>
      <div>Selected: {selectedIds.length} items</div>

      <GridListView
        options={configWithCallback}
        refreshKey={refreshKey}
        title="Company List"
      />

      <Drawer open={addDrawer} onClose={closeDrawer}>
        <div>Add company form here</div>
      </Drawer>
    </Fragment>
  );
};

// ============================================================================
// BENEFITS OF USING CUSTOM HOOKS
// ============================================================================
/*
1. ✅ Code Reusability: Same logic used across multiple components
2. ✅ Cleaner Components: Less boilerplate, easier to read
3. ✅ Separation of Concerns: Business logic separated from UI
4. ✅ Easier Testing: Test hooks independently
5. ✅ Consistent Patterns: Same behavior across the app
6. ✅ Type Safety: Full TypeScript support
7. ✅ Easy Maintenance: Update logic in one place

BEFORE (without hooks):
- 80+ lines of boilerplate per component
- Repeated state management logic
- Harder to test and maintain

AFTER (with hooks):
- 40 lines per component
- Reusable logic
- Easy to test and maintain
*/
