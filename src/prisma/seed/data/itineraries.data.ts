export const PACKAGE_ITINERARIES: Record<
  string,
  {
    dayNumber: number
    title: string
    htmlDescription: string
    distanceKm?: number
    durationHours?: number
    placeName: string
  }[]
> = {
  "everest-base-camp-trek": [
    {
      dayNumber: 1,
      title: "Arrival in Lukla",
      placeName: "Lukla",
      distanceKm: 8,
      durationHours: 3,
      htmlDescription: `<h4 class="scroll-m-20 text-base font-semibold tracking-tight text-foreground">Arrival in Lukla</h4>
<p>Fly from Kathmandu to Lukla's Tenzing-Hillary Airport, then begin trekking to <strong class="font-bold">Phakding</strong> alongside the Dudh Koshi river.</p>`,
    },
    {
      dayNumber: 2,
      title: "Trek to Namche Bazaar",
      placeName: "Namche Bazaar",
      distanceKm: 11,
      durationHours: 6,
      htmlDescription: `<h4 class="scroll-m-20 text-base font-semibold tracking-tight text-foreground">Trek to Namche Bazaar</h4>
<p>A steep climb into the Sherpa capital, with the first clear views of Everest from the trail above the village.</p>`,
    },
    {
      dayNumber: 3,
      title: "Acclimatization & Tengboche",
      placeName: "Tengboche",
      distanceKm: 10,
      durationHours: 5,
      htmlDescription: `<h4 class="scroll-m-20 text-base font-semibold tracking-tight text-foreground">Acclimatization & Tengboche</h4>
<p>Visit Tengboche Monastery, the largest gompa in the Khumbu, set against a backdrop of Ama Dablam.</p>`,
    },
    {
      dayNumber: 4,
      title: "Trek to Dingboche",
      placeName: "Dingboche",
      distanceKm: 12,
      durationHours: 6,
      htmlDescription: `<h4 class="scroll-m-20 text-base font-semibold tracking-tight text-foreground">Trek to Dingboche</h4>
<p>A second acclimatization stop in a high-altitude farming village surrounded by stone-walled barley fields.</p>`,
    },
    {
      dayNumber: 5,
      title: "Everest Base Camp",
      placeName: "Everest Base Camp",
      distanceKm: 15,
      durationHours: 7,
      htmlDescription: `<h4 class="scroll-m-20 text-base font-semibold tracking-tight text-foreground">Everest Base Camp</h4>
<p>Reach base camp itself, walking the Khumbu Glacier moraine with views of the icefall.</p>`,
    },
    {
      dayNumber: 6,
      title: "Kala Patthar Sunrise",
      placeName: "Kala Patthar",
      distanceKm: 5,
      durationHours: 4,
      htmlDescription: `<h4 class="scroll-m-20 text-base font-semibold tracking-tight text-foreground">Kala Patthar Sunrise</h4>
<p>A pre-dawn climb to 5,644m for the best unobstructed sunrise view of Everest's summit.</p>`,
    },
  ],

  "annapurna-base-camp-trek": [
    {
      dayNumber: 1,
      title: "Drive to Pokhara",
      placeName: "Pokhara",
      distanceKm: 200,
      durationHours: 7,
      htmlDescription: `<h4 class="scroll-m-20 text-base font-semibold tracking-tight text-foreground">Drive to Pokhara</h4>
<p>Travel overland to Pokhara, gateway to the Annapurna range, with a free afternoon by Phewa Lake.</p>`,
    },
    {
      dayNumber: 2,
      title: "Trek to Ghandruk",
      placeName: "Ghandruk",
      distanceKm: 9,
      durationHours: 5,
      htmlDescription: `<h4 class="scroll-m-20 text-base font-semibold tracking-tight text-foreground">Trek to Ghandruk</h4>
<p>Climb through terraced fields into a traditional Gurung village with sweeping Annapurna South views.</p>`,
    },
    {
      dayNumber: 3,
      title: "Trek to Chhomrong",
      placeName: "Chhomrong",
      distanceKm: 10,
      durationHours: 6,
      htmlDescription: `<h4 class="scroll-m-20 text-base font-semibold tracking-tight text-foreground">Trek to Chhomrong</h4>
<p>The last permanent village on the trail, and a morning yoga stop before the final approach.</p>`,
    },
    {
      dayNumber: 4,
      title: "Annapurna Base Camp",
      placeName: "Annapurna Base Camp",
      distanceKm: 14,
      durationHours: 7,
      htmlDescription: `<h4 class="scroll-m-20 text-base font-semibold tracking-tight text-foreground">Annapurna Base Camp</h4>
<p>Enter the natural amphitheater at 4,130m, ringed by Annapurna I, Machapuchare, and Hiunchuli.</p>`,
    },
  ],

  "langtang-valley-cultural-trek": [
    {
      dayNumber: 1,
      title: "Drive to Syabrubesi",
      placeName: "Syabrubesi",
      distanceKm: 122,
      durationHours: 7,
      htmlDescription: `<h4 class="scroll-m-20 text-base font-semibold tracking-tight text-foreground">Drive to Syabrubesi</h4>
<p>A scenic drive along the Trishuli River to the trailhead village of Syabrubesi.</p>`,
    },
    {
      dayNumber: 2,
      title: "Trek to Lama Hotel",
      placeName: "Lama Hotel",
      distanceKm: 11,
      durationHours: 6,
      htmlDescription: `<h4 class="scroll-m-20 text-base font-semibold tracking-tight text-foreground">Trek to Lama Hotel</h4>
<p>Follow the Langtang Khola through dense forest, keeping an eye out for red pandas.</p>`,
    },
    {
      dayNumber: 3,
      title: "Trek to Langtang Village",
      placeName: "Langtang Village",
      distanceKm: 9,
      durationHours: 5,
      htmlDescription: `<h4 class="scroll-m-20 text-base font-semibold tracking-tight text-foreground">Trek to Langtang Village</h4>
<p>Walk through a village rebuilt after the 2015 earthquake, meeting the Tamang families who call it home.</p>`,
    },
    {
      dayNumber: 4,
      title: "Kyanjin Gompa",
      placeName: "Kyanjin Gompa",
      distanceKm: 8,
      durationHours: 4,
      htmlDescription: `<h4 class="scroll-m-20 text-base font-semibold tracking-tight text-foreground">Kyanjin Gompa</h4>
<p>Visit the valley's historic monastery and its small cheese factory, with Langtang Lirung towering above.</p>`,
    },
  ],

  "kathmandu-valley-heritage-photography-tour": [
    {
      dayNumber: 1,
      title: "Kathmandu Durbar Square",
      placeName: "Kathmandu",
      distanceKm: 5,
      durationHours: 4,
      htmlDescription: `<h4 class="scroll-m-20 text-base font-semibold tracking-tight text-foreground">Kathmandu Durbar Square</h4>
<p>Photograph the palace complex, temples, and living goddess residence at the historic heart of the capital.</p>`,
    },
    {
      dayNumber: 2,
      title: "Patan's Living Heritage",
      placeName: "Patan",
      distanceKm: 6,
      durationHours: 4,
      htmlDescription: `<h4 class="scroll-m-20 text-base font-semibold tracking-tight text-foreground">Patan's Living Heritage</h4>
<p>Explore Patan Durbar Square and its metalworking courtyards, among the finest Newar architecture in the valley.</p>`,
    },
    {
      dayNumber: 3,
      title: "Bhaktapur Pottery Square",
      placeName: "Bhaktapur",
      distanceKm: 13,
      durationHours: 3,
      htmlDescription: `<h4 class="scroll-m-20 text-base font-semibold tracking-tight text-foreground">Bhaktapur Pottery Square</h4>
<p>Wander the best-preserved medieval city in the valley, from Pottery Square to the towering Nyatapola Temple.</p>`,
    },
    {
      dayNumber: 4,
      title: "Nagarkot Sunrise",
      placeName: "Nagarkot",
      distanceKm: 32,
      durationHours: 2,
      htmlDescription: `<h4 class="scroll-m-20 text-base font-semibold tracking-tight text-foreground">Nagarkot Sunrise</h4>
<p>A short drive up to Nagarkot for a golden-hour photography session as the Himalayan range catches first light.</p>`,
    },
  ],
}
