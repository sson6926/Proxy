import { Card } from '../../../components/ui'
import { PageHeader } from '../../../layouts/components/PageHeader'
import { useDashboardStats, useRecentActivity } from '../hooks/useDashboard'
import { StatsGrid } from '../../../components/ui/StatCard'
import { UsageLineChart, UsageBarChart } from '../../../components/charts/Charts'
import { EmptyState } from '../../../components/ui/EmptyState'

export function DashboardPage() {
  const { data: stats, isLoading: statsLoading } = useDashboardStats()
  const { data: activities, isLoading: activitiesLoading } = useRecentActivity()

  const statsData = [
    { title: 'Total Proxies', value: stats?.totalProxies || 0, icon: '📦' },
    { title: 'Active Proxies', value: stats?.activeProxies || 0, icon: '✅' },
    { title: 'Total Requests', value: '2.5M', icon: '📊' },
    { title: 'Avg Response', value: '245ms', icon: '⚡' },
  ]

  const chartData = [
    { name: 'Mon', value: 4000 },
    { name: 'Tue', value: 3000 },
    { name: 'Wed', value: 2000 },
    { name: 'Thu', value: 2780 },
    { name: 'Fri', value: 1890 },
    { name: 'Sat', value: 2390 },
    { name: 'Sun', value: 3490 },
  ]

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Dashboard" 
        description="Welcome back! Here's an overview of your proxy activity."
      />
      
      <StatsGrid stats={statsData} loading={statsLoading} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <UsageLineChart 
          data={chartData} 
          title="Weekly Requests" 
          loading={statsLoading}
        />
        <UsageBarChart 
          data={chartData} 
          title="Daily Usage" 
          loading={statsLoading}
        />
      </div>

      <Card title="Recent Activity" description="Your latest proxy activity">
        {activitiesLoading ? (
          <div className="space-y-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse h-16 bg-gray-100 rounded"></div>
            ))}
          </div>
        ) : activities && activities.length > 0 ? (
          <div className="space-y-4">
            {activities.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between py-2 border-b border-gray-200 last:border-0">
                <div>
                  <p className="text-sm font-medium text-gray-900">{activity.description}</p>
                  <p className="text-xs text-gray-500">{activity.timestamp}</p>
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded ${
                  activity.status === 'success' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {activity.status}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState 
            title="No recent activity"
            description="Your proxy activity will appear here"
            icon="📊"
          />
        )}
      </Card>
    </div>
  )
}
