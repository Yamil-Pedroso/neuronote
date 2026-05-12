import { db } from "../../config/db.js";
import type { Note } from "./notes.types.js";

type CreateNoteInput = {
  userId: string;
  title: string;
  content: string;
};

type UpdateNoteInput = {
  id: string;
  userId: string;
  title?: string;
  content?: string;
  summary?: string | null;
  isArchived?: boolean;
};

export const notesRepository = {
  async create(input: CreateNoteInput): Promise<Note> {
    const result = await db.query<Note>(
      `
      INSERT INTO notes (user_id, title, content)
      VALUES ($1, $2, $3)
      RETURNING *
      `,
      [input.userId, input.title, input.content],
    );

    return result.rows[0];
  },

  async findManyByUserId(
    userId: string,
    limit: number,
    offset: number,
  ): Promise<Note[]> {
    const result = await db.query<Note>(
      `
      SELECT
        n.*,
        COALESCE(
          json_agg(
            DISTINCT jsonb_build_object(
              'id', t.id,
              'name', t.name,
              'color', t.color
            )
          ) FILTER (WHERE t.id IS NOT NULL),
          '[]'
        ) AS tags
      FROM notes n
      LEFT JOIN note_tags nt
        ON nt.note_id = n.id
      LEFT JOIN tags t
        ON t.id = nt.tag_id
      WHERE n.user_id = $1
      AND n.is_archived = false
      GROUP BY n.id
      ORDER BY n.created_at DESC
      LIMIT $2 OFFSET $3
      `,
      [userId, limit, offset],
    );

    return result.rows;
  },

  async findByIdAndUserId(id: string, userId: string): Promise<Note | null> {
    const result = await db.query<Note>(
      `
      SELECT
        n.*,
        COALESCE(
          json_agg(
            DISTINCT jsonb_build_object(
              'id', t.id,
              'name', t.name,
              'color', t.color
            )
          ) FILTER (WHERE t.id IS NOT NULL),
          '[]'
        ) AS tags
      FROM notes n
      LEFT JOIN note_tags nt
        ON nt.note_id = n.id
      LEFT JOIN tags t
        ON t.id = nt.tag_id
      WHERE n.id = $1
      AND n.user_id = $2
      GROUP BY n.id
      `,
      [id, userId],
    );

    return result.rows[0] || null;
  },

  async update(input: UpdateNoteInput): Promise<Note | null> {
    const result = await db.query<Note>(
      `
      UPDATE notes
      SET
        title = COALESCE($3, title),
        content = COALESCE($4, content),
        summary = COALESCE($5, summary),
        is_archived = COALESCE($6, is_archived),
        updated_at = NOW()
      WHERE id = $1
      AND user_id = $2
      RETURNING *
      `,
      [
        input.id,
        input.userId,
        input.title,
        input.content,
        input.summary,
        input.isArchived,
      ],
    );

    return result.rows[0] || null;
  },

  async delete(id: string, userId: string): Promise<void> {
    await db.query(
      `
      DELETE FROM notes
      WHERE id = $1
      AND user_id = $2
      `,
      [id, userId],
    );
  },

  async updateEmbedding(noteId: string, userId: string, embedding: number[]) {
    const result = await db.query(
      `
    UPDATE notes
    SET embedding = $1
    WHERE id = $2 AND user_id = $3
    RETURNING *
    `,
      [`[${embedding.join(",")}]`, noteId, userId],
    );

    return result.rows[0];
  },

  async semanticSearch(userId: string, embedding: number[], limit = 10) {
    const result = await db.query(
      `
    SELECT
      id,
      user_id,
      title,
      content,
      summary,
      is_archived,
      created_at,
      updated_at,
      1 - (embedding <=> $1) AS similarity
    FROM notes
    WHERE user_id = $2
      AND embedding IS NOT NULL
      AND is_archived = false
    ORDER BY embedding <=> $1
    LIMIT $3
    `,
      [`[${embedding.join(",")}]`, userId, limit],
    );

    return result.rows;
  },
};
