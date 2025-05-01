// src/pages/api/auth/[...nextauth].ts
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  // 1) Turn on NextAuth’s internal debug & custom logger
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

  // 2) Hook up the PrismaAdapter so NextAuth can read/write into Supabase via Prisma
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
        if (!credentials) {
          console.log("authorize() called without credentials");
          return null;
        }

        console.log("authorize() credentials:", { email: credentials.email });

        // look up the user
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });
        console.log("authorize() found user:", user);

        if (!user) {
          console.log("authorize() → no user, returning null");
          return null;
        }

        // verify password
        const isValid = await bcrypt.compare(credentials.password, user.password);
        console.log("authorize() bcrypt.compare result:", isValid);

        if (!isValid) {
          console.log("authorize() → invalid password, returning null");
          return null;
        }

        // success! return the minimal user object
        return {
          id:    user.id.toString(),
          email: user.email,
          name:  `${user.firstName} ${user.lastName}`,
        };
      },
    }),
  ],

  // 4) Persist the user.id into the token and session
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

  // 5) Use your custom pages
  pages: {
    signIn: "/login",
    error:  "/login",
  },

  // 6) Use JWT sessions
  session: {
    strategy: "jwt",
  },

  // 7) Make sure you set NEXTAUTH_SECRET in your ENV vars
};

export default NextAuth(authOptions);
