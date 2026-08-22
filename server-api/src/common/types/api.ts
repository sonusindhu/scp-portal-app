export type SortDirection = 'asc' | 'desc';

export interface PaginationMeta {
  total?: number;
  skip?: number;
  take?: number;
}

export interface PaginationQuery {
  skip?: number;
  take?: number;
  orderBy?: string;
  sortDirection?: SortDirection;
}

export interface ApiSuccessResponse<T = unknown> {
  status: true;
  message: string;
  data?: T;
  meta?: Record<string, unknown>;
}

export interface ApiErrorResponse<T = unknown> {
  status: false;
  message: string;
  data?: T;
}

export type ApiEnvelope<T = unknown, E = unknown> = ApiSuccessResponse<T> | ApiErrorResponse<E>;
