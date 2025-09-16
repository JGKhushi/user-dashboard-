"use client"
import { useDashboard } from "./dashboard-context"
import { CategorySection } from "./category-section"

export function DashboardGrid() {
  const { data } = useDashboard()

  return (
    <div className="space-y-8">
      {data.categories.map((category) => (
        <div key={category.id} className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-900">{category.name}</h2>
          {category.sections.map((section) => (
            <CategorySection key={section.id} section={section} />
          ))}
        </div>
      ))}
    </div>
  )
}
