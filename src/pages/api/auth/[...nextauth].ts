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
        email: { label: "Email", type: "email", placeholder: "you@example.com" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        if (!credentials) return null;

        // 1) look up the user by email
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });
        if (!user) return null;

        // 2) verify password
        const isValid = await bcrypt.compare(
          credentials.password,
          user.password
        );
        if (!isValid) return null;

        // 3) return the shape NextAuth expects (id must be string)
        return {
          id: user.id.toString(),
          email: user.email,
          name: `${user.firstName} ${user.lastName}`,
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      // on initial sign in, copy user.id into the token
      if (user) {
        token.id = user.id;
      }
      return token;
    },

    async session({ session, token }) {
      // only write into session.user.id if session.user is defined
      if (session.user && token.id) {
        session.user.id = String(token.id);
      }
      return session;
    },
  },

  pages: {
    signIn: "/login",
    error: "/login", // display errors on the login page
  },

  session: {
    strategy: "jwt",
  },
};

export default NextAuth(authOptions);
