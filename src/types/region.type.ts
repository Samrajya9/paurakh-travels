import type { Prisma } from "@prisma/client"
import { destinationSelect } from "./destination.type"

export const regionSelect = {
  id: true,
  name: true,
  destinationId: true,
  destination: { select: destinationSelect },
  createdAt: true,
  updatedAt: true,
} satisfies Prisma.RegionSelect

export type Region = Prisma.RegionGetPayload<{
  select: typeof regionSelect
}>
