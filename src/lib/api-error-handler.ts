import { NextResponse } from "next/server"
import { AppError } from "@/lib/errors"

export function handleApiError(error: unknown) {
  if (error instanceof AppError) {
    return NextResponse.json(
      { message: error.message },
      { status: error.status }
    )
  }

  console.error("[Unhandled error]", error)
  return NextResponse.json(
    { message: "Internal server error" },
    { status: 500 }
  )
}
