import React, { useState, Fragment, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@material-ui/core";
import { AgGridReact } from "@ag-grid-community/react";

import PageHeading from "../../shared/components/PageHeading";
import InventoryService from "../../services/inventory.service";

import toast from "../../utils/toast.util";
import InventoryConfig from "./inventory.config";
import GridListView from "../../shared/components/GridListView";
import { MenuItem } from "../../shared/models/MenuList.model";

const InventoryList = () => {
  let navigate = useNavigate();
  const gridRed = useRef<AgGridReact>(null);
  const [mainMenus, setMainMenus] = useState<MenuItem[]>(
    InventoryConfig.mainMenus
  );
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const deleteAction = (ids: number[]) => (
    <Fragment>
      <Button onClick={() => confirmDelete(ids)}>Confirm</Button>
      <Button onClick={() => toast.close()}>Close</Button>
    </Fragment>
  );

  const confirmDelete = (ids: number[]) => {
    toast.close();
    InventoryService.deleteCompanies(ids)
      .then(({ message }) => {
        toast.success(message);
        gridRed.current?.api?.refreshServerSideStore();
      })
      .catch(({ message }) => toast.success(message));
  };

  const deleteInventory = (ids: number[]) => {
    toast.warning("Are you sure, you want to delete?", {
      action: () => deleteAction(ids),
    });
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
      />

      <GridListView
        innerRef={gridRed}
        options={InventoryConfig}
        callbackFun={menuCallbackFun}
      />
    </Fragment>
  );
};

export default InventoryList;
