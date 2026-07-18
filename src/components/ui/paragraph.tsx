import { cva, VariantProps } from "class-variance-authority"
import React from "react"

export const paragraphVariants = cva("font-hanken-grotesk text-foreground", {
  variants: {
    variant: {
      xs: "text-xs leading-5 tracking-wider",

      sm: "text-sm leading-5.5 tracking-wider",

      md: "text-base leading-7 tracking-wide",

      lg: "text-lg leading-7.5 tracking-normal",

      xl: "text-xl leading-8.5 tracking-normal",
    },
  },
  defaultVariants: {
    variant: "lg",
  },
})

type PProps = React.ComponentProps<"p"> & VariantProps<typeof paragraphVariants>

export function P({ variant, className, ...props }: PProps) {
  return <p className={paragraphVariants({ variant, className })} {...props} />
}
