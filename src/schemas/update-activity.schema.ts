import { z } from "zod"

import { CreateActivitySchema } from "./create-activity.schema"

export const UpdateActivitySchema = CreateActivitySchema.partial()

export type UpdateActivityInput = z.infer<typeof UpdateActivitySchema>
