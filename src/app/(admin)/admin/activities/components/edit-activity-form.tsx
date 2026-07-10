"use client"

import { FormProvider } from "react-hook-form"
import { toast } from "sonner"

import { useActivityForm } from "../hooks/activity-form.hook"
import ActivityFormFields from "./activity-form-fields"
import { Button } from "@/components/ui/button"
import type { CreateActivityInput } from "@/schemas/create-activity.schema"
import type { Activity } from "@/services/activity.service"

type UpdateActivityErrorResponse = {
  message: string
  errors?: Partial<Record<keyof CreateActivityInput, string[]>>
}

export default function EditActivityForm({
  activity,
  onSuccess,
}: {
  activity: Activity
  onSuccess: (activity: Activity) => void
}) {
  const form = useActivityForm({ name: activity.name })

  const handleSubmit = form.handleSubmit(async (data) => {
    try {
      const res = await fetch(`/api/activities/${activity.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (!res.ok) {
        const body: UpdateActivityErrorResponse = await res.json()

        if (res.status === 422 && body.errors) {
          for (const [field, messages] of Object.entries(body.errors)) {
            form.setError(field as keyof CreateActivityInput, {
              type: "server",
              message: messages?.[0],
            })
          }
          return
        }

        toast.error(body.message ?? "Something went wrong. Please try again.")
        return
      }

      const updated: Activity = await res.json()
      toast.success("Activity updated.")
      onSuccess(updated)
    } catch {
      toast.error("Could not reach the server. Please try again.")
    }
  })

  return (
    <FormProvider {...form}>
      <form
        id="form-edit-activity"
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <ActivityFormFields />
        <Button
          type="submit"
          form="form-edit-activity"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? "Saving..." : "Save Changes"}
        </Button>
      </form>
    </FormProvider>
  )
}
