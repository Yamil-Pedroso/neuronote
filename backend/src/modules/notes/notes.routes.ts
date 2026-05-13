import { Router } from "express";

import { notesController } from "./notes.controller.js";
import { authMiddleware } from "../../shared/middlewares/auth.middleware.js";
import { validate } from "../../shared/middlewares/validate.js";
import {
  createNoteSchema,
  updateNoteSchema,
  noteParamsSchema,
} from "./notes.schemas.js";
import { asyncHandler } from "../../shared/utils/asyncHandler.js";

export const notesRoutes = Router();

notesRoutes.use(authMiddleware);

notesRoutes.post("/", validate(createNoteSchema), notesController.createNote);

notesRoutes.get("/", notesController.getNotes);

notesRoutes.get(
  "/:id",
  validate(noteParamsSchema),
  notesController.getNoteById,
);

notesRoutes.patch(
  "/:id",
  validate(noteParamsSchema),
  validate(updateNoteSchema),
  notesController.updateNote,
);

notesRoutes.patch(
  "/:id/archive",
  validate(noteParamsSchema),
  notesController.archiveNote,
);

notesRoutes.patch(
  "/:id/unarchive",
  validate(noteParamsSchema),
  notesController.unarchiveNote,
);

notesRoutes.delete(
  "/:id",
  validate(noteParamsSchema),
  notesController.deleteNote,
);
