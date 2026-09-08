import { Card } from '../../../components/ui'
import { PageHeader } from '../../../layouts/components/PageHeader'

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
  return (
    <div>
      <PageHeader 
        title="Dashboard" 
        description="Welcome back! Here's an overview of your proxy activity."
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard title="Total Proxies" value={1234} icon="📦" />
        <StatCard title="Active Proxies" value={987} icon="✅" />
        <StatCard title="Total Requests" value="2.5M" icon="📊" />
        <StatCard title="Avg Response" value="245ms" icon="⚡" />
      </div>

      <Card title="Recent Activity" description="Your latest proxy activity">
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center justify-between py-2 border-b border-gray-200 last:border-0">
              <div>
                <p className="text-sm font-medium text-gray-900">Proxy request</p>
                <p className="text-xs text-gray-500">2 hours ago</p>
              </div>
              <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded">Success</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
