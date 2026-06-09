import { userSchema } from "@/schemas/user.shema"

export const loginSchema = userSchema.pick({
  email: true,
  password: true,
})
