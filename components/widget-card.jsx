"use client"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartWidget } from "./chart-widget"
import { ProgressWidget } from "./progress-widget"
import { useDashboard } from "./dashboard-context"

export function WidgetCard({ widget, sectionId }) {
  const { removeWidget } = useDashboard()

  const renderWidgetContent = () => {
    switch (widget.type) {
      case "chart":
        return <ChartWidget data={widget.data} />
      case "progress":
        return <ProgressWidget data={widget.data} />
      case "text":
        return <div className="flex items-center justify-center h-32 text-gray-500">{widget.data.message}</div>
      default:
        return <div className="p-4">Unknown widget type</div>
    }
  }

  return (
    <Card className="relative group">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => removeWidget(sectionId, widget.id)}
        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity z-10 h-6 w-6 p-0"
      >
        <X className="h-4 w-4" />
      </Button>

      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">{widget.name}</CardTitle>
      </CardHeader>

      <CardContent>{renderWidgetContent()}</CardContent>
    </Card>
  )
}
