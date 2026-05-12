import type { User } from "../../modules/users/users.types.js";

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

export {};
