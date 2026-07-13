"use client"

import { Button } from "@/components/ui/button"
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { MODAL_REGISTRY } from "@/constants/modal/modal-component-registry"
import { useDialogContext } from "@/hooks/use-dailog"
import ThemeForm from "./create-theme-form"
import type { Theme } from "@/types/theme.type"

const AddThemeButton = ({
  onCreated,
}: {
  onCreated?: (theme: Theme) => void
}) => {
  const { openModal } = useDialogContext()

  const handleClick = () => {
    openModal(
      MODAL_REGISTRY.CREATE_THEME_MODAL_ID,
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Theme</DialogTitle>
        </DialogHeader>
        <ThemeForm onCreated={onCreated} />
      </DialogContent>
    )
  }

  return (
    <Button type="button" className="w-max" onClick={handleClick}>
      Add Theme
    </Button>
  )
}

export default AddThemeButton
