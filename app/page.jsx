"use client"
import { DashboardProvider } from "@/components/dashboard-context"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardGrid } from "@/components/dashboard-grid"
import { AddWidgetModal } from "@/components/add-widget-modal"

export default function DashboardPage() {
  return (
    <DashboardProvider>
      <div className="min-h-screen bg-gray-50">
        <DashboardHeader />
        <main className="container mx-auto px-4 py-6 max-w-7xl">
          <DashboardGrid />
        </main>
        <AddWidgetModal />
      </div>
    </DashboardProvider>
  )
}
