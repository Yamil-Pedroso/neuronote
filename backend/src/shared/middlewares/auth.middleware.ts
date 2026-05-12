import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/AppError.js";
import { verifyAccessToken } from "../utils/jwt.js";
import { usersRepository } from "../../modules/users/users.repository.js";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new AppError("Unauthorized", 401);
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = verifyAccessToken(token);
    const user = await usersRepository.findById(payload.userId);

    if (!user) {
      throw new AppError("Unauthorized", 401);
    }

    req.user = user;

    next();
  } catch {
    throw new AppError("Invalid or expired token", 401);
  }
};
