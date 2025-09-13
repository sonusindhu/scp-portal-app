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

  // Add selection column at the start
  const columns = useMemo(() => [
    {
      id: "select",
      header: ({ table }) => {
        const ref = React.useRef<HTMLInputElement>(null);
        React.useEffect(() => {
          if (ref.current) {
            ref.current.indeterminate = table.getIsSomeRowsSelected();
          }
        }, [table.getIsSomeRowsSelected()]);
        return (
          <input
            type="checkbox"
            ref={ref}
            checked={table.getIsAllRowsSelected()}
            onChange={table.getToggleAllRowsSelectedHandler()}
          />
        );
      },
      cell: ({ row }) => (
        <input
          type="checkbox"
          checked={row.getIsSelected()}
          disabled={!row.getCanSelect()}
          onChange={row.getToggleSelectedHandler()}
        />
      ),
      enableSorting: false,
      enableFiltering: false,
      size: 46,
      meta: { className: "sticky-col-0" },
    },
    {
      ...props.options.columnDefs[0],
      meta: { className: "sticky-col-1" },
      size: 180,
    },
    ...props.options.columnDefs.slice(1, -1).map((col, idx) => ({ ...col, size: 140 })),
    {
      ...props.options.columnDefs[props.options.columnDefs.length - 1],
      meta: { className: "sticky-col-last" },
      size: 80,
    },
  ], [props.options.columnDefs]);

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
      console.log(result);
      // Use result.result for rows and result.total for page count
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
    <div className="grid-table-container" style={{ height: "79vh", overflow: "auto" }}>
      <input
        value={globalFilter}
        onChange={e => setGlobalFilter(e.target.value)}
        placeholder="Search..."
        style={{ marginBottom: 8 }}
      />
      <div className="grid-table-scroll" style={{ position: "relative" }}>
        {loading && (
          <div className="grid-table-overlay">
            <div className="grid-table-spinner" />
            <span>Loading...</span>
          </div>
        )}
        <table className="grid-table">
          <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header, colIdx) => {
                  const width = header.column.columnDef.size;
                  return (
                    <th
                      key={header.id}
                      className={header.column.columnDef.meta?.['className'] || ""}
                      style={width ? { width, minWidth: width, maxWidth: width } : {}}
                    >
                      {header.isPlaceholder ? null : (
                        <span
                          style={{ cursor: header.column.getCanSort() ? "pointer" : "default", userSelect: "none" }}
                          onClick={header.column.getCanSort() ? header.column.getToggleSortingHandler() : undefined}
                        >
                          {flexRender(header.column.columnDef.header, header.getContext())}
                          {header.column.getCanSort() && (
                            header.column.getIsSorted() === "asc" ? " ▲" :
                            header.column.getIsSorted() === "desc" ? " ▼" : ""
                          )}
                        </span>
                      )}
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr><td className="grid-table-empty" colSpan={columns.length}>No data found to display.</td></tr>
            ) : (
              table.getRowModel().rows.map(row => (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell, colIdx) => {
                    const width = cell.column.columnDef.size;
                    return (
                      <td
                        key={cell.id}
                        className={cell.column.columnDef.meta?.['className'] || ""}
                        style={width ? { width, minWidth: width, maxWidth: width } : {}}
                      >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    );
                  })}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
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
