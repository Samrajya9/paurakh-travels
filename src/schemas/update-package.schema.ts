import { z } from "zod"
import { CreatePackageSchema } from "./create-package.schema"

export const UpdatePackageSchema = CreatePackageSchema.partial()

export type UpdatePackageInput = z.infer<typeof UpdatePackageSchema>
