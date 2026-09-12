import type { PaginationQuery } from '../../common/types/api.js';

export interface QuotePayload {
  quoteNumber?: string;
  name?: string | null;
  service?: string | null;
  transportMode?: string | null;
  status?: string | null;
  totalCost?: number | null;
  totalProfit?: number | null;
  expiryDate?: Date | string | null;
  totalMiles?: number | null;
  companyId?: number | null;
  contactId?: number | null;
  createdBy?: number | null;
  updatedBy?: number | null;
  isDeleted?: boolean;
}

export interface QuoteListQuery extends PaginationQuery {}
