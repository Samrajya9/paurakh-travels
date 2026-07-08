"use client"
import { FormProvider } from "react-hook-form"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import type { CreatePackageInput } from "@/schemas/create-package.schema"
import { usePackageForm } from "../../packages/hooks/use-package-form"
import PackageFormFields from "../../packages/components/package-form-fields"

type CreatePackageErrorResponse = {
  message: string
  errors?: Partial<Record<keyof CreatePackageInput, string[]>>
}

const CreatePackageForm = () => {
  const router = useRouter()
  const form = usePackageForm()

  const handleSubmit = form.handleSubmit(async (data) => {
    try {
      const res = await fetch("/api/packages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (!res.ok) {
        const body: CreatePackageErrorResponse = await res.json()

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

      const created: { id: string } = await res.json()
      toast.success("Package created. Now add some images.")
      router.push(`/admin/packages/edit/${created.id}`)
    } catch {
      toast.error("Could not reach the server. Please try again.")
    }
  })

  return (
    <>
      <FormProvider {...form}>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <PackageFormFields />
          <Button
            type="submit"
            className="w-max self-end"
            size={"lg"}
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? "Creating..." : "Create Package"}
          </Button>
        </form>
      </FormProvider>
    </>
  )
}

export default CreatePackageForm
