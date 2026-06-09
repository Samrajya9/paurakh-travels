"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { UserType } from "@prisma/client"
import { useState } from "react"
import { useForm, type Resolver } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { userSchema } from "@/schemas/user.shema"
import { UserSchema } from "@/types/users.type"

type RegisterFormValues = z.input<typeof userSchema>
const registerResolver = zodResolver(userSchema as never) as Resolver<
  RegisterFormValues,
  unknown,
  UserSchema
>

export default function RegisterPage() {
  const [errorMessage, setErrorMessage] = useState("")
  const [successMessage, setSuccessMessage] = useState("")

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<RegisterFormValues, unknown, UserSchema>({
    resolver: registerResolver,
    defaultValues: {
      email: "",
      password: "",
      user_type: UserType.CUSTOMER,
    },
  })

  async function onSubmit(values: UserSchema) {
    setErrorMessage("")
    setSuccessMessage("")

    const response = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })

    console.log(response)

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
    <main className="flex min-h-svh items-center justify-center px-6 py-10">
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
      </form>
    </main>
  )
}
