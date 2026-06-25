import { z } from "zod"
import { createPackageSchema } from "./create-package.schema"

export const updatePackageSchema = createPackageSchema.partial()

export type UpdatePackageInput = z.infer<typeof updatePackageSchema>
