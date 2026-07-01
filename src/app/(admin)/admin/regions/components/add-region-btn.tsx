"use client"

import { Button } from "@/components/ui/button"
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { MODAL_REGISTRY } from "@/constants/modal/modal-component-registry"
import { useDialogContext } from "@/hooks/use-dailog"
import RegionForm from "./create-region-form"

const AddRegionButton = () => {
  const { openModal } = useDialogContext()

  const handleClick = () => {
    openModal(
      MODAL_REGISTRY.CREATE_REGION_MODAL_ID,
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Region</DialogTitle>
        </DialogHeader>
        <RegionForm />
      </DialogContent>
    )
  }

  return (
    <Button type="button" className="w-max" onClick={handleClick}>
      Add Regions
    </Button>
  )
}

export default AddRegionButton
