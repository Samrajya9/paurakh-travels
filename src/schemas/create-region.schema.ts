import { z } from "zod"

export const CreateRegionSchema = z.object({
  name: z.string().min(1, "Region name is required").max(100),
})

export type CreateRegionInput = z.infer<typeof CreateRegionSchema>
