import React, { useState, useEffect, Fragment, useRef } from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AgGridReact } from "@ag-grid-community/react";

import GridListView from "../../shared/components/GridListView";
import PageHeading from "../../shared/components/PageHeading";
import AuthService from "../../services/auth.service";
import ContactService from "../../services/contact.service";
import toast from "../../utils/toast.util";
import ContactConfig from "./contact.config";

const ContactList = () => {
  let navigate = useNavigate();
  const gridRed = useRef<AgGridReact>(null);
  const [mainMenus, setMainMenus] = useState<any[]>(ContactConfig.mainMenus);
  const [selectedIds, setSelectedIds] = useState<any[]>([]);

  const deleteAction = (ids) => (
    <Fragment>
      <Button onClick={() => confirmDelete(ids)}>Confirm</Button>
      <Button onClick={() => toast.close()}>Close</Button>
    </Fragment>
  );

  const confirmDelete = (ids) => {
    toast.close();
    ContactService.deleteContacts(ids)
      .then((response) => {
        toast.success(response.message);
        gridRed.current?.api?.refreshServerSideStore();
      })
      .catch((error) => {
        toast.error(error?.message);
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
        const menus = mainMenus.map((menu) => {
          if (!menu.alwaysEnable) menu.disabled = data.length === 0;
          return menu;
        });
        setMainMenus(menus);
        break;
    }
  };

  const user = AuthService.getCurrentUser();
  useEffect(() => {
    if (!user) navigate("/auth/login");
  }, []);
  if (!user) return <></>;

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
