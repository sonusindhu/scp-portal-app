/**
 * Shared application constants
 * Centralized constants for consistent usage across the application
 */

/**
 * Common list item interface for dropdown options
 */
export interface ListItem {
  id: string;
  value: string;
}

/**
 * Common status list used across multiple entities
 * (Contact, Inventory, etc.)
 */
export const COMMON_STATUS: ListItem[] = [
  {
    id: "",
    value: "Select",
  },
  {
    id: "active",
    value: "Active",
  },
  {
    id: "inactive",
    value: "Inactive",
  },
];

/**
 * Package types for inventory management
 */
export const PACKAGE_TYPES: ListItem[] = [
  {
    id: "",
    value: "Select",
  },
  {
    id: "parcel",
    value: "Parcel",
  },
  {
    id: "pallet",
    value: "Pallet",
  },
  {
    id: "bale",
    value: "Bale",
  },
];

/**
 * Service types for quotes
 */
export const SERVICE_TYPES: ListItem[] = [
  {
    id: "transportation",
    value: "Transportation",
  },
];

/**
 * Transport modes for quotes
 */
export const TRANSPORT_MODES: ListItem[] = [
  {
    id: "FTL",
    value: "FTL (Full Truckload)",
  },
  {
    id: "LTL",
    value: "LTL (Less Than Truckload)",
  },
];

/**
 * Entity types (for tasks, notes, emails, etc.)
 */
export const ENTITY_TYPES = {
  COMPANY: "company",
  CONTACT: "contact",
  QUOTE: "quote",
  INVENTORY: "inventory",
  TASK: "task",
  EMAIL: "email",
  NOTE: "note",
} as const;

/**
 * Task status list
 */
export const TASK_STATUS: ListItem[] = [
  {
    id: "",
    value: "Select",
  },
  {
    id: "new",
    value: "New",
  },
  {
    id: "in-progress",
    value: "In Progress",
  },
  {
    id: "completed",
    value: "Completed",
  },
  {
    id: "canceled",
    value: "Canceled",
  },
];

/**
 * Task priority list
 */
export const TASK_PRIORITY: ListItem[] = [
  { id: "1", value: "High" },
  { id: "2", value: "Medium" },
  { id: "3", value: "Low" },
];

/**
 * Task category list
 */
export const TASK_CATEGORY: ListItem[] = [
  { id: "1", value: "Call" },
  { id: "2", value: "Email" },
  { id: "3", value: "Reminder" },
];

/**
 * Temporary user list
 * TODO: Replace with dynamic API call to fetch actual users
 */
export const TEMP_USER_LIST: ListItem[] = [
  { id: "1", value: "Sonu Sindhu" },
  { id: "2", value: "Pulkit Kumawat" },
  { id: "3", value: "Tushar" },
];

/**
 * Yes/No options for boolean selections
 */
export const YES_NO_OPTIONS: ListItem[] = [
  { id: "1", value: "Yes" },
  { id: "2", value: "No" },
];

/**
 * Quote status list
 */
export const QUOTE_STATUS: ListItem[] = [
  {
    id: "",
    value: "Select",
  },
  {
    id: "draft",
    value: "Draft",
  },
  {
    id: "pending",
    value: "Pending",
  },
  {
    id: "approved",
    value: "Approved",
  },
  {
    id: "rejected",
    value: "Rejected",
  },
  {
    id: "completed",
    value: "Completed",
  },
];

/**
 * Default pagination settings
 */
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 20,
  PAGE_SIZE_OPTIONS: [10, 20, 50, 100],
} as const;

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
 * Field width constants (matching FormFields)
 */
export const FIELD_WIDTHS = {
  FULL: "100%",
  DRAWER: 410,
  STANDARD: "31%",
  HALF: "48%",
} as const;

/**
 * Validation constants
 */
export const VALIDATION = {
  MAX_EMAIL_LENGTH: 100,
  MAX_PHONE_LENGTH: 15,
  MAX_NAME_LENGTH: 100,
  MAX_ADDRESS_LENGTH: 200,
  MIN_PASSWORD_LENGTH: 8,
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_IMAGE_EXTENSIONS: ["jpg", "jpeg", "gif", "bmp", "png"],
} as const;

/**
 * Local storage keys
 */
export const STORAGE_KEYS = {
  USER: "user",
  AUTH_TOKEN: "authToken",
  THEME: "theme",
} as const;

/**
 * Route paths
 */
export const ROUTES = {
  LOGIN: "/auth/login",
  HOME: "/",
  APP_ROOT: "/app",
  
  // Company routes
  COMPANY_LIST: "/app/company/list",
  COMPANY_CREATE: "/app/company/create",
  COMPANY_DETAILS: (id: string | number) => `/app/company/${id}/details`,
  COMPANY_EDIT: (id: string | number) => `/app/company/${id}/edit`,
  
  // Contact routes
  CONTACT_LIST: "/app/contact/list",
  CONTACT_CREATE: "/app/contact/create",
  CONTACT_DETAILS: (id: string | number) => `/app/contact/${id}/details`,
  CONTACT_EDIT: (id: string | number) => `/app/contact/${id}/edit`,
  
  // Quote routes
  QUOTE_LIST: "/app/quote/list",
  QUOTE_CREATE: "/app/quote/create",
  QUOTE_DETAILS: (id: string | number) => `/app/quote/${id}/details`,
  QUOTE_EDIT: (id: string | number) => `/app/quote/${id}/edit`,
  
  // Inventory routes
  INVENTORY_LIST: "/app/inventory/list",
  INVENTORY_CREATE: "/app/inventory/create",
  INVENTORY_DETAILS: (id: string | number) => `/app/inventory/${id}/details`,
  INVENTORY_EDIT: (id: string | number) => `/app/inventory/${id}/edit`,
  
  // Profile routes
  PROFILE: "/app/profile",
  PROFILE_PASSWORD: "/app/profile/updatepassword",
  PROFILE_INTEGRATIONS: "/app/profile/integrations",
  PROFILE_TEMPLATES: "/app/profile/templates",
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

/**
 * Date and time format constants
 */
export const DATE_FORMATS = {
  DISPLAY: "dd/MM/yyyy",
  DISPLAY_WITH_TIME: "dd/MM/yyyy p",
  API: "yyyy-MM-dd",
  API_WITH_TIME: "yyyy-MM-dd HH:mm:ss",
  TIME_ONLY: "HH:mm",
} as const;

/**
 * Toast notification durations (milliseconds)
 */
export const TOAST_DURATION = {
  SHORT: 2000,
  MEDIUM: 3000,
  LONG: 5000,
} as const;

/**
 * Modal/Dialog sizes
 */
export const DIALOG_SIZES = {
  SMALL: "sm",
  MEDIUM: "md",
  LARGE: "lg",
  EXTRA_LARGE: "xl",
} as const;
