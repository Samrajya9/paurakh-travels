export const PACKAGE_GROUP_DISCOUNTS: Record<
  string,
  { minPeople: number; price: number }[]
> = {
  "everest-base-camp-trek": [
    { minPeople: 4, price: 1050 },
    { minPeople: 9, price: 950 },
  ],
  "annapurna-base-camp-trek": [
    { minPeople: 4, price: 850 },
    { minPeople: 8, price: 780 },
  ],
  "langtang-valley-cultural-trek": [{ minPeople: 4, price: 700 }],
  "kathmandu-valley-heritage-photography-tour": [{ minPeople: 6, price: 470 }],
}
