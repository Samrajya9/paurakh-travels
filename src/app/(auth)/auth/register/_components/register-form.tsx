"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { userSchema } from "@/schemas/user.shema"
import type { UserSchema } from "@/types/users.type"
import { UserType } from "@/types/users_type.type"

export function RegisterForm() {
  const [errorMessage, setErrorMessage] = useState("")
  const [successMessage, setSuccessMessage] = useState("")

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<UserSchema>({
    defaultValues: {
      email: "",
      password: "",
      user_type: UserType.CUSTOMER,
    },
    resolver: zodResolver(userSchema),
  })

  async function onSubmit(values: UserSchema) {
    setErrorMessage("")
    setSuccessMessage("")

    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    })

    const payload: unknown = await response.json().catch(() => null)

    if (!response.ok) {
      const message =
        payload &&
        typeof payload === "object" &&
        "error" in payload &&
        typeof payload.error === "string"
          ? payload.error
          : "Unable to register. Please try again."

      setErrorMessage(message)
      return
    }

    reset()
    setSuccessMessage("Registration complete.")
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full max-w-sm flex-col gap-4"
    >
      <div className="space-y-1">
        <h1 className="text-xl font-medium">Create account</h1>
        <p className="text-sm text-muted-foreground">
          Register a customer account.
        </p>
      </div>

      <input type="hidden" {...register("user_type")} />

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
          autoComplete="new-password"
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

      {successMessage ? (
        <p className="text-sm text-muted-foreground">{successMessage}</p>
      ) : null}

      <Button type="submit" disabled={isSubmitting} className="h-9">
        {isSubmitting ? "Creating..." : "Create account"}
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link
          href="/auth/login"
          className="font-medium text-foreground underline-offset-4 hover:underline"
        >
          Login
        </Link>
      </p>
    </form>
  )
}
