"use client"

import { useCategoryForm } from "../hooks/category-form.hook"
import { FormProvider } from "react-hook-form"
import CategoryFormFields from "./category-form-fields"
import { Button } from "@/components/ui/button"
import { CreateCategoryInput } from "@/schemas/create-category.schema"
import { useDialogContext } from "@/hooks/use-dailog"
import { MODAL_REGISTRY } from "@/constants/modal/modal-component-registry"
import type { Category } from "@/services/category.service"

import { toast } from "sonner"

type CreateCategoryErrorResponse = {
  message: string
  errors?: Partial<Record<keyof CreateCategoryInput, string[]>>
}

const CategoryForm = ({
  onCreated,
}: {
  onCreated?: (category: Category) => void
}) => {
  const form = useCategoryForm()
  const { closeModal } = useDialogContext()

  const handleSubmit = form.handleSubmit(async (data) => {
    try {
      const res = await fetch("/api/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (!res.ok) {
        const body: CreateCategoryErrorResponse = await res.json()

        if (res.status === 422 && body.errors) {
          for (const [field, messages] of Object.entries(body.errors)) {
            form.setError(field as keyof CreateCategoryInput, {
              type: "server",
              message: messages?.[0],
            })
          }
          return
        }

        toast.error(body.message ?? "Something went wrong. Please try again.")
        return
      }

      const created: Category = await res.json()
      form.reset()
      toast.success("Category created.")
      onCreated?.(created)
      closeModal(MODAL_REGISTRY.CREATE_CATEGORY_MODAL_ID)
    } catch {
      toast.error("Could not reach the server. Please try again.")
    }
  })

  return (
    <FormProvider {...form}>
      <form
        id="form-create-category"
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <CategoryFormFields />
        <Button
          type="submit"
          form="form-create-category"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? "Creating..." : "Create"}
        </Button>
      </form>
    </FormProvider>
  )
}

export default CategoryForm
