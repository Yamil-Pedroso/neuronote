import type { User } from "./user.types";

export type AuthResponse = {
  user: User;
  accessToken: string;
  refreshToken: string;
};

export type RegisterInput = {
  name: string;
  email: string;
  password: string;
  avatarUrl?: string | null;
};

export type LoginInput = {
  email: string;
  password: string;
};
