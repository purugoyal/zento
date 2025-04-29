// next-auth.d.ts
import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession`, etc.
   */
  interface Session {
    user: {
      /** The user's database ID (as a string) */
      id: string;
    } & DefaultSession["user"];
  }

  /**
   * The `user` object returned by `authorize` or `callbacks.jwt` on first sign-in.
   */
  interface User extends DefaultUser {
    id: string;
  }

  /**
   * The contents of your JWT (returned by `callbacks.jwt`).
   */
  interface JWT {
    id: string;
  }
}
