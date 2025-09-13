import React, { useState, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Drawer } from "@mui/material";

import InventoryService from "../../../services/inventory.service";

import toast from "../../../utils/toast.util";
import InventoryConfig from "./inventory.config";
import GridListView from "../../../shared/components/GridList/GridListView";
import { MenuItem } from "../../../shared/models/MenuList.model";
import AddInventory from "./AddInventory";
import GridActionMenu from "../../../shared/components/GridList/GridActionMenu";

const InventoryList = () => {
  let navigate = useNavigate();
  const [mainMenus, setMainMenus] = useState<MenuItem[]>(
    InventoryConfig.mainMenus
  );
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [addDrawer, setAddDrawer] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const deleteAction = (ids: number[]) => (
    <Fragment>
      <Button onClick={() => confirmDelete(ids)}>Confirm</Button>
      <Button onClick={() => toast.close()}>Close</Button>
    </Fragment>
  );

  const confirmDelete = (ids: number[]) => {
    toast.close();
    InventoryService.deleteInventories(ids)
      .then(({ message }) => {
        toast.success(message);
        setRefreshKey((prev) => prev + 1);
      })
      .catch(({ message }) => {
        toast.error(message);
      });
  };

  const deleteInventory = (ids: number[]) => {
    toast.warning("Are you sure, you want to delete?", {
      action: () => deleteAction(ids),
    });
  };

  const closeDrawer = () => {
    setAddDrawer(false);
  };

  const onAddSuccess = () => {
    setRefreshKey((prev) => prev + 1);
  };

  const onCreate = () => {
    setAddDrawer(true);
    // navigate(`/app/inventory/create`);
  };

  const menuCallbackFun = ({ event, data, menu }) => {
    switch (menu?.key) {
      case "create":
        navigate(`/app/inventory/create`);
        break;
      case "delete":
        deleteInventory([data.id]);
        break;
      case "deletes":
        selectedIds.length && deleteInventory(selectedIds);
        break;
      case "edit":
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

  return (
    <Fragment>
      <GridListView
        options={InventoryConfig}
        refreshKey={refreshKey}
        searchPlaceholder="Search inventory..."
        title="Inventory List"
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
        <AddInventory onCloseDrawer={closeDrawer} onAddSuccess={onAddSuccess} />
      </Drawer>
    </Fragment>
  );
};

export default InventoryList;
