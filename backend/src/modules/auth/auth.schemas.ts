import { z } from "zod";

export const registerSchema = z.object({
  body: z.object({
    name: z.string().min(2, "Name must have at least 2 characters"),
    email: z.email("Invalid email"),
    password: z.string().min(8, "Password must have at least 8 characters"),
    avatarUrl: z.string().optional().nullable(),
  }),
});

export const loginSchema = z.object({
  body: z.object({
    email: z.email("Invalid email"),
    password: z.string().min(1, "Password is required"),
  }),
});

export const logoutSchema = z.object({
  body: z.object({
    refreshToken: z.string().min(1, "Refresh token is required"),
  }),
});

export type RegisterInput = z.infer<typeof registerSchema>["body"];
export type LoginInput = z.infer<typeof loginSchema>["body"];
export type LogoutInput = z.infer<typeof logoutSchema>["body"];
