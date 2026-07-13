import type { Prisma } from "@prisma/client"
import { placeSelect } from "./place.type"
import { itineraryPlaceSelect } from "./itinerary-place.type"

export const itinerarySelect = {
  id: true,
  packageId: true,
  dayNumber: true,
  title: true,
  htmlDescription: true,
  distanceKm: true,
  durationHours: true,
  places: {
    select: itineraryPlaceSelect,
    orderBy: { order: "asc" },
  },
  createdAt: true,
  updatedAt: true,
} satisfies Prisma.ItinerarySelect

export type Itinerary = Prisma.ItineraryGetPayload<{
  select: typeof itinerarySelect
}>
