import { loginSchema } from "@/schemas/login.schema"
import { z } from "zod"

export type LoginSchema = z.infer<typeof loginSchema>
