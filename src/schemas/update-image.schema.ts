import { z } from "zod"
import { CreateImageSchema } from "./create-image.schema"

export const UpdateImageSchema = CreateImageSchema.partial()

export type UpdateImageInput = z.infer<typeof UpdateImageSchema>
