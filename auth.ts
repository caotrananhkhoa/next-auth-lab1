import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";

import authConfig from "@/auth.config";
import { db } from "@/lib/db";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut
} = NextAuth({
  callbacks: {
    // Modify session
    async session({ token, session }) {
      // Create an id field, which get from token, in user object
      // token.sub is id of current user
      if (token.sub && session.user) {
        session.user.id = token.sub
      }
      return session
    },

    // Create and/or modify token
    async jwt({ token }) {
      // Custom field (Ex: Access token from external server)
      // const res = await fetch('https://dummyjson.com/products/1')
      // const res2 = await res.json()
      // token.customField = res2.title

      return token
    }
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});
