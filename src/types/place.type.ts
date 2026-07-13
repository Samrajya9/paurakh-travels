/**
 * import type { Place } from "@/types/place
 * This keeps your architecture cleaner and makes it obvious that the file is safe to use from either environment
 */

import { Prisma as PrismaClient } from "@prisma/client"
import { regionSelect } from "./region.type"

export const placeSelect = {
  id: true,
  name: true,
  elevation: true,
  latitude: true,
  longitude: true,
  regionId: true,
  region: { select: regionSelect },
  createdAt: true,
  updatedAt: true,
} satisfies PrismaClient.PlaceSelect

export type Place = PrismaClient.PlaceGetPayload<{
  select: typeof placeSelect
}>
