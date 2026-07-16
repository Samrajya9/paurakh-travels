import dotenv from "dotenv"
import { defineConfig } from "prisma/config"

dotenv.config({
  path:
    process.env.NODE_ENV === "production"
      ? ".env.production"
      : ".env.development",
})

export default defineConfig({
  schema: "./src/prisma/",
  migrations: {
    path: "./src/prisma/migrations",
    seed: "tsx ./src/prisma/seed/index.ts",
  },
  datasource: {
    url: process.env.DATABASE_URL!,
  },
})
