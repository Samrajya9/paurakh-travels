import { cn } from "@/lib/utils"

interface BlockquoteProps extends React.ComponentProps<"blockquote"> {}

export default function Blockquote({
  children,
  className,
  ...props
}: BlockquoteProps) {
  return (
    <blockquote
      className={cn(
        "border-l-2 pl-2 [&>p]:before:content-['“'] [&>p]:after:content-['”']",
        className
      )}
      {...props}
    >
      <p>{children}</p>
    </blockquote>
  )
}
