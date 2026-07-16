export const PACKAGES = [
  {
    slug: "everest-base-camp-trek",
    name: "Everest Base Camp",
    description:
      "Trek through Sherpa villages and dramatic Himalayan scenery to the foot of Mount Everest. A strenuous adventure featuring Namche Bazaar, Tengboche Monastery, and sweeping views from Kala Patthar at 5,644m.",
    basePrice: 1200,
    difficultyName: "Strenuous",
    categoryName: "Trekking",
    regionNames: ["Everest Region"],
    activityNames: ["Hiking", "Trekking", "Village Walk"],
    seasonNames: ["Spring", "Autumn"],
    themeNames: ["Adventure", "Nature"],
    htmlOverview: `<h2 class="scroll-m-20 text-xl font-semibold tracking-tight text-foreground">Trip Overview</h2>
<p>The <strong class="font-bold">Everest Base Camp Trek</strong> is one of the most iconic trekking routes in the world, taking you through Sherpa villages, ancient monasteries, and dramatic mountain scenery to the foot of the world's tallest peak.</p>
<h3 class="scroll-m-20 text-lg font-semibold tracking-tight text-foreground">Why Trek to Everest Base Camp?</h3>
<ul class="list-disc pl-6">
<li class="my-0.5">Walk beneath four of the world's six tallest peaks</li>
<li class="my-0.5">Experience authentic Sherpa culture in Namche Bazaar and Tengboche</li>
<li class="my-0.5">Stand at the base of <span class="underline">Mount Everest</span> (8,849m)</li>
</ul>
<blockquote class="border-l-2 pl-2 [&>p]:before:content-['“'] [&>p]:after:content-['”']"><p>This trek changed the way I see mountains — and myself.</p></blockquote>`,
  },
  {
    slug: "annapurna-base-camp-trek",
    name: "Annapurna Base Camp Trek",
    description:
      "A moderate trek through terraced villages and rhododendron forests into the natural amphitheater of Annapurna Base Camp, with Yoga and wellness stops built in along the way.",
    basePrice: 950,
    difficultyName: "Moderate",
    categoryName: "Trekking",
    regionNames: ["Annapurna Region"],
    activityNames: ["Hiking", "Village Walk", "Yoga"],
    seasonNames: ["Spring", "Autumn"],
    themeNames: ["Adventure", "Wellness"],
    htmlOverview: `<h2 class="scroll-m-20 text-xl font-semibold tracking-tight text-foreground">Trip Overview</h2>
<p>The <strong class="font-bold">Annapurna Base Camp Trek</strong> winds through Gurung villages, dense forests, and terraced farmland before opening into the dramatic natural amphitheater at the base of Annapurna I.</p>
<h3 class="scroll-m-20 text-lg font-semibold tracking-tight text-foreground">Highlights</h3>
<ul class="list-disc pl-6">
<li class="my-0.5">Panoramic 360° mountain views from base camp at 4,130m</li>
<li class="my-0.5">Traditional Gurung and Magar villages along the trail</li>
<li class="my-0.5">Morning yoga sessions at Chhomrong overlooking the valley</li>
</ul>`,
  },
  {
    slug: "langtang-valley-cultural-trek",
    name: "Langtang Valley Cultural Trek",
    description:
      "An easy, culturally rich trek into Tamang heartland just north of Kathmandu, visiting Kyanjin Gompa monastery and traditional villages rebuilt after the 2015 earthquake.",
    basePrice: 780,
    difficultyName: "Easy",
    categoryName: "Cultural Tours",
    regionNames: ["Langtang Region"],
    activityNames: ["Village Walk", "Sightseeing", "Trekking"],
    seasonNames: ["Autumn", "Winter"],
    themeNames: ["Culture", "Spiritual"],
    htmlOverview: `<h2 class="scroll-m-20 text-xl font-semibold tracking-tight text-foreground">Trip Overview</h2>
<p>The <strong class="font-bold">Langtang Valley Cultural Trek</strong> is one of the most accessible Himalayan treks from Kathmandu, offering deep immersion in Tamang culture alongside glacier and monastery views.</p>
<h3 class="scroll-m-20 text-lg font-semibold tracking-tight text-foreground">Highlights</h3>
<ul class="list-disc pl-6">
<li class="my-0.5">Kyanjin Gompa, a centuries-old Buddhist monastery</li>
<li class="my-0.5">Resilient Tamang villages rebuilt after 2015</li>
<li class="my-0.5">Gentle grades suitable for first-time trekkers</li>
</ul>`,
  },
  {
    slug: "kathmandu-valley-heritage-photography-tour",
    name: "Kathmandu Valley Heritage & Nagarkot Sunrise",
    description:
      "A moderate-paced photography tour across three UNESCO-listed heritage cities in the Kathmandu Valley, ending with sunrise over the Himalaya from Nagarkot.",
    basePrice: 540,
    difficultyName: "Moderate",
    categoryName: "Photography Tours",
    // Deliberately spans three regions to exercise the Package<->Region
    // many-to-many — this package visits Kathmandu Valley twice (once for
    // the city, once for Nagarkot) plus two neighboring valley regions.
    regionNames: ["Kathmandu Valley", "LALITPUR REGION", "BHAKTAPUR REGION"],
    activityNames: ["Sightseeing", "Village Walk", "Helicopter Ride"],
    seasonNames: ["Winter", "Spring"],
    themeNames: ["Culture", "Photography", "Festival"],
    htmlOverview: `<h2 class="scroll-m-20 text-xl font-semibold tracking-tight text-foreground">Trip Overview</h2>
<p>This tour threads through the three historic royal cities of the <strong class="font-bold">Kathmandu Valley</strong> — Kathmandu, Patan, and Bhaktapur — before climbing to Nagarkot for a sweeping Himalayan sunrise.</p>
<h3 class="scroll-m-20 text-lg font-semibold tracking-tight text-foreground">Highlights</h3>
<ul class="list-disc pl-6">
<li class="my-0.5">Three UNESCO World Heritage Durbar Squares</li>
<li class="my-0.5">Golden-hour photography sessions at each stop</li>
<li class="my-0.5">Sunrise over the Himalayan range from Nagarkot</li>
</ul>`,
  },
]
