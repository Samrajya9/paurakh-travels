import { cn } from "@/lib/utils"
import React from "react"

interface PackageTitleProps extends React.ComponentPropsWithoutRef<"h1"> {}

const PackageTitle: React.FC<PackageTitleProps> = ({
  title,
  className,
  ...props
}) => {
  return (
    <h1
      // className={`max-w-2xl text-2xl leading-tight font-bold text-gray-900 sm:text-3xl ${className || ""}`}
      className={cn(
        "max-w-2xl text-2xl leading-tight font-bold text-gray-900 sm:text-3xl",
        className
      )}
      {...props}
    >
      {title}
    </h1>
  )
}

export default PackageTitle
