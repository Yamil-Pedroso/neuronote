import { apiClient } from "../api/apiClient";
import type { ApiResponse } from "../types/api.types";
import type { User } from "../types/user.types";

export const usersService = {
  async getMe() {
    const response =
      await apiClient.get<ApiResponse<{ user: User }>>("/users/me");

    return response.data.data.user;
  },

  async updateAvatar(file: File) {
    const formData = new FormData();

    formData.append("avatar", file);

    const response = await apiClient.patch<ApiResponse<{ user: User }>>(
      "/users/me/avatar",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );

    return response.data.data.user;
  },

  async updateMe(input: { name?: string; avatarUrl?: string | null }) {
    const response = await apiClient.patch<ApiResponse<{ user: User }>>(
      "/users/me",
      input,
    );

    return response.data.data.user;
  },

  async deleteMe() {
    await apiClient.delete("/users/me");
  },

  async getAllUsers() {
    const response =
      await apiClient.get<ApiResponse<{ users: User[] }>>("/users");

    return response.data.data.users;
  },
};
