/**
 * Configuration constants
 */

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
 * Default pagination settings
 */
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 20,
  PAGE_SIZE_OPTIONS: [10, 20, 50, 100],
} as const;
