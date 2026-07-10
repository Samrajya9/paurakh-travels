import { z } from "zod"

import { CreateThemeSchema } from "./create-theme.schema"

export const UpdateThemeSchema = CreateThemeSchema.partial()

export type UpdateThemeInput = z.infer<typeof UpdateThemeSchema>
