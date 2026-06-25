import { z } from "zod"

export const createDestinationSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Destination name is required")
    .max(100, "Destination name cannot exceed 100 characters"),

  maxAltitude: z
    .number()
    .int("Max altitude must be a whole number")
    .min(0, "Max altitude cannot be negative"),

  latitude: z
    .number()
    .min(-90, "Latitude must be between -90 and 90")
    .max(90, "Latitude must be between -90 and 90"),

  longitude: z
    .number()
    .min(-180, "Longitude must be between -180 and 180")
    .max(180, "Longitude must be between -180 and 180"),

  regionId: z.string().cuid("Invalid region id"),
})

export type CreateDestinationInput = z.infer<typeof createDestinationSchema>
