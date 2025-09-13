import React, { useEffect, useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  flexRender,
  SortingState,
} from "@tanstack/react-table";
import GridService from "../../../services/grid.service";
import "./GridListView.css";

const GridListView = (props) => {
  const [data, setData] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [rowSelection, setRowSelection] = useState({});
  const [globalFilter, setGlobalFilter] = useState("");
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 20 });

  // Convert your columnDefs to TanStack columns
  const columns = useMemo(() =>
    props.options.columnDefs.map((col, idx) => ({
      id: col.field || `col_${idx}`,
      accessorKey: col.field,
      header: col.headerName,
      cell: col.cellRenderer || undefined,
      enableSorting: col.sortable !== false,
      enableFiltering: col.filter !== false,
    })),
    [props.options.columnDefs]
  );

  // Server-side data fetch (expects GridService.fetchRows to return a Promise)
  useEffect(() => {
    setLoading(true);
    GridService.fetchRows({
      url: props.options.listUrl,
      filters: props.defaultFilters,
      pageIndex: pagination.pageIndex,
      pageSize: pagination.pageSize,
      globalFilter,
      sorting,
    }).then((result) => {
      setData(result.rows || []);
      setPageCount(result.pageCount || 0);
      setLoading(false);
    });
  }, [pagination, globalFilter, sorting, props.options.listUrl, props.defaultFilters]);

  const table = useReactTable({
    data,
    columns,
    pageCount,
    state: {
      rowSelection,
      globalFilter,
      sorting,
      pagination,
    },
    manualPagination: true,
    manualFiltering: true,
    manualSorting: true,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
  });

  return (
    <div style={{ height: "79vh", overflow: "auto" }}>
      <input
        value={globalFilter}
        onChange={e => setGlobalFilter(e.target.value)}
        placeholder="Search..."
        style={{ marginBottom: 8 }}
      />
      <table className="grid-table">
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id}>
                  {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {loading ? (
            <tr><td colSpan={columns.length}>Loading...</td></tr>
          ) : data.length === 0 ? (
            <tr><td colSpan={columns.length}>No data found to display.</td></tr>
          ) : (
            table.getRowModel().rows.map(row => (
              <tr key={row.id}>
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
      <div style={{ marginTop: 8 }}>
        <button onClick={() => table.setPageIndex(0)} disabled={pagination.pageIndex === 0}>First</button>
        <button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>Previous</button>
        <span> Page {pagination.pageIndex + 1} of {pageCount} </span>
        <button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>Next</button>
        <button onClick={() => table.setPageIndex(pageCount - 1)} disabled={pagination.pageIndex === pageCount - 1}>Last</button>
      </div>
    </div>
  );
};

export default GridListView;
