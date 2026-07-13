import { userSchema } from "@/schemas/user.shema"
import z from "zod"

export const LoginSchema = userSchema.pick({
  email: true,
  password: true,
})

export type LoginInput = z.infer<typeof LoginSchema>
