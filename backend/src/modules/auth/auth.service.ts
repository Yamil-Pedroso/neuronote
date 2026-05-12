import crypto from "node:crypto";

import { AppError } from "../../shared/errors/AppError.js";

import { signAccessToken, signRefreshToken } from "../../shared/utils/jwt.js";

import { hashPassword, comparePassword } from "../../shared/utils/password.js";

import { usersRepository } from "../users/users.repository.js";

import { authRepository } from "./auth.repository.js";

import type { RegisterInput, LoginInput } from "./auth.schemas.js";

export const authService = {
  async register(input: RegisterInput) {
    const existingUser = await usersRepository.findByEmail(input.email);

    if (existingUser) {
      throw new AppError("Email already in use", 409);
    }

    const passwordHash = await hashPassword(input.password);

    const user = await usersRepository.create({
      name: input.name,
      email: input.email,
      avatar_url: input.avatarUrl,
      passwordHash,
    });

    const accessToken = signAccessToken({
      userId: user.id,
    });

    const refreshToken = signRefreshToken({
      userId: user.id,
    });

    const refreshTokenHash = crypto
      .createHash("sha256")
      .update(refreshToken)
      .digest("hex");

    const expiresAt = new Date();

    expiresAt.setDate(expiresAt.getDate() + 7);

    await authRepository.createRefreshToken({
      userId: user.id,
      tokenHash: refreshTokenHash,
      expiresAt,
    });

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        avatarUrl: user.avatar_url,
      },

      accessToken,
      refreshToken,
    };
  },

  async login(input: LoginInput) {
    const user = await usersRepository.findByEmail(input.email);

    if (!user) {
      throw new AppError("Invalid credentials", 401);
    }

    const isPasswordValid = await comparePassword(
      input.password,
      user.password_hash,
    );

    if (!isPasswordValid) {
      throw new AppError("Invalid credentials", 401);
    }

    const accessToken = signAccessToken({
      userId: user.id,
    });

    const refreshToken = signRefreshToken({
      userId: user.id,
    });

    const refreshTokenHash = crypto
      .createHash("sha256")
      .update(refreshToken)
      .digest("hex");

    const expiresAt = new Date();

    expiresAt.setDate(expiresAt.getDate() + 7);

    await authRepository.createRefreshToken({
      userId: user.id,
      tokenHash: refreshTokenHash,
      expiresAt,
    });

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        avatarUrl: user.avatar_url,
      },

      accessToken,
      refreshToken,
    };
  },

  async logout(refreshToken: string) {
    const refreshTokenHash = crypto
      .createHash("sha256")
      .update(refreshToken)
      .digest("hex");

    await authRepository.revokeRefreshToken(refreshTokenHash);
  },
};
