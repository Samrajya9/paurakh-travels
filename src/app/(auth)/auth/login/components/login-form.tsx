"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/context/auth.context"
import { LoginSchema } from "@/schemas/login.schema"
import type { LoginInput } from "@/schemas/login.schema"
import { EmailInput } from "@/components/inputs/email-input"
import { PasswordInput } from "@/components/inputs/password-input"

export function LoginForm() {
  const router = useRouter()
  const { login } = useAuth()
  const [errorMessage, setErrorMessage] = useState("")

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<LoginInput>({
    defaultValues: { email: "", password: "" },
    resolver: zodResolver(LoginSchema),
  })

  async function onSubmit(values: LoginInput) {
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
        <EmailInput
          aria-invalid={Boolean(errors.email)}
          {...register("email")}
          className="h-9"
        />
        {errors.email ? (
          <span className="text-xs text-destructive">
            {errors.email.message}
          </span>
        ) : null}
      </label>

      <label className="flex flex-col gap-1.5 text-sm font-medium">
        Password
        <PasswordInput
          aria-invalid={Boolean(errors.password)}
          {...register("password")}
          className="h-9"
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
