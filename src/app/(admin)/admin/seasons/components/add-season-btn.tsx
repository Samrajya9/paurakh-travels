"use client"

import { Button } from "@/components/ui/button"
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { MODAL_REGISTRY } from "@/constants/modal/modal-component-registry"
import { useDialogContext } from "@/hooks/use-dailog"
import SeasonForm from "./create-season-form"
import type { Season } from "@/types/season.type"

const AddSeasonButton = ({
  onCreated,
}: {
  onCreated?: (season: Season) => void
}) => {
  const { openModal } = useDialogContext()

  const handleClick = () => {
    openModal(
      MODAL_REGISTRY.CREATE_SEASON_MODAL_ID,
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Season</DialogTitle>
        </DialogHeader>
        <SeasonForm onCreated={onCreated} />
      </DialogContent>
    )
  }

  return (
    <Button type="button" className="w-max" onClick={handleClick}>
      Add Season
    </Button>
  )
}

export default AddSeasonButton
