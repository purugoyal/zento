// src/types/next-auth.d.ts

import { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  /**
   * Extend the built-in Session so that
   * `session.user.id` is always a string.
   */
  interface Session {
    user: DefaultSession["user"] & { id: string };
  }

  /**
   * And ensure our JWT callback token.type has `.id`
   */
  interface User extends DefaultUser {
    id: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    /** This is the `token.id = user.id` you set in your `jwt` callback */
    id: string;
  }
}
