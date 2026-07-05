export type GroupDiscountTier = { minPeople: number; price: number }

export function getPriceForGroupSize(
  basePrice: number,
  groupDiscounts: GroupDiscountTier[],
  peopleCount: number
): { basePrice: number; price: number; discounted: boolean } {
  const applicableTier = [...groupDiscounts]
    .filter((tier) => peopleCount >= tier.minPeople)
    .sort((a, b) => b.minPeople - a.minPeople)[0]

  if (!applicableTier) {
    return { basePrice, price: basePrice, discounted: false }
  }

  return { basePrice, price: applicableTier.price, discounted: true }
}
