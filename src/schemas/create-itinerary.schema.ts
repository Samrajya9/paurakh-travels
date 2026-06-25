import { z } from "zod"

export const createItinerarySchema = z.object({
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

  description: z
    .string()
    .trim()
    .min(1, "Description is required")
    .max(10000, "Description is too long"),
})

export type CreateItineraryInput = z.infer<typeof createItinerarySchema>
