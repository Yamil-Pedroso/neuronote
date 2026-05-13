import express from "express";
import cors from "cors";
import { errorMiddleware } from "./shared/errors/error.middleware.js";
import { authRoutes } from "./modules/auth/auth.routes.js";
import { usersRoutes } from "./modules/users/users.routes.js";
import { notesRoutes } from "./modules/notes/notes.routes.js";
import { tagsRoutes } from "./modules/tags/tags.routes.js";
import { aiRoutes } from "./modules/ai/ai.routes.js";
import { searchRoutes } from "./modules/search/search.routes.js";

export const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://neuronote.vercel.app",
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  }),
);
app.use(express.json());

app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Neuronote API is running",
  });
});

app.use("/uploads", express.static("uploads"));

app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/notes", notesRoutes);
app.use("/api/tags", tagsRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/search", searchRoutes);

app.use(errorMiddleware);
