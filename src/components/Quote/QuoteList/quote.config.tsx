import React from "react";
import { Link } from "react-router-dom";

import GridHeaderCheckbox from "../../shared/components/grid-header-checkbox.component";
import GridActionMenu from "../../shared/components/grid-action-menu.component";
import GridService from "../../services/grid.service";
import { MenuItem } from "../../shared/models/MenuList.model";

const columnDefs = [
  {
    checkboxSelection: true,
    headerComponent: GridHeaderCheckbox,
    pinned: "left",
    lockPinned: true,
    suppressMenu: true,
    width: 40,
  },
  {
    field: "quoteNumber",
    sortable: true,
    filter: "agTextColumnFilter",
    pinned: "left",
    lockPinned: true,
    suppressMenu: true,
    floatingFilterComponent: "GridTextFilterComponent",
    floatingFilterComponentParams: {
      suppressFilterButton: true,
    },
    cellRenderer: ({ data }) => (
      <Link to={`/app/quote/${data?.id}/details`}>{data?.quoteNumber}</Link>
    ),
  },
  {
    field: "name",
    sortable: true,
    filter: true,
    lockPinned: true,
    suppressMenu: true,
    floatingFilterComponent: "GridTextFilterComponent",
    floatingFilterComponentParams: {
      suppressFilterButton: true,
    },
  },
  {
    field: "service",
    sortable: true,
    filter: true,
    lockPinned: true,
    suppressMenu: true,
    floatingFilterComponent: "GridTextFilterComponent",
    floatingFilterComponentParams: {
      suppressFilterButton: true,
    },
  },
  {
    field: "companyName",
    sortable: true,
    filter: true,
    lockPinned: true,
    suppressMenu: true,
    floatingFilterComponent: "GridTextFilterComponent",
    floatingFilterComponentParams: {
      suppressFilterButton: true,
    },
  },
  {
    field: "contactName",
    sortable: true,
    filter: true,
    lockPinned: true,
    suppressMenu: true,
    floatingFilterComponent: "GridTextFilterComponent",
    floatingFilterComponentParams: {
      suppressFilterButton: true,
    },
  },
  {
    field: "transportMode",
    sortable: true,
    filter: true,
    lockPinned: true,
    suppressMenu: true,
    floatingFilterComponent: "GridTextFilterComponent",
    floatingFilterComponentParams: {
      suppressFilterButton: true,
    },
  },
  {
    field: "status",
    sortable: true,
    filter: true,
    lockPinned: true,
    suppressMenu: true,
    floatingFilterComponent: "GridTextFilterComponent",
    floatingFilterComponentParams: {
      suppressFilterButton: true,
    },
  },
  {
    field: "totalCost",
    sortable: true,
    filter: true,
    lockPinned: true,
    suppressMenu: true,
    floatingFilterComponent: "GridTextFilterComponent",
    floatingFilterComponentParams: {
      suppressFilterButton: true,
    },
  },
  {
    field: "totalProfit",
    sortable: true,
    filter: true,
    lockPinned: true,
    suppressMenu: true,
    floatingFilterComponent: "GridTextFilterComponent",
    floatingFilterComponentParams: {
      suppressFilterButton: true,
    },
  },
  {
    field: "expiryDate",
    sortable: true,
    filter: true,
    lockPinned: true,
    suppressMenu: true,
    valueFormatter: GridService.dateFormatter,
    floatingFilterComponent: "GridTextFilterComponent",
    floatingFilterComponentParams: {
      suppressFilterButton: true,
    },
  },
  {
    field: "createdByName",
    headerName: "Created By",
    sortable: true,
    filter: true,
    lockPinned: true,
    suppressMenu: true,
    floatingFilterComponent: "GridTextFilterComponent",
    floatingFilterComponentParams: {
      suppressFilterButton: true,
    },
  },
  {
    field: "createdAt",
    headerName: "Created Date",
    sortable: true,
    filter: true,
    lockPinned: true,
    suppressMenu: true,
    valueFormatter: GridService.dateFormatter,
    floatingFilterComponent: "GridTextFilterComponent",
    floatingFilterComponentParams: {
      suppressFilterButton: true,
    },
  },
  {
    field: "updatedByName",
    headerName: "Updated By",
    sortable: true,
    filter: true,
    lockPinned: true,
    suppressMenu: true,
    floatingFilterComponent: "GridTextFilterComponent",
    floatingFilterComponentParams: {
      suppressFilterButton: true,
    },
  },
  {
    field: "updatedAt",
    headerName: "Updated Date",
    sortable: true,
    filter: true,
    lockPinned: true,
    suppressMenu: true,
    valueFormatter: GridService.dateFormatter,
    floatingFilterComponent: "GridTextFilterComponent",
    floatingFilterComponentParams: {
      suppressFilterButton: true,
    },
  },
  {
    headerName: "Action",
    width: 80,
    sortable: false,
    filter: false,
    pinned: "right",
    lockPinned: true,
    cellRenderer: GridActionMenu,
    cellRendererParams: {
      menuCallback: (fn) => fn,
      menus: [
        {
          key: "edit",
          title: "Edit",
        },
        {
          key: "delete",
          title: "Delete",
        },
      ],
    },
  },
];

const defaultColDef = {
  minWidth: 40,
  resizable: true,
  floatingFilter: true,
};

const mainMenus: MenuItem[] = [
  {
    key: "create",
    title: "Create",
    alwaysEnable: true,
  },
  {
    key: "deletes",
    title: "Delete",
    disabled: true,
  },
];

const listUrl: string = "quote/list";

const InventoryConfig = {
  columnDefs,
  defaultColDef,
  mainMenus,
  listUrl,
};

export default InventoryConfig;
