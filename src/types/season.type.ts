import type { Prisma } from "@prisma/client"

export const seasonSelect = {
  id: true,
  name: true,
  createdAt: true,
  updatedAt: true,
} satisfies Prisma.SeasonSelect

export type Season = Prisma.SeasonGetPayload<{
  select: typeof seasonSelect
}>
