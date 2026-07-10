import { z } from "zod"

import { CreateRegionSchema } from "./create-region.schema"

export const UpdateRegionSchema = CreateRegionSchema.partial()

export type UpdateRegionInput = z.infer<typeof UpdateRegionSchema>
