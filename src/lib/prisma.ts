import { PrismaClient } from "@prisma/client"

const globalForPrisma = globalThis as {
  prisma?: PrismaClient
}

export const prismaClient = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prismaClient
}

export default prismaClient
