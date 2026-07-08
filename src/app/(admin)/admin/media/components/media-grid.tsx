"use client"

import { useEffect, useState, type KeyboardEvent } from "react"
import { Check, X, Loader2 } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"
import type { Image as ImageRecord } from "@/services/image.service"

interface MediaGridProps {
  search?: string
  selectable?: boolean
  selectedId?: string | null
  onSelect?: (image: ImageRecord) => void
}

export default function MediaGrid({
  search,
  selectable = false,
  selectedId = null,
  onSelect,
}: MediaGridProps) {
  const [images, setImages] = useState<ImageRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  useEffect(() => {
    fetchImages()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search])

  async function fetchImages() {
    setLoading(true)
    setError(null)

    try {
      const url = search
        ? `/api/images?search=${encodeURIComponent(search)}`
        : "/api/images"
      const res = await fetch(url)
      if (!res.ok) throw new Error("Failed to fetch images")

      const data: ImageRecord[] = await res.json()
      setImages(data)
    } catch {
      setError("Something went wrong while loading the media library.")
    } finally {
      setLoading(false)
    }
  }

  async function handleDelete(id: string) {
    setDeletingId(id)

    try {
      const res = await fetch(`/api/images/${id}`, { method: "DELETE" })

      if (!res.ok) {
        const body = await res.json().catch(() => null)
        toast.error(body?.message ?? "Failed to delete image.")
        return
      }

      setImages((curr) => curr.filter((image) => image.id !== id))
      toast.success("Image deleted.")
    } catch {
      toast.error("Could not reach the server. Please try again.")
    } finally {
      setDeletingId(null)
    }
  }

  if (loading) return <MediaGridSkeleton />

  if (error) {
    return (
      <div className="flex flex-col items-center gap-2 py-10 text-sm text-muted-foreground">
        <p>{error}</p>
        <Button variant="outline" size="sm" onClick={fetchImages}>
          Retry
        </Button>
      </div>
    )
  }

  if (images.length === 0) {
    return (
      <div className="py-10 text-center text-sm text-muted-foreground">
        {search ? "No images match your search." : "No images found."}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
      {images.map((image) => (
        <MediaGridItem
          key={image.id}
          image={image}
          deleting={deletingId === image.id}
          onDelete={() => handleDelete(image.id)}
          selectable={selectable}
          selected={selectedId === image.id}
          onSelect={onSelect ? () => onSelect(image) : undefined}
        />
      ))}
    </div>
  )
}

interface MediaGridItemProps {
  image: ImageRecord
  deleting: boolean
  onDelete: () => void
  selectable: boolean
  selected: boolean
  onSelect?: () => void
}

function MediaGridItem({
  image,
  deleting,
  onDelete,
  selectable,
  selected,
  onSelect,
}: MediaGridItemProps) {
  const thumbnail = (
    <img
      src={image.url}
      alt={image.altText ?? "Untitled image"}
      sizes="(min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
      className="absolute inset-0 size-full object-cover"
    />
  )

  return (
    <div
      className={cn(
        "group relative aspect-square overflow-hidden rounded-md border border-border",
        selectable && "cursor-pointer transition-colors hover:border-primary",
        selected && "border-primary ring-2 ring-primary ring-offset-1"
      )}
      {...(selectable
        ? {
            role: "button",
            tabIndex: 0,
            "aria-pressed": selected,
            onClick: onSelect,
            onKeyDown: (e: KeyboardEvent) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault()
                onSelect?.()
              }
            },
          }
        : {})}
    >
      {thumbnail}

      {selected && (
        <div className="absolute top-2 right-2 flex size-5 items-center justify-center rounded-full bg-primary text-primary-foreground">
          <Check className="size-3" />
        </div>
      )}

      {/* Deleting is a destructive, standalone-library-only action — hidden
          while picking an image for another form, so a pick flow can never
          accidentally remove an image everyone else is using. */}
      {!selectable && (
        <Button
          type="button"
          variant="destructive"
          size="icon-xs"
          className="absolute top-2 right-2 rounded-full opacity-0 shadow-sm transition-opacity group-hover:opacity-100 focus-visible:opacity-100"
          disabled={deleting}
          aria-label={`Delete ${image.altText ?? "image"}`}
          onClick={(e) => {
            e.stopPropagation()
            onDelete()
          }}
        >
          {deleting ? (
            <Loader2 className="size-2.5 animate-spin" />
          ) : (
            <X className="size-2.5" />
          )}
        </Button>
      )}

      {image.altText && (
        <p className="absolute inset-x-0 bottom-0 truncate bg-black/50 px-2 py-1 text-[0.65rem] text-white">
          {image.altText}
        </p>
      )}
    </div>
  )
}

function MediaGridSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
      {Array.from({ length: 9 }).map((_, i) => (
        <Skeleton key={i} className="aspect-square w-full rounded-md" />
      ))}
    </div>
  )
}
