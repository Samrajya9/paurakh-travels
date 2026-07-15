import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

export default function ThemeFilter() {
  return (
    <div className="space-y-3 py-4">
      <p className="text-md font-hanken-grotesk font-medium tracking-wide">
        Theme
      </p>

      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <Checkbox id="theme-adventure" name="theme" defaultChecked />
          <Label htmlFor="theme-adventure">Adventure</Label>
        </div>

        <div className="flex items-center gap-2">
          <Checkbox id="theme-cultural" name="theme" />
          <Label htmlFor="theme-cultural">Cultural</Label>
        </div>

        <div className="flex items-center gap-2">
          <Checkbox id="theme-photography" name="theme" />
          <Label htmlFor="theme-photography">Photography</Label>
        </div>

        <div className="flex items-center gap-2">
          <Checkbox id="theme-wildlife" name="theme" />
          <Label htmlFor="theme-wildlife">Wildlife</Label>
        </div>

        <div className="flex items-center gap-2">
          <Checkbox id="theme-spiritual" name="theme" />
          <Label htmlFor="theme-spiritual">Spiritual</Label>
        </div>

        <div className="flex items-center gap-2">
          <Checkbox id="theme-luxury" name="theme" />
          <Label htmlFor="theme-luxury">Luxury</Label>
        </div>
      </div>
    </div>
  )
}
