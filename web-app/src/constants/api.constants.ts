/**
 * API-related constants
 */

/**
 * API response status codes
 */
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
} as const;

/**
 * API endpoints base paths
 */
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "auth/login",
    LOGOUT: "auth/signout",
    SIGNUP: "auth/signup",
    REFRESH: "auth/refresh",
    VERIFY: "auth/verify",
  },
  COMPANY: {
    LIST: "company/list",
    LIST_OF_NAMES: "company/listOfNames",
    FIND: (id: string | number) => `company/find/${id}`,
    CREATE: "company/create",
    UPDATE: "company/update",
    DELETE: "company/delete",
  },
  CONTACT: {
    LIST: "contact/list",
    FIND: (id: string | number) => `contact/find/${id}`,
    CREATE: "contact/create",
    UPDATE: "contact/update",
    DELETE: "contact/delete",
  },
  COMMON: {
    EQUIPMENTS: "common/equipments",
    COMMODITIES: "common/commodities",
    CARGOS: "common/cargos",
  },
  QUOTE: {
    LIST: "quote/list",
    FIND: (id: string | number) => `quote/find/${id}`,
    CREATE: "quote/create",
    UPDATE: "quote/update",
    DELETE: "quote/delete",
    GET_COMPANIES: "quote/getCompanies",
    GET_CONTACTS_BY_COMPANY: (id: string | number) => `quote/getContactsByCompany/${id}`,
    CREATE_NOTE: "quote/createNote",
    CREATE_TASK: "quote/createTask",
    CREATE_EMAIL: "quote/createEmail",
    NOTES: (id: string | number) => `quote/${id}/notes`,
    TASKS: (id: string | number) => `quote/${id}/tasks`,
    EMAILS: (id: string | number) => `quote/${id}/emails`,
    EMAIL_BY_ID: (id: string | number, emailId: string | number) => `quote/${id}/getEmailById/${emailId}`,
  },
  INVENTORY: {
    LIST: "inventory/list",
    FIND: (id: string | number) => `inventory/find/${id}`,
    CREATE: "inventory/create",
    UPDATE: "inventory/update",
    DELETE: "inventory/delete",
  },
  TASK: {
    LIST: "task/list",
    FIND: (id: string | number) => `task/find/${id}`,
    CREATE: "task/create",
    UPDATE: "task/update",
    DELETE: "task/delete",
  },
  EMAIL: {
    LIST: "email/list",
    FIND: (id: string | number) => `email/find/${id}`,
    CREATE: "email/create",
    UPDATE: "email/update",
    DELETE: "email/delete",
  },
  NOTE: {
    LIST: "note/list",
    FIND: (id: string | number) => `note/find/${id}`,
    CREATE: "note/create",
    UPDATE: "note/update",
    DELETE: "note/delete",
  },
} as const;
