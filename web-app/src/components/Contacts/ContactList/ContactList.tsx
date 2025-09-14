import React, { useState, useCallback, Fragment, useRef, useEffect } from "react";
import { Button, Drawer } from "@mui/material";
import { useNavigate } from "react-router-dom";

import GridListView from "../../../shared/components/GridList/GridListView";
import ContactService from "../../../services/contact.service";
import toast from "../../../utils/toast.util";
import ContactConfig from "./contact.config";
import { MenuItem } from "../../../shared/models/MenuItem";
import AddContact from "./AddContact";
import GridActionMenu from "../../../shared/components/GridList/GridActionMenu";

interface MenuCallbackArgs {
  event: React.MouseEvent;
  data: any;
  menu: MenuItem;
}

const ContactList: React.FC = () => {
  const navigate = useNavigate();
  const gridRef = useRef<any>(null);
  const [mainMenus, setMainMenus] = useState<MenuItem[]>(ContactConfig.mainMenus);
  const [selectedRows, setSelectedRows] = useState<any[]>([]);
  const [addDrawer, setAddDrawer] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const confirmDelete = useCallback((ids: number[]) => {
    toast.close();
    ContactService.deleteContacts(ids)
      .then(({ message }) => {
        toast.success(message);
        setRefreshKey((prev) => prev + 1);
      })
      .catch(({ message }) => {
        toast.error(message);
      });
  }, []);

  const deleteAction = useCallback((ids: number[]) => (
    <Fragment>
      <Button onClick={() => confirmDelete(ids)} aria-label="Confirm delete">Confirm</Button>
      <Button onClick={() => toast.close()} aria-label="Close dialog">Close</Button>
    </Fragment>
  ), [confirmDelete]);

  const deleteContact = useCallback((ids: number[]) => {
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

  const menuCallbackFun = useCallback(({ event, data, menu }: MenuCallbackArgs) => {
    switch (menu?.key) {
      case "create":
        navigate(`/app/contact/create`);
        break;
      case "delete":
        deleteContact([data.id]);
        break;
      case "deletes":
        selectedRows.length && deleteContact(selectedRows.map((row) => row.id));
        break;
      case "edit":
        navigate(`/app/contact/${data.id}/general`);
        break;
    }
  }, [navigate, deleteContact, selectedRows]);

  useEffect(() => {
    setMainMenus((prevMenus) =>
      prevMenus.map((menu) => {
        if (!menu.alwaysEnable) menu.disabled = selectedRows.length === 0;
        return menu;
      })
    );
  }, [selectedRows]);

  return (
    <Fragment>
      <GridListView
        ref={gridRef}
        options={ContactConfig}
        refreshKey={refreshKey}
        searchPlaceholder="Search contacts..."
        title="Contact List"
        onRowSelectionChange={setSelectedRows}
      >
        <Button
          className="blue-btn"
          type="button"
          size="large"
          variant="contained"
          onClick={onCreate}
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
      <Drawer
        anchor="right"
        open={addDrawer}
        onClose={closeDrawer}
        ModalProps={{ disableEnforceFocus: true }}
      >
        <AddContact onCloseDrawer={closeDrawer} onAddSuccess={onAddSuccess} />
      </Drawer>
    </Fragment>
  );
};

export default ContactList;
