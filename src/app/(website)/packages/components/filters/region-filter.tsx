import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

export default function RegionFilter() {
  return (
    <div className="space-y-3 py-4">
      <p className="text-md font-hanken-grotesk font-medium tracking-wide">
        Region
      </p>

      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <Checkbox id="region-khumbu" name="region" defaultChecked />
          <Label htmlFor="region-khumbu">Khumbu (Everest)</Label>
        </div>

        <div className="flex items-center gap-2">
          <Checkbox id="region-annapurna" name="region" />
          <Label htmlFor="region-annapurna">Annapurna Massif</Label>
        </div>

        <div className="flex items-center gap-2">
          <Checkbox id="region-mustang" name="region" />
          <Label htmlFor="region-mustang">Mustang Valley</Label>
        </div>
      </div>
    </div>
  )
}
