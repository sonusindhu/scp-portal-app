import React, { useState, useEffect, Fragment, useRef } from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AgGridReact } from "@ag-grid-community/react";

import GridListView from "../../shared/components/GridListView";
import PageHeading from "../../shared/components/PageHeading";
import CompanyService from "../../services/company.service";
import toast from "../../utils/toast.util";
import CompanyConfig from "./company.config";

const CompanyList = () => {
  let navigate = useNavigate();
  const gridRed = useRef<AgGridReact>(null);
  const [mainMenus, setMainMenus] = useState<any[]>(CompanyConfig.mainMenus);
  const [selectedIds, setSelectedIds] = useState<any[]>([]);

  const deleteAction = (ids) => (
    <Fragment>
      <Button onClick={() => confirmDelete(ids)}>Confirm</Button>
      <Button onClick={() => toast.close()}>Close</Button>
    </Fragment>
  );

  const confirmDelete = (ids) => {
    toast.close();
    CompanyService.deleteCompanies(ids)
      .then((response) => {
        toast.success(response.message);
        gridRed.current?.api?.refreshServerSideStore();
      })
      .catch((error) => {
        toast.success(error?.message);
      });
  };

  const deleteCompany = (ids) => {
    toast.warning("Are you sure, you want to delete?", {
      action: () => deleteAction(ids),
    });
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
        navigate(`/app/company/${data.id}/edit`);
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
      />

      <GridListView
        innerRef={gridRed}
        options={CompanyConfig}
        callbackFun={menuCallbackFun}
      />
    </Fragment>
  );
};

export default CompanyList;
