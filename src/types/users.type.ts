import { userSchema } from "@/schemas/user.shema"
import z from "zod"

export type UserSchema = z.infer<typeof userSchema>
