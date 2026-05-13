import { Router } from "express";

import { usersController } from "./users.controller.js";
import { authMiddleware } from "../../shared/middlewares/auth.middleware.js";
import { requireRole } from "../../shared/middlewares/requireRole.js";
import { validate } from "../../shared/middlewares/validate.js";
import { updateMeSchema } from "./users.schemas.js";
import { upload } from "../../shared/middlewares/upload-cloudinary.middleware.js";

export const usersRoutes = Router();

usersRoutes.use(authMiddleware);

usersRoutes.get("/me", usersController.me);

usersRoutes.patch(
  "/me/avatar",
  upload.single("avatar"),
  usersController.updateAvatar,
);

usersRoutes.patch("/me", validate(updateMeSchema), usersController.updateMe);

usersRoutes.delete("/me", usersController.deleteMe);

// Admin routes
usersRoutes.get("/", requireRole("admin"), usersController.getAllUsers);

usersRoutes.delete("/:id", requireRole("admin"), usersController.deleteUser);
