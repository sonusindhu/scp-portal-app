/**
 * Centralized validation rules for react-hook-form
 * Provides consistent, reusable validation patterns across all forms
 */

import { RegisterOptions } from "react-hook-form";

/**
 * Common regex patterns for validation
 */
export const ValidationPatterns = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE: /^[\d\s\-\+\(\)]{8,15}$/,
  ZIPCODE: /^[\d\-]{5,10}$/,
  URL: /^https?:\/\/.+/,
  ALPHANUMERIC: /^[a-zA-Z0-9]+$/,
  ALPHA_ONLY: /^[a-zA-Z\s]+$/,
  NUMERIC_ONLY: /^\d+$/,
} as const;

/**
 * Standard validation error messages
 */
export const ValidationMessages = {
  REQUIRED: "This field is required",
  EMAIL_INVALID: "Please enter a valid email address",
  PHONE_INVALID: "Please enter a valid phone number (8-15 digits)",
  ZIPCODE_INVALID: "Please enter a valid zipcode",
  URL_INVALID: "Please enter a valid URL starting with http:// or https://",
  MIN_LENGTH: (min: number) => `Must be at least ${min} characters`,
  MAX_LENGTH: (max: number) => `Must be at most ${max} characters`,
  MIN_VALUE: (min: number) => `Must be at least ${min}`,
  MAX_VALUE: (max: number) => `Must be at most ${max}`,
  PASSWORDS_MATCH: "Passwords must match",
  ALPHA_ONLY: "Only letters and spaces are allowed",
  NUMERIC_ONLY: "Only numbers are allowed",
} as const;

/**
 * Reusable validation rules for common form fields
 */
