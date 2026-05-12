import { db } from "../../config/db.js";

type CreateTagInput = {
  userId: string;
  name: string;
  color?: string;
};

export const tagsRepository = {
  async create(input: CreateTagInput) {
    const result = await db.query(
      `
      INSERT INTO tags (user_id, name, color)
      VALUES ($1, $2, $3)
      RETURNING *
      `,
      [input.userId, input.name, input.color || "#6366f1"],
    );

    return result.rows[0];
  },

  async findManyByUserId(userId: string) {
    const result = await db.query(
      `
      SELECT *
      FROM tags
      WHERE user_id = $1
      ORDER BY name ASC
      `,
      [userId],
    );

    return result.rows;
  },

  async findByIdAndUserId(id: string, userId: string) {
    const result = await db.query(
      `
      SELECT *
      FROM tags
      WHERE id = $1
      AND user_id = $2
      `,
      [id, userId],
    );

    return result.rows[0] || null;
  },

  async delete(id: string, userId: string) {
    await db.query(
      `
      DELETE FROM tags
      WHERE id = $1
      AND user_id = $2
      `,
      [id, userId],
    );
  },

  async attachTagToNote(input: { noteId: string; tagId: string }) {
    const result = await db.query(
      `
    INSERT INTO note_tags (note_id, tag_id)
    VALUES ($1, $2)
    ON CONFLICT DO NOTHING
    RETURNING *
    `,
      [input.noteId, input.tagId],
    );

    return result.rows[0] || null;
  },

  async removeTagFromNote(input: { noteId: string; tagId: string }) {
    await db.query(
      `
    DELETE FROM note_tags
    WHERE note_id = $1
    AND tag_id = $2
    `,
      [input.noteId, input.tagId],
    );
  },
};
