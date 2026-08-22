import { z } from 'zod';

export const createCompanySchema = z.object({
  name: z.string().min(1).max(200),
  email: z.string().email(),
  type: z.string().max(15).optional().nullable(),
  status: z.string().max(10).optional().nullable(),
  phone: z.string().max(15).optional().nullable(),
  extension: z.string().max(5).optional().nullable(),
  address1: z.string().max(100).optional().nullable(),
  address2: z.string().max(100).optional().nullable(),
  city: z.string().max(50).optional().nullable(),
  state: z.string().max(50).optional().nullable(),
  zipcode: z.string().max(10).optional().nullable(),
  country: z.string().max(50).optional().nullable(),
  employeesCount: z.number().int().optional().nullable(),
  revenue: z.number().optional().nullable(),
  mainContactId: z.number().int().optional().nullable(),
  createdBy: z.number().int().optional().nullable(),
  updatedBy: z.number().int().optional().nullable(),
  isDeleted: z.boolean().optional(),
});

export const companyListQuerySchema = z.object({
  skip: z.number().int().min(0).optional(),
  take: z.number().int().min(1).max(100).optional(),
  orderBy: z.string().optional(),
  sortDirection: z.enum(['asc', 'desc']).optional(),
});
