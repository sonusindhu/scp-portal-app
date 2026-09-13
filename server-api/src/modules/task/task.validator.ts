import { z } from 'zod';
import { listQuerySchema } from '../../common/utils/list-query.js';

const dateValueSchema = z.preprocess((value) => {
  if (value === null || value === undefined || value === '') return null;

  if (typeof value === 'string') {
    const parsed = new Date(value);
    return Number.isNaN(parsed.getTime()) ? value : parsed;
  }

  return value;
}, z.date().nullable().optional());

export const createTaskSchema = z.object({
  id: z.number().int().positive().optional(),
  type: z.string().max(20).optional().nullable(),
  subject: z.string().max(100).optional().nullable(),
  description: z.string().max(5000).optional().nullable(),
  priority: z.string().max(20).optional().nullable(),
  dueDateTime: dateValueSchema,
  reminderDateTime: dateValueSchema,
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

export const taskListQuerySchema = listQuerySchema;
