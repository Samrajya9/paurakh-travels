"use client"

import { useRegionForm } from "../hooks/region-form.hook"
import { FormProvider } from "react-hook-form"
import RegionFormFields from "./region-form-fields"
import { Button } from "@/components/ui/button"
import { CreateRegionInput } from "@/schemas/create-region.schema"
import { useDialogContext } from "@/hooks/use-dailog"
import { MODAL_REGISTRY } from "@/constants/modal/modal-component-registry"
import type { Region } from "@/services/region.service"

import { toast } from "sonner"

type CreateRegionErrorResponse = {
  message: string
  errors?: Partial<Record<keyof CreateRegionInput, string[]>>
}

const RegionForm = ({
  onCreated,
}: {
  onCreated?: (region: Region) => void
}) => {
  const form = useRegionForm()
  const { closeModal } = useDialogContext()

  const handleSubmit = form.handleSubmit(
    async (data) => {
      console.log("data", data)

      try {
        const res = await fetch("/api/regions", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        })

        if (!res.ok) {
          const body: CreateRegionErrorResponse = await res.json()

          if (res.status === 422 && body.errors) {
            for (const [field, messages] of Object.entries(body.errors)) {
              form.setError(field as keyof CreateRegionInput, {
                type: "server",
                message: messages?.[0],
              })
            }
            return
          }

          toast.error(body.message ?? "Something went wrong. Please try again.")
          return
        }

        const created: Region = await res.json()
        form.reset()
        toast.success("Region created.")
        onCreated?.(created)
        closeModal(MODAL_REGISTRY.CREATE_REGION_MODAL_ID)
      } catch {
        toast.error("Could not reach the server. Please try again.")
      }
    },
    (err) => {
      console.error(err)
    }
  )

  return (
    <FormProvider {...form}>
      <form
        id="form-create-region"
        onSubmit={(e) => {
          console.log("submit event")
          handleSubmit(e)
        }}
        className="space-y-4"
      >
        <RegionFormFields />
        <Button
          type="submit"
          form="form-create-region"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? "Creating..." : "Create"}
        </Button>
      </form>
    </FormProvider>
  )
}

export default RegionForm
