import React, { useEffect, useState, useRef } from "react";
import AuthService from "../../services/auth.service";

import { AgGridColumn, AgGridReact } from "ag-grid-react";
import { ServerSideRowModelModule } from "@ag-grid-enterprise/server-side-row-model";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import axios from "axios";
import GridTextFilterComponent from "../../shared/components/grid-filters/grid-text-filter.component/grid-text-filter.component";

import { format } from "date-fns";

const API_URL = "http://localhost:1337/api/v1/app/company/";

const CompanyList = () => {
  const user = AuthService.getCurrentUser();
  axios.defaults.headers.common["Authorization"] = `Bearer ${user.token}`;
  axios.defaults.headers.common["token"] = user.token;
  axios.defaults.headers.common["allowOrigins"] = "*";

  console.log(axios.defaults.headers);

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
    return format(new Date(params.value), "dd/MM/yyyy");
  }

  return (
    <div className="container-fluid">
      <header className="jumbotron">
        <h3>CompanyList</h3>
      </header>

      <div className="ag-theme-alpine" style={{ height: "80vh" }}>
        <AgGridReact
          ref={gridRef}
          rowSelection="multiple"
          suppressRowClickSelection={true}
          pagination={true}
          paginationPageSize={10}
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
          cacheBlockSize={10}
          onGridReady={onGridReady}
        >
          <AgGridColumn
            field="name"
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
            field="phone"
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
            field="extension"
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
            field="employeesCount"
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
            field="address1"
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
            field="address2"
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
            field="city"
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
            field="state"
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
            field="zipcode"
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
            valueFormatter={dateFormatter}
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
        return { [`${item.colId}`]: item.sort };
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
        take: 10,
        group: [],
        sort,
        filter: {
          logic: "and",
          filters: filters,
        },
      };

      axios
        .post(API_URL + "list", payload)
        .then(({ data }) => {
          params.success({
            rowData: data.result || [],
            rowCount: data.total,
          });
        })
        .catch((error) => {
          console.log(error.response);
          console.log(error.request);
          params.fail();
        });
    },
  };
}

export default CompanyList;
