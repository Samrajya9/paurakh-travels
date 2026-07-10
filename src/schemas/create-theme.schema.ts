import { z } from "zod"

export const CreateThemeSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Theme name is required")
    .max(100, "Theme name cannot exceed 100 characters"),
})

export type CreateThemeInput = z.infer<typeof CreateThemeSchema>
