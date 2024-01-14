import { PrismaClient } from "@prisma/client";

declare global {
    var prisma: PrismaClient | undefined
}

export const db = globalThis.prisma || new PrismaClient()

// Prevent initialize a new PrismaClient object to db whenever Next.js hot reload in development mode
if (process.env.NODE_ENV !== "production") {
    globalThis.prisma = db
}