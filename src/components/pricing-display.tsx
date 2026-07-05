import { cn } from "@/lib/utils"
import { getPriceForGroupSize, type GroupDiscountTier } from "@/lib/pricing"

export function PricingDisplay({
  basePrice,
  groupDiscounts,
  peopleCount,
  currency = "Rs.",
  className,
}: {
  basePrice: number
  groupDiscounts: GroupDiscountTier[]
  peopleCount: number
  currency?: string
  className?: string
}) {
  const { price, discounted } = getPriceForGroupSize(
    basePrice,
    groupDiscounts,
    peopleCount
  )

  return (
    <span className={cn("inline-flex items-baseline gap-1.5", className)}>
      {discounted && (
        <span className="text-sm text-muted-foreground line-through">
          {currency}
          {basePrice}
        </span>
      )}
      <span className="font-semibold">
        {currency}
        {price}
      </span>
    </span>
  )
}
