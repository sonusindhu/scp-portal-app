import React, { Fragment } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";

import InventoryService from "../../../services/inventory.service";
import InventoryConfig from "./inventory.config";
import GridListView from "../../../shared/components/GridList/GridListView";
import GridActionMenu from "../../../shared/components/GridList/GridActionMenu";
import AddInventory from "./AddInventory";
import { useDeleteConfirmation, useDrawer, useGridActions, useRefresh } from "../../../hooks";

const InventoryList = () => {
  const { refreshKey, refresh } = useRefresh();
  const { isOpen: addDrawer, openDrawer, closeDrawer } = useDrawer();
  
  const { deleteWithConfirmation } = useDeleteConfirmation({
    onDelete: async (ids) => {
      await InventoryService.deleteInventories(ids);
    },
    onSuccess: refresh,
  });

  const { menuCallbackFun, mainMenus, selectedIds } = useGridActions({
    mainMenus: InventoryConfig.mainMenus,
    editRoute: (id) => `/app/inventory/${id}/details`,
    onDelete: deleteWithConfirmation,
  });

  const onAddSuccess = () => {
    refresh();
  };

  // Create config with menuCallback
  const configWithCallback = {
    ...InventoryConfig,
    columnDefs: InventoryConfig.getColumnDefs(menuCallbackFun),
  };

  return (
    <Fragment>
      <GridListView
        options={configWithCallback}
        refreshKey={refreshKey}
        searchPlaceholder="Search inventory..."
        title="Inventory List"
      >
        <Button
          className="blue-btn"
          type="button"
          size="lg"
          variant="default"
          onClick={openDrawer}
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
          <AddInventory onCloseDrawer={closeDrawer} onAddSuccess={onAddSuccess} />
        </SheetContent>
      </Sheet>
    </Fragment>
  );
};

export default InventoryList;
