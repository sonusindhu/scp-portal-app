import React, { useState, Fragment } from "react";
import { Button, Drawer } from "@mui/material";
import { useNavigate } from "react-router-dom";

import GridListView from "../../shared/components/GridList/GridListView";
import CompanyService from "../../services/company.service";
import toast from "../../utils/toast.util";
import CompanyConfig from "./company.config";
import { MenuItem } from "../../shared/models/MenuItem";
import AddCompany from "./AddCompany";
import GridActionMenu from "../../shared/components/GridList/GridActionMenu";

const CompanyList = () => {
  let navigate = useNavigate();
  const [mainMenus, setMainMenus] = useState<MenuItem[]>(
    CompanyConfig.mainMenus
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
    CompanyService.deleteCompanies(ids)
      .then(({ message }) => {
        toast.success(message);
        setRefreshKey((prev) => prev + 1);
      })
      .catch(({ message }) => {
        toast.error(message);
      });
  };

  const deleteCompany = (ids: number[]) => {
    toast.warning("Are you sure, you want to delete?", {
      action: () => deleteAction(ids),
    });
  };

  const onCreate = () => {
    setAddDrawer(true);
    // navigate(`/app/company/create`);
  };

  const closeDrawer = () => {
    setAddDrawer(false);
  };

  const onAddSuccess = () => {
    setRefreshKey((prev) => prev + 1);
  };

  const menuCallbackFun = ({ event, data, menu }) => {
    switch (menu?.key) {
      case "create":
        navigate(`/app/company/create`);
        break;
      case "delete":
        deleteCompany([data.id]);
        break;
      case "deletes":
        selectedIds.length && deleteCompany(selectedIds);
        break;
      case "edit":
        navigate(`/app/company/${data.id}/details`);
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
        options={CompanyConfig}
        refreshKey={refreshKey}
        searchPlaceholder="Search companies..."
        title="Company List"
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
        <AddCompany onCloseDrawer={closeDrawer} onAddSuccess={onAddSuccess} />
      </Drawer>
    </Fragment>
  );
};

export default CompanyList;
