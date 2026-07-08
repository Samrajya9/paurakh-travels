"use client"

import { FormProvider } from "react-hook-form"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

import PackageImagesField from "./package-images-field"
import { Button } from "@/components/ui/button"
import type { CreatePackageInput } from "@/schemas/create-package.schema"
import { usePackageForm } from "../../packages/hooks/use-package-form"
import PackageFormFields from "../../packages/components/package-form-fields"

type UpdatePackageErrorResponse = {
  message: string
  errors?: Partial<Record<keyof CreatePackageInput, string[]>>
}

export default function PackageEditForm({
  packageId,
  initialValues,
}: {
  packageId: string
  initialValues: CreatePackageInput
}) {
  const router = useRouter()
  const form = usePackageForm(initialValues)

  const handleSubmit = form.handleSubmit(async (data) => {
    try {
      const res = await fetch(`/api/packages/${packageId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (!res.ok) {
        const body: UpdatePackageErrorResponse = await res.json()

        if (res.status === 422 && body.errors) {
          for (const [field, messages] of Object.entries(body.errors)) {
            form.setError(field as keyof CreatePackageInput, {
              type: "server",
              message: messages?.[0],
            })
          }
          return
        }

        toast.error(body.message ?? "Something went wrong. Please try again.")
        return
      }

      toast.success("Package updated successfully.")
      router.push("/admin/packages")
    } catch {
      toast.error("Could not reach the server. Please try again.")
    }
  })

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <PackageFormFields />
        <PackageImagesField packageId={packageId} />
        <Button
          type="submit"
          className="w-max self-end"
          size="lg"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? "Saving..." : "Save Changes"}
        </Button>
      </form>
    </FormProvider>
  )
}
