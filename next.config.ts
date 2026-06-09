import "@/env/client"
import "@/env/server"

import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  output: process.env.NODE_ENV === "production" ? "standalone" : undefined,

  transpilePackages: ["@t3-oss/env-nextjs", "@t3-oss/env-core"],
}

export default nextConfig
