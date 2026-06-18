import "@/env/client"
import "@/env/server"

import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
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
