import React, { useEffect, useState, useRef } from "react";
import AuthService from "../../services/auth.service";

import { AgGridColumn, AgGridReact } from "ag-grid-react";
import { ServerSideRowModelModule } from "@ag-grid-enterprise/server-side-row-model";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import axios from "axios";
import GridTextFilterComponent from "../../shared/components/grid-filters/grid-text-filter.component/grid-text-filter.component";

const API_URL = "https://apigwqa.ifreightsystems.com/api/";

const CompanyList = () => {
  const currentUser = AuthService.getCurrentUser();

  axios.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${currentUser.accessToken}`;

  const gridRef = useRef(null);
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);

  const onGridReady = (params) => {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
    var datasource = new ServerSideDatasource();
    params.api.setServerSideDatasource(datasource);
  };

  function dateFormatter(params) {
    if (!params.value) return "";
    return new Date(params.value).toLocaleString().split(",")[0];
  }

  return (
    <div className="container-fluid">
      <header className="jumbotron">
        <h3>CompanyList</h3>
      </header>

      <div className="ag-theme-alpine" style={{ height: "85vh" }}>
        <AgGridReact
          ref={gridRef}
          rowSelection="multiple"
          suppressRowClickSelection={true}
          pagination={true}
          paginationPageSize={25}
          modules={[ServerSideRowModelModule]}
          defaultColDef={{
            minWidth: 80,
            resizable: true,
            floatingFilter: true,
          }}
          frameworkComponents={{
            customTextFloatingFilter: GridTextFilterComponent,
          }}
          rowModelType={"serverSide"}
          serverSideStoreType={"partial"}
          cacheBlockSize={25}
          onGridReady={onGridReady}
        >
          <AgGridColumn
            field="companyName"
            sortable={true}
            filter="agTextColumnFilter"
            headerCheckboxSelection={true}
            headerCheckboxSelectionFilteredOnly={true}
            checkboxSelection={true}
            pinned="left"
            lockPinned={true}
            suppressMenu={true}
            floatingFilterComponent="customTextFloatingFilter"
            floatingFilterComponentParams={{
              suppressFilterButton: true,
            }}
          ></AgGridColumn>
          <AgGridColumn
            field="companyID"
            headerName="ID"
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
            field="email"
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
            field="phoneNum"
            headerName="Phone Number"
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
            field="rating"
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
            field="revenue"
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
            field="industry"
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
            field="salesOwner"
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
            field="trackingTeamOwnerUser"
            headerName="Tracking Owner"
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
            field="adminSiteName"
            headerName="Branch"
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
            field="createdDate"
            headerName="Created Date"
            sortable={true}
            filter={true}
            lockPinned={true}
            valueFormatter={dateFormatter}
          ></AgGridColumn>

          <AgGridColumn
            headerName="Action"
            width="80"
            sortable={false}
            filter={false}
            pinned="right"
            lockPinned={true}
          ></AgGridColumn>
        </AgGridReact>
      </div>
    </div>
  );
};

function ServerSideDatasource() {
  return {
    getRows: function (params) {
      console.log("[Datasource] - rows requested by grid: ", params.request);

      const sort = params.request.sortModel.map((item) => {
        return { dir: item.sort, field: item.colId };
      });
      const filters = Object.keys(params.request.filterModel).map((key) => {
        console.log(key);
        const item = params.request.filterModel[key];
        return {
          logic: "or",
          filters: [{ field: key, operator: item.type, value: item.filter }],
        };
      });
      const payload = {
        skip: params.request.startRow,
        take: 25,
        group: [],
        sort,
        filter: {
          logic: "and",
          filters: filters,
        },
      };
      axios
        .post(API_URL + "Company/ExcelView", payload)
        .then((result) => result.data)
        .then((rowData) => {
          params.success({
            rowData: rowData.data || [],
            rowCount: rowData.total,
          });
        })
        .catch((error) => {
          params.fail();
        });
    },
  };
}

export default CompanyList;
