import { createContext } from "react";

import type { User } from "../types/user.types";
import type { LoginInput, RegisterInput } from "../types/auth.types";

export type AuthContextValue = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  register: (input: RegisterInput) => Promise<void>;
  login: (input: LoginInput) => Promise<void>;
  logout: () => Promise<void>;
  updateAvatar: (file: File) => Promise<void>;
};

export const AuthContext = createContext<AuthContextValue | null>(null);
