import type { PaginationQuery } from '../../common/types/api.js';

export interface InventoryPayload {
  trackingNumber: string;
  companyId: number;
  type?: string | null;
  deviceType?: string | null;
  status?: string | null;
  length?: number | null;
  width?: number | null;
  height?: number | null;
  lwhType?: string | null;
  weight?: number | null;
  weightType?: string | null;
  location?: string | null;
  notes?: string | null;
  createdBy?: number | null;
  updatedBy?: number | null;
  isDeleted?: boolean;
  packageId?: string | null;
}

export interface InventoryListQuery extends PaginationQuery {}
