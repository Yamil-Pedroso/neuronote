import { Router } from "express";

import { authController } from "./auth.controller.js";
import { validate } from "../../shared/middlewares/validate.js";
import { registerSchema, loginSchema, logoutSchema } from "./auth.schemas.js";

export const authRoutes = Router();

authRoutes.post("/register", validate(registerSchema), authController.register);

authRoutes.post("/login", validate(loginSchema), authController.login);

authRoutes.post("/logout", validate(logoutSchema), authController.logout);
