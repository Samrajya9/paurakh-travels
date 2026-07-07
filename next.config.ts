import "@/env/client"
import { clientEnv } from "@/env/client"
import "@/env/server"

import type { NextConfig } from "next"

const imageBaseUrl = new URL(clientEnv.NEXT_PUBLIC_IMAGE_BASE_URL)

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: imageBaseUrl.protocol.replace(":", "") as "http" | "https",
        hostname: imageBaseUrl.hostname,
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
      },
    ],
  },
  output: process.env.NODE_ENV === "production" ? "standalone" : undefined,

  transpilePackages: ["@t3-oss/env-nextjs", "@t3-oss/env-core"],
}

export default nextConfig
