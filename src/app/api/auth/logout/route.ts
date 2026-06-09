import { serializeCookie } from "@/lib/cookies"

export async function POST() {
  const response = Response.json({ ok: true }, { status: 200 })

  response.headers.append(
    "Set-Cookie",
    serializeCookie("access_token", "", {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
      path: "/",
      maxAge: 0,
    })
  )

  response.headers.append(
    "Set-Cookie",
    serializeCookie("refresh_token", "", {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
      path: "/",
      maxAge: 0,
    })
  )

  return response
}
