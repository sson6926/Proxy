import { Card } from '../../../components/ui'
import { PageHeader } from '../../../layouts/components/PageHeader'

export function AdminOverviewPage() {
  return (
    <div>
      <PageHeader 
        title="Admin Overview" 
        description="System-wide statistics and management"
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <Card className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Total Users</p>
            <p className="text-2xl font-bold text-gray-900">1,234</p>
          </div>
          <div className="text-4xl">👥</div>
        </Card>

        <Card className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Active Workers</p>
            <p className="text-2xl font-bold text-gray-900">56</p>
          </div>
          <div className="text-4xl">⚙️</div>
        </Card>

        <Card className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">System Health</p>
            <p className="text-2xl font-bold text-gray-900">98%</p>
          </div>
          <div className="text-4xl">💚</div>
        </Card>
      </div>

      <Card title="System Status" description="Current system health and metrics">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span>Database</span>
            <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded">Healthy</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Redis Cache</span>
            <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded">Healthy</span>
          </div>
          <div className="flex items-center justify-between">
            <span>API Server</span>
            <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded">Running</span>
          </div>
        </div>
      </Card>
    </div>
  )
}
