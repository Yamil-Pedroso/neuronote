export type RegisterUserInput = {
  name: string;
  email: string;
  password: string;
  avatarUrl?: string;
};

export type LoginUserInput = {
  email: string;
  password: string;
};

export type AuthTokens = {
  accessToken: string;
  refreshToken: string;
};
