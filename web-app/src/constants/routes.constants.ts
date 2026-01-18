/**
 * Application route paths
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
