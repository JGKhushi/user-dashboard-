"use client"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { WidgetCard } from "./widget-card"
import { useDashboard } from "./dashboard-context"

export function CategorySection({ section }) {
  const { openAddModal } = useDashboard()

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-800">{section.name}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {section.widgets.map((widget) => (
          <WidgetCard key={widget.id} widget={widget} sectionId={section.id} />
        ))}
        <div className="bg-white rounded-lg border-2 border-dashed border-gray-300 p-6 flex items-center justify-center min-h-[200px]">
          <Button
            variant="ghost"
            onClick={() => openAddModal(section.id)}
            className="flex flex-col items-center space-y-2 text-gray-500 hover:text-gray-700"
          >
            <Plus className="h-8 w-8" />
            <span>Add Widget</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
