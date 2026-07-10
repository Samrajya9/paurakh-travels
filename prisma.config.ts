import "dotenv/config"
import { defineConfig } from "prisma/config"

export default defineConfig({
  schema: "./src/prisma/",
  migrations: {
    path: "./src/prisma/migrations",
    seed: "tsx ./src/prisma/seed/index.ts",
  },
  datasource: {
    url: process.env["DATABASE_URL"]!,
  },
})
