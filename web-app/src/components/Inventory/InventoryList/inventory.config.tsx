import React from "react";
import { Link } from "react-router-dom";

import GridActionMenu from "../../../shared/components/GridList/GridActionMenu";
import GridService from "../../../services/grid.service";
import { MenuItem } from "../../../shared/models/MenuList.model";

const columnDefs = [
  {
    accessorKey: "packageId",
    header: "Package ID",
    size: 140,
    meta: { sticky: "left", stickyClass: "sticky-col-0" },
    cell: ({ row }) => (
      <Link to={`/app/inventory/${row.original?.id}/details`}>{row.original?.packageId}</Link>
    ),
    enableSorting: true,
    enableColumnFilter: true,
  },
  {
    accessorKey: "trackingNumber",
    header: "Tracking Number",
    size: 140,
    meta: { sticky: "left", stickyClass: "sticky-col-1" },
    enableSorting: true,
    enableColumnFilter: true,
  },
  {
    accessorKey: "status",
    header: "Status",
    size: 100,
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
    accessorKey: "type",
    header: "Type",
    size: 100,
    enableSorting: true,
    enableColumnFilter: true,
  },
  {
    accessorKey: "width",
    header: "Width",
    size: 80,
    enableSorting: true,
    enableColumnFilter: true,
  },
  {
    accessorKey: "height",
    header: "Height",
    size: 80,
    enableSorting: true,
    enableColumnFilter: true,
  },
  {
    accessorKey: "weight",
    header: "Weight",
    size: 80,
    enableSorting: true,
    enableColumnFilter: true,
  },
  {
    accessorKey: "location",
    header: "Location",
    size: 120,
    enableSorting: true,
    enableColumnFilter: true,
  },
  {
    accessorKey: "notes",
    header: "Notes",
    size: 180,
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

const listUrl: string = "inventory/list";

const InventoryConfig = {
  columnDefs,
  defaultColDef,
  mainMenus,
  listUrl,
};

export default InventoryConfig;
