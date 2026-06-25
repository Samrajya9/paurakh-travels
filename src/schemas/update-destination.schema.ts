import { z } from "zod"
import { createDestinationSchema } from "./create-destination.schema"

export const updateDestinationSchema = createDestinationSchema.partial()

export type UpdateDestinationInput = z.infer<typeof updateDestinationSchema>
