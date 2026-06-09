import { createEnv } from "@t3-oss/env-nextjs"
import * as z from "zod"

export const serverEnv = createEnv({
  server: {
    DATABASE_URL: z.string().url(),
    PEPPER: z.string(),
  },

  experimental__runtimeEnv: process.env,
  emptyStringAsUndefined: true,
})
