import { createEmbedding } from "../ai/embedding.service.js";
import { notesRepository } from "../notes/notes.repository.js";

import type { SemanticSearchInput } from "./search.schemas.js";

export const searchService = {
  async semanticSearch(userId: string, input: SemanticSearchInput) {
    const embedding = await createEmbedding(input.query);

    return notesRepository.semanticSearch(userId, embedding, input.limit ?? 10);
  },
};
