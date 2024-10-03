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
          const lastRow =
            result.length <= params.request.endRow ? result.length : -1;
          params.successCallback(result, total);

          params.api.hideOverlay();
          if (result.length) {
            params.api.hideOverlay();
          } else {
            params.api.showNoRowsOverlay();
          }
        })
        .catch((error) => {
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

const GridService = {
  ServerSideDatasource,
  dateFormatter,
};

export default GridService;
