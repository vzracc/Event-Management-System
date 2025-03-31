import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface User extends DefaultUser {
    id: string; // Ensure `id` exists
    role?: string; // Add `role`
  }

  interface Session {
    user: User; // Ensure session.user has `id` and `role`
  }

  interface JWT {
    id: string;
    role?: string;
  }
}
