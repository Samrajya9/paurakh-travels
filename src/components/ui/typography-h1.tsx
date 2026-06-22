import { cn } from "@/lib/utils"

interface TypographyH1Props extends React.ComponentProps<"h1"> {}

export function TypographyH1({ className, ...props }: TypographyH1Props) {
  return (
    <h1
      className={cn(
        "max-w-2xl scroll-m-20 text-2xl leading-tight font-bold tracking-tight text-foreground sm:text-3xl",
        className
      )}
      {...props}
    />
  )
}
