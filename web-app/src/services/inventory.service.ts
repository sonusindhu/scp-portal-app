import axios from "../utils/config.util";
const API_URL = import.meta.env.VITE_API_ENDPOINT;
interface ListItem{
  id: string, 
  title: string
}
const deleteInventories = (ids: number[]) => {
  return axios
    .post(`${API_URL}inventory/deleteRange`, { ids })
    .then(({ data }) => data);
};

const find = (id: number) => {
  return axios.get(`${API_URL}inventory/find/${id}`).then(({ data }) => data);
};

const getCompanies = () => {
  return axios.get(API_URL + "company/listOfNames")
  .then(({ data }) => data)
};

const create = (payload) => {
  return axios
    .post(API_URL + "inventory/create", payload)
    .then(({ data }) => data);
};

const update = (payload) => {
  return axios
    .post(API_URL + "inventory/update", payload)
    .then(({ data }) => data);
};

const statusList: ListItem[] = [
    {
      id: "",
      title: "Select",
    },
    {
      id: "active",
      title: "Active",
    },
    {
      id: "inactive",
      title: "Inactive",
    },
  ];
  const packages: ListItem[] = [
    {
      id: "",
      title: "Select",
    },
    {
      id: "parcel",
      title: "Parcel",
    },
    {
      id: "pallet",
      title: "Pallet",
    },
    {
      id: "bale",
      title: "bale",
    },
  ];


const InventoryService = {
  create,
  update,
  find,
  deleteInventories,
  getCompanies,
  data: { statusList, packages }
};

export default InventoryService;
