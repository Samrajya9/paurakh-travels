"use client"

import { useDestinationForm } from "../hooks/destination-form.hook"
import { FormProvider } from "react-hook-form"
import DestinationFormFields from "./destination-form-fields"
import { Button } from "@/components/ui/button"
import { CreateDestinationInput } from "@/schemas/create-destination.schema"
import { useDialogContext } from "@/hooks/use-dailog"
import { MODAL_REGISTRY } from "@/constants/modal/modal-component-registry"
import { Destination } from "@/types/destination.type"

import { toast } from "sonner"

type CreateDestinationErrorResponse = {
  message: string
  errors?: Partial<Record<keyof CreateDestinationInput, string[]>>
}

const DestinationForm = ({
  onCreated,
}: {
  onCreated?: (destination: Destination) => void
}) => {
  const form = useDestinationForm()
  const { closeModal } = useDialogContext()

  const handleSubmit = form.handleSubmit(async (data) => {
    try {
      const res = await fetch("/api/destinations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (!res.ok) {
        const body: CreateDestinationErrorResponse = await res.json()

        if (res.status === 422 && body.errors) {
          for (const [field, messages] of Object.entries(body.errors)) {
            form.setError(field as keyof CreateDestinationInput, {
              type: "server",
              message: messages?.[0],
            })
          }
          return
        }

        toast.error(body.message ?? "Something went wrong. Please try again.")
        return
      }

      const created: Destination = await res.json()
      form.reset()
      toast.success("Destination created.")
      onCreated?.(created)
      closeModal(MODAL_REGISTRY.CREATE_DESTINATION_MODAL_ID)
    } catch {
      toast.error("Could not reach the server. Please try again.")
    }
  })

  return (
    <FormProvider {...form}>
      <form
        id="form-create-destination"
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <DestinationFormFields />
        <Button
          type="submit"
          form="form-create-destination"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? "Creating..." : "Create"}
        </Button>
      </form>
    </FormProvider>
  )
}

export default DestinationForm
