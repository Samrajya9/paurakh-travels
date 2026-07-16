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
import PackageLike from "../package-like"
import { Package } from "@/types/package.type"

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

interface PackageCardProps {
  pkg: Pick<
    Package,
    | "id"
    | "name"
    | "slug"
    | "description"
    | "basePrice"
    | "images"
    | "metaData"
    | "difficultyId"
    | "difficulty"
  >
  className?: string
  isLiked?: boolean
  onLikeToggle?: (
    pkg: Pick<
      Package,
      | "id"
      | "name"
      | "slug"
      | "description"
      | "basePrice"
      | "images"
      | "metaData"
      | "difficultyId"
      | "difficulty"
    >
  ) => void
}

export function PackageCard({
  pkg,
  className,
  isLiked = false,
  onLikeToggle,
}: PackageCardProps) {
  const [liked, setLiked] = React.useState(isLiked)

  const totalDays = pkg.metaData.totalDuration

  const basePrice = Number(pkg.basePrice)
  const lowestDiscountPrice = pkg.metaData.minPrice

  const hasDiscount =
    lowestDiscountPrice !== null && lowestDiscountPrice < basePrice

  const maxElevation = pkg.metaData.maxElevation

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
                    alt={img.image.altText ?? pkg.name}
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
          liked={false}

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
