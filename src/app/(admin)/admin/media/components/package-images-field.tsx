"use client"

import { useEffect, useState } from "react"
import { toast } from "sonner"
import { PlusIcon, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { FieldDescription, FieldLegend, FieldSet } from "@/components/ui/field"
import { useDialogContext } from "@/hooks/use-dailog"
import { MODAL_REGISTRY } from "@/constants/modal/modal-component-registry"
import { EntityType } from "@/constants/enums/entity-type"
import type { ImageAttachment } from "@/services/image-attachment.service"
import ImagePickerDialog from "./image-picker-dialog"

interface PackageImagesFieldProps {
  packageId: string
}

export default function PackageImagesField({
  packageId,
}: PackageImagesFieldProps) {
  const { openModal } = useDialogContext()
  const [attachments, setAttachments] = useState<ImageAttachment[]>([])
  const [loading, setLoading] = useState(true)
  const [removingId, setRemovingId] = useState<string | null>(null)

  useEffect(() => {
    fetchAttachments()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [packageId])

  async function fetchAttachments() {
    setLoading(true)

    try {
      const res = await fetch(
        `/api/image-attachments?entityType=${EntityType.PACKAGE}&entityId=${packageId}`
      )
      if (!res.ok) throw new Error("Failed to fetch images")

      setAttachments(await res.json())
    } catch {
      toast.error("Could not load this package's images.")
    } finally {
      setLoading(false)
    }
  }

  async function handleAttach(imageId: string) {
    try {
      const res = await fetch("/api/image-attachments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          imageId,
          entityType: EntityType.PACKAGE,
          entityId: packageId,
        }),
      })

      if (!res.ok) {
        const body = await res.json().catch(() => null)
        toast.error(body?.message ?? "Failed to attach image.")
        return
      }

      const attachment: ImageAttachment = await res.json()
      setAttachments((curr) => [...curr, attachment])
      toast.success("Image added.")
    } catch {
      toast.error("Could not reach the server. Please try again.")
    }
  }

  async function handleDetach(attachmentId: string) {
    setRemovingId(attachmentId)

    try {
      const res = await fetch(`/api/image-attachments/${attachmentId}`, {
        method: "DELETE",
      })

      if (!res.ok) {
        toast.error("Failed to remove image.")
        return
      }

      setAttachments((curr) => curr.filter((a) => a.id !== attachmentId))
    } catch {
      toast.error("Could not reach the server. Please try again.")
    } finally {
      setRemovingId(null)
    }
  }

  function handleOpenPicker() {
    // Each open adds one more image — already-attached images aren't
    // offered back for de-duplication, since the server's unique
    // constraint on (imageId, entityType, entityId) already rejects a
    // repeat attach and the picker would need the whole attached-id set
    // threaded through just to grey them out. Simple over clever, for now.
    openModal(
      MODAL_REGISTRY.IMAGE_PICKER_MODAL_ID,
      <ImagePickerDialog onSelect={(image) => handleAttach(image.id)} />
    )
  }

  return (
    <FieldSet>
      <FieldLegend className="flex w-full items-center justify-between">
        <span>Images</span>
        <Button
          type="button"
          size="sm"
          onClick={handleOpenPicker}
          className="flex items-center gap-1.5"
        >
          <PlusIcon className="h-4 w-4" />
          Add Image
        </Button>
      </FieldLegend>
      <FieldDescription>
        Photos shown in this package&apos;s gallery on the website.
      </FieldDescription>

      {loading ? (
        <div className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="aspect-square w-full rounded-md" />
          ))}
        </div>
      ) : attachments.length === 0 ? (
        <p className="mt-4 text-sm text-muted-foreground">
          No images attached yet.
        </p>
      ) : (
        <div className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6">
          {attachments.map((attachment) => (
            <div
              key={attachment.id}
              className="group relative aspect-square overflow-hidden rounded-md border border-border"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={attachment.image.url}
                alt={attachment.image.altText ?? "Package image"}
                className="absolute inset-0 size-full object-cover"
              />
              <Button
                type="button"
                variant="destructive"
                size="icon-xs"
                className="absolute top-1.5 right-1.5 rounded-full opacity-0 shadow-sm transition-opacity group-hover:opacity-100 focus-visible:opacity-100"
                disabled={removingId === attachment.id}
                aria-label="Remove image"
                onClick={() => handleDetach(attachment.id)}
              >
                <X className="size-2.5" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </FieldSet>
  )
}
