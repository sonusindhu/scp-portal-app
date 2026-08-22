export type SortDirection = 'asc' | 'desc';

export interface CompanyPayload {
  name: string;
  email: string;
  type?: string | null;
  status?: string | null;
  phone?: string | null;
  extension?: string | null;
  address1?: string | null;
  address2?: string | null;
  city?: string | null;
  state?: string | null;
  zipcode?: string | null;
  country?: string | null;
  employeesCount?: number | null;
  revenue?: number | null;
  mainContactId?: number | null;
  createdBy?: number | null;
  updatedBy?: number | null;
  isDeleted?: boolean;
}

export interface CompanyListQuery {
  skip?: number;
  take?: number;
  orderBy?: string;
  sortDirection?: SortDirection;
}
