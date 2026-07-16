// // src/components/multi-image-picker/multi-image-picker-dialog.tsx
// "use client"

// import { useEffect, useState } from "react"
// import { Check } from "lucide-react"

// import { Button } from "@/components/ui/button"
// import { Checkbox } from "@/components/ui/checkbox"
// import {
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog"
// import { useDialogContext } from "@/hooks/use-dailog"
// import { MODAL_REGISTRY } from "@/constants/modal/modal-component-registry"
// import type { Image as ImageRecord } from "@/types/image.type"

// interface MultiImagePickerDialogProps {
//   initialSelectedIds: string[]
//   onSelect: (selectedIds: string[]) => void
// }

// /**
//  * Owns the entire selection experience: fetching the image list,
//  * rendering the grid, and tracking an in-progress selection that only
//  * gets handed back to the caller when Done is pressed. Knows nothing
//  * about React Hook Form — `onSelect` is the only way data leaves.
//  */
// export default function MultiImagePickerDialog({
//   initialSelectedIds,
//   onSelect,
// }: MultiImagePickerDialogProps) {
//   const { closeModal } = useDialogContext()

//   const [images, setImages] = useState<ImageRecord[]>([])
//   const [isLoading, setIsLoading] = useState(true)
//   const [error, setError] = useState<string | null>(null)

//   // Working selection, local to the dialog. A Set keeps toggles O(1) and
//   // makes duplicates impossible; nothing here touches the form until
//   // Done is pressed.
//   const [selectedIds, setSelectedIds] = useState<Set<string>>(
//     () => new Set(initialSelectedIds)
//   )

//   useEffect(() => {
//     let cancelled = false

//     async function loadImages() {
//       setIsLoading(true)
//       setError(null)
//       try {
//         const res = await fetch("/api/images")
//         if (!res.ok) throw new Error("Failed to load images")
//         const data: ImageRecord[] = await res.json()
//         if (!cancelled) setImages(data)
//       } catch (err) {
//         console.error(err)
//         if (!cancelled) setError("Couldn't load images. Please try again.")
//       } finally {
//         if (!cancelled) setIsLoading(false)
//       }
//     }

//     loadImages()
//     return () => {
//       cancelled = true
//     }
//   }, [])

//   function handleToggle(id: string) {
//     setSelectedIds((curr) => {
//       const next = new Set(curr)
//       if (next.has(id)) {
//         next.delete(id)
//       } else {
//         next.add(id)
//       }
//       return next
//     })
//   }

//   function handleCancel() {
//     closeModal(MODAL_REGISTRY.MULTI_IMAGE_PICKER_MODAL_ID)
//   }

//   function handleDone() {
//     onSelect([...selectedIds])
//   }

//   return (
//     <DialogContent className="max-w-2xl">
//       <DialogHeader>
//         <DialogTitle>Select images</DialogTitle>
//       </DialogHeader>

//       <div className="max-h-[60vh] overflow-y-auto py-1">
//         {isLoading && (
//           <p className="py-8 text-center text-sm text-muted-foreground">
//             Loading images…
//           </p>
//         )}

//         {!isLoading && error && (
//           <p className="py-8 text-center text-sm text-destructive">{error}</p>
//         )}

//         {!isLoading && !error && images.length === 0 && (
//           <p className="py-8 text-center text-sm text-muted-foreground">
//             No images found.
//           </p>
//         )}

//         {!isLoading && !error && images.length > 0 && (
//           <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
//             {images.map((image) => {
//               const isSelected = selectedIds.has(image.id)
//               return (
//                 <button
//                   key={image.id}
//                   type="button"
//                   onClick={() => handleToggle(image.id)}
//                   aria-pressed={isSelected}
//                   className={`group relative aspect-square overflow-hidden rounded-md border-2 transition-colors ${
//                     isSelected
//                       ? "border-primary"
//                       : "border-transparent hover:border-muted-foreground/30"
//                   }`}
//                 >
//                   <img
//                     src={image.url}
//                     alt={image.altText ?? ""}
//                     className="h-full w-full object-cover"
//                   />

//                   {isSelected && (
//                     <div className="absolute inset-0 bg-primary/10" />
//                   )}

//                   {/* Wrapped so its click doesn't double-fire the parent
//                       button's onClick — the whole thumbnail stays
//                       clickable, this is just a visual affordance. */}
//                   <div
//                     className="absolute top-1.5 right-1.5"
//                     onClick={(e) => e.stopPropagation()}
//                   >
//                     <Checkbox
//                       checked={isSelected}
//                       onCheckedChange={() => handleToggle(image.id)}
//                       className="bg-background"
//                       aria-label={`Select ${image.altText || "image"}`}
//                     />
//                   </div>
//                 </button>
//               )
//             })}
//           </div>
//         )}
//       </div>

