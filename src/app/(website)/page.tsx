"use client"
import { ReviewsSection } from "@/components/reviews-section"
import NepalDistricts from "@/components/svgs/nepal-districts"
import { Button } from "@/components/ui/button"
import { useState } from "react"

const districts = [
  "achham",
  "arghakhanchi",
  "baglung",
  "baitadi",
  "bajhang",
  "bajura",
  "banke",
  "bara",
  "bardiya",
  "bhaktapur",
  "bhojpur",
  "chitwan",
  "dadeldhura",
  "dailekh",
  "dang",
  "darchula",
  "dhading",
  "dhankuta",
  "dhanusha",
  "dholkha",
  "dolpa",
  "doti",
  "gorkha",
  "gulmi",
  "humla",
  "ilam",
  "jajarkot",
  "jhapa",
  "jumla",
  "kailali",
  "kalikot",
  "kanchanpur",
  "kapilvastu",
  "kaski",
  "kathmandu",
  "kavrepalanchok",
  "khotang",
  "lalitpur",
  "lamjung",
  "mahottari",
  "makwanpur",
  "manang",
  "morang",
  "mugu",
  "mustang",
  "myagdi",
  "nawalparasi_east",
  "nawalparasi_west",
  "nuwakot",
  "okhaldhunga",
  "palpa",
  "panchthar",
  "parbat",
  "parsa",
  "pyuthan",
  "ramechhap",
  "rasuwa",
  "rautahat",
  "rolpa",
  "rukum_east",
  "rukum_west",
  "rupandehi",
  "salyan",
  "sankhuwasabha",
  "saptari",
  "sarlahi",
  "sindhuli",
  "sindhupalchok",
  "siraha",
  "solukhumbu",
  "sunsari",
  "surkhet",
  "syangja",
  "tanahun",
  "taplejung",
  "terhathum",
  "udayapur",
]
export default function Page() {
  const [hoveredDistrict, setHoveredDistrict] = useState<string | null>(null)
  return (
    <>
      {/* <div className="flex min-h-svh p-6">
        <div className="flex max-w-md min-w-0 flex-col gap-4 text-sm leading-loose">
          <div>
            <h1 className="font-medium">Project ready!</h1>
            <p>You may now add components and start building.</p>
            <p>We&apos;ve already added the button component for you.</p>
            <Button className="mt-2">Button</Button>
          </div>
          <div className="font-mono text-xs text-muted-foreground">
            (Press <kbd>d</kbd> to toggle dark mode)
          </div>
        </div>
      </div> */}
      <NepalDistricts data-active-district={hoveredDistrict} />
      {districts.map((d) => {
        return (
          <>
            <Button onClick={() => setHoveredDistrict(d)}>{d}</Button>
          </>
        )
      })}

      <ReviewsSection />
    </>
  )
}
