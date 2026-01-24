import React, { Fragment } from "react";

import QuoteService from "../../../services/quote.service";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import QuoteConfig from "./quote.config";
import GridListView from "../../../shared/components/GridList/GridListView";
import GridActionMenu from "../../../shared/components/GridList/GridActionMenu";
import AddQuote from "./AddQuote";
import { useDeleteConfirmation, useDrawer, useGridActions, useRefresh } from "../../../hooks";

const QuoteList: React.FC = () => {
  const { refreshKey, refresh } = useRefresh();
  const { isOpen: addDrawer, openDrawer, closeDrawer } = useDrawer();
  
  const { deleteWithConfirmation } = useDeleteConfirmation({
    onDelete: async (ids) => {
      await QuoteService.deleteRange(ids);
    },
    onSuccess: refresh,
  });

  const { menuCallbackFun, mainMenus, selectedIds } = useGridActions({
    mainMenus: QuoteConfig.mainMenus,
    editRoute: (id) => `/app/quote/${id}/details`,
    onDelete: deleteWithConfirmation,
  });

  const onAddSuccess = () => {
    refresh();
  };

  // Create config with menuCallback
  const configWithCallback = {
    ...QuoteConfig,
    columnDefs: QuoteConfig.getColumnDefs(menuCallbackFun),
  };

  return (
    <Fragment>
      <GridListView
        title="Quote List"
        searchPlaceholder="Search quotes..."
        options={configWithCallback}
        refreshKey={refreshKey}
        globalFilterFields={QuoteConfig.globalFilterFields}
      >
        <Button
          className="blue-btn"
          type="button"
          size="lg"
          variant="default"
          onClick={openDrawer}
          aria-label="Create quote"
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
          <AddQuote onCloseDrawer={closeDrawer} onAddSuccess={onAddSuccess} />
        </SheetContent>
      </Sheet>
    </Fragment>
  );
};

export default QuoteList;
