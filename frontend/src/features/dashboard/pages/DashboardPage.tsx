import { Card } from '../../../components/ui'
import { PageHeader } from '../../../layouts/components/PageHeader'
import { useDashboardStats, useRecentActivity } from '../hooks/useDashboard'

function StatCard({ title, value, icon }: { title: string; value: string | number; icon: string }) {
  return (
    <Card className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
      </div>
      <div className="text-4xl">{icon}</div>
    </Card>
  )
}

export function DashboardPage() {
  const { data: stats, isLoading: statsLoading } = useDashboardStats()
  const { data: activities } = useRecentActivity()

  return (
    <div>
      <PageHeader 
        title="Dashboard" 
        description="Welcome back! Here's an overview of your proxy activity."
      />
      
      {statsLoading ? (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="mt-2 text-sm text-gray-500">Loading stats...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatCard 
            title="Total Proxies" 
            value={stats?.totalProxies || 0} 
            icon="📦" 
          />
          <StatCard 
            title="Active Proxies" 
            value={stats?.activeProxies || 0} 
            icon="✅" 
          />
          <StatCard 
            title="Total Requests" 
            value="2.5M" 
            icon="📊" 
          />
          <StatCard 
            title="Avg Response" 
            value="245ms" 
            icon="⚡" 
          />
        </div>
      )}

      <Card title="Recent Activity" description="Your latest proxy activity">
        <div className="space-y-4">
          {activities && activities.length > 0 ? (
            activities.map((activity) => (
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
            ))
          ) : (
            <p className="text-center text-sm text-gray-500 py-4">No recent activity</p>
          )}
        </div>
      </Card>
    </div>
  )
}
