import { DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt"; // eslint-disable-line @typescript-eslint/no-unused-vars

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: "USER" | "ADMIN";
      image?: string | null; // Add image to user in session
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: "USER" | "ADMIN";
    picture?: string | null; // Add picture to JWT
  }
}
