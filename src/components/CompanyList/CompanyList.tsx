import React, {
  useState,
  useRef,
  useEffect,
  Fragment,
  useCallback,
} from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { AgGridReact } from "@ag-grid-community/react";
import { ServerSideRowModelModule } from "@ag-grid-enterprise/server-side-row-model";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import "ag-grid-enterprise";
import { ModuleRegistry, GetRowIdFunc } from "@ag-grid-community/core";

import GridTextFilterComponent from "../../shared/components/grid-filters/grid-text-filter.component/grid-text-filter.component";
import PageHeading from "../../shared/components/PageHeading";

import AuthService from "../../services/auth.service";
import GridService from "../../services/grid.service";
import CompanyService from "../../services/company.service";

import toast from "../../utils/toast.util";
import CompanyConfig from "./company.config";

ModuleRegistry.registerModules([ServerSideRowModelModule]);

const CompanyList = () => {
  let navigate = useNavigate();
  const gridRef = useRef<any>(null);
  const [gridApi, setGridApi] = useState<any>(null);
  const [columnDefs, setColumnDefs] = useState<any>(CompanyConfig.columnDefs);
  const [mainMenus, setMainMenus] = useState<any[]>(CompanyConfig.mainMenus);
  const [gridColumnApi, setGridColumnApi] = useState<any>(null);
  const getRowId: GetRowIdFunc = useCallback(({ data }) => data.id, []);

  const onGridReady = (params) => {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
    var datasource = GridService.ServerSideDatasource("company/list");
    params.api.setServerSideDatasource(datasource);
  };

  const onSelectionChanged = ($event) => {
    const selectedRows = gridApi.getSelectedRows();
    const menus = mainMenus.map((menu) => {
      if (!menu.alwaysEnable) menu.disabled = selectedRows.length === 0;
      return menu;
    });
    setMainMenus(menus);
  };

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
        gridApi && gridApi.refreshServerSideStore();
        const message = "Company has been deleted successfully.";
        toast.success(message);
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
        const ids = gridApi.getSelectedRows().map((item) => item.id);
        ids.length && deleteCompany(ids);
        break;
      case "edit":
        navigate(`/app/company/${data.id}/edit`);
        break;
    }
  };

  const user = AuthService.getCurrentUser();
  useEffect(() => {
    if (!user) navigate("/auth/login");
    let columns = columnDefs.map((item: any) => {
      if (item.headerName === "Action") {
        item.cellRendererParams = {
          ...item.cellRendererParams,
          menuCallback: menuCallbackFun,
        };
      }
      return item;
    });
    setColumnDefs(columns);
  }, []);
  if (!user) return <></>;

  return (
    <Fragment>
      <PageHeading
        title="Company List"
        menus={mainMenus}
        menuCallback={menuCallbackFun}
      />

      <div className="ag-theme-alpine" style={{ height: "79vh" }}>
        <AgGridReact
          ref={gridRef}
          rowSelection="multiple"
          suppressCellFocus={true}
          suppressRowClickSelection={true}
          onSelectionChanged={onSelectionChanged}
          getRowId={getRowId}
          pagination={true}
          paginationPageSize={20}
          defaultColDef={CompanyConfig.defaultColDef}
          components={{
            GridTextFilterComponent,
          }}
          rowModelType={"serverSide"}
          serverSideStoreType={"partial"}
          animateRows={false}
          maxBlocksInCache={0}
          overlayLoadingTemplate={
            '<span className="ag-overlay-loading-center">Please wait while your rows are loading...</span>'
          }
          overlayNoRowsTemplate={
            '<span className="ag-overlay-loading-center">No data found to display.</span>'
          }
          onGridReady={onGridReady}
          columnDefs={columnDefs}
        ></AgGridReact>
      </div>
    </Fragment>
  );
};

export default CompanyList;
