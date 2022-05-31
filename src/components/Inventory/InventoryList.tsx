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
  const [selectedIds, setSelectedIds] = useState<any[]>([]);

  const deleteAction = (ids) => (
    <Fragment>
      <Button onClick={() => confirmDelete(ids)}>Confirm</Button>
      <Button onClick={() => toast.close()}>Close</Button>
    </Fragment>
  );

  const confirmDelete = (ids) => {
    toast.close();
    InventoryService.deleteCompanies(ids)
      .then((response) => {
        toast.success(response.message);
        gridRed.current?.api?.refreshServerSideStore();
      })
      .catch((error) => toast.success(error?.message));
  };

  const deleteInventory = (ids) => {
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
