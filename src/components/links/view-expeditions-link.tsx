import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Button } from "../ui/button"
import { cn } from "@/lib/utils"

export function ViewExpeditionsLink() {
  return (
    <Button
      variant="link"
      asChild
      className="group/view-expeditions-link gap-1"
    >
      <Link href="/packages">
        <span>VIEW EXPEDITIONS</span>
        <ArrowRight
          className={cn(
            "-translate-y-px",
            "transition-transform duration-300",
            "group-hover/view-expeditions-link:translate-x-0.5"
          )}
        />
      </Link>
    </Button>
  )
}
