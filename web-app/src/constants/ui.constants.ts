/**
 * UI-related constants for presentation and formatting
 */

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
