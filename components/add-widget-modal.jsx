"use client"
import { useState } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { useDashboard } from "./dashboard-context"

export function AddWidgetModal() {
  const { isAddModalOpen, closeAddModal, selectedSection, addWidget, availableWidgets } = useDashboard()

  const [activeTab, setActiveTab] = useState("CSPM")
  const [selectedWidgets, setSelectedWidgets] = useState([])
  const [customWidget, setCustomWidget] = useState({
    name: "",
    text: "",
    type: "text",
  })

  if (!isAddModalOpen) return null

  const tabs = ["CSPM", "CWPP", "Image", "Ticket"]

  const filteredWidgets = availableWidgets.filter((widget) => widget.category === activeTab)

  const handleWidgetToggle = (widgetId) => {
    setSelectedWidgets((prev) => (prev.includes(widgetId) ? prev.filter((id) => id !== widgetId) : [...prev, widgetId]))
  }

  const handleConfirm = () => {
    // Add selected existing widgets
    selectedWidgets.forEach((widgetId) => {
      const widget = availableWidgets.find((w) => w.id === widgetId)
      if (widget) {
        const newWidget = {
          id: `${widget.id}-${Date.now()}`,
          name: widget.name,
          type: widget.type,
          // Let the context handle default data generation
        }
        addWidget(selectedSection, newWidget)
      }
    })

    // Add custom widget if provided
    if (customWidget.name && customWidget.text) {
      const newWidget = {
        id: `custom-${Date.now()}`,
        name: customWidget.name,
        type: customWidget.type,
        data: { message: customWidget.text },
      }
      addWidget(selectedSection, newWidget)
    }

    // Reset and close
    setSelectedWidgets([])
    setCustomWidget({ name: "", text: "", type: "text" })
    closeAddModal()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between p-4 border-b flex-shrink-0">
          <h2 className="text-lg font-semibold">Add Widget</h2>
          <Button variant="ghost" size="sm" onClick={closeAddModal}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex-1 overflow-hidden flex flex-col">
          <div className="p-4 flex-shrink-0">
            <p className="text-sm text-gray-600 mb-4">Personalize your dashboard by adding the following widget</p>

            {/* Tabs */}
            <div className="flex space-x-1 mb-4 bg-gray-100 rounded-lg p-1">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === tab ? "bg-white text-blue-600 shadow-sm" : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-4 pb-4">
            <div className="space-y-6">
              {/* Existing Widgets */}
              <div className="space-y-3">
                <h3 className="font-medium text-sm text-gray-700">Available Widgets:</h3>
                {filteredWidgets.length > 0 ? (
                  filteredWidgets.map((widget) => (
                    <div key={widget.id} className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded">
                      <Checkbox
                        id={widget.id}
                        checked={selectedWidgets.includes(widget.id)}
                        onCheckedChange={() => handleWidgetToggle(widget.id)}
                      />
                      <Label htmlFor={widget.id} className="text-sm cursor-pointer flex-1">
                        {widget.name}
                      </Label>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-500 italic">No widgets available for this category</p>
                )}
              </div>

              {/* Custom Widget Form */}
              <div className="border-t pt-4 space-y-4">
                <h3 className="font-medium text-sm text-gray-700">Or create a custom widget:</h3>

                <div className="space-y-2">
                  <Label htmlFor="widget-name">Widget Name</Label>
                  <Input
                    id="widget-name"
                    value={customWidget.name}
                    onChange={(e) => setCustomWidget((prev) => ({ ...prev, name: e.target.value }))}
                    placeholder="Enter widget name"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="widget-text">Widget Text</Label>
                  <Textarea
                    id="widget-text"
                    value={customWidget.text}
                    onChange={(e) => setCustomWidget((prev) => ({ ...prev, text: e.target.value }))}
                    placeholder="Enter widget content"
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="widget-type">Widget Type</Label>
                  <Select
                    value={customWidget.type}
                    onValueChange={(value) => setCustomWidget((prev) => ({ ...prev, type: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="text">Text</SelectItem>
                      <SelectItem value="chart">Chart</SelectItem>
                      <SelectItem value="progress">Progress</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-3 p-4 border-t flex-shrink-0 bg-gray-50">
          <Button variant="outline" onClick={closeAddModal}>
            Cancel
          </Button>
          <Button onClick={handleConfirm}>Confirm</Button>
        </div>
      </div>
    </div>
  )
}
