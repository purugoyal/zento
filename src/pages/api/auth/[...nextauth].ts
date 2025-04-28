import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export default NextAuth({
  // Use JSON Web Tokens (no database sessions)
  session: { strategy: "jwt" },

  // Our one provider: email+password
  providers: [
    CredentialsProvider({
      name: "Email and Password",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) return null;
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });
        if (!user) throw new Error("No user found");
        const valid = await bcrypt.compare(credentials.password, user.password);
        if (!valid) throw new Error("Invalid password");
        // return **any** object: it becomes `session.user`
        return { id: user.id, email: user.email, name: user.firstName };
      },
    }),
  ],

  // Tell NextAuth to use our custom pages:
  pages: {
    signIn: "/login",   // GET /login shows your login form
    error: "/login",    // on errors, redirect back to /login?error=...
  },

  // Make sure you set this in `.env`:
  secret: process.env.NEXTAUTH_SECRET,
});
