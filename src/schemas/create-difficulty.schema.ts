import { z } from "zod"

export const CreateDifficultySchema = z.object({
  name: z.string().min(1, "Difficulty name is required").max(100),
})

export type CreateDifficultyInput = z.infer<typeof CreateDifficultySchema>
