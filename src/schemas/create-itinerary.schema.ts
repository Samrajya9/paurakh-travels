import { z } from "zod"

export const ItineraryDestinationSchema = z.object({
  destinationId: z.cuid2("Invalid destination id"),
  order: z.coerce
    .number()
    .int("Order must be a whole number")
    .min(1, "Order must start at 1"),
})

export const CreateItinerarySchema = z.object({
  packageId: z.cuid2("Invalid package id"),

  dayNumber: z.coerce
    .number()
    .int("Day number must be a whole number")
    .min(1, "Day number must be at least 1"),

  title: z
    .string()
    .trim()
    .min(1, "Title is required")
    .max(200, "Title cannot exceed 200 characters"),

  htmlDescription: z
    .string()
    .trim()
    .min(1, "Description is required")
    .max(50000, "Description is too long"),

  distanceKm: z.coerce
    .number()
    .positive("Distance must be a positive number")
    .optional(),

  durationHours: z.coerce
    .number()
    .int("Duration must be a whole number of hours")
    .positive("Duration must be a positive number")
    .optional(),

  // Optional at the itinerary level (e.g. a standalone itinerary form
  // that doesn't collect destinations). Package creation requires it —
  // see CreatePackageSchema, which overrides this to be required.
  destinations: z.array(ItineraryDestinationSchema).optional(),
})

export type CreateItineraryInput = z.infer<typeof CreateItinerarySchema>
