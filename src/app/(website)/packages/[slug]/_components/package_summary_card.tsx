import React from "react"

interface GlanceStat {
  icon: React.ReactNode
  label: string
  value: string
}

interface AtAGlanceProps {
  data?: readonly GlanceStat[]
}

const AtAGlance: React.FC<AtAGlanceProps> = ({ data = [] }) => {
  return (
    <section className="border-b border-gray-100 py-8">
      <h2 className="mb-6 text-xl font-bold">At a Glance</h2>
      <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
        {data.map((stat) => (
          // Using stat.label as the unique key
          <div key={stat.label} className="flex items-start gap-3">
            <div className="mt-0.5 shrink-0 text-primary">{stat.icon}</div>
            <div>
              <p className="mb-0.5 text-xs font-medium tracking-wide text-secondary-foreground uppercase">
                {stat.label}
              </p>
              <p className="text-sm leading-snug font-semibold text-muted-foreground">
                {stat.value}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default AtAGlance
