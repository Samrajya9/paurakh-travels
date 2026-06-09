import { userSchema } from "@/schemas/user.shema"
import * as z from "zod/v4"

export type UserSchema = z.infer<typeof userSchema>
