import { z } from "zod"

export const CreateSeasonSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Season name is required")
    .max(100, "Season name cannot exceed 100 characters"),
})

export type CreateSeasonInput = z.infer<typeof CreateSeasonSchema>
