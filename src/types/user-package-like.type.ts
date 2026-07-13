import type { Prisma } from "@prisma/client"

export const userPackageLikeSelect = {
  id: true,
  userId: true,
  packageId: true,
  createdAt: true,
} satisfies Prisma.UserPackageLikeSelect

export type UserPackageLike = Prisma.UserPackageLikeGetPayload<{
  select: typeof userPackageLikeSelect
}>
