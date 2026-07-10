"use client"

import { useSeasonForm } from "../hooks/season-form.hook"
import { FormProvider } from "react-hook-form"
import SeasonFormFields from "./season-form-fields"
import { Button } from "@/components/ui/button"
import { CreateSeasonInput } from "@/schemas/create-season.schema"
import { useDialogContext } from "@/hooks/use-dailog"
import { MODAL_REGISTRY } from "@/constants/modal/modal-component-registry"
import type { Season } from "@/services/season.service"

import { toast } from "sonner"

type CreateSeasonErrorResponse = {
  message: string
  errors?: Partial<Record<keyof CreateSeasonInput, string[]>>
}

const SeasonForm = ({
  onCreated,
}: {
  onCreated?: (season: Season) => void
}) => {
  const form = useSeasonForm()
  const { closeModal } = useDialogContext()

  const handleSubmit = form.handleSubmit(async (data) => {
    try {
      const res = await fetch("/api/seasons", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (!res.ok) {
        const body: CreateSeasonErrorResponse = await res.json()

        if (res.status === 422 && body.errors) {
          for (const [field, messages] of Object.entries(body.errors)) {
            form.setError(field as keyof CreateSeasonInput, {
              type: "server",
              message: messages?.[0],
            })
          }
          return
        }

        toast.error(body.message ?? "Something went wrong. Please try again.")
        return
      }

      const created: Season = await res.json()
      form.reset()
      toast.success("Season created.")
      onCreated?.(created)
      closeModal(MODAL_REGISTRY.CREATE_SEASON_MODAL_ID)
    } catch {
      toast.error("Could not reach the server. Please try again.")
    }
  })

  return (
    <FormProvider {...form}>
      <form
        id="form-create-season"
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <SeasonFormFields />
        <Button
          type="submit"
          form="form-create-season"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? "Creating..." : "Create"}
        </Button>
      </form>
    </FormProvider>
  )
}

export default SeasonForm
