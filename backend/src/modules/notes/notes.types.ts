export type NoteTag = {
  id: string;
  name: string;
  color: string;
};

export type Note = {
  id: string;
  user_id: string;
  title: string;
  content: string;
  summary: string | null;
  is_archived: boolean;
  created_at: Date;
  updated_at: Date;
  tags?: NoteTag[];
};
