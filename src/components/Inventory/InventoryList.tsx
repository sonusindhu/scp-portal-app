import React, { useState, useEffect, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@material-ui/core";

import PageHeading from "../../shared/components/PageHeading";
import AuthService from "../../services/auth.service";
import InventoryService from "../../services/inventory.service";

import toast from "../../utils/toast.util";
import InventoryConfig from "./inventory.config";
import GridListView from "../../shared/components/GridListView";

const InventoryList = () => {
  let navigate = useNavigate();
  const [mainMenus, setMainMenus] = useState<any[]>(InventoryConfig.mainMenus);
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
        const message = "Inventory has been deleted successfully.";
        toast.success(message);
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
        title="Inventory List"
        menus={mainMenus}
        menuCallback={menuCallbackFun}
      />

      <GridListView options={InventoryConfig} callbackFun={menuCallbackFun} />
    </Fragment>
  );
};

export default InventoryList;
