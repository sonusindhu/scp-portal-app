import React, { useState, useEffect, Fragment, useRef } from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AgGridReact } from "@ag-grid-community/react";

import GridListView from "../../shared/components/GridListView";
import PageHeading from "../../shared/components/PageHeading";
import ContactService from "../../services/contact.service";
import toast from "../../utils/toast.util";
import ContactConfig from "./contact.config";
import { MenuItem } from "../../shared/models/MenuItem";

const ContactList = () => {
  let navigate = useNavigate();
  const gridRed = useRef<AgGridReact>(null);
  const [mainMenus, setMainMenus] = useState<MenuItem[]>(ContactConfig.mainMenus);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const deleteAction = (ids) => (
    <Fragment>
      <Button onClick={() => confirmDelete(ids)}>Confirm</Button>
      <Button onClick={() => toast.close()}>Close</Button>
    </Fragment>
  );

  const confirmDelete = (ids) => {
    toast.close();
    ContactService.deleteContacts(ids)
      .then(({ message }) => {
        toast.success(message);
        gridRed.current?.api?.refreshServerSideStore();
      })
      .catch(({ message }) => {
        toast.error(message);
      });
  };

  const deleteContact = (ids) => {
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

  return (
    <Fragment>
      <PageHeading
        title="Contact List"
        menus={mainMenus}
        menuCallback={menuCallbackFun}
      />

      <GridListView
        innerRef={gridRed}
        options={ContactConfig}
        callbackFun={menuCallbackFun}
      />
    </Fragment>
  );
};

export default ContactList;
