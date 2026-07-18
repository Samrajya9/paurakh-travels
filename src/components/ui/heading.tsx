import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"

export const headingVariants = cva("font-playfair", {
  variants: {
    variant: {
      h1: "text-4xl leading-[1.1] font-bold tracking-wide sm:text-4xl md:text-5xl lg:text-7xl",

      h2: "text-2xl leading-[1.15] font-bold tracking-wide sm:text-3xl md:text-4xl",

      h3: "text-xl leading-[1.2] font-semibold tracking-wide sm:text-2xl md:text-3xl",

      h4: "text-lg leading-[1.3] font-semibold tracking-wide sm:text-xl md:text-2xl",

      h5: "text-base leading-[1.4] font-semibold tracking-normal sm:text-lg md:text-xl",

      h6: "text-sm leading-[1.5] font-semibold tracking-normal sm:text-base md:text-lg",
    },
  },
  defaultVariants: {
    variant: "h1",
  },
})

export type HeadingVariantProps = VariantProps<typeof headingVariants>

type H1Props = React.ComponentProps<"h1">

export function H1({ className, ...props }: H1Props) {
  return (
    <h1
      className={cn(headingVariants({ variant: "h1" }), className)}
      {...props}
    />
  )
}

type H2Props = React.ComponentProps<"h2"> & {}

export function H2({ className, ...props }: H2Props) {
  return (
    <h2
      className={cn(headingVariants({ variant: "h2" }), className)}
      {...props}
    />
  )
}

type H3Props = React.ComponentProps<"h3"> & {}

export function H3({ className, ...props }: H3Props) {
  return (
    <h3
      className={cn(headingVariants({ variant: "h3" }), className)}
      {...props}
    />
  )
}

type H4Props = React.ComponentProps<"h4"> & {}

export function H4({ className, ...props }: H4Props) {
  return (
    <h4
      className={cn(headingVariants({ variant: "h4" }), className)}
      {...props}
    />
  )
}

type H5Props = React.ComponentProps<"h5"> & {}

export function H5({ className, ...props }: H5Props) {
  return (
    <h5
      className={cn(headingVariants({ variant: "h5" }), className)}
      {...props}
    />
  )
}

type H6Props = React.ComponentProps<"h6"> & {}

export function H6({ className, ...props }: H6Props) {
  return (
    <h6
      className={cn(headingVariants({ variant: "h6" }), className)}
      {...props}
    />
  )
}
