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
    LOGIN: "auth/signin",
    LOGOUT: "auth/signout",
    SIGNUP: "auth/signup",
    REFRESH: "auth/refresh",
    VERIFY: "auth/verify",
  },
  COMPANY: {
    LIST: "company/get",
    LIST_OF_NAMES: "company/listOfNames",
    FIND: (id: string | number) => `company/find/${id}`,
    CREATE: "company/create",
    UPDATE: "company/update",
    DELETE: "company/delete",
  },
  CONTACT: {
    LIST: "contact/get",
    FIND: (id: string | number) => `contact/find/${id}`,
    CREATE: "contact/create",
    UPDATE: "contact/update",
    DELETE: "contact/delete",
  },
  QUOTE: {
    LIST: "quote/get",
    FIND: (id: string | number) => `quote/find/${id}`,
    CREATE: "quote/create",
    UPDATE: "quote/update",
    DELETE: "quote/delete",
  },
  INVENTORY: {
    LIST: "inventory/get",
    FIND: (id: string | number) => `inventory/find/${id}`,
    CREATE: "inventory/create",
    UPDATE: "inventory/update",
    DELETE: "inventory/delete",
  },
  TASK: {
    LIST: "task/get",
    FIND: (id: string | number) => `task/find/${id}`,
    CREATE: "task/create",
    UPDATE: "task/update",
    DELETE: "task/delete",
  },
  EMAIL: {
    LIST: "email/get",
    FIND: (id: string | number) => `email/find/${id}`,
    CREATE: "email/create",
    UPDATE: "email/update",
    DELETE: "email/delete",
  },
  NOTE: {
    LIST: "note/get",
    FIND: (id: string | number) => `note/find/${id}`,
    CREATE: "note/create",
    UPDATE: "note/update",
    DELETE: "note/delete",
  },
} as const;
