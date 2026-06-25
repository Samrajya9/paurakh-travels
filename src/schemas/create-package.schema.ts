import { z } from "zod"

export const createPackageSchema = z.object({
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

  overview: z
    .string()
    .trim()
    .max(50000, "Overview is too long")
    .optional()
    .nullable(),
})

export type CreatePackageInput = z.infer<typeof createPackageSchema>
