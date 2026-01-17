import BaseService, { ApiResponse } from "./BaseService";
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
    return this.post<Task[]>("task/list", filters);
  }

  /**
   * Find a task by ID
   * @param id - Task ID
   * @returns Promise with task details
   */
  async find(id: number): Promise<ApiResponse<Task>> {
    return super.get<Task>(`task/find/${id}`);
  }

  /**
   * Create a new task
   * @param payload - Task data
   * @returns Promise with created task
   */
  async create(payload: TaskCreatePayload): Promise<ApiResponse<Task>> {
    return this.post<Task>("task/create", payload, {
      showSuccessToast: true,
    });
  }

  /**
   * Update an existing task
   * @param payload - Updated task data including ID
   * @returns Promise with updated task
   */
  async update(payload: TaskUpdatePayload): Promise<ApiResponse<Task>> {
    return this.post<Task>("task/update", payload, {
      showSuccessToast: true,
    });
  }

  /**
   * Delete multiple tasks by IDs
   * @param ids - Array of task IDs to delete
   * @returns Promise with deletion result
   */
  async deleteRange(ids: number[]): Promise<ApiResponse<void>> {
    return this.post<void>("task/deleteRange", { ids }, {
      showSuccessToast: true,
    });
  }
}

export default new TaskService();
