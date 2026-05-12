import { db } from "../../config/db.js";

type CreateRefreshTokenInput = {
  userId: string;
  tokenHash: string;
  expiresAt: Date;
};

export const authRepository = {
  async createRefreshToken(input: CreateRefreshTokenInput) {
    const result = await db.query(
      `
      INSERT INTO refresh_tokens (user_id, token_hash, expires_at)
      VALUES ($1, $2, $3)
      RETURNING *
      `,
      [input.userId, input.tokenHash, input.expiresAt],
    );

    return result.rows[0];
  },

  async findRefreshTokenByHash(tokenHash: string) {
    const result = await db.query(
      `
      SELECT *
      FROM refresh_tokens
      WHERE token_hash = $1
      AND revoked_at IS NULL
      `,
      [tokenHash],
    );

    return result.rows[0] || null;
  },

  async revokeRefreshToken(tokenHash: string) {
    await db.query(
      `
      UPDATE refresh_tokens
      SET revoked_at = NOW()
      WHERE token_hash = $1
      `,
      [tokenHash],
    );
  },
};
