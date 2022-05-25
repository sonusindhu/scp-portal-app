import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  Fragment,
} from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

import "ag-grid-enterprise";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { AgGridReact } from "@ag-grid-community/react";
import { ModuleRegistry, GetRowIdFunc } from "@ag-grid-community/core";
import { ServerSideRowModelModule } from "@ag-grid-enterprise/server-side-row-model";

import GridTextFilterComponent from "../../shared/components/grid-filters/grid-text-filter.component/grid-text-filter.component";

import ContactService from "../../services/contact.service";
import AuthService from "../../services/auth.service";
import GridService from "../../services/grid.service";
import PageHeading from "../../shared/components/PageHeading";

import toast from "../../utils/toast.util";
import ContactConfig from "./contact.config";

ModuleRegistry.registerModules([ServerSideRowModelModule]);

const ContactList = () => {
  const user = AuthService.getCurrentUser();
  const navigate = useNavigate();
  const gridRef = useRef(null);
  const [gridApi, setGridApi] = useState<any>(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);
  const [columnDefs, setColumnDefs] = useState<any>(ContactConfig.columnDefs);
  const [mainMenus, setMainMenus] = useState<any[]>(ContactConfig.mainMenus);

  const getRowId: GetRowIdFunc = useCallback(({ data }) => data.id, []);

  const onGridReady = (params) => {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
    var datasource = GridService.ServerSideDatasource("contact/list");
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
    ContactService.deleteCompanies(ids)
      .then((response) => {
        gridApi && gridApi.refreshServerSideStore();
        const message = "Company has been deleted successfully.";
        toast.success(message);
      })
      .catch((error) => {
        toast.success(error?.message);
      });
  };

  const deleteContact = (ids) => {
    toast.warning("Are you sure, you want to delete?", {
      action: () => deleteAction(ids),
    });
  };

  const menuCallbackFun = ({ event, data, menu }) => {
    switch (menu?.key) {
      case "create":
        navigate(`/app/contact/create`);
        break;
      case "delete":
        deleteContact([data.id]);
        break;
      case "deletes":
        const ids = gridApi.getSelectedRows().map((item) => item.id);
        ids.length && deleteContact(ids);
        break;
      case "edit":
        navigate(`/app/contact/${data.id}/edit`);
        break;
    }
  };

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
    <div className="container-fluid">
      <PageHeading
        title="Contact List"
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
          defaultColDef={ContactConfig.defaultColDef}
          components={{
            GridTextFilterComponent,
          }}
          rowModelType={"serverSide"}
          animateRows={false}
          maxBlocksInCache={0}
          overlayLoadingTemplate={
            '<span className="ag-overlay-loading-center">Please wait while your rows are loading...</span>'
          }
          overlayNoRowsTemplate={
            '<span className="ag-overlay-loading-center">No data found to display.</span>'
          }
          serverSideStoreType={"partial"}
          onGridReady={onGridReady}
          columnDefs={columnDefs}
        ></AgGridReact>
      </div>
    </div>
  );
};

export default ContactList;
