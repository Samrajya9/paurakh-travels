import { z } from "zod"
import { createItinerarySchema } from "./create-itinerary.schema"

export const updateItinerarySchema = createItinerarySchema.partial()

export type UpdateItineraryInput = z.infer<typeof updateItinerarySchema>
