import React from 'react'

interface PackageTitleProps {
  title: string;
  className?: string;
}

const PackageTitle: React.FC<PackageTitleProps> = ({ title, className }) => {
  return (
    <h1 className={`text-2xl sm:text-3xl font-bold text-gray-900 leading-tight max-w-2xl ${className || ''}`}>
      {title}
    </h1>
  )
}

export default PackageTitle