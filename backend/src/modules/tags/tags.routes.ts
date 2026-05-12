import { Router } from "express";

import { tagsController } from "./tags.controller.js";
import { authMiddleware } from "../../shared/middlewares/auth.middleware.js";
import { validate } from "../../shared/middlewares/validate.js";
import {
  createTagSchema,
  tagParamsSchema,
  noteTagParamsSchema,
} from "./tags.schemas.js";

export const tagsRoutes = Router();

tagsRoutes.use(authMiddleware);

tagsRoutes.post("/", validate(createTagSchema), tagsController.createTag);

tagsRoutes.get("/", tagsController.getTags);

tagsRoutes.delete("/:id", validate(tagParamsSchema), tagsController.deleteTag);

tagsRoutes.post(
  "/notes/:noteId/:tagId",
  validate(noteTagParamsSchema),
  tagsController.attachTagToNote,
);

tagsRoutes.delete(
  "/notes/:noteId/:tagId",
  validate(noteTagParamsSchema),
  tagsController.removeTagFromNote,
);
