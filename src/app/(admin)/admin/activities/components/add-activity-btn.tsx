"use client"

import { Button } from "@/components/ui/button"
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { MODAL_REGISTRY } from "@/constants/modal/modal-component-registry"
import { useDialogContext } from "@/hooks/use-dailog"
import ActivityForm from "./create-activity-form"
import { Activity } from "@/types/activity.type"

const AddActivityButton = ({
  onCreated,
}: {
  onCreated?: (activity: Activity) => void
}) => {
  const { openModal } = useDialogContext()

  const handleClick = () => {
    openModal(
      MODAL_REGISTRY.CREATE_ACTIVITY_MODAL_ID,
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Activity</DialogTitle>
        </DialogHeader>
        <ActivityForm onCreated={onCreated} />
      </DialogContent>
    )
  }

  return (
    <Button type="button" className="w-max" onClick={handleClick}>
      Add Activity
    </Button>
  )
}

export default AddActivityButton
