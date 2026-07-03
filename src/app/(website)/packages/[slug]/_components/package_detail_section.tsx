import React from "react"

interface PackageDetailSectionProps {
  title: string
  children?: React.ReactNode
}

const PackageDetailSection: React.FC<PackageDetailSectionProps> = ({
  title,
  children,
}) => {
  return (
    <>
      <section className="border-b border-gray-100 py-8">
        <h2 className="mb-5 text-xl font-bold">{title}</h2>
        <div className="p-4">{children}</div>
      </section>
    </>
  )
}

export default PackageDetailSection
