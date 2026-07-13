"use client"

import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useDialogContext } from "@/hooks/use-dailog"
import { useDebouncedValue } from "@/hooks/use-debounced-value"
import { MODAL_REGISTRY } from "@/constants/modal/modal-component-registry"
import MediaGrid from "@/app/(admin)/admin/media/components/media-grid"
import UploadImageForm from "@/app/(admin)/admin/media/components/upload-image-form"
import type { Image as ImageRecord } from "@/types/image.type"

interface ImagePickerDialogProps {
  // Pre-highlight whatever's already selected when the caller reopens the
  // picker to change an existing value.
  initialSelectedId?: string | null
  onSelect: (image: ImageRecord) => void
}

export default function ImagePickerDialog({
  initialSelectedId = null,
  onSelect,
}: ImagePickerDialogProps) {
  const { closeModal } = useDialogContext()
  const [mode, setMode] = useState<"browse" | "upload">("browse")
  const [search, setSearch] = useState("")
  const debouncedSearch = useDebouncedValue(search)
  const [selected, setSelected] = useState<ImageRecord | null>(null)

  function handleClose() {
    closeModal(MODAL_REGISTRY.IMAGE_PICKER_MODAL_ID)
  }

  function handleConfirm() {
    if (!selected) return
    onSelect(selected)
    handleClose()
  }

  return (
    <DialogContent className="max-w-2xl">
      <DialogHeader>
        <DialogTitle>
          {mode === "browse" ? "Select an image" : "Upload a new image"}
        </DialogTitle>
      </DialogHeader>

      <div className="flex items-center justify-between gap-2">
        {mode === "browse" ? (
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search images..."
            className="max-w-xs"
          />
        ) : (
          <span />
        )}

        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => setMode(mode === "browse" ? "upload" : "browse")}
        >
          {mode === "browse" ? "Upload new" : "Back to library"}
        </Button>
      </div>

      <div className="max-h-[60vh] overflow-y-auto py-1">
        {mode === "browse" ? (
          <MediaGrid
            search={debouncedSearch}
            selectable
            selectedId={selected?.id ?? initialSelectedId}
            onSelect={setSelected}
          />
        ) : (
          <UploadImageForm
            onSubmit={(image) => {
              // A fresh upload is the obvious intended selection — pick it
              // and drop straight back into the grid instead of making the
              // admin find it in the library themselves.
              setSelected(image)
              setMode("browse")
            }}
          />
        )}
      </div>

      {mode === "browse" && (
        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button type="button" disabled={!selected} onClick={handleConfirm}>
            Use this image
          </Button>
        </div>
      )}
    </DialogContent>
  )
}
