import type { Prisma } from "@prisma/client"

export const imageSelect = {
  id: true,
  url: true,
  altText: true,
  createdAt: true,
  updatedAt: true,
} satisfies Prisma.ImageSelect

export type Image = Prisma.ImageGetPayload<{
  select: typeof imageSelect
}>
