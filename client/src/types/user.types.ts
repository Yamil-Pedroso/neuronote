export type UserRole = "user" | "admin";

export type User = {
  id: string;
  name: string;
  email: string;
  avatar_url: string | null;
  role: UserRole;
  created_at: string;
  updated_at: string;
};
