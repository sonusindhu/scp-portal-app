import { z } from 'zod';

export const createContactSchema = z.object({
  firstName: z.string().min(1).max(30),
  lastName: z.string().min(1).max(30),
  email: z.string().email().max(250),
  companyId: z.number().int().positive(),
  status: z.string().max(10).optional().nullable(),
  department: z.string().max(50).optional().nullable(),
  jobTitle: z.string().max(50).optional().nullable(),
  phone: z.string().max(15).optional().nullable(),
  extension: z.string().max(5).optional().nullable(),
  address1: z.string().max(100).optional().nullable(),
  address2: z.string().max(100).optional().nullable(),
  city: z.string().max(50).optional().nullable(),
  state: z.string().max(50).optional().nullable(),
  zipcode: z.string().max(10).optional().nullable(),
  country: z.string().max(50).optional().nullable(),
  birthDate: z.string().max(15).optional().nullable(),
  isDeleted: z.boolean().optional(),
  createdBy: z.number().int().optional().nullable(),
  updatedBy: z.number().int().optional().nullable(),
});

export const contactListQuerySchema = z.object({
  skip: z.number().int().min(0).optional(),
  take: z.number().int().min(1).max(100).optional(),
  orderBy: z.string().optional(),
  sortDirection: z.enum(['asc', 'desc']).optional(),
});
