import { z } from "zod"

import { CreateDestinationSchema } from "./create-destination.schema"

export const UpdateDestinationSchema = CreateDestinationSchema.partial()

export type UpdateDestinationInput = z.infer<typeof UpdateDestinationSchema>
