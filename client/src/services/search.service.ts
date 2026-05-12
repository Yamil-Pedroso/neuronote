import { apiClient } from "../api/apiClient";
import type { ApiResponse } from "../types/api.types";
import type { Note } from "../types/note.types";

export type SemanticSearchResult = Note & {
  similarity: number;
};

type SemanticSearchInput = {
  query: string;
  limit?: number;
};

export const searchService = {
  async semanticSearch(input: SemanticSearchInput) {
    const response = await apiClient.post<
      ApiResponse<{
        results: SemanticSearchResult[];
      }>
    >("/search/semantic", input);

    return response.data.data.results;
  },
};
