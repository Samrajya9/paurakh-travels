// Included per spec, even though the service layer only exposes

import z from "zod"
import { createUserPackageLikeSchema } from "./create-user-package-like.schema"

// getAll / add / delete (no update endpoint uses this).
export const updateUserPackageLikeSchema = createUserPackageLikeSchema.partial()

export type UpdateUserPackageLikeInput = z.infer<
  typeof updateUserPackageLikeSchema
>
