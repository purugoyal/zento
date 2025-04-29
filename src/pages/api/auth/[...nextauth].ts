// src/pages/api/auth/[...nextauth].ts
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Email & Password",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "you@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) return null;

        // 1) Look up user by email
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });
        if (!user) return null;

        // 2) Verify password
        const valid = await bcrypt.compare(
          credentials.password,
          user.password
        );
        if (!valid) return null;

        // 3) Return shape NextAuth expects: id *must* be a string
        return {
          id: user.id.toString(),
          email: user.email,
          name: `${user.firstName} ${user.lastName}`,
        };
      },
    }),
  ],

  callbacks: {
    /** Persist the `user.id` into the encoded JWT on sign-in */
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },

    /** Make `session.user.id` available to the client */
    async session({ session, token }) {
      // session.user is always defined in this callback (thanks to our d.ts augmentation)
      session.user.id = token.id as string;
      return session;
    },
  },

  pages: {
    signIn: "/login",
    error: "/login",
  },

  session: {
    strategy: "jwt",
  },
};

export default NextAuth(authOptions);
