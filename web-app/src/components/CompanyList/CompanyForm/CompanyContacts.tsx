import React, { useState, Fragment, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Drawer } from "@mui/material";
import GridListView from "../../../shared/components/GridList/GridListView";
import ContactService from "../../../services/contact.service";
import toast from "../../../utils/toast.util";
import ContactConfig from "../../Contacts/ContactList/contact.config";
import { MenuItem } from "../../../shared/models/MenuItem";
import AddContact from "../../Contacts/ContactList/AddContact";
import GridActionMenu from "../../../shared/components/GridList/GridActionMenu";

const CompanyContactList = () => {
  const { id } = useParams();
  let navigate = useNavigate();
  const [mainMenus, setMainMenus] = useState<MenuItem[]>(
    ContactConfig.mainMenus
  );
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [addDrawer, setAddDrawer] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  // const defaultFilters = undefined; 
  const defaultFilters = [{ field: 'companyId', operator: 'eq', value: id }];

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
    setAddDrawer(true);
    // navigate(`/app/contact/create`);
  };

  const closeDrawer = () => {
    setAddDrawer(false);
  };

  const onAddSuccess = () => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    <Fragment>
      <GridListView
        options={ContactConfig}
        defaultFilters={defaultFilters}
        refreshKey={refreshKey}
        searchPlaceholder="Search contacts..."
        title="Contact List"
      >
        <Button
          className="blue-btn"
          type="button"
          size="large"
          variant="contained"
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

export default CompanyContactList;
