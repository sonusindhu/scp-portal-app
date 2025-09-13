import React, { useState, useCallback, Fragment } from "react";
import { Button, Drawer } from "@mui/material";
import { useNavigate } from "react-router-dom";

import GridListView from "../../shared/components/GridList/GridListView";
import CompanyService from "../../services/company.service";
import toast from "../../utils/toast.util";
import CompanyConfig from "./company.config";
import { MenuItem } from "../../shared/models/MenuItem";
import AddCompany from "./AddCompany";
import GridActionMenu from "../../shared/components/GridList/GridActionMenu";

interface MenuCallbackArgs {
  event: React.MouseEvent;
  data: any;
  menu: MenuItem;
}

const CompanyList: React.FC = () => {
  const navigate = useNavigate();
  const [mainMenus, setMainMenus] = useState<MenuItem[]>(CompanyConfig.mainMenus);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [addDrawer, setAddDrawer] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const confirmDelete = useCallback((ids: number[]) => {
    toast.close();
    CompanyService.deleteCompanies(ids)
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

  const deleteCompany = useCallback((ids: number[]) => {
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
        setMainMenus(prevMenus => prevMenus.map((menu: MenuItem) => {
          if (!menu.alwaysEnable) menu.disabled = data.length === 0;
          return menu;
        }));
        break;
    }
  }, [navigate, deleteCompany, selectedIds]);

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
          aria-label="Create company"
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
