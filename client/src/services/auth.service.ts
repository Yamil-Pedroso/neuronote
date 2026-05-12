import { apiClient } from "../api/apiClient";
import type { ApiResponse } from "../types/api.types";
import type {
  AuthResponse,
  LoginInput,
  RegisterInput,
} from "../types/auth.types";

export const authService = {
  async register(input: RegisterInput) {
    const response = await apiClient.post<ApiResponse<AuthResponse>>(
      "/auth/register",
      input,
    );

    return response.data.data;
  },

  async login(input: LoginInput) {
    const response = await apiClient.post<ApiResponse<AuthResponse>>(
      "/auth/login",
      input,
    );

    return response.data.data;
  },

  async logout(refreshToken: string) {
    await apiClient.post("/auth/logout", {
      refreshToken,
    });
  },
};
