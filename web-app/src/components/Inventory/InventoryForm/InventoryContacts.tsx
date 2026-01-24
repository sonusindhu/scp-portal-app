import React, { Fragment } from "react";

import { useParams, useNavigate } from "react-router-dom";

import GridListView from "../../../shared/components/GridList/GridListView";
import GridActionMenu from "../../../shared/components/GridList/GridActionMenu";
import ContactService from "../../../services/contact.service";
import ContactConfig from "../../Contacts/ContactList/contact.config";
import { useDeleteConfirmation, useGridActions, useRefresh } from "../../../hooks";

const CompanyContactList = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { refreshKey, refresh } = useRefresh();

  const defaultFilters = [{ field: 'companyId', operator: 'contains', value: id }];

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

  const onCreate = () => {
    navigate(`/app/contact/create`);
  };

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
          className="blue-btn m-r-20"
          type="button"
          size="large"
          variant="default"
          onClick={onCreate}
        >
          Create
        </Button>
        <GridActionMenu
          className="heading-menu"
          menus={mainMenus}
          menuCallback={menuCallbackFun}
        />
      </GridListView>
    </Fragment>
  );
};

export default CompanyContactList;
