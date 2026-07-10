"use client"

import { Button } from "@/components/ui/button"
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { MODAL_REGISTRY } from "@/constants/modal/modal-component-registry"
import { useDialogContext } from "@/hooks/use-dailog"
import DestinationForm from "./create-destination-form"
import type { Destination } from "@/services/destination.service"

const AddDestinationButton = ({
  onCreated,
}: {
  onCreated?: (destination: Destination) => void
}) => {
  const { openModal } = useDialogContext()

  const handleClick = () => {
    openModal(
      MODAL_REGISTRY.CREATE_DESTINATION_MODAL_ID,
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Destination</DialogTitle>
        </DialogHeader>
        <DestinationForm onCreated={onCreated} />
      </DialogContent>
    )
  }

  return (
    <Button type="button" className="w-max" onClick={handleClick}>
      Add Destination
    </Button>
  )
}

export default AddDestinationButton
