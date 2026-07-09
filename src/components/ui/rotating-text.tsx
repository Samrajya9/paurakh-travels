"use client"

import React from "react"
import { cn } from "@/lib/utils"

type RotatingTextProps = {
  text: string | string[]
  duration?: number
} & React.ComponentProps<"span">

export default function RotatingText({
  text,
  duration = 2000,
  className,
  ...props
}: RotatingTextProps) {
  const texts = Array.isArray(text) ? text : [text]

  const [index, setIndex] = React.useState(0)
  const [visible, setVisible] = React.useState(true)

  React.useEffect(() => {
    if (texts.length <= 1) return

    const interval = setInterval(() => {
      // Animate out
      setVisible(false)

      // After the animation finishes, change text and animate in
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % texts.length)
        setVisible(true)
      }, 300) // matches transition duration
    }, duration)

    return () => clearInterval(interval)
  }, [texts, duration])

  return (
    <span className="overflow-hidden">
      <span
        className={cn(
          "transition-all duration-300 ease-out",
          visible ? "translate-y-0 opacity-100" : "-translate-y-12 opacity-0",
          className
        )}
        {...props}
      >
        {texts[index]}
      </span>
    </span>
  )
}
