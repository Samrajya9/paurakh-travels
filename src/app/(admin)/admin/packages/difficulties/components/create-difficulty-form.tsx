"use client"

import { useDifficultyForm } from "../hooks/difficulty-form.hook"
import { FormProvider } from "react-hook-form"
import DifficultyFormFields from "./difficulty-form-fields"
import { Button } from "@/components/ui/button"
import { CreateDifficultyInput } from "@/schemas/create-difficulty.schema"
import { useDialogContext } from "@/hooks/use-dailog"
import { MODAL_REGISTRY } from "@/constants/modal/modal-component-registry"
import type { Difficulty } from "@/services/difficulty.service"

import { toast } from "sonner"

type CreateDifficultyErrorResponse = {
  message: string
  errors?: Partial<Record<keyof CreateDifficultyInput, string[]>>
}

const DifficultyForm = ({
  onCreated,
}: {
  onCreated?: (difficulty: Difficulty) => void
}) => {
  const form = useDifficultyForm()
  const { closeModal } = useDialogContext()

  const handleSubmit = form.handleSubmit(async (data) => {
    try {
      const res = await fetch("/api/difficulties", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (!res.ok) {
        const body: CreateDifficultyErrorResponse = await res.json()

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

      const created: Difficulty = await res.json()
      form.reset()
      toast.success("Difficulty created.")
      onCreated?.(created)
      closeModal(MODAL_REGISTRY.CREATE_DIFFICULTY_MODAL_ID)
    } catch {
      toast.error("Could not reach the server. Please try again.")
    }
  })

  return (
    <FormProvider {...form}>
      <form
        id="form-create-difficulty"
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <DifficultyFormFields />
        <Button
          type="submit"
          form="form-create-difficulty"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? "Creating..." : "Create"}
        </Button>
      </form>
    </FormProvider>
  )
}

export default DifficultyForm
