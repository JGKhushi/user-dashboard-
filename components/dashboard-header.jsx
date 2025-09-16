"use client"
import { Search, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useDashboard } from "./dashboard-context"

export function DashboardHeader() {
  const { searchQuery, setSearchQuery, openAddModal } = useDashboard()

  const handleAddWidget = () => {
    // Open modal for the first available section as default
    openAddModal("cspm-executive")
  }

  return (
    <header className="bg-white border-b border-gray-200 px-4 py-3">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-lg font-semibold text-gray-900">Dashboard V2</h1>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Search anything..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-80"
            />
          </div>

          <Button variant="outline" size="sm" onClick={handleAddWidget}>
            <Plus className="h-4 w-4 mr-2" />
            Add Widget
          </Button>

          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm">
              Last 2 days
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
