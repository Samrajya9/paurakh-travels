import { createEnv } from "@t3-oss/env-nextjs"
import * as z from "zod"

export const clientEnv = createEnv({
  client: {
    NEXT_PUBLIC_APP_URL: z.url().transform((url) => url.replace(/\/$/, "")),

    NEXT_PUBLIC_IMAGE_BASE_URL: z
      .url()
      .transform((url) => url.replace(/\/$/, "")),
  },
  runtimeEnv: {
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    NEXT_PUBLIC_IMAGE_BASE_URL: process.env.NEXT_PUBLIC_IMAGE_BASE_URL,
  },
})
