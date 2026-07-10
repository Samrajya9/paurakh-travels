import { z } from "zod"

export const CreateRegionSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Region name is required")
    .max(100, "Region name cannot exceed 100 characters"),

  destinationId: z.cuid2("Invalid destination id"),
})

export type CreateRegionInput = z.infer<typeof CreateRegionSchema>
