import { CreateDifficultySchema } from "./create-difficulty.schema"
import { z } from "zod"

export const UpdateDifficultySchema = CreateDifficultySchema.partial()
export type UpdateDifficultyInput = z.infer<typeof UpdateDifficultySchema>
