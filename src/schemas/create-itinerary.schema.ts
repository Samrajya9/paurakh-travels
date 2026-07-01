import { z } from "zod"

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
})

export type CreateItineraryInput = z.infer<typeof CreateItinerarySchema>
