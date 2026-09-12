import type { PaginationQuery } from '../../common/types/api.js';

export interface EmailPayload {
  type?: string | null;
  title?: string | null;
  message?: string | null;
  toEmail?: string | null;
  fromEmail?: string | null;
  isCritical?: boolean | null;
  quoteId?: number | null;
  contactId?: number | null;
  companyId?: number | null;
  inventoryId?: number | null;
  userId?: number | null;
  createdBy?: number | null;
  updatedBy?: number | null;
  isDeleted?: boolean;
}

export interface EmailListQuery extends PaginationQuery {}
