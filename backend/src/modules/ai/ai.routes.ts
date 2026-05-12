import { Router } from "express";

import { aiController } from "./ai.controller.js";
import { authMiddleware } from "../../shared/middlewares/auth.middleware.js";
import { validate } from "../../shared/middlewares/validate.js";
import { aiNoteParamsSchema } from "./ai.schemas.js";

export const aiRoutes = Router();

aiRoutes.use(authMiddleware);

aiRoutes.post(
  "/notes/:id/summarize",
  validate(aiNoteParamsSchema),
  aiController.summarizeNote,
);

aiRoutes.post(
  "/notes/:id/generate-title",
  validate(aiNoteParamsSchema),
  aiController.generateTitle,
);

aiRoutes.post(
  "/notes/:id/suggest-tags",
  validate(aiNoteParamsSchema),
  aiController.suggestTags,
);
