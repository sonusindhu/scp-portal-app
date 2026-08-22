import { z } from 'zod';

export const createEmailSchema = z.object({
  type: z.string().max(20).optional().nullable(),
  title: z.string().max(100).optional().nullable(),
  message: z.string().max(5000).optional().nullable(),
  toEmail: z.string().email().max(255).optional().nullable(),
  fromEmail: z.string().email().max(255).optional().nullable(),
  isCritical: z.boolean().optional().nullable(),
  quoteId: z.number().int().positive().optional().nullable(),
  contactId: z.number().int().positive().optional().nullable(),
  companyId: z.number().int().positive().optional().nullable(),
  inventoryId: z.number().int().positive().optional().nullable(),
  userId: z.number().int().positive().optional().nullable(),
  createdBy: z.number().int().positive().optional().nullable(),
  updatedBy: z.number().int().positive().optional().nullable(),
  isDeleted: z.boolean().optional(),
});

export const emailListQuerySchema = z.object({
  skip: z.number().int().min(0).optional(),
  take: z.number().int().min(1).max(100).optional(),
  orderBy: z.string().optional(),
  sortDirection: z.enum(['asc', 'desc']).optional(),
});
