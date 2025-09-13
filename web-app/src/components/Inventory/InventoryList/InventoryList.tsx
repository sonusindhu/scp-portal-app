import React, { useState, Fragment, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Drawer } from "@mui/material";

import PageHeading from "../../../shared/components/PageHeading/PageHeading";
import InventoryService from "../../../services/inventory.service";

import toast from "../../../utils/toast.util";
import InventoryConfig from "./inventory.config";
import GridListView from "../../../shared/components/GridList/GridListView";
import { MenuItem } from "../../../shared/models/MenuList.model";
import AddInventory from "./AddInventory";

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
      <PageHeading
        title="Inventory List"
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
        options={InventoryConfig}
        callbackFun={menuCallbackFun}
        refreshKey={refreshKey}
      />

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
