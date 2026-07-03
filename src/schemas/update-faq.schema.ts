import { z } from "zod"
import { CreateFaqSchema } from "./create-faq.schema"

export const UpdateFaqSchema = CreateFaqSchema.partial()

export type UpdateFaqInput = z.infer<typeof UpdateFaqSchema>
