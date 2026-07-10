import { z } from "zod"

import { CreateSeasonSchema } from "./create-season.schema"

export const UpdateSeasonSchema = CreateSeasonSchema.partial()

export type UpdateSeasonInput = z.infer<typeof UpdateSeasonSchema>
