import { LoginSchema } from "@/schemas/login.schema"
import { z } from "zod"

export type LoginInput = z.infer<typeof LoginSchema>
