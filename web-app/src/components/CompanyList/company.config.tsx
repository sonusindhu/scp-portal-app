import React from "react";
import { Link } from "react-router-dom";

import GridActionMenu from "../../shared/components/GridList/GridActionMenu";
import GridService from "../../services/grid.service";
import { MenuItem } from "../../shared/models/MenuItem";

const columnDefs = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <Link to={`/app/company/${row.original.id}/details`}>{row.original.name}</Link>
    ),
    enableSorting: true,
  },
  { accessorKey: "status", header: "Status", enableSorting: true },
  { accessorKey: "email", header: "Email", enableSorting: true },
  { accessorKey: "phone", header: "Phone Number", enableSorting: true },
  { accessorKey: "extension", header: "Extension", enableSorting: true },
  { accessorKey: "revenue", header: "Revenue", enableSorting: true },
  { accessorKey: "employeesCount", header: "Employees", enableSorting: true },
  { accessorKey: "address1", header: "Address 1", enableSorting: true },
  { accessorKey: "address2", header: "Address 2", enableSorting: true },
  { accessorKey: "type", header: "Type", enableSorting: true },
  { accessorKey: "city", header: "City", enableSorting: true },
  { accessorKey: "state", header: "State", enableSorting: true },
  { accessorKey: "zipcode", header: "Zipcode", enableSorting: true },
  { accessorKey: "createdByName", header: "Created By", enableSorting: true },
  { accessorKey: "createdAt", header: "Created Date", cell: ({ row }) => GridService.dateFormatter(row.original.createdAt), enableSorting: true },
  { accessorKey: "updatedByName", header: "Updated By", enableSorting: true },
  { accessorKey: "updatedAt", header: "Updated Date", cell: ({ row }) => GridService.dateFormatter(row.original.updatedAt), enableSorting: true },
  {
    id: "action",
    header: "Action",
    cell: GridActionMenu,
    width: 80,
    enableSorting: false,
  },
];

const defaultColDef = {
  minWidth: 40,
  resizable: true,
  floatingFilter: true,
};

const mainMenus: MenuItem[] = [
  // {
  //   key: "create",
  //   title: "Create",
  //   alwaysEnable: true,
  // },
  {
    key: "deletes",
    title: "Delete",
    disabled: true,
  },
];

const listUrl = "company/list";

const CompanyConfig = {
  columnDefs,
  defaultColDef,
  mainMenus,
  listUrl,
};

export default CompanyConfig;
