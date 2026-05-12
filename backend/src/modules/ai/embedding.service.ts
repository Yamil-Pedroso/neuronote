import { env } from "../../config/env.js";
import { openai } from "../../config/openai.js";

export async function createEmbedding(text: string) {
  const response = await openai.embeddings.create({
    model: env.OPENAI_EMBEDDING_MODEL,
    input: text,
  });

  return response.data[0].embedding;
}
