import BaseService, { ApiResponse } from "./BaseService";
import { API_ENDPOINTS } from "../constants/api.constants";
import { Note } from "../shared/models/Note";

/**
 * Payload for creating a new note
 */
export interface NoteCreatePayload {
  title: string;
  message: string;
  isCritical?: boolean;
  type?: string;
  companyId?: number;
}

const toNumberOrUndefined = (value: number | string | null | undefined): number | undefined => {
  if (value === undefined || value === null || value === "") {
    return undefined;
  }

  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : undefined;
};

const normalizeNotePayload = (payload: Record<string, any>): Record<string, any> => {
  const normalized = { ...payload };

  if (normalized.id !== undefined) {
    normalized.id = toNumberOrUndefined(normalized.id);
  }

  if (normalized.companyId !== undefined) {
    normalized.companyId = toNumberOrUndefined(normalized.companyId);
  }

  if (normalized.quoteId !== undefined) {
    normalized.quoteId = toNumberOrUndefined(normalized.quoteId);
  }

  if (normalized.contactId !== undefined) {
    normalized.contactId = toNumberOrUndefined(normalized.contactId);
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
 * Payload for updating an existing note
 */
export interface NoteUpdatePayload extends NoteCreatePayload {
  id: number;
}

/**
 * Note Service - handles all note-related API operations
 * Extends BaseService for common HTTP methods and error handling
 */
class NoteService extends BaseService {
  /**
   * Get list of notes with optional filters
   * @param filters - Optional filters for note list
   * @returns Promise with list of notes
   */
  async list(filters = {}): Promise<ApiResponse<Note[]>> {
    return this.post<Note[]>(API_ENDPOINTS.NOTE.LIST, filters);
  }

  /**
   * Find a note by ID
   * @param id - Note ID
   * @returns Promise with note details
   */
  async find(id: number): Promise<ApiResponse<Note>> {
    return super.get<Note>(API_ENDPOINTS.NOTE.FIND(id));
  }

  /**
   * Create a new note
   * @param payload - Note data
   * @returns Promise with created note
   */
  async create(payload: NoteCreatePayload): Promise<ApiResponse<Note>> {
    const normalizedPayload = normalizeNotePayload(payload as Record<string, any>);
    return this.post<Note>(API_ENDPOINTS.NOTE.CREATE, normalizedPayload, {
      showSuccessToast: true,
    });
  }

  /**
   * Update an existing note
   * @param payload - Updated note data including ID
   * @returns Promise with updated note
   */
  async update(payload: NoteUpdatePayload): Promise<ApiResponse<Note>> {
    const normalizedPayload = normalizeNotePayload(payload as Record<string, any>);
    return this.post<Note>(API_ENDPOINTS.NOTE.UPDATE, normalizedPayload, {
      showSuccessToast: true,
    });
  }

  /**
   * Delete multiple notes by IDs
   * @param ids - Array of note IDs to delete
   * @returns Promise with deletion result
   */
  async deleteRange(ids: number[]): Promise<ApiResponse<void>> {
    return this.post<void>(API_ENDPOINTS.NOTE.DELETE, { ids }, {
      showSuccessToast: true,
    });
  }
}

export default new NoteService();
