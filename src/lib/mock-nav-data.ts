// lib/mock-nav-data.ts

interface TravelPackage {
  slug: string
  name: string
  duration: string
}

const pkg = (slug: string, name: string, duration: string): TravelPackage => ({
  slug,
  name,
  duration,
})

export const mockNavBarData = {
  expeditions: {
    Trekking: [
      pkg("everest-base-camp-trek", "Everest Base Camp Trek", "14 Days"),
      pkg("annapurna-circuit-trek", "Annapurna Circuit Trek", "18 Days"),
      pkg("langtang-valley-trek", "Langtang Valley Trek", "10 Days"),
      pkg("manaslu-circuit-trek", "Manaslu Circuit Trek", "16 Days"),
    ],

    Tours: [
      pkg("kathmandu-heritage-tour", "Kathmandu Heritage Tour", "3 Days"),
      pkg("pokhara-lakeside-tour", "Pokhara Lakeside Tour", "2 Days"),
      pkg("chitwan-cultural-tour", "Chitwan Cultural Tour", "3 Days"),
    ],

    "Jungle Safari": [
      pkg(
        "chitwan-national-park-safari",
        "Chitwan National Park Safari",
        "3 Days"
      ),
      pkg(
        "bardia-national-park-safari",
        "Bardia National Park Safari",
        "4 Days"
      ),
    ],

    "Helicopter Tours": [
      pkg("everest-heli-tour", "Everest Helicopter Tour", "5 Hours"),
      pkg("annapurna-heli-tour", "Annapurna Helicopter Tour", "4 Hours"),
      pkg("muktinath-heli-tour", "Muktinath Helicopter Tour", "1 Day"),
    ],

    "Peak Climbing": [
      pkg("island-peak-climbing", "Island Peak Climbing", "19 Days"),
      pkg("mera-peak-climbing", "Mera Peak Climbing", "17 Days"),
    ],
  },
  regions: {
    "Everest Region": [
      pkg("everest-base-camp-trek", "Everest Base Camp Trek", "14 Days"),
      pkg("gokyo-lakes-trek", "Gokyo Lakes Trek", "12 Days"),
      pkg("three-passes-trek", "Everest Three Passes Trek", "20 Days"),
    ],

    "Annapurna Region": [
      pkg("annapurna-circuit-trek", "Annapurna Circuit Trek", "18 Days"),
      pkg("annapurna-base-camp-trek", "Annapurna Base Camp Trek", "9 Days"),
      pkg("ghorepani-poon-hill-trek", "Ghorepani Poon Hill Trek", "5 Days"),
    ],

    "Langtang Region": [
      pkg("langtang-valley-trek", "Langtang Valley Trek", "10 Days"),
      pkg("gosaikunda-lake-trek", "Gosaikunda Lake Trek", "8 Days"),
    ],

    "Manaslu Region": [
      pkg("manaslu-circuit-trek", "Manaslu Circuit Trek", "16 Days"),
      pkg("tsum-valley-trek", "Tsum Valley Trek", "18 Days"),
    ],

    "Mustang Region": [
      pkg("upper-mustang-trek", "Upper Mustang Trek", "14 Days"),
      pkg("lower-mustang-trek", "Lower Mustang Trek", "9 Days"),
    ],

    "Dolpo Region": [
      pkg("upper-dolpo-trek", "Upper Dolpo Trek", "24 Days"),
      pkg("lower-dolpo-trek", "Lower Dolpo Trek", "16 Days"),
    ],
  },
  seasons: {
    Spring: [
      pkg("annapurna-base-camp-trek", "Annapurna Base Camp Trek", "9 Days"),
      pkg("island-peak-climbing", "Island Peak Climbing", "19 Days"),
    ],

    Summer: [
      pkg("upper-dolpo-trek", "Upper Dolpo Trek", "24 Days"),
      pkg("upper-mustang-trek", "Upper Mustang Trek", "14 Days"),
    ],

    Autumn: [
      pkg("everest-base-camp-trek", "Everest Base Camp Trek", "14 Days"),
      pkg("annapurna-circuit-trek", "Annapurna Circuit Trek", "18 Days"),
    ],

    Winter: [
      pkg(
        "chitwan-national-park-safari",
        "Chitwan National Park Safari",
        "3 Days"
      ),
      pkg("kathmandu-heritage-tour", "Kathmandu Heritage Tour", "3 Days"),
    ],
  },
} satisfies {
  expeditions: Record<string, TravelPackage[]>
  regions: Record<string, TravelPackage[]>
  seasons: Record<string, TravelPackage[]>
}
