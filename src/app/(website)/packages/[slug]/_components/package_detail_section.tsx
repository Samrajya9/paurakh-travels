import React from "react";

interface PackageDetailSectionProps {
  title: string;
  children?: React.ReactNode;
}

const PackageDetailSection: React.FC<PackageDetailSectionProps> = ({ title, children }) => {
  return (<>
    <section className="py-8 border-b border-gray-100">
      <h2 className="text-xl font-bold text-gray-900 mb-4">{title}</h2>
      <div className="h-24 rounded-xl bg-gray-50 border border-dashed border-gray-200 flex items-center justify-center text-sm text-gray-400">
        {children}
      </div>
    </section>
  </>

  )
}

export default PackageDetailSection