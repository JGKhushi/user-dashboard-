"use client"
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"

export function ChartWidget({ data }) {
  if (data.type === "donut") {
    return (
      <div className="space-y-4">
        <div className="relative h-32">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={data.items} cx="50%" cy="50%" innerRadius={30} outerRadius={50} dataKey="value">
                {data.items.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl font-bold">{data.total}</span>
          </div>
        </div>
        <div className="space-y-1">
          {data.items.map((item, index) => (
            <div key={index} className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                <span>{item.name}</span>
              </div>
              <span>({item.value})</span>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (data.type === "pie") {
    return (
      <div className="space-y-4">
        <div className="relative h-32">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={data.items} cx="50%" cy="50%" outerRadius={50} dataKey="value">
                {data.items.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-lg font-bold">{data.total}</span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {data.items.map((item, index) => (
            <div key={index} className="flex items-center space-x-1">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
              <span className="truncate">
                {item.name} ({item.value})
              </span>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return null
}
