import type { PaginationQuery } from '../../common/types/api.js';

export interface TaskPayload {
  type?: string | null;
  subject?: string | null;
  description?: string | null;
  priority?: string | null;
  dueDateTime?: Date | string | null;
  reminderDateTime?: Date | string | null;
  category?: string | null;
  status?: string | null;
  assignedTo?: number | null;
  pointOfContact?: number | null;
  quoteId?: number | null;
  companyId?: number | null;
  inventoryId?: number | null;
  userId?: number | null;
  createdBy?: number | null;
  updatedBy?: number | null;
  isDeleted?: boolean;
}

export interface TaskListQuery extends PaginationQuery {}
