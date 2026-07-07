import { Heart } from "lucide-react"
import { Button, buttonVariants } from "./ui/button"
import { cn } from "@/lib/utils"
import { toast } from "sonner"
import React from "react"
import { useAuth } from "@/context/auth.context"
import { VariantProps } from "class-variance-authority"

// 1. Change children to accept a function that provides the `liked` state
interface PackageLikeProps
  extends
    Omit<React.ComponentProps<"button">, "children">,
    VariantProps<typeof buttonVariants> {
  packageId: string
  liked?: boolean
  children?: React.ReactNode | ((liked: boolean) => React.ReactNode)
}

const LIKE_DEBOUNCE_MS = 600

export default function PackageLike({
  packageId,
  liked: initialLiked = false,
  className,
  disabled,
  variant = "outline", // 2. Set default variant here
  size, // Extract other button variants like size if needed
  children,
  ...props
}: PackageLikeProps) {
  const { user } = useAuth()
  const [liked, setLiked] = React.useState(() => initialLiked)

  const confirmedLikedRef = React.useRef(initialLiked)
  const debounceTimeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(
    null
  )

  React.useEffect(() => {
    return () => {
      if (debounceTimeoutRef.current) clearTimeout(debounceTimeoutRef.current)
    }
  }, [])

  const likePackage = async () => {
    const response = await fetch(`/api/packages/${packageId}/like`, {
      method: "POST",
    })
    if (!response.ok) throw new Error("Failed to like package")
  }

  const unlikePackage = async () => {
    const response = await fetch(`/api/packages/${packageId}/like`, {
      method: "DELETE",
    })
    if (!response.ok) throw new Error("Failed to unlike package")
  }

  const syncLikeState = React.useCallback(
    async (desiredLiked: boolean) => {
      if (desiredLiked === confirmedLikedRef.current) return

      try {
        if (desiredLiked) {
          await likePackage()
        } else {
          await unlikePackage()
        }
        confirmedLikedRef.current = desiredLiked
      } catch {
        setLiked(confirmedLikedRef.current)
        toast.error(
          desiredLiked
            ? "Couldn't like this package. Please try again."
            : "Couldn't remove this package from favorites. Please try again."
        )
      }
    },
    [packageId]
  ) // eslint-disable-line react-hooks/exhaustive-deps

  const handleLikeClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Prevent accidental form submissions or parent triggers if nested
    e.preventDefault()

    if (!user) {
      toast.error("Please log in to like packages.")
      return
    }

    setLiked((previous) => {
      const next = !previous

      if (debounceTimeoutRef.current) clearTimeout(debounceTimeoutRef.current)
      debounceTimeoutRef.current = setTimeout(() => {
        syncLikeState(next)
      }, LIKE_DEBOUNCE_MS)

      return next
    })
  }

  // 3. Render logic helper
  const renderContent = () => {
    if (typeof children === "function") {
      return children(liked)
    }
    if (children) {
      return children
    }
    return (
      <Heart
        className={cn(
          "size-4 transition-all",
          liked ? "fill-primary text-primary" : "text-muted-foreground"
        )}
      />
    )
  }

  return (
    <Button
      type="button"
      variant={variant}
      size={size}
      aria-pressed={liked}
      aria-label={liked ? "Remove from favorites" : "Add to favorites"}
      onClick={handleLikeClick}
      disabled={disabled}
      className={cn(className)}
      {...props}
    >
      {renderContent()}
    </Button>
  )
}
