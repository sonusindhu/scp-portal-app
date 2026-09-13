import { z } from 'zod';
import { listQuerySchema } from '../../common/utils/list-query.js';

export const createQuoteSchema = z.object({
  id: z.number().int().positive().optional(),
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

export const quoteListQuerySchema = listQuerySchema;
