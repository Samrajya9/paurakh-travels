import { userSchema } from "@/schemas/user.shema"

export const LoginSchema = userSchema.pick({
  email: true,
  password: true,
})
