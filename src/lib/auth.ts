import NextAuth, { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export const config: NextAuthConfig = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  providers: [
    Credentials({
      credentials: {
        login: { label: "Email or Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        if (!credentials?.login || !credentials?.password) {
          return null;
        }

        const user = await prisma.user.findFirst({
          where: {
            OR: [
              { email: credentials.login as string },
              { username: credentials.login as string },
            ],
          },
        });

        if (!user) {
          return null;
        }

        if (!user.password) {
          return null;
        }
        
        const isPasswordValid = await bcrypt.compare(
          credentials.password as string,
          user.password
        );

        if (!isPasswordValid) {
          return null;
        }
        
        return {
          id: user.id,
          email: user.email,
          name: user.username,
          role: user.role, // Include role here
          image: user.avatar, // Include avatar here
        };
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id;
        token.sub = user.id; // Ensure sub is set for user ID
        token.role = user.role;
        token.picture = user.image;
      } else if (token.id) { // If user is not present, it means it's a subsequent call, so role should be in token already
        const dbUser = await prisma.user.findUnique({
          where: { id: token.id as string },
          select: { role: true, avatar: true }, // Select avatar here
        });
        if (dbUser) {
          token.role = dbUser.role;
          token.picture = dbUser.avatar; // Update token picture
        }
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (token.id && session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role;
        session.user.image = token.picture;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
};

export const { handlers, auth, signIn, signOut } = NextAuth(config);