//       <div className="flex items-center justify-between gap-2">
//         <span className="text-sm text-muted-foreground">
//           {selectedIds.size === 0
//             ? "No images selected"
//             : `${selectedIds.size} ${
//                 selectedIds.size === 1 ? "image" : "images"
//               } selected`}
//         </span>
//         <div className="flex gap-2">
//           <Button type="button" variant="outline" onClick={handleCancel}>
//             Cancel
//           </Button>
//           <Button type="button" onClick={handleDone}>
//             <Check className="mr-2 h-4 w-4" />
//             Done
//           </Button>
//         </div>
//       </div>
//     </DialogContent>
//   )
// }
// src/components/multi-image-picker/multi-image-picker-dialog.tsx
"use client"

import { useEffect, useState } from "react"
import { Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useDialogContext } from "@/hooks/use-dailog"
import { MODAL_REGISTRY } from "@/constants/modal/modal-component-registry"
import type { Image as ImageRecord } from "@/types/image.type"

interface MultiImagePickerDialogProps {
  initialSelectedIds: string[]
  onSelect: (selectedIds: string[]) => void
}

/**
 * Owns the entire selection experience: fetching the image list,
 * rendering the grid, and tracking an in-progress selection that only
 * gets handed back to the caller when Done is pressed. Knows nothing
 * about React Hook Form — `onSelect` is the only way data leaves.
 */
export default function MultiImagePickerDialog({
  initialSelectedIds,
  onSelect,
}: MultiImagePickerDialogProps) {
  const { closeModal } = useDialogContext()

  const [images, setImages] = useState<ImageRecord[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Working selection, local to the dialog. A Set keeps toggles O(1) and
  // makes duplicates impossible; nothing here touches the form until
  // Done is pressed.
  const [selectedIds, setSelectedIds] = useState<Set<string>>(
    () => new Set(initialSelectedIds)
  )

  useEffect(() => {
    let cancelled = false

    async function loadImages() {
      setIsLoading(true)
      setError(null)
      try {
        const res = await fetch("/api/images")
        if (!res.ok) throw new Error("Failed to load images")
        const data: ImageRecord[] = await res.json()
        if (!cancelled) setImages(data)
      } catch (err) {
        console.error(err)
        if (!cancelled) setError("Couldn't load images. Please try again.")
      } finally {
        if (!cancelled) setIsLoading(false)
      }
    }

    loadImages()
    return () => {
      cancelled = true
    }
  }, [])

  function handleToggle(id: string) {
    setSelectedIds((curr) => {
      const next = new Set(curr)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  function handleCancel() {
    closeModal(MODAL_REGISTRY.MULTI_IMAGE_PICKER_MODAL_ID)
  }

  function handleDone() {
    onSelect([...selectedIds])
  }

  return (
    <DialogContent className="max-w-2xl">
      <DialogHeader>
        <DialogTitle>Select images</DialogTitle>
      </DialogHeader>

      <div className="max-h-[60vh] overflow-y-auto py-1">
        {isLoading && (
          <p className="py-8 text-center text-sm text-muted-foreground">
            Loading images…
          </p>
        )}

        {!isLoading && error && (
          <p className="py-8 text-center text-sm text-destructive">{error}</p>
        )}

        {!isLoading && !error && images.length === 0 && (
          <p className="py-8 text-center text-sm text-muted-foreground">
            No images found.
          </p>
        )}

        {!isLoading && !error && images.length > 0 && (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
            {images.map((image) => {
              const isSelected = selectedIds.has(image.id)
              return (
                // Not a <button>: it wraps the Checkbox, which Radix
                // renders as its own <button role="checkbox">, and
                // <button> cannot contain <button> (invalid HTML +
                // hydration error). role="button" + tabIndex + onKeyDown
                // restore the same keyboard behavior a real button gets
                // for free.
                <div
                  key={image.id}
                  role="button"
                  tabIndex={0}
                  onClick={() => handleToggle(image.id)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault()
                      handleToggle(image.id)
                    }
                  }}
                  aria-pressed={isSelected}
                  className={`group relative aspect-square cursor-pointer overflow-hidden rounded-md border-2 transition-colors ${
                    isSelected
                      ? "border-primary"
                      : "border-transparent hover:border-muted-foreground/30"
                  }`}
                >
                  <img
                    src={image.url}
                    alt={image.altText ?? ""}
                    className="h-full w-full object-cover"
                  />

                  {isSelected && (
                    <div className="absolute inset-0 bg-primary/10" />
                  )}

                  {/* Wrapped so its click doesn't double-fire the parent
                      div's onClick — the whole thumbnail stays clickable,
                      this is just a visual affordance. */}
                  <div
                    className="absolute top-1.5 right-1.5"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Checkbox
                      checked={isSelected}
                      onCheckedChange={() => handleToggle(image.id)}
                      className="bg-background"
                      aria-label={`Select ${image.altText || "image"}`}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      <div className="flex items-center justify-between gap-2">
        <span className="text-sm text-muted-foreground">
          {selectedIds.size === 0
            ? "No images selected"
            : `${selectedIds.size} ${
                selectedIds.size === 1 ? "image" : "images"
              } selected`}
        </span>
        <div className="flex gap-2">
          <Button type="button" variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button type="button" onClick={handleDone}>
            <Check className="mr-2 h-4 w-4" />
            Done
          </Button>
        </div>
      </div>
    </DialogContent>
  )
}
