export const DESTINATIONS: {
  name: string
  regions: {
    name: string
    places: {
      name: string
      elevation: number
      latitude?: number
      longitude?: number
    }[]
  }[]
}[] = [
  {
    name: "NEPAL",
    regions: [
      {
        name: "Everest Region",
        places: [
          {
            name: "Lukla",
            elevation: 2860,
            latitude: 27.6869,
            longitude: 86.7314,
          },
          {
            name: "Namche Bazaar",
            elevation: 3440,
            latitude: 27.804,
            longitude: 86.7147,
          },
          {
            name: "Tengboche",
            elevation: 3860,
            latitude: 27.8362,
            longitude: 86.7644,
          },
          {
            name: "Dingboche",
            elevation: 4410,
            latitude: 27.8917,
            longitude: 86.8297,
          },
          {
            name: "Everest Base Camp",
            elevation: 5364,
            latitude: 28.0026,
            longitude: 86.8528,
          },
          {
            name: "Kala Patthar",
            elevation: 5644,
            latitude: 27.9878,
            longitude: 86.8281,
          },
        ],
      },
      {
        name: "Annapurna Region",
        places: [
          {
            name: "Pokhara",
            elevation: 822,
            latitude: 28.2096,
            longitude: 83.9856,
          },
          {
            name: "Ghandruk",
            elevation: 1940,
            latitude: 28.3747,
            longitude: 83.8109,
          },
          {
            name: "Chhomrong",
            elevation: 2170,
            latitude: 28.3906,
            longitude: 83.8103,
          },
          {
            name: "Annapurna Base Camp",
            elevation: 4130,
            latitude: 28.5308,
            longitude: 83.8775,
          },
          {
            name: "Poon Hill",
            elevation: 3210,
            latitude: 28.3992,
            longitude: 83.6975,
          },
          {
            name: "Manang",
            elevation: 3519,
            latitude: 28.6667,
            longitude: 84.0167,
          },
          {
            name: "Thorong La Pass",
            elevation: 5416,
            latitude: 28.7911,
            longitude: 83.9317,
          },
        ],
      },
      {
        name: "Langtang Region",
        places: [
          {
            name: "Syabrubesi",
            elevation: 1503,
            latitude: 28.1667,
            longitude: 85.35,
          },
          {
            name: "Lama Hotel",
            elevation: 2470,
            latitude: 28.2072,
            longitude: 85.4136,
          },
          {
            name: "Langtang Village",
            elevation: 3430,
            latitude: 28.2144,
            longitude: 85.5261,
          },
          {
            name: "Kyanjin Gompa",
            elevation: 3870,
            latitude: 28.2167,
            longitude: 85.5667,
          },
        ],
      },
      {
        name: "Manaslu Region",
        places: [
          {
            name: "Machha Khola",
            elevation: 869,
            latitude: 28.2242,
            longitude: 84.8331,
          },
          {
            name: "Samagaon",
            elevation: 3530,
            latitude: 28.5667,
            longitude: 84.6333,
          },
          {
            name: "Larkya La Pass",
            elevation: 5106,
            latitude: 28.6167,
            longitude: 84.55,
          },
        ],
      },
      {
        name: "Kathmandu Valley",
        places: [
          {
            name: "Kathmandu",
            elevation: 1400,
            latitude: 27.7172,
            longitude: 85.324,
          },
          {
            name: "Nagarkot",
            elevation: 2175,
            latitude: 27.7172,
            longitude: 85.5199,
          },
        ],
      },
      {
        name: "BHAKTAPUR REGION",
        places: [
          {
            name: "Bhaktapur",
            elevation: 1401,
            latitude: 27.671,
            longitude: 85.4298,
          },
        ],
      },
      {
        name: "LALITPUR REGION",
        places: [
          {
            name: "Patan",
            elevation: 1350,
            latitude: 27.6727,
            longitude: 85.3247,
          },
        ],
      },
    ],
  },
]
