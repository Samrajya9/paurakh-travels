"use client"

import { FormProvider } from "react-hook-form"
import { toast } from "sonner"

import { useThemeForm } from "../hooks/theme-form.hook"
import ThemeFormFields from "./theme-form-fields"
import { Button } from "@/components/ui/button"
import type { CreateThemeInput } from "@/schemas/create-theme.schema"
import type { Theme } from "@/services/theme.service"

type UpdateThemeErrorResponse = {
  message: string
  errors?: Partial<Record<keyof CreateThemeInput, string[]>>
}

export default function EditThemeForm({
  theme,
  onSuccess,
}: {
  theme: Theme
  onSuccess: (theme: Theme) => void
}) {
  const form = useThemeForm({ name: theme.name })

  const handleSubmit = form.handleSubmit(async (data) => {
    try {
      const res = await fetch(`/api/themes/${theme.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (!res.ok) {
        const body: UpdateThemeErrorResponse = await res.json()

        if (res.status === 422 && body.errors) {
          for (const [field, messages] of Object.entries(body.errors)) {
            form.setError(field as keyof CreateThemeInput, {
              type: "server",
              message: messages?.[0],
            })
          }
          return
        }

        toast.error(body.message ?? "Something went wrong. Please try again.")
        return
      }

      const updated: Theme = await res.json()
      toast.success("Theme updated.")
      onSuccess(updated)
    } catch {
      toast.error("Could not reach the server. Please try again.")
    }
  })

  return (
    <FormProvider {...form}>
      <form id="form-edit-theme" onSubmit={handleSubmit} className="space-y-4">
        <ThemeFormFields />
        <Button
          type="submit"
          form="form-edit-theme"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? "Saving..." : "Save Changes"}
        </Button>
      </form>
    </FormProvider>
  )
}
