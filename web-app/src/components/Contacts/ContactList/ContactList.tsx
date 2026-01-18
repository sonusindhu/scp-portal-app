import React, { Fragment, useRef } from "react";


import GridListView from "../../../shared/components/GridList/GridListView";
import GridActionMenu from "../../../shared/components/GridList/GridActionMenu";
import ContactService from "../../../services/contact.service";
import ContactConfig from "./contact.config";
import AddContact from "./AddContact";
import { useDeleteConfirmation, useDrawer, useGridActions, useRefresh } from "../../../hooks";

const ContactList: React.FC = () => {
  const gridRef = useRef<any>(null);
  const { refreshKey, refresh } = useRefresh();
  const { isOpen: addDrawer, openDrawer, closeDrawer } = useDrawer();
  
  const { deleteWithConfirmation } = useDeleteConfirmation({
    onDelete: async (ids) => {
      await ContactService.deleteContacts(ids);
    },
    onSuccess: refresh,
  });

  const { menuCallbackFun, mainMenus, selectedIds } = useGridActions({
    mainMenus: ContactConfig.mainMenus,
    editRoute: (id) => `/app/contact/${id}/details`,
    onDelete: deleteWithConfirmation,
  });

  const onAddSuccess = () => {
    refresh();
  };

  // Create config with menuCallback
  const configWithCallback = {
    ...ContactConfig,
    columnDefs: ContactConfig.getColumnDefs(menuCallbackFun),
  };

  return (
    <Fragment>
      <GridListView
        ref={gridRef}
        options={configWithCallback}
        refreshKey={refreshKey}
        searchPlaceholder="Search contacts..."
        title="Contact List"
      >
        <Button
          className="blue-btn"
          type="button"
          size="lg"
          variant="default"
          onClick={openDrawer}
          aria-label="Create contact"
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
          <AddContact onCloseDrawer={closeDrawer} onAddSuccess={onAddSuccess} />
        </SheetContent>
      </Sheet>
    </Fragment>
  );
};

export default ContactList;
