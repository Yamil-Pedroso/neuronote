import { useEffect, useMemo, useState, type ReactNode } from "react";

import type { User } from "../types/user.types";
import type { LoginInput, RegisterInput } from "../types/auth.types";

import { authService } from "../services/auth.service";
import { usersService } from "../services/users.service";

import { AuthContext } from "./auth-context";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadMe = async () => {
      const token = localStorage.getItem("accessToken");

      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        const currentUser = await usersService.getMe();

        setUser(currentUser);
      } catch {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");

        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    loadMe();
  }, []);

  const register = async (input: RegisterInput) => {
    const data = await authService.register(input);

    localStorage.setItem("accessToken", data.accessToken);
    localStorage.setItem("refreshToken", data.refreshToken);

    const currentUser = await usersService.getMe();

    setUser(currentUser);
  };

  const updateAvatar = async (file: File) => {
    const updatedUser = await usersService.updateAvatar(file);

    setUser(updatedUser);
  };

  const login = async (input: LoginInput) => {
    const data = await authService.login(input);

    localStorage.setItem("accessToken", data.accessToken);
    localStorage.setItem("refreshToken", data.refreshToken);

    const currentUser = await usersService.getMe();

    setUser(currentUser);
  };

  const logout = async () => {
    const refreshToken = localStorage.getItem("refreshToken");

    if (refreshToken) {
      await authService.logout(refreshToken);
    }

    localStorage.removeItem("accessToken");

    localStorage.removeItem("refreshToken");

    setUser(null);
  };

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      isLoading,
      register,
      login,
      logout,
      updateAvatar,
    }),
    [user, isLoading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
