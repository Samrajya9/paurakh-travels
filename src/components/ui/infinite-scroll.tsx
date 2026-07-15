"use client"

import { cn } from "@/lib/utils"
import { Children } from "react"

type InfiniteScrollProps = React.ComponentProps<"div">

export function InfiniteScroll({
  children,
  className,
  ...props
}: InfiniteScrollProps) {
  //   const count = Children.count(children)
  //   console.log("count", count)
  const items = Children.toArray(children)

  console.log(items) // 3
  return (
    <>
      <div {...props} className={cn("relative overflow-clip", className)}>
        {children}
      </div>
    </>
  )
}

type InfiniteScrollItemProps = React.ComponentProps<"div">

export function InfiniteScrollItem({
  children,
  className,
  ...props
}: InfiniteScrollItemProps) {
  return (
    <>
      <div
        {...props}
        className={cn(
          "absolute",
          "animate-(<custom-property>) duration-[30s] ease-linear repeat-infinite",
          className
        )}
      >
        {children}
      </div>
    </>
  )
}
