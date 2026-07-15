import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

export default function ActivityFilter() {
  return (
    <div className="space-y-3 py-4">
      <p className="text-md font-hanken-grotesk font-medium tracking-wide">
        Activity
      </p>

      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <Checkbox id="activity-adventure" name="activity" defaultChecked />
          <Label htmlFor="activity-adventure">Adventure</Label>
        </div>

        <div className="flex items-center gap-2">
          <Checkbox id="activity-photography" name="activity" />
          <Label htmlFor="activity-photography">Photography</Label>
        </div>

        <div className="flex items-center gap-2">
          <Checkbox id="activity-cultural" name="activity" />
          <Label htmlFor="activity-cultural">Cultural</Label>
        </div>
      </div>
    </div>
  )
}
