import React from "react";
import { Link } from "react-router-dom";

import GridActionMenu from "../../../shared/components/GridList/GridActionMenu";
import GridService from "../../../services/grid.service";
import { MenuItem } from "../../../shared/models/MenuList.model";

const columnDefs = [
  {
    accessorKey: "quoteNumber",
    header: "Quote Number",
    size: 140,
    meta: { sticky: "left", stickyClass: "sticky-col-0" },
    cell: ({ row }) => (
      <Link to={`/app/quote/${row.original?.id}/details`}>{row.original?.quoteNumber}</Link>
    ),
    enableSorting: true,
    enableColumnFilter: true,
  },
  {
    accessorKey: "name",
    header: "Name",
    size: 140,
    meta: { sticky: "left", stickyClass: "sticky-col-1" },
    enableSorting: true,
    enableColumnFilter: true,
  },
  {
    accessorKey: "service",
    header: "Service",
    size: 120,
    enableSorting: true,
    enableColumnFilter: true,
  },
  {
    accessorKey: "companyName",
    header: "Company Name",
    size: 140,
    enableSorting: true,
    enableColumnFilter: true,
  },
  {
    accessorKey: "contactName",
    header: "Contact Name",
    size: 140,
    enableSorting: true,
    enableColumnFilter: true,
  },
  {
    accessorKey: "transportMode",
    header: "Transport Mode",
    size: 120,
    enableSorting: true,
    enableColumnFilter: true,
    cell: ({ row }) => row.original?.transportMode || "",
  },
  {
    accessorKey: "status",
    header: "Status",
    size: 100,
    enableSorting: true,
    enableColumnFilter: true,
  },
  {
    accessorKey: "totalCost",
    header: "Total Cost",
    size: 120,
    enableSorting: true,
    enableColumnFilter: true,
  },
  {
    accessorKey: "totalProfit",
    header: "Total Profit",
    size: 120,
    enableSorting: true,
    enableColumnFilter: true,
  },
  {
    accessorKey: "expiryDate",
    header: "Expiry Date",
    size: 120,
    cell: ({ row }) => row.original?.expiryDate ? GridService.dateFormatter(row.original.expiryDate) : "",
    enableSorting: true,
    enableColumnFilter: true,
  },
  {
    accessorKey: "createdByName",
    header: "Created By",
    size: 120,
    enableSorting: true,
    enableColumnFilter: true,
  },
  {
    accessorKey: "createdAt",
    header: "Created Date",
    size: 120,
    cell: ({ row }) => row.original?.createdAt ? GridService.dateFormatter(row.original.createdAt) : "",
    enableSorting: true,
    enableColumnFilter: true,
  },
  {
    accessorKey: "updatedByName",
    header: "Updated By",
    size: 120,
    enableSorting: true,
    enableColumnFilter: true,
  },
  {
    accessorKey: "updatedAt",
    header: "Updated Date",
    size: 120,
    cell: ({ row }) => row.original?.updatedAt ? GridService.dateFormatter(row.original.updatedAt) : "",
    enableSorting: true,
    enableColumnFilter: true,
  },
  {
    id: "action",
    accessorKey: "action",
    size: 80,
    meta: { sticky: "right", stickyClass: "sticky-col-last" },
    header: "Action",
    cell: ({ row }) => (
      <GridActionMenu
        className="grid-action-menu"
        menuCallback={(fn) => fn}
        menus={[
          { key: "edit", title: "Edit" },
          { key: "delete", title: "Delete" },
        ]}
      />
    ),
    enableSorting: false,
    enableColumnFilter: false,
  },
];

const defaultColDef = {
  minSize: 40,
  enableResizing: true,
};

const mainMenus: MenuItem[] = [
  {
    key: "deletes",
    title: "Delete",
    disabled: true,
  },
];

const listUrl = "quote/list";

const globalFilterFields = ['name', 'service', 'contactName'];

const QuoteListConfig = {
  columnDefs,
  defaultColDef,
  mainMenus,
  listUrl,
  globalFilterFields
};

export default QuoteListConfig;
