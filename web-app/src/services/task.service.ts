import BaseService, { ApiResponse } from "./BaseService";
import { API_ENDPOINTS } from "../constants/api.constants";
import { Task } from "../shared/models/Task";

/**
 * Task create payload
 */
export interface TaskCreatePayload {
  subject: string;
  description: string;
  priority?: number;
  category?: number;
  assignedTo?: number;
  pointOfContact?: number;
  dueDateTime?: string;
  reminderDateTime?: string;
  status?: number;
}

const toNumberOrUndefined = (value: number | string | null | undefined): number | undefined => {
  if (value === undefined || value === null || value === "") {
    return undefined;
  }

  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : undefined;
};

const normalizeTaskPayload = (payload: Record<string, any>): Record<string, any> => {
  const normalized = { ...payload };

  if (normalized.id !== undefined) {
    normalized.id = toNumberOrUndefined(normalized.id);
  }

  if (normalized.assignedTo !== undefined) {
    normalized.assignedTo = toNumberOrUndefined(normalized.assignedTo);
  }

  if (normalized.pointOfContact !== undefined) {
    normalized.pointOfContact = toNumberOrUndefined(normalized.pointOfContact);
  }

  if (normalized.quoteId !== undefined) {
    normalized.quoteId = toNumberOrUndefined(normalized.quoteId);
  }

  if (normalized.companyId !== undefined) {
    normalized.companyId = toNumberOrUndefined(normalized.companyId);
  }

  if (normalized.inventoryId !== undefined) {
    normalized.inventoryId = toNumberOrUndefined(normalized.inventoryId);
  }

  if (normalized.userId !== undefined) {
    normalized.userId = toNumberOrUndefined(normalized.userId);
  }

  if (normalized.createdBy !== undefined) {
    normalized.createdBy = toNumberOrUndefined(normalized.createdBy);
  }

  if (normalized.updatedBy !== undefined) {
    normalized.updatedBy = toNumberOrUndefined(normalized.updatedBy);
  }

  return normalized;
};

/**
 * Task update payload
 */
export interface TaskUpdatePayload extends TaskCreatePayload {
  id: number;
}

/**
 * Task Service - handles all task-related API operations
 * Extends BaseService for common HTTP methods and error handling
 */
class TaskService extends BaseService {
  /**
   * Get list of tasks with optional filters
   * @param filters - Optional filters for task list
   * @returns Promise with list of tasks
   */
  async list(filters = {}): Promise<ApiResponse<Task[]>> {
    return this.post<Task[]>(API_ENDPOINTS.TASK.LIST, filters);
  }

  /**
   * Find a task by ID
   * @param id - Task ID
   * @returns Promise with task details
   */
  async find(id: number): Promise<ApiResponse<Task>> {
    return super.get<Task>(API_ENDPOINTS.TASK.FIND(id));
  }

  /**
   * Create a new task
   * @param payload - Task data
   * @returns Promise with created task
   */
  async create(payload: TaskCreatePayload): Promise<ApiResponse<Task>> {
    const normalizedPayload = normalizeTaskPayload(payload as Record<string, any>);
    return this.post<Task>(API_ENDPOINTS.TASK.CREATE, normalizedPayload, {
      showSuccessToast: true,
    });
  }

  /**
   * Update an existing task
   * @param payload - Updated task data including ID
   * @returns Promise with updated task
   */
  async update(payload: TaskUpdatePayload): Promise<ApiResponse<Task>> {
    const normalizedPayload = normalizeTaskPayload(payload as Record<string, any>);
    return this.post<Task>(API_ENDPOINTS.TASK.UPDATE, normalizedPayload, {
      showSuccessToast: true,
    });
  }

  /**
   * Delete multiple tasks by IDs
   * @param ids - Array of task IDs to delete
   * @returns Promise with deletion result
   */
  async deleteRange(ids: number[]): Promise<ApiResponse<void>> {
    return this.post<void>(API_ENDPOINTS.TASK.DELETE, { ids }, {
      showSuccessToast: true,
    });
  }
}

export default new TaskService();
