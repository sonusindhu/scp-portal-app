import { z } from 'zod';

export const createQuoteSchema = z.object({
  quoteNumber: z.string().max(50).optional(),
  name: z.string().max(100).optional().nullable(),
  service: z.string().max(50).optional().nullable(),
  transportMode: z.string().max(50).optional().nullable(),
  status: z.string().max(20).optional().nullable(),
  totalCost: z.number().optional().nullable(),
  totalProfit: z.number().optional().nullable(),
  expiryDate: z.union([z.string(), z.date()]).optional().nullable(),
  totalMiles: z.number().optional().nullable(),
  companyId: z.number().int().positive().optional().nullable(),
  contactId: z.number().int().positive().optional().nullable(),
  createdBy: z.number().int().optional().nullable(),
  updatedBy: z.number().int().optional().nullable(),
  isDeleted: z.boolean().optional(),
});

export const quoteListQuerySchema = z.object({
  skip: z.number().int().min(0).optional(),
  take: z.number().int().min(1).max(100).optional(),
  orderBy: z.string().optional(),
  sortDirection: z.enum(['asc', 'desc']).optional(),
});
