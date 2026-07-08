import { serverEnv } from "@/env/server"
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3"
import { AppError } from "../errors"

let r2Client: S3Client | null = null

const buckets = {
  main: {
    name: serverEnv.R2_BUCKET_NAME,
    publicUrl: serverEnv.R2_PUBLIC_URL,
  },
} as const

function getR2Client() {
  if (r2Client) return r2Client

  r2Client = new S3Client({
    region: "auto",
    endpoint: `https://${serverEnv.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: serverEnv.R2_ACCESS_KEY_ID,
      secretAccessKey: serverEnv.R2_SECRET_ACCESS_KEY,
    },
  })
  return r2Client
}

export async function uploadToR2({
  file,
  objectKey,
  bucket = "main",
}: {
  file: File
  objectKey: string
  bucket?: keyof typeof buckets
}) {
  const client = getR2Client()

  const bucketConfig = buckets[bucket]

  const buffer = Buffer.from(await file.arrayBuffer())

  const command = new PutObjectCommand({
    Bucket: bucketConfig.name,
    Key: objectKey,
    Body: buffer,
    ContentType: file.type,
  })

  try {
    const response = await client.send(command)
    return {
      url: `${bucketConfig.publicUrl}/${objectKey}`,
    }
  } catch (error) {
    console.error("R2 upload failed:", error)

    throw new AppError(
      "Error occurred while uploading file. Please try again later.",
      500
    )
  }
}

export async function deleteFromR2({
  objectKey,
  bucket = "main",
}: {
  objectKey: string
  bucket?: keyof typeof buckets
}) {
  const client = getR2Client()
  const bucketConfig = buckets[bucket]

  const command = new DeleteObjectCommand({
    Bucket: bucketConfig.name,
    Key: objectKey,
  })

  try {
    const response = await client.send(command)
    console.log("Delete successful:", response)
    return { success: true }
  } catch (error) {
    console.error("R2 delete failed:", error)

    throw new AppError(
      "Error occurred while deleting file. Please try again later.",
      500
    )
  }
}
