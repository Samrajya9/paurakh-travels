"use client"

import { FormProvider } from "react-hook-form"
import { toast } from "sonner"

import { useDifficultyForm } from "../hooks/difficulty-form.hook"
import DifficultyFormFields from "./difficulty-form-fields"
import { Button } from "@/components/ui/button"
import type { CreateDifficultyInput } from "@/schemas/create-difficulty.schema"
import type { Difficulty } from "@/services/difficulty.service"

type UpdateDifficultyErrorResponse = {
  message: string
  errors?: Partial<Record<keyof CreateDifficultyInput, string[]>>
}

export default function EditDifficultyForm({
  difficulty,
  onSuccess,
}: {
  difficulty: Difficulty
  onSuccess: (difficulty: Difficulty) => void
}) {
  const form = useDifficultyForm({ name: difficulty.name })

  const handleSubmit = form.handleSubmit(async (data) => {
    try {
      const res = await fetch(`/api/difficulties/${difficulty.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (!res.ok) {
        const body: UpdateDifficultyErrorResponse = await res.json()

        if (res.status === 422 && body.errors) {
          for (const [field, messages] of Object.entries(body.errors)) {
            form.setError(field as keyof CreateDifficultyInput, {
              type: "server",
              message: messages?.[0],
            })
          }
          return
        }

        toast.error(body.message ?? "Something went wrong. Please try again.")
        return
      }

      const updated: Difficulty = await res.json()
      toast.success("Difficulty updated.")
      onSuccess(updated)
    } catch {
      toast.error("Could not reach the server. Please try again.")
    }
  })

  return (
    <FormProvider {...form}>
      <form
        id="form-edit-difficulty"
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <DifficultyFormFields />
        <Button
          type="submit"
          form="form-edit-difficulty"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? "Saving..." : "Save Changes"}
        </Button>
      </form>
    </FormProvider>
  )
}
