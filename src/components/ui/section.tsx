import * as React from "react"
import { Slot } from "radix-ui"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const sectionVariants = cva("px-6 py-16 text-foreground lg:px-10", {
  variants: {
    width: {
      fullWidth: "w-full",
      constrained: "mx-auto max-w-9xl",
    },
  },
  defaultVariants: {
    width: "fullWidth",
  },
})

type SectionProps = React.ComponentProps<"section"> &
  VariantProps<typeof sectionVariants> & {
    asChild?: boolean
  }

function Section({
  className,
  width,
  asChild = false,
  ...props
}: SectionProps) {
  const Comp = asChild ? Slot.Root : "section"

  return (
    <Comp
      data-slot="section"
      data-width={width}
      className={cn(sectionVariants({ width, className }))}
      {...props}
    />
  )
}

export { Section, sectionVariants }
