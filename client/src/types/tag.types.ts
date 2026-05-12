export type Tag = {
  id: string;
  user_id: string;
  name: string;
  color: string | null;
  created_at: string;
};

export type CreateTagInput = {
  name: string;
  color?: string;
};

export type NoteTag = {
  id: string;
  name: string;
  color: string;
};
