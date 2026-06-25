import { z } from "zod"
import { createFaqSchema } from "./create-faq.schema"

export const updateFaqSchema = createFaqSchema.partial()

export type UpdateFaqInput = z.infer<typeof updateFaqSchema>
