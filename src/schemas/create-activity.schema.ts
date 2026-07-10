import { z } from "zod"

export const CreateActivitySchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Activity name is required")
    .max(100, "Activity name cannot exceed 100 characters"),
})

export type CreateActivityInput = z.infer<typeof CreateActivitySchema>
