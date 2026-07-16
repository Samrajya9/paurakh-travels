// src/components/multi-image-picker/multi-image-picker.tsx
"use client"

import { useEffect, useState } from "react"
import { Images, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useDialogContext } from "@/hooks/use-dailog"
import { MODAL_REGISTRY } from "@/constants/modal/modal-component-registry"
import MultiImagePickerDialog from "./multi-image-picker-dialog"
import type { Image as ImageRecord } from "@/types/image.type"

interface MultiImagePickerProps {
  value?: string[]
  onChange: (value: string[]) => void
  onBlur?: () => void
  "aria-invalid"?: boolean
}

/**
 * Fully controlled multi-image field, safe to drop straight into
 * React Hook Form via <Controller name="imageIds" render={({ field }) => (
 * <MultiImagePicker {...field} />
 * )} />.
 *
 * The form only ever holds image ids. This component owns no duplicate
 * copy of that selection — `value` is the single source of truth, and
 * every change goes straight back out through `onChange`.
 */
export default function MultiImagePicker({
  value = [],
  onChange,
  onBlur,
  "aria-invalid": ariaInvalid,
}: MultiImagePickerProps) {
  const { openModal, closeModal } = useDialogContext()

  // The only fetch this component makes: the full image list, once, used
  // purely to resolve the ids in `value` into displayable thumbnails
  // (url / altText). We deliberately do NOT fetch per selected id.
  const [allImages, setAllImages] = useState<ImageRecord[]>([])
  const [isLoadingCache, setIsLoadingCache] = useState(true)

  useEffect(() => {
    let cancelled = false

    async function loadImages() {
      try {
        const res = await fetch("/api/images")
        if (!res.ok) throw new Error("Failed to load images")
        const data: ImageRecord[] = await res.json()
        if (!cancelled) setAllImages(data)
      } catch (error) {
        console.error(error)
      } finally {
        if (!cancelled) setIsLoadingCache(false)
      }
    }

    loadImages()
    return () => {
      cancelled = true
    }
  }, [])

  // Derive selected thumbnails from the cached list + current value,
  // preserving selection order. Recomputed on every render from `value` —
  // there's no separate "selected images" state to fall out of sync.
  const selectedImages = value
    .map((id) => allImages.find((image) => image.id === id))
    .filter((image): image is ImageRecord => Boolean(image))

  function handleRemove(id: string) {
    onChange(value.filter((selectedId) => selectedId !== id))
  }

  function handleOpenPicker() {
    openModal(
      MODAL_REGISTRY.MULTI_IMAGE_PICKER_MODAL_ID,
      <MultiImagePickerDialog
        initialSelectedIds={value}
        onSelect={(selectedIds) => {
          onChange(selectedIds)
          closeModal(MODAL_REGISTRY.MULTI_IMAGE_PICKER_MODAL_ID)
        }}
      />
    )
  }

  return (
    <div aria-invalid={ariaInvalid} className="flex flex-col gap-3">
      {selectedImages.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedImages.map((image) => (
            <div
              key={image.id}
              className="group relative h-20 w-20 overflow-hidden rounded-md border"
            >
              <img
                src={image.url}
                alt={image.altText ?? ""}
                className="h-full w-full object-cover"
              />
              <button
                type="button"
                onClick={() => handleRemove(image.id)}
                className="absolute top-1 right-1 flex h-5 w-5 items-center justify-center rounded-full bg-black/60 text-white opacity-0 transition-opacity group-hover:opacity-100 focus-visible:opacity-100"
                aria-label={`Remove ${image.altText || "image"}`}
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* While the cache is still loading, ids in `value` can't be
          resolved to thumbnails yet — a lightweight placeholder avoids a
          false "nothing selected" flash for a field that already has a
          value coming from form defaults. */}
      {isLoadingCache && value.length > 0 && selectedImages.length === 0 && (
        <p className="text-sm text-muted-foreground">
          Loading selected images…
        </p>
      )}

      <Button
        type="button"
        variant="outline"
        size="sm"
        className="w-fit"
        onClick={handleOpenPicker}
        onBlur={onBlur}
      >
        <Images className="mr-2 h-4 w-4" />
        Select Images
      </Button>
    </div>
  )
}
