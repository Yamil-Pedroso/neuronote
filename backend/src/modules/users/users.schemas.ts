import { z } from "zod";

export const updateMeSchema = z.object({
  body: z.object({
    name: z.string().min(2).max(100).optional(),
    avatarUrl: z.url().optional().nullable(),
  }),
});

export type UpdateMeInput = z.infer<typeof updateMeSchema>["body"];
