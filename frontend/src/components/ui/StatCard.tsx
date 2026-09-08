import { Card } from './Card'

interface StatCardProps {
  title: string
  value: string | number
  icon: string
  change?: {
    value: number
    type: 'increase' | 'decrease'
  }
  loading?: boolean
}

export function StatCard({ title, value, icon, change, loading }: StatCardProps) {
  if (loading) {
    return (
      <Card className="animate-pulse">
        <div className="h-20 bg-gray-200 rounded"></div>
      </Card>
    )
  }

  return (
    <Card className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        {change && (
          <p className={`text-xs mt-1 ${change.type === 'increase' ? 'text-green-600' : 'text-red-600'}`}>
            {change.type === 'increase' ? '↑' : '↓'} {Math.abs(change.value)}%
          </p>
        )}
      </div>
      <div className="text-4xl">{icon}</div>
    </Card>
  )
}

interface StatsGridProps {
  stats: Array<{
    title: string
    value: string | number
    icon: string
    change?: { value: number; type: 'increase' | 'decrease' }
  }>
  loading?: boolean
}

export function StatsGrid({ stats, loading }: StatsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} loading={loading} />
      ))}
    </div>
  )
}
