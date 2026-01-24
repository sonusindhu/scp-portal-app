import React, { Fragment } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import GridListView from "../../../shared/components/GridList/GridListView";
import ContactService from "../../../services/contact.service";
import ContactConfig from "../../Contacts/ContactList/contact.config";
import AddContact from "../../Contacts/ContactList/AddContact";
import GridActionMenu from "../../../shared/components/GridList/GridActionMenu";
import { useDeleteConfirmation, useDrawer, useGridActions, useRefresh } from "../../../hooks";

const CompanyContactList: React.FC = () => {
  const { id } = useParams();
  const { refreshKey, refresh } = useRefresh();
  const { isOpen: addDrawer, openDrawer, closeDrawer } = useDrawer();

  const defaultFilters = [{ field: 'companyId', operator: 'eq', value: id }];

  const { deleteWithConfirmation } = useDeleteConfirmation({
    onDelete: async (ids) => {
      await ContactService.deleteContacts(ids);
    },
    onSuccess: refresh,
  });

  const { menuCallbackFun, mainMenus, selectedIds } = useGridActions({
    mainMenus: ContactConfig.mainMenus,
    editRoute: (id) => `/app/contact/${id}/edit`,
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
        options={configWithCallback}
        defaultFilters={defaultFilters}
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

export default CompanyContactList;
