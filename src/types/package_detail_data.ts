export interface ItineraryStat {
  label: string
  value: string
  icon: "duration" | "distance" | "elevation"
}

export interface ItineraryDay {
  day: number
  title: string
  images: string[]
  stats: ItineraryStat[]
  description: string
}

// Fake API response — replace with a real fetch when the backend is ready
export const itineraryData: ItineraryDay[] = [
  {
    day: 1,
    title: "Kathmandu to Lukla, Trek to Phakding",
    images: [
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=600&auto=format&fit=crop",
    ],
    stats: [
      { label: "Duration", value: "3-4 hrs", icon: "duration" },
      { label: "Distance", value: "8 km", icon: "distance" },
      { label: "Max Elevation", value: "2,610 m", icon: "elevation" },
    ],
    description:
      "Your adventure begins with a thrilling 35-minute mountain flight from Kathmandu to Lukla, landing at the famously short Tenzing-Hillary Airport. From here, you'll meet your guide and porters before starting an easy downhill trek along the Dudh Koshi river to the village of Phakding, where you'll spend your first night acclimatizing to the mountain air.",
  },
  {
    day: 2,
    title: "Phakding to Namche Bazaar",
    images: [
      "https://images.unsplash.com/photo-1585148031318-30c2b9b0c0a4?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1571406384350-8122d5650d35?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1521405924368-64c5b84bec60?q=80&w=600&auto=format&fit=crop",
    ],
    stats: [
      { label: "Duration", value: "6-7 hrs", icon: "duration" },
      { label: "Distance", value: "11 km", icon: "distance" },
      { label: "Max Elevation", value: "3,440 m", icon: "elevation" },
    ],
    description:
      "Today's trek takes you through pine forests and across several suspension bridges over the roaring Dudh Koshi, including the iconic Hillary Bridge. You'll pass through Sagarmatha National Park's entrance gate before the steep climb to Namche Bazaar, the bustling Sherpa capital and gateway to the high Himalaya.",
  },
  {
    day: 3,
    title: "Acclimatization Day in Namche Bazaar",
    images: [
      "https://images.unsplash.com/photo-1516939884455-1445c8652f83?q=80&w=600&auto=format&fit=crop",
    ],
    stats: [
      { label: "Duration", value: "3-4 hrs", icon: "duration" },
      { label: "Distance", value: "5 km", icon: "distance" },
      { label: "Max Elevation", value: "3,880 m", icon: "elevation" },
    ],
    description:
      "A rest day in name only — you'll hike up to the Everest View Hotel for your first glimpse of Everest, Lhotse, and Ama Dablam, helping your body adjust to the thinning air. Afternoons are free to explore Namche's markets, bakeries, and the Sherpa Culture Museum before heading to bed early.",
  },
  {
    day: 4,
    title: "Namche Bazaar to Tengboche",
    images: [
      "https://images.unsplash.com/photo-1573599852326-2d4da0bbe613?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1571401835393-8c5f35328320?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1542401886-65d6c61db217?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1533130061792-64b345e4a833?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1605640840605-14ac1855827b?q=80&w=600&auto=format&fit=crop",
    ],
    stats: [
      { label: "Duration", value: "5-6 hrs", icon: "duration" },
      { label: "Distance", value: "10 km", icon: "distance" },
      { label: "Max Elevation", value: "3,860 m", icon: "elevation" },
    ],
    description:
      "Leaving Namche, the trail offers stunning panoramic views of Everest, Nuptse, and Ama Dablam along a relatively flat path before dropping to the river and climbing steeply to Tengboche. Here you'll visit the largest monastery in the Khumbu region, often timed with the monks' evening prayer ceremony.",
  },
  {
    day: 5,
    title: "Tengboche to Dingboche",
    images: [
      "https://images.unsplash.com/photo-1605640840605-14ac1855827b?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1571406384350-8122d5650d35?q=80&w=600&auto=format&fit=crop",
    ],
    stats: [
      { label: "Duration", value: "5-6 hrs", icon: "duration" },
      { label: "Distance", value: "12 km", icon: "distance" },
      { label: "Max Elevation", value: "4,410 m", icon: "elevation" },
    ],
    description:
      "The trail descends through rhododendron forest to Debuche before climbing past Pangboche, the oldest monastery in the Khumbu. As the landscape turns alpine and stark, you'll reach Dingboche, a picturesque village walled with stone fences, surrounded by towering peaks on every side.",
  },
]