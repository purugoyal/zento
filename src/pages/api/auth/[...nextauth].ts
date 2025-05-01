// src/pages/api/auth/[...nextauth].ts
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  // 1) DEBUG & custom logger
  debug: true,
  logger: {
    error(code, metadata) {
      console.error("❌ NextAuth ERROR", code, metadata);
    },
    warn(code) {
      console.warn("⚠️ NextAuth WARN", code);
    },
    debug(code, metadata) {
      console.debug("🐛 NextAuth DEBUG", code, metadata);
    },
  },

  // 2) Prisma adapter
  adapter: PrismaAdapter(prisma),

  // 3) Credentials provider
  providers: [
    CredentialsProvider({
      name: "Email & Password",
      credentials: {
        email:    { label: "Email",    type: "email",    placeholder: "you@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) return null;

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });
        if (!user) return null;

        const isValid = await bcrypt.compare(credentials.password, user.password);
        if (!isValid) return null;

        return {
          id:    user.id.toString(),
          email: user.email,
          name:  `${user.firstName} ${user.lastName}`,
        };
      },
    }),
  ],

  // 4) Callbacks
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.id = user.id;
      return token;
    },
    async session({ session, token }) {
      if (session.user) session.user.id = token.id as string;
      return session;
    },
  },

  // 5) Custom pages
  pages: {
    signIn: "/login",
    error:  "/login",
  },

  // 6) Session strategy
  session: {
    strategy: "jwt",
  },

  // 7) NEXTAUTH_SECRET must be set in your ENV
};

export default NextAuth(authOptions);
