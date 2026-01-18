/**
 * Type definitions and interfaces for constants
 */

/**
 * Common list item interface for dropdown options
 */
export interface ListItem {
  id: string;
  value: string;
}

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
