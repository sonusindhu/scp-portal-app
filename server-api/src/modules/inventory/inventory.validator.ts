import { z } from 'zod';
import { listQuerySchema } from '../../common/utils/list-query.js';

export const createInventorySchema = z.object({
  trackingNumber: z.string().min(1).max(50),
  companyId: z.number().int().positive(),
  type: z.string().max(50).optional().nullable(),
  deviceType: z.string().max(15).optional().nullable(),
  status: z.string().max(10).optional().nullable(),
  length: z.number().optional().nullable(),
  width: z.number().optional().nullable(),
  height: z.number().optional().nullable(),
  lwhType: z.string().max(10).optional().nullable(),
  weight: z.number().optional().nullable(),
  weightType: z.string().max(10).optional().nullable(),
  location: z.string().max(254).optional().nullable(),
  notes: z.string().max(254).optional().nullable(),
  createdBy: z.number().int().optional().nullable(),
  updatedBy: z.number().int().optional().nullable(),
  isDeleted: z.boolean().optional(),
  packageId: z.string().max(50).optional().nullable(),
});

export const inventoryListQuerySchema = listQuerySchema;
