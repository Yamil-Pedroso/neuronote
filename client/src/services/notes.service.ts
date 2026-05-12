import { apiClient } from "../api/apiClient";

import type { ApiResponse } from "../types/api.types";

import type {
  CreateNoteInput,
  Note,
  UpdateNoteInput,
} from "../types/note.types";

export const notesService = {
  async getNotes() {
    const response = await apiClient.get<
      ApiResponse<{
        notes: Note[];
      }>
    >("/notes");

    return response.data.data.notes;
  },

  async getNote(id: string) {
    const response = await apiClient.get<
      ApiResponse<{
        note: Note;
      }>
    >(`/notes/${id}`);

    return response.data.data.note;
  },

  async createNote(input: CreateNoteInput) {
    const response = await apiClient.post<
      ApiResponse<{
        note: Note;
      }>
    >("/notes", input);

    return response.data.data.note;
  },

  async updateNote(id: string, input: UpdateNoteInput) {
    const response = await apiClient.patch<
      ApiResponse<{
        note: Note;
      }>
    >(`/notes/${id}`, input);

    return response.data.data.note;
  },

  async deleteNote(id: string) {
    await apiClient.delete(`/notes/${id}`);
  },
};
