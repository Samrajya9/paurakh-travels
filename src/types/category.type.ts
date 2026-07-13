import type { Prisma } from "@prisma/client"

export const categorySelect = {
  id: true,
  name: true,
  createdAt: true,
  updatedAt: true,
} satisfies Prisma.CategorySelect

export type Category = Prisma.CategoryGetPayload<{
  select: typeof categorySelect
}>
