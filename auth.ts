import NextAuth, { type DefaultSession } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";

import authConfig from "@/auth.config";
import { db } from "@/lib/db";
import { getUserById } from "./data/user";

declare module "next-auth" {
  interface User {
    // New field in User object
    id: string,
    role: "ADMIN" | "USER"
  }
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut
} = NextAuth({
  callbacks: {
    async signIn({ user }) {
      const existingUser = await getUserById(user.id)

      // Block login if not existing user or not verified
      // if (!existingUser || !existingUser.emailVerified) {
      //   return false
      // }

      return true
    },

    // Modify session
    async session({ token, session }) {
      // Create an id field, which get from token, in user object
      // token.sub is id of current user
      console.log({session})
      if (!session.user) {
        return session
      }
      let userSession = session.user
      if (token.sub) {
        userSession = {
          ...session.user,
          id: token.sub
        }
      }

      if (token.role) {
        userSession = {
          ...session.user,
          role: token.role as "ADMIN" | "USER"
        }
      }

      return {
        ...session,
        user: userSession
      }
    },

    // Create and/or modify token
    async jwt({ token, user }) {
      // Custom field (Ex: Access token from external server)
      // const res = await fetch('https://dummyjson.com/products/1')
      // const res2 = await res.json()
      // token.customField = res2.title

      console.log({user})

      if (!token.sub) {
        return token
      }
      
      const existingUser = await getUserById(token.sub)

      if (!existingUser) {
        return token
      }

      // Create a "role" field in token object
      token.role = existingUser.role
      return token
    }
  },
  adapter: PrismaAdapter(db) as any,
  session: { strategy: "jwt" },
  ...authConfig,
});
