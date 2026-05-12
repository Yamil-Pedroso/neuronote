import type { NoteTag } from "./tag.types";

export type Note = {
  id: string;
  user_id: string;
  title: string;
  content: string;
  tags?: NoteTag[];
  summary: string | null;
  is_archived: boolean;
  created_at: string;
  updated_at: string;
};

export type CreateNoteInput = {
  title: string;
  content: string;
  tags?: NoteTag[];
};

export type UpdateNoteInput = {
  title?: string;
  content?: string;
  is_archived?: boolean;
  tags?: NoteTag[];
};
