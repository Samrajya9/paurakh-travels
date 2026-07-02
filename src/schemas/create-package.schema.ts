import { z } from "zod"
import {
  CreateItinerarySchema,
  ItineraryDestinationSchema,
} from "./create-itinerary.schema"
import { CreateFaqSchema } from "./create-faq.schema"

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
      destinations: z.array(ItineraryDestinationSchema),
    })
  ),

  faqs: z
    .array(CreateFaqSchema)
    .min(1, "At least one FAQ is required")
    .optional(),
})

export type CreatePackageInput = z.infer<typeof CreatePackageSchema>
