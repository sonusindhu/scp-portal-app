import axios from "../utils/config.util";
import { format } from "date-fns";

const ServerSideDatasource = (listUrl, defaultFilters = null) => {
  return {
    getRows: function (params) {
      const sort = params.request.sortModel.map((item) => {
        return `${item.colId}  ${item.sort}`;
      });
      // const sort = params.request.sortModel.map((item) => {
      //   return { [`${item.colId}`]: item.sort };
      // });

      const filters = Object.keys(params.request.filterModel).map((key) => {
        const item = params.request.filterModel[key];
        return {
          logic: "or",
          filters: [{ field: key, operator: item.type, value: item.filter }],
        };
      });

      if (defaultFilters) {
        filters.push({
          logic: "and",
          filters: defaultFilters,
        });
      }

      const payload = {
        skip: params.request.startRow || 0,
        take: 20,
        group: [],
        sort,
        filter: {
          logic: "and",
          filters: filters,
        },
      };
      params.api.showLoadingOverlay();
      axios
        .post(listUrl, payload)
        .then(({ data }) => data)
        .then(({ result, total }) => {
          
          params.successCallback(result, total);

          params.api.hideOverlay();
          if (result.length) {
            params.api.hideOverlay();
          } else {
            params.api.showNoRowsOverlay();
          }
        })
        .catch((error) => {
          debugger
          params.api.showNoRowsOverlay();
          params.successCallback([], 0);
        });
    },
  };
};

const dateFormatter = (params) => {
  if (!params.value) return "";
  return format(new Date(params.value), "dd/MM/yyyy");
};

const fetchRows = async ({ url, filters, pageIndex, pageSize, globalFilter, sorting }) => {
  // Build sort array for API
  const sort = (sorting || []).map((item) => `${item.id} ${item.desc ? "desc" : "asc"}`);

  // Build filter array for API
  let filterArr: any[] = [];
  if (filters) {
    filterArr.push({ logic: "and", filters });
  }
  if (globalFilter) {
    filterArr.push({
      logic: "or",
      filters: [
        { field: "global", operator: "contains", value: globalFilter },
      ],
    });
  }

  const payload = {
    skip: pageIndex * pageSize,
    take: pageSize,
    group: [],
    sort,
    filter: {
      logic: "and",
      filters: filterArr,
    },
  };

  const response = await axios.post(url, payload);
  const { result, total } = response.data;
  return {
    rows: result || [],
    pageCount: Math.ceil((total || 0) / pageSize),
  };
};

const fetchRowsV2 = async ({ url, filters, pageIndex, pageSize, globalFilter, sorting }) => {
  // Build sort array for API
  const sort = (sorting || []).map((item) => `${item.id} ${item.desc ? "desc" : "asc"}`);

  // Build filter array for API (AG Grid style)
  let filterArr: any[] = [];
  if (filters) {
    filterArr.push({ logic: "and", filters });
  }
  if (globalFilter) {
    filterArr.push({
      logic: "or",
      filters: [
        { field: "global", operator: "contains", value: globalFilter },
      ],
    });
  }

  const payload = {
    skip: pageIndex * pageSize,
    take: pageSize,
    group: [],
    sort,
    filter: {
      logic: "and",
      filters: filterArr,
    },
  };

  const response = await axios.post(url, payload);
  const { result, total } = response.data;
  return {
    rows: result || [],
    pageCount: Math.ceil((total || 0) / pageSize),
  };
};

const GridService = {
  ServerSideDatasource,
  dateFormatter,
  fetchRows,
  fetchRowsV2,
};

export default GridService;
