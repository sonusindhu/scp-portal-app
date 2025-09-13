import React, { useState, useEffect, Fragment, useRef } from "react";
import { Button } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { AgGridReact } from "@ag-grid-community/react";

import GridListView from "../../../shared/components/GridList/GridListView";
import PageHeading from "../../../shared/components/PageHeading/PageHeading";
import ContactService from "../../../services/contact.service";
import toast from "../../../utils/toast.util";
import ContactConfig from "../../Contacts/ContactList/contact.config";
import { MenuItem } from "../../../shared/models/MenuItem";

const CompanyContactList = () => {
  const { id } = useParams();
  let navigate = useNavigate();
  const gridRef = useRef<AgGridReact>(null);
  const [mainMenus, setMainMenus] = useState<MenuItem[]>(
    ContactConfig.mainMenus
  );
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [refreshKey, setRefreshKey] = useState(0);

  // const defaultFilters = undefined; 
  const defaultFilters = [{ field: 'companyId', operator: 'contains', value: id }];

  const deleteAction = (ids: number[]) => (
    <Fragment>
      <Button onClick={() => confirmDelete(ids)}>Confirm</Button>
      <Button onClick={() => toast.close()}>Close</Button>
    </Fragment>
  );

  const confirmDelete = (ids: number[]) => {
    toast.close();
    ContactService.deleteContacts(ids)
      .then(({ message }) => {
        toast.success(message);
        setRefreshKey(prev => prev + 1);
      })
      .catch(({ message }) => {
        toast.error(message);
      });
  };

  const deleteContact = (ids: number[]) => {
    toast.warning("Are you sure, you want to delete?", {
      action: () => deleteAction(ids),
    });
  };

  const menuCallbackFun = ({ event, data, menu }) => {
    switch (menu?.key) {
      case "create":
        navigate(`/app/contact/create`);
        break;
      case "delete":
        deleteContact([data.id]);
        break;
      case "deletes":
        selectedIds.length && deleteContact(selectedIds);
        break;
      case "edit":
        navigate(`/app/contact/${data.id}/edit`);
        break;
      case "selectRow":
        setSelectedIds(data);
        const menus = mainMenus.map((menu: MenuItem) => {
          if (!menu.alwaysEnable) menu.disabled = data.length === 0;
          return menu;
        });
        setMainMenus(menus);
        break;
    }
  };

  const onCreate = () => {
    navigate(`/app/contact/create`);
  };

  const onAddSuccess = () => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    <Fragment>
      <PageHeading
        title="Contact List"
        menus={mainMenus}
        menuCallback={menuCallbackFun}
      >
        <Button
          className="blue-btn m-r-20"
          type="button"
          size="large"
          variant="contained"
          onClick={onCreate}
        >
          Create
        </Button>
      </PageHeading>

      <GridListView
        innerRef={gridRef}
        options={ContactConfig}
        defaultFilters={defaultFilters}
        callbackFun={menuCallbackFun}
        refreshKey={refreshKey}
      />
    </Fragment>
  );
};

export default CompanyContactList;
