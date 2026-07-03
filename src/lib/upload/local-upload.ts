import { randomUUID } from "crypto"
import { mkdir, writeFile } from "fs/promises"
import path from "path"

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads")

export async function uploadFile(file: File): Promise<{ url: string }> {
  await mkdir(UPLOAD_DIR, { recursive: true })

  const extension = path.extname(file.name)
  const filename = `${randomUUID()}${extension}`
  const filepath = path.join(UPLOAD_DIR, filename)

  const buffer = Buffer.from(await file.arrayBuffer())
  await writeFile(filepath, buffer)

  return { url: `/uploads/${filename}` }
}
