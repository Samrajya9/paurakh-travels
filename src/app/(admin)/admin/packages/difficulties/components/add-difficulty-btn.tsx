"use client"

import { Button } from "@/components/ui/button"
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { MODAL_REGISTRY } from "@/constants/modal/modal-component-registry"
import { useDialogContext } from "@/hooks/use-dailog"
import DifficultyForm from "./create-difficulty-form"
import type { Difficulty } from "@/services/difficulty.service"

const AddDifficultyButton = ({
  onCreated,
}: {
  onCreated?: (difficulty: Difficulty) => void
}) => {
  const { openModal } = useDialogContext()

  const handleClick = () => {
    openModal(
      MODAL_REGISTRY.CREATE_DIFFICULTY_MODAL_ID,
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Difficulty</DialogTitle>
        </DialogHeader>
        <DifficultyForm onCreated={onCreated} />
      </DialogContent>
    )
  }

  return (
    <Button type="button" className="w-max" onClick={handleClick}>
      Add Difficulty
    </Button>
  )
}

export default AddDifficultyButton
