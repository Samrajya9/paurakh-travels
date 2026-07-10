export const PACKAGE_ITINERARIES: {
  dayNumber: number
  title: string
  htmlDescription: string
  distanceKm?: number
  durationHours?: number
  placeName: string
}[] = [
  {
    dayNumber: 1,
    title: "Arrival in Lukla",
    placeName: "Lukla",
    distanceKm: 8,
    durationHours: 3,
    htmlDescription: `<h4 class="scroll-m-20 text-base font-semibold tracking-tight text-foreground">Arrival in Lukla</h4>
<p>Fly from Kathmandu to Lukla's Tenzing-Hillary Airport, then begin trekking to <strong class="font-bold">Phakding</strong> alongside the Dudh Koshi river.</p>`,
  },
  // ...days 2–6, same as before, `destinationName` renamed to `placeName`
]