export const ValidationRules = {
  /**
   * Required field validation
   */
  required: (message: string = ValidationMessages.REQUIRED): RegisterOptions => ({
    required: { value: true, message },
  }),

  /**
   * Email validation with pattern matching
   */
  email: (isRequired: boolean = true): RegisterOptions => ({
    required: isRequired ? { value: true, message: ValidationMessages.REQUIRED } : false,
    pattern: {
      value: ValidationPatterns.EMAIL,
      message: ValidationMessages.EMAIL_INVALID,
    },
    maxLength: {
      value: 250,
      message: ValidationMessages.MAX_LENGTH(250),
    },
  }),

  /**
   * Phone number validation
   */
  phone: (isRequired: boolean = true): RegisterOptions => ({
    required: isRequired ? { value: true, message: ValidationMessages.REQUIRED } : false,
    pattern: {
      value: ValidationPatterns.PHONE,
      message: ValidationMessages.PHONE_INVALID,
    },
    minLength: {
      value: 8,
      message: ValidationMessages.MIN_LENGTH(8),
    },
    maxLength: {
      value: 15,
      message: ValidationMessages.MAX_LENGTH(15),
    },
  }),

  /**
   * Zipcode validation
   */
  zipcode: (isRequired: boolean = true): RegisterOptions => ({
    required: isRequired ? { value: true, message: ValidationMessages.REQUIRED } : false,
    pattern: {
      value: ValidationPatterns.ZIPCODE,
      message: ValidationMessages.ZIPCODE_INVALID,
    },
    maxLength: {
      value: 10,
      message: ValidationMessages.MAX_LENGTH(10),
    },
  }),

  /**
   * Text field with min/max length
   */
  text: (
    minLength?: number,
    maxLength?: number,
    isRequired: boolean = true
  ): RegisterOptions => ({
    required: isRequired ? { value: true, message: ValidationMessages.REQUIRED } : false,
    ...(minLength && {
      minLength: {
        value: minLength,
        message: ValidationMessages.MIN_LENGTH(minLength),
      },
    }),
    ...(maxLength && {
      maxLength: {
        value: maxLength,
        message: ValidationMessages.MAX_LENGTH(maxLength),
      },
    }),
  }),

  /**
   * Name fields (firstName, lastName) - alpha characters only
   */
  name: (maxLength: number = 120, isRequired: boolean = true): RegisterOptions => ({
    required: isRequired ? { value: true, message: ValidationMessages.REQUIRED } : false,
    pattern: {
      value: ValidationPatterns.ALPHA_ONLY,
      message: ValidationMessages.ALPHA_ONLY,
    },
    maxLength: {
      value: maxLength,
      message: ValidationMessages.MAX_LENGTH(maxLength),
    },
  }),

  /**
   * Password validation with strength requirements
   */
  password: (minLength: number = 8, maxLength: number = 100): RegisterOptions => ({
    required: { value: true, message: ValidationMessages.REQUIRED },
    minLength: {
      value: minLength,
      message: ValidationMessages.MIN_LENGTH(minLength),
    },
    maxLength: {
      value: maxLength,
      message: ValidationMessages.MAX_LENGTH(maxLength),
    },
  }),

  /**
   * Confirm password validation (requires comparison with password field)
   */
  confirmPassword: (passwordValue: string): RegisterOptions => ({
    required: { value: true, message: ValidationMessages.REQUIRED },
    validate: (value: string) =>
      value === passwordValue || ValidationMessages.PASSWORDS_MATCH,
  }),

  /**
   * Number field with min/max value
   */
  number: (
    min?: number,
    max?: number,
    isRequired: boolean = true
  ): RegisterOptions => ({
    required: isRequired ? { value: true, message: ValidationMessages.REQUIRED } : false,
    ...(min !== undefined && {
      min: {
        value: min,
        message: ValidationMessages.MIN_VALUE(min),
      },
    }),
    ...(max !== undefined && {
      max: {
        value: max,
        message: ValidationMessages.MAX_VALUE(max),
      },
    }),
  }),

  /**
   * URL validation
   */
  url: (isRequired: boolean = true): RegisterOptions => ({
    required: isRequired ? { value: true, message: ValidationMessages.REQUIRED } : false,
    pattern: {
      value: ValidationPatterns.URL,
      message: ValidationMessages.URL_INVALID,
    },
  }),

  /**
   * Extension field (numeric only, max 6 digits)
   */
  extension: (isRequired: boolean = false): RegisterOptions => ({
    required: isRequired ? { value: true, message: ValidationMessages.REQUIRED } : false,
    pattern: {
      value: ValidationPatterns.NUMERIC_ONLY,
      message: ValidationMessages.NUMERIC_ONLY,
    },
    maxLength: {
      value: 6,
      message: ValidationMessages.MAX_LENGTH(6),
    },
  }),

  /**
   * Department field
   */
  department: (isRequired: boolean = true): RegisterOptions => ({
    required: isRequired ? { value: true, message: ValidationMessages.REQUIRED } : false,
    maxLength: {
      value: 50,
      message: ValidationMessages.MAX_LENGTH(50),
    },
  }),

  /**
   * Job title field
   */
  jobTitle: (isRequired: boolean = true): RegisterOptions => ({
    required: isRequired ? { value: true, message: ValidationMessages.REQUIRED } : false,
    maxLength: {
      value: 100,
      message: ValidationMessages.MAX_LENGTH(100),
    },
  }),

  /**
   * Address field
   */
  address: (isRequired: boolean = true): RegisterOptions => ({
    required: isRequired ? { value: true, message: ValidationMessages.REQUIRED } : false,
    maxLength: {
      value: 100,
      message: ValidationMessages.MAX_LENGTH(100),
    },
  }),

  /**
   * City field
   */
  city: (isRequired: boolean = true): RegisterOptions => ({
    required: isRequired ? { value: true, message: ValidationMessages.REQUIRED } : false,
    maxLength: {
      value: 50,
      message: ValidationMessages.MAX_LENGTH(50),
    },
  }),

  /**
   * State field
   */
  state: (isRequired: boolean = true): RegisterOptions => ({
    required: isRequired ? { value: true, message: ValidationMessages.REQUIRED } : false,
    maxLength: {
      value: 50,
      message: ValidationMessages.MAX_LENGTH(50),
    },
  }),

  /**
   * Country field
   */
  country: (isRequired: boolean = true): RegisterOptions => ({
    required: isRequired ? { value: true, message: ValidationMessages.REQUIRED } : false,
    maxLength: {
      value: 50,
      message: ValidationMessages.MAX_LENGTH(50),
    },
  }),

  /**
   * Company name field
   */
  companyName: (isRequired: boolean = true): RegisterOptions => ({
    required: isRequired ? { value: true, message: ValidationMessages.REQUIRED } : false,
    maxLength: {
      value: 200,
      message: ValidationMessages.MAX_LENGTH(200),
    },
  }),

  /**
   * Select/dropdown validation
   */
  select: (isRequired: boolean = true): RegisterOptions => ({
    required: isRequired ? { value: true, message: "Please select an option" } : false,
    validate: (value: any) => {
      if (isRequired && (value === "" || value === null || value === undefined)) {
        return "Please select an option";
      }
      return true;
    },
  }),
} as const;

/**
 * Utility function to combine multiple validation rules
 * Usage: combineValidations(ValidationRules.required(), ValidationRules.text(undefined, 100))
 */
export const combineValidations = (...rules: any[]): RegisterOptions => {
  return rules.reduce((acc, rule) => ({ ...acc, ...rule }), {});
};

/**
 * Custom validator: Check if two fields match (e.g., password confirmation)
 */
export const matchField = (fieldName: string, fieldValue: string) => ({
  validate: (value: string) =>
    value === fieldValue || `Must match ${fieldName}`,
});
