import axios from "../utils/config.util";
import { format } from "date-fns";
const API_URL = process.env.REACT_APP_API_ENDPOINT;

const ServerSideDatasource = (listUrl) => {
  return {
    getRows: function (params) {
      const sort = params.request.sortModel.map((item) => {
        return { [`${item.colId}`]: item.sort };
      });
      const filters = Object.keys(params.request.filterModel).map((key) => {
        const item = params.request.filterModel[key];
        return {
          logic: "or",
          filters: [{ field: key, operator: item.type, value: item.filter }],
        };
      });
      const payload = {
        skip: params.request.startRow,
        take: 10,
        group: [],
        sort,
        filter: {
          logic: "and",
          filters: filters,
        },
      };
      axios
        .post(API_URL + listUrl, payload)
        .then(({ data }) => {
          params.success({
            rowData: data.result || [],
            rowCount: data.total,
          });
        })
        .catch((error) => {
          params.success({
            rowData: [],
            rowCount: 0,
          });
          // params.fail();
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
