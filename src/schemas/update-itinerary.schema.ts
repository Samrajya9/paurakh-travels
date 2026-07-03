import { z } from "zod"
import { CreateItinerarySchema } from "./create-itinerary.schema"

export const UpdateItinerarySchema = CreateItinerarySchema.partial()

export type UpdateItineraryInput = z.infer<typeof UpdateItinerarySchema>
