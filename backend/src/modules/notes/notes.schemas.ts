import { z } from "zod";

export const createNoteSchema = z.object({
  body: z.object({
    title: z.string().min(2).max(120),
    content: z.string().min(1),
  }),
});

export const updateNoteSchema = z.object({
  body: z.object({
    title: z.string().min(2).max(120).optional(),
    content: z.string().min(1).optional(),
    summary: z.string().optional().nullable(),
    isArchived: z.boolean().optional(),
  }),
});

export const noteParamsSchema = z.object({
  params: z.object({
    id: z.uuid(),
  }),
});

export type CreateNoteInput = z.infer<typeof createNoteSchema>["body"];
export type UpdateNoteInput = z.infer<typeof updateNoteSchema>["body"];
