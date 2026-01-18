import React, { Fragment } from "react";

import GridListView from "../../shared/components/GridList/GridListView";
import CompanyService from "../../services/company.service";
import CompanyConfig from "./company.config";
import AddCompany from "./AddCompany";
import GridActionMenu from "../../shared/components/GridList/GridActionMenu";
import { useDeleteConfirmation, useDrawer, useGridActions, useRefresh } from "../../hooks";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";

const CompanyList: React.FC = () => {
  // Use custom hooks for common patterns
  const { refreshKey, refresh } = useRefresh();
  const { isOpen: addDrawer, openDrawer: onCreate, closeDrawer } = useDrawer();

  // Delete confirmation with automatic toast handling
  const { deleteWithConfirmation } = useDeleteConfirmation({
    onDelete: async (ids) => {
      const response = await CompanyService.deleteCompanies(ids);
      if (response.status) {
        refresh();
      }
    },
  });

  // Grid actions (edit, delete, row selection)
  const { menuCallbackFun, mainMenus } = useGridActions({
    onDelete: deleteWithConfirmation,
    editRoute: (id) => `/app/company/${id}/details`,
    mainMenus: CompanyConfig.mainMenus,
  });

  const onAddSuccess = () => {
    refresh();
  };

  // Create config with menuCallback
  const configWithCallback = {
    ...CompanyConfig,
    columnDefs: CompanyConfig.getColumnDefs(menuCallbackFun),
  };

  return (
    <Fragment>
      <GridListView
        options={configWithCallback}
        refreshKey={refreshKey}
        searchPlaceholder="Search companies..."
        title="Company List"
      >
        <Button
          className="blue-btn"
          type="button"
          size="lg"
          variant="default"
          onClick={onCreate}
          aria-label="Create company"
        >
          Create
        </Button>
        <GridActionMenu
          className="heading-menu"
          menus={mainMenus}
          menuCallback={menuCallbackFun}
        />
      </GridListView>
      <Sheet open={addDrawer} onOpenChange={(open) => !open && closeDrawer()}>
        <SheetContent side="right">
          <AddCompany onCloseDrawer={closeDrawer} onAddSuccess={onAddSuccess} />
        </SheetContent>
      </Sheet>
    </Fragment>
  );
};

export default CompanyList;
