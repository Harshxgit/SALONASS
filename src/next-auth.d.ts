// next-auth.d.ts
import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      role: string; // Add 'role' to user
      _id?: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      number?: string;
      role?: string;
    } 
  }
}
