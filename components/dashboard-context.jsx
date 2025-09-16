"use client"
import { createContext, useContext, useState } from "react"

const DashboardContext = createContext()

export function useDashboard() {
  const context = useContext(DashboardContext)
  if (!context) {
    throw new Error("useDashboard must be used within a DashboardProvider")
  }
  return context
}

const initialData = {
  categories: [
    {
      id: "cnapp",
      name: "CNAPP Dashboard",
      sections: [
        {
          id: "cspm-executive",
          name: "CSPM Executive Dashboard",
          widgets: [
            {
              id: "cloud-accounts",
              name: "Cloud Accounts",
              type: "chart",
              data: {
                type: "donut",
                total: 2,
                connected: 2,
                notConnected: 0,
                items: [
                  { name: "Connected", value: 2, color: "#3b82f6" },
                  { name: "Not Connected", value: 0, color: "#e5e7eb" },
                ],
              },
            },
            {
              id: "cloud-risk-assessment",
              name: "Cloud Account Risk Assessment",
              type: "chart",
              data: {
                type: "pie",
                total: 9659,
                items: [
                  { name: "Failed", value: 1689, color: "#ef4444" },
                  { name: "Warning", value: 681, color: "#f59e0b" },
                  { name: "Not available", value: 36, color: "#6b7280" },
                  { name: "Passed", value: 7253, color: "#10b981" },
                ],
              },
            },
          ],
        },
      ],
    },
    {
      id: "cwpp",
      name: "CWPP Dashboard",
      sections: [
        {
          id: "cwpp-main",
          name: "CWPP Dashboard",
          widgets: [
            {
              id: "namespace-alerts",
              name: "Top 5 Namespace Specific Alerts",
              type: "text",
              data: {
                message: "No Graph data available!",
              },
            },
            {
              id: "workload-alerts",
              name: "Workload Alerts",
              type: "text",
              data: {
                message: "No Graph data available!",
              },
            },
          ],
        },
      ],
    },
    {
      id: "registry",
      name: "Registry Scan",
      sections: [
        {
          id: "registry-main",
          name: "Registry Scan",
          widgets: [
            {
              id: "image-risk-assessment",
              name: "Image Risk Assessment",
              type: "progress",
              data: {
                total: 1470,
                subtitle: "Total Vulnerabilities",
                items: [
                  { name: "Critical", value: 9, color: "#ef4444" },
                  { name: "High", value: 150, color: "#f59e0b" },
                ],
              },
            },
            {
              id: "image-security-issues",
              name: "Image Security Issues",
              type: "progress",
              data: {
                total: 2,
                subtitle: "Total Images",
                items: [
                  { name: "Critical", value: 2, color: "#ef4444" },
                  { name: "High", value: 2, color: "#f59e0b" },
                ],
              },
            },
          ],
        },
      ],
    },
  ],
  availableWidgets: [
    { id: "cloud-accounts", name: "Cloud Accounts", category: "CSPM", type: "chart" },
    { id: "cloud-risk-assessment", name: "Cloud Account Risk Assessment", category: "CSPM", type: "chart" },
    { id: "namespace-alerts", name: "Top 5 Namespace Specific Alerts", category: "CWPP", type: "text" },
    { id: "workload-alerts", name: "Workload Alerts", category: "CWPP", type: "text" },
    { id: "image-risk-assessment", name: "Image Risk Assessment", category: "Image", type: "progress" },
    { id: "image-security-issues", name: "Image Security Issues", category: "Image", type: "progress" },
    { id: "security-compliance", name: "Security Compliance Score", category: "CSPM", type: "progress" },
    { id: "threat-detection", name: "Threat Detection", category: "CWPP", type: "chart" },
    { id: "vulnerability-scan", name: "Vulnerability Scan Results", category: "Image", type: "progress" },
    { id: "incident-tickets", name: "Open Incident Tickets", category: "Ticket", type: "text" },
    { id: "resolved-tickets", name: "Resolved Tickets", category: "Ticket", type: "chart" },
  ],
}

export function DashboardProvider({ children }) {
  const [data, setData] = useState(initialData)
  const [searchQuery, setSearchQuery] = useState("")
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [selectedSection, setSelectedSection] = useState(null)

  const addWidget = (sectionId, widget) => {
    let defaultData = { message: "Sample widget data" }

    if (widget.type === "chart") {
      defaultData = {
        type: "pie",
        total: 100,
        items: [
          { name: "Active", value: 70, color: "#10b981" },
          { name: "Inactive", value: 30, color: "#ef4444" },
        ],
      }
    } else if (widget.type === "progress") {
      defaultData = {
        total: 50,
        subtitle: "Total Items",
        items: [
          { name: "Completed", value: 35, color: "#10b981" },
          { name: "Pending", value: 15, color: "#f59e0b" },
        ],
      }
    }

    const newWidget = {
      ...widget,
      data: widget.data || defaultData,
    }

    setData((prevData) => ({
      ...prevData,
      categories: prevData.categories.map((category) => ({
        ...category,
        sections: category.sections.map((section) =>
          section.id === sectionId ? { ...section, widgets: [...section.widgets, newWidget] } : section,
        ),
      })),
    }))
  }

  const removeWidget = (sectionId, widgetId) => {
    setData((prevData) => ({
      ...prevData,
      categories: prevData.categories.map((category) => ({
        ...category,
        sections: category.sections.map((section) =>
          section.id === sectionId
            ? { ...section, widgets: section.widgets.filter((w) => w.id !== widgetId) }
            : section,
        ),
      })),
    }))
  }

  const openAddModal = (sectionId) => {
    setSelectedSection(sectionId)
    setIsAddModalOpen(true)
  }

  const closeAddModal = () => {
    setIsAddModalOpen(false)
    setSelectedSection(null)
  }

  const filteredData = {
    ...data,
    categories: data.categories.map((category) => ({
      ...category,
      sections: category.sections.map((section) => ({
        ...section,
        widgets: section.widgets.filter(
          (widget) =>
            widget.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (widget.data.message && widget.data.message.toLowerCase().includes(searchQuery.toLowerCase())),
        ),
      })),
    })),
  }

  return (
    <DashboardContext.Provider
      value={{
        data: filteredData,
        searchQuery,
        setSearchQuery,
        isAddModalOpen,
        selectedSection,
        addWidget,
        removeWidget,
        openAddModal,
        closeAddModal,
        availableWidgets: data.availableWidgets,
      }}
    >
      {children}
    </DashboardContext.Provider>
  )
}
