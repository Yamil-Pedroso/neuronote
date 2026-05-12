import { apiClient } from "../api/apiClient";
import type { ApiResponse } from "../types/api.types";
import type { Note } from "../types/note.types";

export type SummarizeNoteResponse = {
  summary: string;
  note: Note;
};

export type GenerateTitleResponse = {
  title: string;
};

export type SuggestTagsResponse = {
  tags: string[];
};

export const aiService = {
  async summarizeNote(noteId: string) {
    const response = await apiClient.post<ApiResponse<SummarizeNoteResponse>>(
      `/ai/notes/${noteId}/summarize`,
    );

    return response.data.data;
  },

  async generateTitle(noteId: string) {
    const response = await apiClient.post<ApiResponse<GenerateTitleResponse>>(
      `/ai/notes/${noteId}/generate-title`,
    );

    return response.data.data;
  },

  async suggestTags(noteId: string) {
    const response = await apiClient.post<ApiResponse<SuggestTagsResponse>>(
      `/ai/notes/${noteId}/suggest-tags`,
    );

    return response.data.data;
  },
};
