import React, { useState, useRef, useCallback, useEffect } from "react";

import { AgGridReact } from "@ag-grid-community/react";
import { ServerSideRowModelModule } from "@ag-grid-enterprise/server-side-row-model";
import { ModuleRegistry, GetRowIdFunc } from "@ag-grid-community/core";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import "ag-grid-enterprise";

import GridTextFilterComponent from "./grid-filters/grid-text-filter.component/grid-text-filter.component";
import GridService from "../../services/grid.service";

ModuleRegistry.registerModules([ServerSideRowModelModule]);

const GridListView = (props) => {
  const gridRef = useRef<any>(null);
  const [gridApi, setGridApi] = useState<any>(null);
  const [gridColumnApi, setGridColumnApi] = useState<any>(null);
  const [columnDefs, setColumnDefs] = useState<any>(props.options.columnDefs);
  const getRowId: GetRowIdFunc = useCallback(({ data }) => data.id, []);

  const onGridReady = (params) => {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
    var datasource = GridService.ServerSideDatasource(props.options.listUrl);
    params.api.setServerSideDatasource(datasource);
  };

  const onSelectionChanged = ($event) => {
    const selectedRows = gridApi.getSelectedRows().map((item) => item.id);
    const data = {
      event: $event,
      data: selectedRows,
      menu: { key: "selectRow" },
    };
    props.callbackFun && props.callbackFun(data);
  };

  const overlayLoadingTemplate = `<span className="ag-overlay-loading-center">Please wait while your rows are loading...</span>`;
  const overlayNoRowsTemplate = `<span className="ag-overlay-loading-center">No data found to display.</span>`;

  useEffect(() => {
    let columns = columnDefs.map((item: any) => {
      if (item.headerName === "Action") {
        item.cellRendererParams = {
          ...item.cellRendererParams,
          menuCallback: props.callbackFun,
        };
      }
      return item;
    });
    setColumnDefs(columns);
  }, []);

  return (
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
        defaultColDef={props.options.defaultColDef}
        components={{
          GridTextFilterComponent,
        }}
        rowModelType={"serverSide"}
        serverSideStoreType={"partial"}
        animateRows={false}
        maxBlocksInCache={0}
        overlayLoadingTemplate={overlayLoadingTemplate}
        overlayNoRowsTemplate={overlayNoRowsTemplate}
        onGridReady={onGridReady}
        columnDefs={props.options.columnDefs}
      ></AgGridReact>
    </div>
  );
};

export default GridListView;
