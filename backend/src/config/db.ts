import { Pool } from "pg";
import { env } from "./env.js";

export const db = new Pool({
  connectionString: env.DATABASE_URL,
});

db.on("connect", () => {
  console.log("PostgreSQL connected");
});

db.on("error", (error) => {
  console.error("Unexpected PostgreSQL error:", error);
});
