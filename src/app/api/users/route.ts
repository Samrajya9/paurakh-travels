import { Prisma, UserType } from "@prisma/client"

import { createUser, listUsers } from "@/services/user.service"

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value)
}

function parseUserType(value: unknown): UserType | undefined {
  if (typeof value !== "string") {
    return undefined
  }

  const normalizedValue = value.toUpperCase()

  if (normalizedValue === UserType.ADMIN) {
    return UserType.ADMIN
  }

  if (normalizedValue === UserType.CUSTOMER) {
    return UserType.CUSTOMER
  }

  return undefined
}

function jsonError(message: string, status: number) {
  return Response.json({ error: message }, { status })
}

export async function GET() {
  const users = await listUsers()

  return Response.json({ users })
}

export async function POST(request: Request) {
  const body: unknown = await request.json().catch(() => null)

  if (!isRecord(body)) {
    return jsonError("Request body must be a JSON object.", 400)
  }

  if (typeof body.email !== "string" || body.email.trim().length === 0) {
    return jsonError("Email is required.", 400)
  }

  if (typeof body.password !== "string" || body.password.length === 0) {
    return jsonError("Password is required.", 400)
  }

  const user_type =
    body.user_type === undefined ? undefined : parseUserType(body.user_type)

  if (body.user_type !== undefined && user_type === undefined) {
    return jsonError("User type must be ADMIN or CUSTOMER.", 400)
  }

  try {
    const user = await createUser({
      email: body.email.trim(),
      password: body.password,
      user_type,
    })

    return Response.json({ user }, { status: 201 })
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return jsonError("A user with this email already exists.", 409)
    }

    throw error
  }
}
