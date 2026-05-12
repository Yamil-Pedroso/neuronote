import { z } from "zod";

export const aiNoteParamsSchema = z.object({
  params: z.object({
    id: z.uuid(),
  }),
});
