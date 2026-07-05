import { z } from "zod"
import {
  CreateItinerarySchema,
  ItineraryDestinationSchema,
} from "./create-itinerary.schema"
import { CreateFaqSchema } from "./create-faq.schema"

export const PackageGroupDiscountSchema = z.object({
  minPeople: z.coerce
    .number()
    .int("Minimum people must be a whole number")
    .min(2, "A group discount must require at least 2 people"),

  price: z.coerce.number().positive("Price must be greater than 0"),
})

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

  description: z
    .string()
    .trim()
    .max(300, "Description cannot exceed 300 characters")
    .optional()
    .nullable(),

  htmlOverview: z
    .string()
    .trim()
    .max(50000, "Overview is too long")
    .optional()
    .nullable(),

  basePrice: z.coerce.number().positive("Base price must be greater than 0"),

  difficultyId: z.cuid2("Invalid difficulty id"),

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

  // Zero or more group discount tiers. Omitting the key entirely means
  // "no discounts" — no min(1) here, unlike faqs, since an empty set is
  // the normal case, not an edge case.
  groupDiscounts: z
    .array(PackageGroupDiscountSchema)
    .optional()
    .superRefine((discounts, ctx) => {
      if (!discounts) return

      const seenMinPeople = new Set<number>()
      discounts.forEach((discount, index) => {
        if (seenMinPeople.has(discount.minPeople)) {
          ctx.addIssue({
            code: "custom",
            path: [index, "minPeople"],
            message: `Another tier already starts at ${discount.minPeople}+ people`,
          })
        }
        seenMinPeople.add(discount.minPeople)
      })
    }),
})

export type CreatePackageInput = z.infer<typeof CreatePackageSchema>
