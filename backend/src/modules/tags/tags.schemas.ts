import { z } from "zod";

export const createTagSchema = z.object({
  body: z.object({
    name: z.string().min(2).max(60),
    color: z.string().max(20).optional(),
  }),
});

export const tagParamsSchema = z.object({
  params: z.object({
    id: z.uuid(),
  }),
});

export const noteTagParamsSchema = z.object({
  params: z.object({
    noteId: z.uuid(),
    tagId: z.uuid(),
  }),
});

export type CreateTagInput = z.infer<typeof createTagSchema>["body"];
