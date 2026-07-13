"use client"

import { useActivityForm } from "../hooks/activity-form.hook"
import { FormProvider } from "react-hook-form"
import ActivityFormFields from "./activity-form-fields"
import { Button } from "@/components/ui/button"
import { CreateActivityInput } from "@/schemas/create-activity.schema"
import { useDialogContext } from "@/hooks/use-dailog"
import { MODAL_REGISTRY } from "@/constants/modal/modal-component-registry"
import { Activity } from "@/types/activity.type"

import { toast } from "sonner"

type CreateActivityErrorResponse = {
  message: string
  errors?: Partial<Record<keyof CreateActivityInput, string[]>>
}

const ActivityForm = ({
  onCreated,
}: {
  onCreated?: (activity: Activity) => void
}) => {
  const form = useActivityForm()
  const { closeModal } = useDialogContext()

  const handleSubmit = form.handleSubmit(async (data) => {
    try {
      const res = await fetch("/api/activities", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (!res.ok) {
        const body: CreateActivityErrorResponse = await res.json()

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

      const created: Activity = await res.json()
      form.reset()
      toast.success("Activity created.")
      onCreated?.(created)
      closeModal(MODAL_REGISTRY.CREATE_ACTIVITY_MODAL_ID)
    } catch {
      toast.error("Could not reach the server. Please try again.")
    }
  })

  return (
    <FormProvider {...form}>
      <form
        id="form-create-activity"
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <ActivityFormFields />
        <Button
          type="submit"
          form="form-create-activity"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? "Creating..." : "Create"}
        </Button>
      </form>
    </FormProvider>
  )
}

export default ActivityForm
