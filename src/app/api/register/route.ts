import type { NextRequest } from "next/server"

import { register } from "@/services/auth.service"
import { userSchema } from "@/schemas/user.shema"
import { AppError } from "@/lib/errors"


export async function POST(req: NextRequest) {
  const body: unknown = await req.json().catch(() => null)

  const parsed = userSchema.safeParse(body)

  if (!parsed.success) {
    return Response.json(
      { error: parsed.error.flatten().fieldErrors },
      { status: 400 }
    )
  }

  try {
    const user = await register(parsed.data)
    return Response.json(user, { status: 201 })
  } catch (err) {
    if (err instanceof AppError) {
      return Response.json({ error: err.message }, { status: err.status })
    }
    return Response.json({ error: "Internal server error" }, { status: 500 })
  }
}
