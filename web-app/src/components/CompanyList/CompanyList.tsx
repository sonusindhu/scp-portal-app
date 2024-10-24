import React, { useState, Fragment, useRef } from "react";
import { Button, Drawer } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AgGridReact } from "@ag-grid-community/react";

import GridListView from "../../shared/components/GridList/GridListView";
import PageHeading from "../../shared/components/PageHeading/PageHeading";
import CompanyService from "../../services/company.service";
import toast from "../../utils/toast.util";
import CompanyConfig from "./company.config";
import { MenuItem } from "../../shared/models/MenuItem";
import AddCompany from "./AddCompany";

const CompanyList = () => {
  let navigate = useNavigate();
  const gridRef = useRef<AgGridReact>(null);
  const [mainMenus, setMainMenus] = useState<MenuItem[]>(
    CompanyConfig.mainMenus
  );
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [addDrawer, setAddDrawer] = useState(false);

  const deleteAction = (ids: number[]) => (
    <Fragment>
      <Button onClick={() => confirmDelete(ids)}>Confirm</Button>
      <Button onClick={() => toast.close()}>Close</Button>
    </Fragment>
  );

  const confirmDelete = (ids: number[]) => {
    toast.close();
    CompanyService.deleteCompanies(ids)
      .then((response) => {
        toast.success(response.message);
        gridRef.current?.api?.refreshServerSideStore();
      })
      .catch((error) => {
        toast.success(error?.message);
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
    gridRef.current?.api?.refreshServerSideStore();
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
      <PageHeading
        title="Company List"
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
        innerRef={gridRef}
        options={CompanyConfig}
        callbackFun={menuCallbackFun}
      />

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
