import type { Prisma } from "@prisma/client"

export const packageGroupDiscountSelect = {
  id: true,
  packageId: true,
  minPeople: true,
  price: true,
  createdAt: true,
  updatedAt: true,
} satisfies Prisma.PackageGroupDiscountSelect

type PackageGroupDiscountPayload = Prisma.PackageGroupDiscountGetPayload<{
  select: typeof packageGroupDiscountSelect
}>

// `price` is a Prisma.Decimal at the payload level, which is a runtime
// class from @prisma/client/runtime — not safe to pass through to client
// components as-is. Re-shape it to a plain number/string for anything
// that crosses the server/client boundary.
export type PackageGroupDiscount = Omit<
  PackageGroupDiscountPayload,
  "price"
> & {
  price: number
}
