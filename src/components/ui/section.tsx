"use client"
import * as React from "react"
import { Slot } from "radix-ui"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const sectionVariants = cva("w-full space-y-4", {
  variants: {
    size: {
      sm: "px-4 py-6 lg:px-6 lg:py-8",
      md: "px-6 py-8 lg:px-10 lg:py-16",
      lg: "px-8 py-12 lg:px-14 lg:py-20",
      xl: "px-10 py-16 lg:px-20 lg:py-28",
    },
  },
  defaultVariants: {
    size: "md",
  },
})

type SectionProps = React.ComponentProps<"section"> &
  VariantProps<typeof sectionVariants> & {
    asChild?: boolean
  }

function Section({ className, size, asChild = false, ...props }: SectionProps) {
  const Comp = asChild ? Slot.Root : "section"

  return (
    <SectionContext.Provider value={true}>
      <Comp
        data-slot="section"
        data-size={size}
        className={cn(sectionVariants({ size }), className)}
        {...props}
      />
    </SectionContext.Provider>
  )
}

type SectionContentProps = React.ComponentProps<"div"> & {
  asChild?: boolean
  constrained?: boolean
}

function SectionContent({
  className,
  asChild = false,
  constrained = false,
  ...props
}: SectionContentProps) {
  useSectionContext("SectionContent")

  const Comp = asChild ? Slot.Root : "div"

  return (
    <Comp
      data-slot="section-content"
      className={cn(constrained && "mx-auto max-w-9xl", className)}
      {...props}
    />
  )
}

type SectionHeaderProps = React.ComponentProps<"div"> & {
  asChild?: boolean
  constrained?: boolean
}
function SectionHeader({
  className,
  asChild = false,
  constrained = false,
  ...props
}: SectionHeaderProps) {
  useSectionContext("SectionHeader")

  const Comp = asChild ? Slot.Root : "div"

  return (
    <Comp
      data-slot="section-header"
      className={cn(constrained && "mx-auto max-w-9xl", className)}
      {...props}
    />
  )
}

const SectionContext = React.createContext<boolean | null>(null)

function useSectionContext(componentName: string) {
  const context = React.useContext(SectionContext)

  if (context === null) {
    throw new Error(`${componentName} must be used within a <Section>.`)
  }

  return context
}

Section.displayName = "Section"
SectionHeader.displayName = "SectionHeader"
SectionContent.displayName = "SectionContent"

export { Section, SectionContent, SectionHeader, sectionVariants }
