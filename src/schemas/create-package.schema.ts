import { z } from "zod"
import { CreateItinerarySchema } from "./create-itinerary.schema"

export const CreatePackageSchema = z.object({
  slug: z
    .string()
    .trim()
    .min(1, "Slug is required")
    .max(200, "Slug is too long")
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Slug must contain lowercase letters, numbers, and hyphens only"
    ),

  name: z
    .string()
    .trim()
    .min(1, "Package name is required")
    .max(200, "Package name is too long"),

  htmlOverview: z
    .string()
    .trim()
    .max(50000, "Overview is too long")
    .optional()
    .nullable(),

  itineraries: z.array(
    CreateItinerarySchema.omit({
      packageId: true,
    }).extend({
      destinations: z.array(
        z.object({
          destinationId: z.cuid2("Invalid destination id"),
          order: z.coerce
            .number()
            .int("Order must be a whole number")
            .min(1, "Order must start at 1"),
        })
      ),
    })
  ),
})

export type CreatePackageInput = z.infer<typeof CreatePackageSchema>
