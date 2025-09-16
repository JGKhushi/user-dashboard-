"use client"

export function ProgressWidget({ data }) {
  const totalValue = data.items.reduce((sum, item) => sum + item.value, 0)

  return (
    <div className="space-y-4">
      <div className="text-center">
        <div className="text-2xl font-bold">{data.total}</div>
        <div className="text-sm text-gray-500">{data.subtitle}</div>
      </div>

      <div className="space-y-3">
        {data.items.map((item, index) => {
          const percentage = (item.value / totalValue) * 100
          return (
            <div key={index} className="space-y-1">
              <div className="flex justify-between text-sm">
                <span>
                  {item.name} ({item.value})
                </span>
                <span>{percentage.toFixed(0)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="h-2 rounded-full transition-all duration-300"
                  style={{
                    width: `${percentage}%`,
                    backgroundColor: item.color,
                  }}
                />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
