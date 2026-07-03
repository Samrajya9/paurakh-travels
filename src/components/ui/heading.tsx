import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"

export const headingVariants = cva("", {
  variants: {
    variant: {
      h1: "max-w-2xl scroll-m-20 text-2xl leading-tight font-bold tracking-tight text-foreground sm:text-3xl",
      h2: "scroll-m-20 text-xl font-semibold tracking-tight text-foreground",
      h3: "scroll-m-20 text-lg font-semibold tracking-tight text-foreground",
      h4: "scroll-m-20 text-base font-semibold tracking-tight text-foreground",
      h5: "scroll-m-20 text-sm font-medium tracking-tight text-foreground",
      h6: "scroll-m-20 text-sm font-medium tracking-tight text-muted-foreground",
    },
  },
  defaultVariants: {
    variant: "h1",
  },
})

export type HeadingVariantProps = VariantProps<typeof headingVariants>

interface H1Props extends React.ComponentProps<"h1"> {}

export function H1({ className, ...props }: H1Props) {
  return (
    <h1
      className={cn(headingVariants({ variant: "h1" }), className)}
      {...props}
    />
  )
}
interface H2Props extends React.ComponentProps<"h2"> {}

export function H2({ className, ...props }: H2Props) {
  return (
    <h2
      className={cn(headingVariants({ variant: "h2" }), className)}
      {...props}
    />
  )
}

interface H3Props extends React.ComponentProps<"h3"> {}

export function H3({ className, ...props }: H3Props) {
  return (
    <h3
      className={cn(headingVariants({ variant: "h3" }), className)}
      {...props}
    />
  )
}

interface H4Props extends React.ComponentProps<"h4"> {}

export function H4({ className, ...props }: H4Props) {
  return (
    <h4
      className={cn(headingVariants({ variant: "h4" }), className)}
      {...props}
    />
  )
}

interface H5Props extends React.ComponentProps<"h5"> {}

export function H5({ className, ...props }: H5Props) {
  return (
    <h5
      className={cn(headingVariants({ variant: "h5" }), className)}
      {...props}
    />
  )
}

interface H6Props extends React.ComponentProps<"h6"> {}

export function H6({ className, ...props }: H6Props) {
  return (
    <h6
      className={cn(headingVariants({ variant: "h6" }), className)}
      {...props}
    />
  )
}
