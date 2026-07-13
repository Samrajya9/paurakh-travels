import type { Prisma } from "@prisma/client"
import { placeSelect } from "./place.type"

export const itineraryPlaceSelect = {
  id: true,
  itineraryId: true,
  placeId: true,
  place: { select: placeSelect },
  order: true,
} satisfies Prisma.ItineraryPlaceSelect

export type ItineraryPlace = Prisma.ItineraryPlaceGetPayload<{
  select: typeof itineraryPlaceSelect
}>
