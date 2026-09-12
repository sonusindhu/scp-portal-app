import { z } from 'zod';

export const createTaskSchema = z.object({
  type: z.string().max(20).optional().nullable(),
  subject: z.string().max(100).optional().nullable(),
  description: z.string().max(5000).optional().nullable(),
  priority: z.string().max(20).optional().nullable(),
  dueDateTime: z.union([z.string(), z.date()]).optional().nullable(),
  reminderDateTime: z.union([z.string(), z.date()]).optional().nullable(),
  category: z.string().max(50).optional().nullable(),
  status: z.string().max(20).optional().nullable(),
  assignedTo: z.number().int().positive().optional().nullable(),
  pointOfContact: z.number().int().positive().optional().nullable(),
  quoteId: z.number().int().positive().optional().nullable(),
  companyId: z.number().int().positive().optional().nullable(),
  inventoryId: z.number().int().positive().optional().nullable(),
  userId: z.number().int().positive().optional().nullable(),
  createdBy: z.number().int().positive().optional().nullable(),
  updatedBy: z.number().int().positive().optional().nullable(),
  isDeleted: z.boolean().optional(),
});

export const taskListQuerySchema = z.object({
  skip: z.number().int().min(0).optional(),
  take: z.number().int().min(1).max(100).optional(),
  orderBy: z.string().optional(),
  sortDirection: z.enum(['asc', 'desc']).optional(),
});
