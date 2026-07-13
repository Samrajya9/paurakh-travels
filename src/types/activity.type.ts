import type { Prisma } from "@prisma/client"

export const activitySelect = {
  id: true,
  name: true,
  createdAt: true,
  updatedAt: true,
} satisfies Prisma.ActivitySelect

export type Activity = Prisma.ActivityGetPayload<{
  select: typeof activitySelect
}>
