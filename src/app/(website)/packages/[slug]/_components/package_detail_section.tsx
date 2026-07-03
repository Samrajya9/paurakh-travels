import React from "react";

interface PackageDetailSectionProps {
  title: string;
  children?: React.ReactNode;
}

const PackageDetailSection: React.FC<PackageDetailSectionProps> = ({ title, children }) => {
  return (<>
    <section className="py-8 border-b border-gray-100">
      <h2 className="text-xl font-bold mb-5">{title}</h2>
      <div className="p-4">
        {children}
      </div>
    </section>
  </>

  )
}

export default PackageDetailSection