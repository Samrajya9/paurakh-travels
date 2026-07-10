import { z } from "zod"

export const CreateDestinationSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Destination name is required")
    .max(100, "Destination name cannot exceed 100 characters"),
})

export type CreateDestinationInput = z.infer<typeof CreateDestinationSchema>
