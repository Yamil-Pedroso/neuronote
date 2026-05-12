// services/tags.service.ts
import { apiClient } from "../api/apiClient";
import type { ApiResponse } from "../types/api.types";
import type { CreateTagInput, Tag } from "../types/tag.types";

export const tagsService = {
  async getTags(): Promise<Tag[]> {
    const response = await apiClient.get<ApiResponse<{ tags: Tag[] }>>("/tags");
    return response.data.data.tags;
  },

  async createTag(input: CreateTagInput): Promise<Tag> {
    const response = await apiClient.post<ApiResponse<{ tag: Tag }>>(
      "/tags",
      input,
    );

    return response.data.data.tag;
  },

  async deleteTag(id: string): Promise<void> {
    await apiClient.delete(`/tags/${id}`);
  },

  async attachTagToNote(noteId: string, tagId: string): Promise<void> {
    await apiClient.post(`/tags/notes/${noteId}/${tagId}`);
  },

  async removeTagFromNote(noteId: string, tagId: string): Promise<void> {
    await apiClient.delete(`/tags/notes/${noteId}/${tagId}`);
  },
};
