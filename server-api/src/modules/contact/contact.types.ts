export type SortDirection = 'asc' | 'desc';

export interface ContactPayload {
  firstName: string;
  lastName: string;
  email: string;
  companyId: number;
  status?: string | null;
  department?: string | null;
  jobTitle?: string | null;
  phone?: string | null;
  extension?: string | null;
  address1?: string | null;
  address2?: string | null;
  city?: string | null;
  state?: string | null;
  zipcode?: string | null;
  country?: string | null;
  birthDate?: string | null;
  createdBy?: number | null;
  updatedBy?: number | null;
  isDeleted?: boolean;
}

export interface ContactListQuery {
  skip?: number;
  take?: number;
  orderBy?: string;
  sortDirection?: SortDirection;
}
