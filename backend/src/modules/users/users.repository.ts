import { db } from "../../config/db.js";
import type { User } from "./users.types.js";

type CreateUserInput = {
  name: string;
  email: string;
  avatar_url?: string | null;
  passwordHash: string;
};

export const usersRepository = {
  async create(input: CreateUserInput): Promise<User> {
    const result = await db.query<User>(
      `
      INSERT INTO users (name, email, avatar_url, password_hash)
      VALUES ($1, $2, $3, $4)
      RETURNING *
      `,
      [input.name, input.email, input.avatar_url, input.passwordHash],
    );

    return result.rows[0];
  },

  async updateAvatar(input: {
    userId: string;
    avatarUrl: string;
  }): Promise<User | null> {
    const result = await db.query<User>(
      `
    UPDATE users
    SET
      avatar_url = $2,
      updated_at = NOW()
    WHERE id = $1
    RETURNING *
    `,
      [input.userId, input.avatarUrl],
    );

    return result.rows[0] || null;
  },

  async findByEmail(email: string): Promise<User | null> {
    const result = await db.query<User>(
      `
      SELECT *
      FROM users
      WHERE email = $1
      `,
      [email],
    );

    return result.rows[0] || null;
  },

  async findById(id: string): Promise<User | null> {
    const result = await db.query<User>(
      `
      SELECT *
      FROM users
      WHERE id = $1
      `,
      [id],
    );

    return result.rows[0] || null;
  },

  async findMany(): Promise<User[]> {
    const result = await db.query<User>(
      `
    SELECT *
    FROM users
    ORDER BY created_at DESC
    `,
    );

    return result.rows;
  },

  async updateMe(input: {
    userId: string;
    name?: string;
    avatarUrl?: string | null;
  }): Promise<User | null> {
    const result = await db.query<User>(
      `
    UPDATE users
    SET
      name = COALESCE($2, name),
      avatar_url = COALESCE($3, avatar_url),
      updated_at = NOW()
    WHERE id = $1
    RETURNING *
    `,
      [input.userId, input.name, input.avatarUrl],
    );

    return result.rows[0] || null;
  },

  async deleteById(id: string): Promise<void> {
    await db.query(
      `
    DELETE FROM users
    WHERE id = $1
    `,
      [id],
    );
  },
};
