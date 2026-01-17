/**
 * Domain-specific constants for business entities
 */

import { ListItem } from "./types.constants";

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
 * Yes/No options for boolean selections
 */
export const YES_NO_OPTIONS: ListItem[] = [
  { id: "1", value: "Yes" },
  { id: "2", value: "No" },
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
