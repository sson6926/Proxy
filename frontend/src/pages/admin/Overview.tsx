import { TopNav } from '../../components/layout/Common'
import { Card, Badge } from '../../components/ui'

export default function Overview() {
  const metrics = [
    { label: 'Total Users', value: '1,234', change: '+12%' },
    { label: 'Active Proxies', value: '8,567', change: '+5%' },
    { label: 'Daily Requests', value: '245K', change: '+8%' },
    { label: 'System Health', value: '99.9%', change: '+0.1%' },
  ]

  return (
    <div className="flex-1 flex flex-col">
      <TopNav title="Admin Overview" />
      
      <main className="flex-1 p-8 space-y-8">
        <div className="grid grid-cols-4 gap-6">
          {metrics.map((m, idx) => (
            <Card key={idx}>
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-600 font-medium">{m.label}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-2">{m.value}</p>
                </div>
                <Badge variant="success">{m.change}</Badge>
              </div>
            </Card>
          ))}
        </div>

        <Card>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">System Status</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
              <span className="text-sm text-gray-700">Database</span>
              <Badge variant="success">Healthy</Badge>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
              <span className="text-sm text-gray-700">Redis Cache</span>
              <Badge variant="success">Healthy</Badge>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
              <span className="text-sm text-gray-700">Workers</span>
              <Badge variant="success">Running (12)</Badge>
            </div>
          </div>
        </Card>
      </main>
    </div>
  )
}
