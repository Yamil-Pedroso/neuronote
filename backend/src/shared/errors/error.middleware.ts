import { Request, Response, NextFunction } from "express";
import { AppError } from "./AppError.js";
import { env } from "../../config/env.js";

export const errorMiddleware = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.error(error);

  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      success: false,
      message: error.message,
    });
  }

  return res.status(500).json({
    success: false,
    message:
      env.NODE_ENV === "production" ? "Internal server error" : error.message,
  });
};
