"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/context/auth.context"
import { loginSchema } from "@/schemas/login.schema"
import type { LoginSchema } from "@/types/login.type"

export function LoginForm() {
  const router = useRouter()
  const { login } = useAuth()
  const [errorMessage, setErrorMessage] = useState("")

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<LoginSchema>({
    defaultValues: { email: "", password: "" },
    resolver: zodResolver(loginSchema),
  })

  async function onSubmit(values: LoginSchema) {
    setErrorMessage("")

    try {
      await login(values)
      reset()
      router.push("/")
    } catch (err) {
      setErrorMessage(
        err instanceof Error
          ? err.message
          : "Unable to sign in. Please try again."
      )
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full max-w-sm flex-col gap-4"
    >
      <div className="space-y-1">
        <h1 className="text-xl font-medium">Sign in</h1>
        <p className="text-sm text-muted-foreground">
          Access your Paurakh Travels account.
        </p>
      </div>

      <label className="flex flex-col gap-1.5 text-sm font-medium">
        Email
        <input
          type="email"
          autoComplete="email"
          aria-invalid={Boolean(errors.email)}
          className="h-9 rounded-md border border-input bg-background px-3 text-sm transition-colors outline-none focus:border-ring focus:ring-2 focus:ring-ring/30 aria-invalid:border-destructive aria-invalid:ring-destructive/20"
          {...register("email")}
        />
        {errors.email ? (
          <span className="text-xs text-destructive">
            {errors.email.message}
          </span>
        ) : null}
      </label>

      <label className="flex flex-col gap-1.5 text-sm font-medium">
        Password
        <input
          type="password"
          autoComplete="current-password"
          aria-invalid={Boolean(errors.password)}
          className="h-9 rounded-md border border-input bg-background px-3 text-sm transition-colors outline-none focus:border-ring focus:ring-2 focus:ring-ring/30 aria-invalid:border-destructive aria-invalid:ring-destructive/20"
          {...register("password")}
        />
        {errors.password ? (
          <span className="text-xs text-destructive">
            {errors.password.message}
          </span>
        ) : null}
      </label>

      {errorMessage ? (
        <p className="text-sm text-destructive">{errorMessage}</p>
      ) : null}

      <Button type="submit" disabled={isSubmitting} className="h-9">
        {isSubmitting ? "Signing in..." : "Sign in"}
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        Need an account?{" "}
        <Link
          href="/auth/register"
          className="font-medium text-foreground underline-offset-4 hover:underline"
        >
          Create one
        </Link>
      </p>
    </form>
  )
}
