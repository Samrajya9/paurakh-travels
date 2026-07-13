"use client"

import { FormProvider } from "react-hook-form"
import { toast } from "sonner"

import { useSeasonForm } from "../hooks/season-form.hook"
import SeasonFormFields from "./season-form-fields"
import { Button } from "@/components/ui/button"
import type { CreateSeasonInput } from "@/schemas/create-season.schema"
import type { Season } from "@/types/season.type"

type UpdateSeasonErrorResponse = {
  message: string
  errors?: Partial<Record<keyof CreateSeasonInput, string[]>>
}

export default function EditSeasonForm({
  season,
  onSuccess,
}: {
  season: Season
  onSuccess: (season: Season) => void
}) {
  const form = useSeasonForm({ name: season.name })

  const handleSubmit = form.handleSubmit(async (data) => {
    try {
      const res = await fetch(`/api/seasons/${season.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (!res.ok) {
        const body: UpdateSeasonErrorResponse = await res.json()

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

      const updated: Season = await res.json()
      toast.success("Season updated.")
      onSuccess(updated)
    } catch {
      toast.error("Could not reach the server. Please try again.")
    }
  })

  return (
    <FormProvider {...form}>
      <form id="form-edit-season" onSubmit={handleSubmit} className="space-y-4">
        <SeasonFormFields />
        <Button
          type="submit"
          form="form-edit-season"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? "Saving..." : "Save Changes"}
        </Button>
      </form>
    </FormProvider>
  )
}
