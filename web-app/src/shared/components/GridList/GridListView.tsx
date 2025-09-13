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

interface GridListViewProps {
  options: any;
  defaultFilters?: any;
  refreshKey?: number;
  searchPlaceholder?: string;
  title: string;
  children?: React.ReactNode | null;
  globalFilterFields?: string[];
}

const GridListView = (props: GridListViewProps) => {
  const [data, setData] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [rowSelection, setRowSelection] = useState({});
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 20 });
  const [globalFilter, setGlobalFilter] = useState("");
  const [columnFilters, setColumnFilters] = useState({});

  // Build combined filters for global and column filters
  const combinedFilters = useMemo(() => {
    let filters = props.defaultFilters ? [...props.defaultFilters] : [];
    // Global filter fields
    if (props.globalFilterFields?.length && globalFilter) {
      filters = [
        ...filters,
        {
          logic: "or",
          filters: props.globalFilterFields.map(field => ({
            field, operator: "contains", value: globalFilter
          }))
        }
      ];
    }
    // Column filters
    Object.entries(columnFilters).forEach(([field, value]) => {
      if (value) {
        filters.push({
          logic: "and",
          filters: [{ field, operator: "contains", value }]
        });
      }
    });
    return filters;

  }, [props.defaultFilters, props.globalFilterFields, globalFilter, columnFilters]);

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
    console.log('Fetching rows with:', combinedFilters);

    GridService.fetchRows({
      url: props.options.listUrl,
      filters: combinedFilters,
      pageIndex: pagination.pageIndex,
      pageSize: pagination.pageSize,
      globalFilter, // add back for argument shape
      sorting,
    }).then((result) => {
      console.log('GridListView fetched rows:', result.rows);
      setData(result.rows || []);
      setPageCount(result.pageCount || 0);
      setLoading(false);
    });
  }, [pagination, sorting, props.options.listUrl, combinedFilters, props.refreshKey]);

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
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
  });

  return (
    <div>
      <header>
        <h3 className="heading">
          <span className="heading-title">{props.title}</span>
          <div className="right-menu">
            <input
              value={globalFilter}
              onChange={e => setGlobalFilter(e.target.value)}
              placeholder={ props.searchPlaceholder }
              style={{ padding: "8px", width: "220px" }}
              aria-label="Global search"
            />
            { props.children }
          </div>
        </h3>
      </header>
      <main>
        <div className="grid-table-container" style={{ maxHeight: "calc(100vh - 180px)", overflow: "auto", position: "relative" }}>
          {loading && (
            <div style={{ position: "absolute", left: 0, top: 105, width: "100%", height: "calc(100% - 105px)", background: "rgba(255,255,255,0.5)", zIndex: 20, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div className="grid-spinner" />
            </div>
          )}
          <table className="grid-table" style={{ tableLayout: "fixed", width: "100%", maxHeight: "100%"  }}>
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header, colIdx) => {
                    const width = header.column.columnDef.size;
                    return (
                      <th
                        key={header.id}
                        className={header.column.columnDef.meta?.['className'] + ' sticky-header'}
                        style={{
                          ...(width ? { width, minWidth: width, maxWidth: width } : {}),
                          position: 'sticky',
                          top: 0,
                          zIndex:
                            header.column.columnDef.meta?.['className'] === 'sticky-col-0' ? 12 :
                            header.column.columnDef.meta?.['className'] === 'sticky-col-1' ? 11 :
                            10,
                          background: '#f5f5f5'
                        }}
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
              {/* Inline filter row */}
              <tr>
                {columns.map((col, idx) => {
                  const isActionCol = col.id === 'select' || col.header == 'Action' || col.accessorKey === undefined || col.cell === 'actions' || typeof col.cell === 'function' && col.cell.name?.toLowerCase().includes('action');
                  let filterZIndex =
                    col.meta?.['className'] === 'sticky-col-0' ? 12 :
                    col.meta?.['className'] === 'sticky-col-1' ? 11 :
                    9;
                  return (
                    <td
                      key={col.id}
                      className={(col.meta?.['className'] || "") + " sticky-filter-row"}
                      style={{
                        ...(col.size ? { width: col.size, minWidth: col.size, maxWidth: col.size } : {}),
                        position: 'sticky', top: 48, zIndex: filterZIndex, background: '#fff'
                      }}
                    >
                      {col.enableFiltering !== false && col.accessorKey && !isActionCol ? (
                        <input
                          style={{ width: "88%", padding: "4px" }}
                          value={columnFilters[col.accessorKey] || ""}
                          onChange={e => setColumnFilters(f => ({ ...f, [col.accessorKey]: e.target.value }))}
                          placeholder={`Filter ${col.header}`}
                        />
                      ) : null}
                    </td>
                  );
                })}
              </tr>
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
      </main>
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
