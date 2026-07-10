"use client"

import { Button } from "@/components/ui/button"
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { MODAL_REGISTRY } from "@/constants/modal/modal-component-registry"
import { useDialogContext } from "@/hooks/use-dailog"
import CategoryForm from "./create-category-form"
import type { Category } from "@/services/category.service"

const AddCategoryButton = ({
  onCreated,
}: {
  onCreated?: (category: Category) => void
}) => {
  const { openModal } = useDialogContext()

  const handleClick = () => {
    openModal(
      MODAL_REGISTRY.CREATE_CATEGORY_MODAL_ID,
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Category</DialogTitle>
        </DialogHeader>
        <CategoryForm onCreated={onCreated} />
      </DialogContent>
    )
  }

  return (
    <Button type="button" className="w-max" onClick={handleClick}>
      Add Category
    </Button>
  )
}

export default AddCategoryButton
