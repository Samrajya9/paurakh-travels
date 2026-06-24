import React from "react";

interface GlanceStat {
  icon: React.ReactNode;
  label: string;
  value: string;
}

interface AtAGlanceProps {
  data?: readonly GlanceStat[]; 
}

const AtAGlance: React.FC<AtAGlanceProps> = ({ data = [] }) => {
  return (
    <section className="py-8 border-b border-gray-100">
      <h2 className="text-xl font-bold mb-6">At a Glance</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6">
        {data.map((stat) => (
          // Using stat.label as the unique key
          <div key={stat.label} className="flex items-start gap-3">
            <div className="text-primary mt-0.5 shrink-0">
              {stat.icon}
            </div>
            <div>
              <p className="text-xs text-secondary-foreground font-medium uppercase tracking-wide mb-0.5">
                {stat.label}
              </p>
              <p className="text-sm font-semibold text-muted-foreground leading-snug">
                {stat.value}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AtAGlance;