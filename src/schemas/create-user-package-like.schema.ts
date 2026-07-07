import { z } from "zod"

export const createUserPackageLikeSchema = z.object({
  userId: z.string().cuid(),
  packageId: z.string().cuid(), // change to z.number().int().positive() if Package.id is Int
})

export type CreateUserPackageLikeInput = z.infer<
  typeof createUserPackageLikeSchema
>
