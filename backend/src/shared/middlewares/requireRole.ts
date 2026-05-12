import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/AppError.js";
import type { UserRole } from "../../modules/users/users.types.js";

export const requireRole = (role: UserRole) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      throw new AppError("Unauthorized", 401);
    }

    if (req.user.role !== role) {
      throw new AppError("Forbidden", 403);
    }

    next();
  };
};
