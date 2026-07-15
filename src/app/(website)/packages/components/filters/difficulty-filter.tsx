import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

export default function DifficultyFilter() {
  return (
    <div className="space-y-3 py-4">
      <p className="text-md font-hanken-grotesk font-medium tracking-wide">
        Difficulty
      </p>

      <div className="flex flex-col gap-3">
        <Button size={"lg"}>Easy</Button>

        <Button size={"lg"} variant={"secondary"}>
          Medium
        </Button>

        <Button size={"lg"} variant={"secondary"}>
          Hard
        </Button>
      </div>
    </div>
  )
}
