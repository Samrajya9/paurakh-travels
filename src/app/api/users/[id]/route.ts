import { Prisma, UserType } from "@prisma/client"

import {
  deleteUser,
  getUserById,
  updateUser,
  type UpdateUserInput,
} from "@/services/user.service"

type UserRouteContext = {
  params: Promise<{
    id: string
  }>
}

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

function isNotFoundError(error: unknown) {
  return (
    error instanceof Prisma.PrismaClientKnownRequestError &&
    error.code === "P2025"
  )
}

export async function GET(_request: Request, { params }: UserRouteContext) {
  const { id } = await params
  const user = await getUserById(id)

  if (!user) {
    return jsonError("User not found.", 404)
  }

  return Response.json({ user })
}

export async function PATCH(request: Request, { params }: UserRouteContext) {
  const { id } = await params
  const body: unknown = await request.json().catch(() => null)

  if (!isRecord(body)) {
    return jsonError("Request body must be a JSON object.", 400)
  }

  const input: UpdateUserInput = {}

  if (body.email !== undefined) {
    if (typeof body.email !== "string" || body.email.trim().length === 0) {
      return jsonError("Email must be a non-empty string.", 400)
    }

    input.email = body.email.trim()
  }

  if (body.password !== undefined) {
    if (typeof body.password !== "string" || body.password.length === 0) {
      return jsonError("Password must be a non-empty string.", 400)
    }

    input.password = body.password
  }

  if (body.user_type !== undefined) {
    const userType = parseUserType(body.user_type)

    if (userType === undefined) {
      return jsonError("User type must be ADMIN or CUSTOMER.", 400)
    }

    input.user_type = userType
  }

  if (Object.keys(input).length === 0) {
    return jsonError("At least one user field is required.", 400)
  }

  try {
    const user = await updateUser(id, input)

    return Response.json({ user })
  } catch (error) {
    if (isNotFoundError(error)) {
      return jsonError("User not found.", 404)
    }

    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return jsonError("A user with this email already exists.", 409)
    }

    throw error
  }
}

export async function DELETE(_request: Request, { params }: UserRouteContext) {
  const { id } = await params

  try {
    const user = await deleteUser(id)

    return Response.json({ user })
  } catch (error) {
    if (isNotFoundError(error)) {
      return jsonError("User not found.", 404)
    }

    throw error
  }
}
