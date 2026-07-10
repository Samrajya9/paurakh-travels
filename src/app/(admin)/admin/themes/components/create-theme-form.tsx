"use client"

import { useThemeForm } from "../hooks/theme-form.hook"
import { FormProvider } from "react-hook-form"
import ThemeFormFields from "./theme-form-fields"
import { Button } from "@/components/ui/button"
import { CreateThemeInput } from "@/schemas/create-theme.schema"
import { useDialogContext } from "@/hooks/use-dailog"
import { MODAL_REGISTRY } from "@/constants/modal/modal-component-registry"
import type { Theme } from "@/services/theme.service"

import { toast } from "sonner"

type CreateThemeErrorResponse = {
  message: string
  errors?: Partial<Record<keyof CreateThemeInput, string[]>>
}

const ThemeForm = ({ onCreated }: { onCreated?: (theme: Theme) => void }) => {
  const form = useThemeForm()
  const { closeModal } = useDialogContext()

  const handleSubmit = form.handleSubmit(async (data) => {
    try {
      const res = await fetch("/api/themes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (!res.ok) {
        const body: CreateThemeErrorResponse = await res.json()

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

      const created: Theme = await res.json()
      form.reset()
      toast.success("Theme created.")
      onCreated?.(created)
      closeModal(MODAL_REGISTRY.CREATE_THEME_MODAL_ID)
    } catch {
      toast.error("Could not reach the server. Please try again.")
    }
  })

  return (
    <FormProvider {...form}>
      <form
        id="form-create-theme"
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <ThemeFormFields />
        <Button
          type="submit"
          form="form-create-theme"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? "Creating..." : "Create"}
        </Button>
      </form>
    </FormProvider>
  )
}

export default ThemeForm
