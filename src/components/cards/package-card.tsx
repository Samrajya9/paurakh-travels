"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { Clock, Mountain, Users, ArrowRight, Heart } from "lucide-react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Button, buttonVariants } from "@/components/ui/button"
import { useAuth } from "@/context/auth.context"
import { toast } from "sonner"

interface Difficulty {
  id: string
  name: string
}

interface GroupDiscount {
  id: string
  minPeople: number
  price: string
}

interface Destination {
  id: string
  name: string
  elevation: number
}

interface ItineraryDestination {
  id: string
  destination: Destination
}

interface Itinerary {
  id: string
  dayNumber: number
  title: string
  destinations?: ItineraryDestination[]
}

interface PackageImage {
  id: string
  image: {
    id: string
    url: string
    altText: string
  }
}

export interface TravelPackage {
  id: string
  slug: string
  name: string
  description: string
  basePrice: string
  difficulty: Difficulty
  groupDiscounts: GroupDiscount[]
  itineraries: Itinerary[]
  images: PackageImage[]
  minGroupSize?: number
  maxGroupSize?: number
}

interface PackageCardProps {
  pkg: TravelPackage
  className?: string
  isLiked?: boolean
  onLikeToggle?: (pkg: TravelPackage) => void
}

export function PackageCard({
  pkg,
  className,
  isLiked = false,
  onLikeToggle,
}: PackageCardProps) {
  const [liked, setLiked] = React.useState(isLiked)

  const totalDays = pkg.itineraries.length

  const basePrice = Number(pkg.basePrice)
  const lowestDiscountPrice = pkg.groupDiscounts.length
    ? Math.min(...pkg.groupDiscounts.map((d) => Number(d.price)))
    : null

  const hasDiscount =
    lowestDiscountPrice !== null && lowestDiscountPrice < basePrice

  const maxElevation = pkg.itineraries
    .flatMap((it) => it.destinations ?? [])
    .reduce((max, d) => Math.max(max, d.destination.elevation), 0)

  const sortedTiers = [...pkg.groupDiscounts].sort(
    (a, b) => a.minPeople - b.minPeople
  )
  const highestTier = sortedTiers[sortedTiers.length - 1]?.minPeople
  const groupSizeLabel =
    pkg.minGroupSize && pkg.maxGroupSize
      ? `${pkg.minGroupSize}–${pkg.maxGroupSize}`
      : highestTier
        ? `${highestTier}+`
        : "—"

  const handleLikeClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setLiked((prev) => !prev)
    onLikeToggle?.(pkg)
  }

  return (
    <Card className={cn("gap-0 overflow-hidden pt-0", className)}>
      {/* Image carousel */}
      <div className="relative">
        <Carousel className="w-full" opts={{ loop: true }}>
          <CarouselContent className="ml-0">
            {pkg.images.map((img) => (
              <CarouselItem key={img.id} className="pl-0">
                <div className="relative aspect-4/3 w-full">
                  <Image
                    src={img.image.url}
                    alt={img.image.altText}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          {pkg.images.length > 1 && (
            <>
              <CarouselPrevious className="left-2" variant={"secondary"} />
              <CarouselNext className="right-2" variant={"secondary"} />
            </>
          )}
        </Carousel>

        <PackageLike
          packageId={pkg.id}
          liked={true}
          className={cn(
            "absolute top-2 right-2 flex size-8 items-center justify-center rounded-full",
            "bg-background/90 shadow-sm backdrop-blur-sm transition-colors",
            "hover:bg-background"
          )}
        />
      </div>

      <CardHeader className="gap-2 pt-5">
        <div className="flex items-start justify-between gap-3">
          <Link href={`/packages/${pkg.slug}`}>
            <h3 className="text-lg font-semibold tracking-tight hover:underline">
              {pkg.name}
            </h3>
          </Link>

          <div className="flex shrink-0 flex-col items-end">
            {hasDiscount && (
              <span className="text-sm text-muted-foreground line-through">
                ${basePrice.toLocaleString()}
              </span>
            )}
            <div className="flex items-baseline gap-1">
              <span className="text-2xl leading-tight font-bold text-primary">
                $
                {(hasDiscount
                  ? lowestDiscountPrice!
                  : basePrice
                ).toLocaleString()}
              </span>
              <span className="text-xs text-muted-foreground">per person</span>
            </div>
          </div>
        </div>

        <p className="line-clamp-2 text-sm text-muted-foreground">
          {pkg.description}
        </p>
      </CardHeader>

      <CardContent className="pt-4">
        <div className="grid grid-cols-3 divide-x divide-border rounded-lg bg-muted/50 py-3">
          <div className="flex flex-col items-center gap-1 px-2 text-center">
            <Clock className="size-4 text-primary" />
            <span className="text-[10px] tracking-wide text-muted-foreground uppercase">
              Duration
            </span>
            <span className="text-sm font-semibold">{totalDays} Days</span>
          </div>

          <div className="flex flex-col items-center gap-1 px-2 text-center">
            <Mountain className="size-4 text-primary" />
            <span className="text-[10px] tracking-wide text-muted-foreground uppercase">
              Max Alt.
            </span>
            <span className="text-sm font-semibold">
              {maxElevation ? `${maxElevation.toLocaleString()}m` : "—"}
            </span>
          </div>

          <div className="flex flex-col items-center gap-1 px-2 text-center">
            <Users className="size-4 text-primary" />
            <span className="text-[10px] tracking-wide text-muted-foreground uppercase">
              Difficulty
            </span>
            <span className="text-sm font-semibold">{pkg.difficulty.name}</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="pt-5">
        <Button className={cn("w-full px-4 py-5")} asChild>
          <Link href={`/packages/${pkg.slug}`} className="w-full">
            <span>View More</span>
            <ArrowRight />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

interface PackageLikeProps
  extends React.ComponentProps<"button">, VariantProps<typeof buttonVariants> {
  packageId: string
  liked?: boolean
}

const LIKE_DEBOUNCE_MS = 600

function PackageLike({
  packageId,
  liked: initialLiked = false,
  className,
  disabled,
  ...props
}: PackageLikeProps) {
  const { user } = useAuth()
  const [liked, setLiked] = React.useState(() => initialLiked)

  // Last state actually confirmed by the server — the debounced sync
  // always compares against this, not against whatever the previous
  // click happened to leave behind.
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
      // Nothing net-changed since the last confirmed server state, skip the call.
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

  const handleLikeClick = () => {
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

  return (
    <Button
      type="button"
      variant={"outline"}
      aria-pressed={liked}
      aria-label={liked ? "Remove from favorites" : "Add to favorites"}
      onClick={handleLikeClick}
      // disabled={disabled || !user}
      className={cn(className)}
      {...props}
    >
      <Heart
        className={cn(
          "size-4 transition-all",
          liked ? "fill-primary text-primary" : "text-muted-foreground"
        )}
      />
    </Button>
  )
}
