import React from "react";
import { Link } from "react-router-dom";

import GridActionMenu from "../../../shared/components/GridList/GridActionMenu";
import GridService from "../../../services/grid.service";

const columnDefs = [
  {
    accessorKey: "fullName",
    header: "Full Name",
    size: 180,
    meta: { sticky: "left", stickyClass: "sticky-col-1" },
    cell: ({ row }) => (
      <Link to={`/app/contact/${row.original?.id}/general`}>{row.original?.fullName}</Link>
    ),
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
    accessorKey: "status",
    header: "Status",
    size: 100,
    enableSorting: true,
    enableColumnFilter: true,
  },
  {
    accessorKey: "email",
    header: "Email",
    size: 180,
    enableSorting: true,
    enableColumnFilter: true,
  },
  {
    accessorKey: "phone",
    header: "Phone Number",
    size: 120,
    enableSorting: true,
    enableColumnFilter: true,
  },
  {
    accessorKey: "extension",
    header: "Extension",
    size: 80,
    enableSorting: true,
    enableColumnFilter: true,
  },
  {
    accessorKey: "department",
    header: "Department",
    size: 120,
    enableSorting: true,
    enableColumnFilter: true,
  },
  {
    accessorKey: "jobTitle",
    header: "Job Title",
    size: 120,
    enableSorting: true,
    enableColumnFilter: true,
  },
  {
    accessorKey: "address1",
    header: "Address 1",
    size: 180,
    enableSorting: true,
    enableColumnFilter: true,
  },
  {
    accessorKey: "address2",
    header: "Address 2",
    size: 180,
    enableSorting: true,
    enableColumnFilter: true,
  },
  {
    accessorKey: "city",
    header: "City",
    size: 120,
    enableSorting: true,
    enableColumnFilter: true,
  },
  {
    accessorKey: "state",
    header: "State",
    size: 80,
    enableSorting: true,
    enableColumnFilter: true,
  },
  {
    accessorKey: "zipcode",
    header: "Zipcode",
    size: 80,
    enableSorting: true,
    enableColumnFilter: true,
  },
  {
    accessorKey: "birthDate",
    header: "Birth Date",
    size: 120,
    cell: ({ row }) => row.original?.birthDate ? GridService.dateFormatter(row.original.birthDate) : "",
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

const mainMenus = [
  {
    key: "deletes",
    title: "Delete",
    disabled: true,
  },
];

const listUrl = "contact/list";

const ContactConfig = {
  columnDefs,
  defaultColDef,
  mainMenus,
  listUrl,
};

export default ContactConfig;
