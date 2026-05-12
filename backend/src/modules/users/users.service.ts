import { AppError } from "../../shared/errors/AppError.js";
import { usersRepository } from "./users.repository.js";
import type { UpdateMeInput } from "./users.schemas.js";

export const usersService = {
  async getAllUsers() {
    return usersRepository.findMany();
  },

  async updateMe(userId: string, input: UpdateMeInput) {
    const updatedUser = await usersRepository.updateMe({
      userId,
      name: input.name,
      avatarUrl: input.avatarUrl,
    });

    if (!updatedUser) {
      throw new AppError("User not found", 404);
    }

    return updatedUser;
  },

  async updateAvatar(userId: string, avatarUrl: string) {
    const updatedUser = await usersRepository.updateAvatar({
      userId,
      avatarUrl,
    });

    if (!updatedUser) {
      throw new AppError("User not found", 404);
    }

    return updatedUser;
  },

  async deleteMe(userId: string) {
    await usersRepository.deleteById(userId);
  },

  async deleteUser(id: string) {
    const user = await usersRepository.findById(id);

    if (!user) {
      throw new AppError("User not found", 404);
    }

    await usersRepository.deleteById(id);
  },
};
