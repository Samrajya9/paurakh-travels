import { CreateRegionSchema } from "./create-region.schema"
import { z } from "zod"

export const UpdateRegionSchema = CreateRegionSchema.partial()
export type UpdateRegionInput = z.infer<typeof UpdateRegionSchema>
