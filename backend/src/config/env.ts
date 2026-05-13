import dotenv from "dotenv";
import type { SignOptions } from "jsonwebtoken";

dotenv.config();

const requiredEnvVars = [
  "DATABASE_URL",
  "JWT_ACCESS_SECRET",
  "JWT_REFRESH_SECRET",
  "OPENAI_API_KEY",
  "OPENAI_EMBEDDING_MODEL",
];

requiredEnvVars.forEach((envVar) => {
  if (!process.env[envVar]) {
    throw new Error(`Missing required env variable: ${envVar}`);
  }
});

export const env = {
  NODE_ENV: process.env.NODE_ENV || "development",

  PORT: Number(process.env.PORT) || 4000,

  DATABASE_URL: process.env.DATABASE_URL!,

  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET!,

  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET!,

  JWT_ACCESS_EXPIRES_IN:
    (process.env.JWT_ACCESS_EXPIRES_IN as SignOptions["expiresIn"]) || "15m",

  JWT_REFRESH_EXPIRES_IN:
    (process.env.JWT_REFRESH_EXPIRES_IN as SignOptions["expiresIn"]) || "7d",

  OPENAI_API_KEY: process.env.OPENAI_API_KEY!,

  OPENAI_MODEL: process.env.OPENAI_MODEL || "gpt-4.1-mini",

  OPENAI_EMBEDDING_MODEL:
    process.env.OPENAI_EMBEDDING_MODEL || "text-embedding-3-small",

  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME!,

  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY!,

  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET!,
};
