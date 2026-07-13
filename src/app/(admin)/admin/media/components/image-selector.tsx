"use client"

import { useEffect, useState } from "react"
import { ImagePlus, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useDialogContext } from "@/hooks/use-dailog"
import { MODAL_REGISTRY } from "@/constants/modal/modal-component-registry"
import ImagePickerDialog from "./image-picker-dialog"
import type { Image as ImageRecord } from "@/types/image.type"

interface ImageSelectorProps {
  value?: string | null
  onChange: (imageId: string | null) => void
  onBlur?: () => void
  "aria-invalid"?: boolean
}

export default function ImageSelector({
  value,
  onChange,
  onBlur,
  "aria-invalid": ariaInvalid,
}: ImageSelectorProps) {
  const { openModal } = useDialogContext()
  const [selectedImage, setSelectedImage] = useState<ImageRecord | null>(null)
  const [loading, setLoading] = useState(false)

  // `value` is just an id — the only thing a Controller-compatible field
  // needs. If it arrives from outside (e.g. an edit form's initialValues)
  // and doesn't match whatever the picker already gave us, hydrate the
  // thumbnail once from the API. After that, the picker keeps this in
  // sync directly and no further requests are needed.
  useEffect(() => {
    if (!value || selectedImage?.id === value) return

    let cancelled = false
    setLoading(true)

    fetch(`/api/images/${value}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((image: ImageRecord | null) => {
        if (!cancelled) setSelectedImage(image)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  function handleOpenPicker() {
    openModal(
      MODAL_REGISTRY.IMAGE_PICKER_MODAL_ID,
      <ImagePickerDialog
        initialSelectedId={value}
        onSelect={(image) => {
          setSelectedImage(image)
          onChange(image.id)
        }}
      />
    )
  }

  function handleClear() {
    setSelectedImage(null)
    onChange(null)
  }

  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        onClick={handleOpenPicker}
        onBlur={onBlur}
        aria-invalid={ariaInvalid}
        className={cn(
          "flex size-20 shrink-0 items-center justify-center overflow-hidden rounded-md border border-dashed border-border bg-muted/20 text-muted-foreground transition-colors hover:bg-input/50",
          ariaInvalid && "border-destructive"
        )}
      >
        {loading ? (
          <span className="text-xs">...</span>
        ) : selectedImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={selectedImage.url}
            alt={selectedImage.altText ?? "Selected image"}
            className="size-full object-cover"
          />
        ) : (
          <ImagePlus className="size-5" />
        )}
      </button>

      <div className="flex flex-col items-start gap-1.5">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleOpenPicker}
        >
          {selectedImage ? "Change" : "Select image"}
        </Button>
        {selectedImage && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleClear}
            className="text-muted-foreground"
          >
            <X className="size-3.5" />
            Remove
          </Button>
        )}
      </div>
    </div>
  )
}
