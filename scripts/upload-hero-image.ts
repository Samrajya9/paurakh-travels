import "dotenv/config"
import { readFile } from "node:fs/promises"
import path from "node:path"
import { deleteFromR2, uploadToR2 } from "@/lib/upload/r2-upload"
import { randomUUID } from "node:crypto"

async function del(objectKey: string) {
  await deleteFromR2({ objectKey })
  console.log("Deleted successfully:", objectKey)
}

async function main() {
  const relativePath = process.argv[2] ?? "public/uploads/hero-image.webp"

  const filePath = path.join(process.cwd(), relativePath)
  const extension = path.extname(filePath)

  const fileName = `${path.parse(filePath).name}:${Date.now()}${extension}`

  const buffer = await readFile(filePath)

  // uploadToR2 expects a browser-style File (it calls file.arrayBuffer()
  // and reads file.type) — Node 20+ exposes File globally, so we can
  // construct one from the buffer we just read off disk.
  const file = new File([buffer], fileName, { type: "image/webp" })

  const objectKey = `paurakh-travels/uploads/${fileName}`

  const uploadResult = await uploadToR2({ file, objectKey })
  console.log("Uploaded successfully:", uploadResult.url)

  const deleteResult = await deleteFromR2({ objectKey })
  console.log("Deleted successfully:", deleteResult)
}

main().catch((err) => {
  console.error("Upload failed:", err)
  process.exit(1)
})

/**
 * Upload hero image to R2
 * pnpm dlx tsx scripts/upload-hero-image.ts
 * pnpm dlx tsx scripts/upload-hero-image.ts public/uploads/hero-image.webp
 */
