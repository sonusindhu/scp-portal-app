import React, { useState, useRef, useEffect, useCallback } from "react";
import { Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import 'ag-grid-enterprise';
import { AgGridColumn, AgGridReact } from "@ag-grid-community/react";
import { ServerSideRowModelModule } from '@ag-grid-enterprise/server-side-row-model';
import { ModuleRegistry, GetRowIdFunc } from '@ag-grid-community/core';

import GridTextFilterComponent from "../../shared/components/grid-filters/grid-text-filter.component/grid-text-filter.component";
import GridHeaderCheckbox from "../../shared/components/grid-header-checkbox.component";
import GridActionMenu from "../../shared/components/grid-action-menu.component";

import AuthService from "../../services/auth.service";
import GridService from "../../services/grid.service";

ModuleRegistry.registerModules([ServerSideRowModelModule]);


const InventoryList = () => {
  const user = AuthService.getCurrentUser();
  const navigate = useNavigate();
  const gridRef = useRef(null);
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);

  const getRowId: GetRowIdFunc = useCallback(({ data }) => data.id, []);

  const onGridReady = (params) => {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
    const datasource = GridService.ServerSideDatasource("inventory/list");
    params.api.setServerSideDatasource(datasource);
  };

  useEffect(() => {
    if (!user) navigate("/auth/login");
  }, []);

  if (!user) return <></>;

  return (
    <div className="container-fluid">
      <header className="jumbotron">
        <h3>
          Inventories
          <Button
            component={Link}
            to="/app/inventory/create"
            variant="outlined"
            className="fl-right"
          >
            Create
          </Button>
        </h3>
      </header>

      <div className="ag-theme-alpine" style={{ height: "79vh" }}>
        <AgGridReact
          ref={gridRef}
          rowSelection="multiple"
          suppressCellFocus={true}
          suppressRowClickSelection={true}
          getRowId={getRowId}
          pagination={true}
          paginationPageSize={10}
          defaultColDef={{
            minWidth: 40,
            resizable: true,
            floatingFilter: true,
          }}
          components={{
            customTextFloatingFilter: GridTextFilterComponent,
          }}
          rowModelType={"serverSide"}
          serverSideStoreType={"partial"}
          cacheBlockSize={10}
          onGridReady={onGridReady}
        >
          <AgGridColumn
            checkboxSelection={true}
            headerComponent={GridHeaderCheckbox}
            pinned="left"
            lockPinned={true}
            suppressMenu={true}
            width={40}
          ></AgGridColumn>

          <AgGridColumn
            field="packageId"
            sortable={true}
            filter="agTextColumnFilter"
            pinned="left"
            lockPinned={true}
            suppressMenu={true}
            floatingFilterComponent="customTextFloatingFilter"
            floatingFilterComponentParams={{
              suppressFilterButton: true,
            }}
          ></AgGridColumn>

          <AgGridColumn
            field="trackingNumber"
            sortable={true}
            filter={true}
            lockPinned={true}
            suppressMenu={true}
            floatingFilterComponent="customTextFloatingFilter"
            floatingFilterComponentParams={{
              suppressFilterButton: true,
            }}
          ></AgGridColumn>
          <AgGridColumn
            field="status"
            sortable={true}
            filter={true}
            lockPinned={true}
            suppressMenu={true}
            floatingFilterComponent="customTextFloatingFilter"
            floatingFilterComponentParams={{
              suppressFilterButton: true,
            }}
          ></AgGridColumn>
          <AgGridColumn
            field="company"
            sortable={true}
            filter={true}
            lockPinned={true}
            suppressMenu={true}
            floatingFilterComponent="customTextFloatingFilter"
            floatingFilterComponentParams={{
              suppressFilterButton: true,
            }}
          ></AgGridColumn>
          <AgGridColumn
            field="type"
            sortable={true}
            filter={true}
            lockPinned={true}
            suppressMenu={true}
            floatingFilterComponent="customTextFloatingFilter"
            floatingFilterComponentParams={{
              suppressFilterButton: true,
            }}
          ></AgGridColumn>
          <AgGridColumn
            field="length"
            sortable={true}
            filter={true}
            lockPinned={true}
            suppressMenu={true}
            floatingFilterComponent="customTextFloatingFilter"
            floatingFilterComponentParams={{
              suppressFilterButton: true,
            }}
          ></AgGridColumn>
          <AgGridColumn
            field="width"
            sortable={true}
            filter={true}
            lockPinned={true}
            suppressMenu={true}
            floatingFilterComponent="customTextFloatingFilter"
            floatingFilterComponentParams={{
              suppressFilterButton: true,
            }}
          ></AgGridColumn>
          <AgGridColumn
            field="height"
            sortable={true}
            filter={true}
            lockPinned={true}
            suppressMenu={true}
            floatingFilterComponent="customTextFloatingFilter"
            floatingFilterComponentParams={{
              suppressFilterButton: true,
            }}
          ></AgGridColumn>
          <AgGridColumn
            field="weight"
            headerName="Weight"
            sortable={true}
            filter={true}
            lockPinned={true}
            suppressMenu={true}
            floatingFilterComponent="customTextFloatingFilter"
            floatingFilterComponentParams={{
              suppressFilterButton: true,
            }}
          ></AgGridColumn>
          <AgGridColumn
            field="location"
            sortable={true}
            filter={true}
            lockPinned={true}
            suppressMenu={true}
            floatingFilterComponent="customTextFloatingFilter"
            floatingFilterComponentParams={{
              suppressFilterButton: true,
            }}
          ></AgGridColumn>
          <AgGridColumn
            field="notes"
            sortable={true}
            filter={true}
            lockPinned={true}
            suppressMenu={true}
            floatingFilterComponent="customTextFloatingFilter"
            floatingFilterComponentParams={{
              suppressFilterButton: true,
            }}
          ></AgGridColumn>
          <AgGridColumn
            field="createdBy"
            headerName="Created By"
            sortable={true}
            filter={true}
            lockPinned={true}
            suppressMenu={true}
            floatingFilterComponent="customTextFloatingFilter"
            floatingFilterComponentParams={{
              suppressFilterButton: true,
            }}
          ></AgGridColumn>
          <AgGridColumn
            field="createdAt"
            headerName="Created Date"
            sortable={true}
            filter={true}
            lockPinned={true}
            valueFormatter={GridService.dateFormatter}
            floatingFilterComponent="customTextFloatingFilter"
            floatingFilterComponentParams={{
              suppressFilterButton: true,
            }}
          ></AgGridColumn>
          <AgGridColumn
            field="updatedBy"
            headerName="Updated By"
            sortable={true}
            filter={true}
            lockPinned={true}
            suppressMenu={true}
            floatingFilterComponent="customTextFloatingFilter"
            floatingFilterComponentParams={{
              suppressFilterButton: true,
            }}
          ></AgGridColumn>
          <AgGridColumn
            field="updatedAt"
            headerName="Updated Date"
            sortable={true}
            filter={true}
            lockPinned={true}
            valueFormatter={GridService.dateFormatter}
            floatingFilterComponent="customTextFloatingFilter"
            floatingFilterComponentParams={{
              suppressFilterButton: true,
            }}
          ></AgGridColumn>

          <AgGridColumn
            headerName="Action"
            width={80}
            sortable={false}
            filter={false}
            pinned="right"
            lockPinned={true}
            cellRenderer={GridActionMenu}
          ></AgGridColumn>
        </AgGridReact>
      </div>
    </div>
  );
};
export default InventoryList;
