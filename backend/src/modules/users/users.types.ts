export type UserRole = "user" | "admin";

export type User = {
  id: string;
  name: string;
  email: string;
  password_hash: string;
  avatar_url: string | null;
  role: UserRole;
  created_at: Date;
  updated_at: Date;
};
