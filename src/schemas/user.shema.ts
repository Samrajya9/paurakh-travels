import { UserType } from "@/constants/enums/user-type"
import { z } from "zod"

export const userSchema = z.object({
  email: z.email(),
  password: z.string().min(1),
  user_type: z.enum(UserType),
})
