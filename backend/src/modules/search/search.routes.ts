import { Router } from "express";

import { authMiddleware } from "../../shared/middlewares/auth.middleware.js";
import { validate } from "../../shared/middlewares/validate.js";
import { asyncHandler } from "../../shared/utils/asyncHandler.js";

import { searchController } from "./search.controller.js";
import { semanticSearchSchema } from "./search.schemas.js";

export const searchRoutes = Router();

searchRoutes.post(
  "/semantic",
  authMiddleware,
  validate(semanticSearchSchema),
  asyncHandler(searchController.semanticSearch),
);
