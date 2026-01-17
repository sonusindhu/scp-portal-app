/**
 * Shared application constants
 * Centralized constants for consistent usage across the application
 */

/**
 * Common list item interface for dropdown options
 */
export interface ListItem {
  id: string;
  title: string;
}

/**
 * Common status list used across multiple entities
 * (Contact, Inventory, etc.)
 */
export const COMMON_STATUS: ListItem[] = [
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

/**
 * Package types for inventory management
 */
export const PACKAGE_TYPES: ListItem[] = [
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
    title: "Bale",
  },
];

/**
 * Service types for quotes
 */
export const SERVICE_TYPES: ListItem[] = [
  {
    id: "transportation",
    title: "Transportation",
  },
];

/**
 * Transport modes for quotes
 */
export const TRANSPORT_MODES: ListItem[] = [
  {
    id: "FTL",
    title: "FTL (Full Truckload)",
  },
  {
    id: "LTL",
    title: "LTL (Less Than Truckload)",
  },
];

/**
 * Task types
 */
export const TASK_TYPES = {
  COMPANY: "company",
  CONTACT: "contact",
  QUOTE: "quote",
  INVENTORY: "inventory",
} as const;

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
  COMPANY_LIST: "/app/company/list",
  CONTACT_LIST: "/app/contact/list",
  QUOTE_LIST: "/app/quote/list",
  INVENTORY_LIST: "/app/inventory/list",
} as const;
