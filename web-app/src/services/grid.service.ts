import axios from "../utils/config.util";
import { format } from "date-fns";

const dateFormatter = (date: string | number | Date, dateFormat = "dd/MM/yyyy hh:mm a") => {
  if (!date) return "";
  if (typeof date === "number") {
    date = new Date(date);
  } else if (typeof date === "string") {
    // Try to parse as ISO string or timestamp string
    const num = Number(date);
    date = isNaN(num) ? new Date(date) : new Date(num);
  } else {
    date = new Date(date);
  }
  if (isNaN(date.getTime())) return "";
  return format(date, dateFormat);
};

const fetchRows = async ({ url, filters, pageIndex, pageSize, globalFilter, sorting }) => {
  // Build sort array for API
  const sort = (sorting || []).map((item) => `${item.id} ${item.desc ? "desc" : "asc"}`);
  
  const payload = {
    skip: pageIndex * pageSize,
    take: pageSize,
    group: [],
    sort,
    filter: {
      logic: "and",
      filters: filters,
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
  dateFormatter,
  fetchRows
};

export default GridService;
