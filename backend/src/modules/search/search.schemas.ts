import { z } from "zod";

export const semanticSearchSchema = z.object({
  body: z.object({
    query: z.string().min(1),
    limit: z.number().int().min(1).max(20).optional(),
  }),
});

export type SemanticSearchInput = z.infer<typeof semanticSearchSchema>["body"];
