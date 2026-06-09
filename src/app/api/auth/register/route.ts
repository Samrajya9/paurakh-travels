import { Prisma } from "@prisma/client"
import { ZodError } from "zod/v4"

import { userSchema } from "@/schemas/user.shema"
import { register } from "@/services/auth.service"

export const runtime = "nodejs"

function jsonError(message: string, status: number, details?: unknown) {
  return Response.json({ error: message, details }, { status })
}

export async function POST(request: Request) {
  const body: unknown = await request.json().catch(() => null)
  const result = userSchema.safeParse(body)

  if (!result.success) {
    return jsonError("Invalid register payload.", 400, result.error.flatten())
  }

  try {
    const user = await register(result.data)

    return Response.json({ user }, { status: 201 })
  } catch (error) {
    if (error instanceof Error && error.message === "Email already exist") {
      return jsonError(error.message, 409)
    }

    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return jsonError("Email already exist", 409)
    }

    if (error instanceof ZodError) {
      return jsonError("Invalid register payload.", 400, error.flatten())
    }

    throw error
  }
}
