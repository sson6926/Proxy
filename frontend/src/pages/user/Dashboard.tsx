import { TopNav, DataTable } from '../../components/layout/Common'
import { Card, Button, Badge } from '../../components/ui'

export default function Dashboard() {
  const stats = [
    { label: 'Total Requests', value: '12.5K', trend: '+5.2%' },
    { label: 'Active Proxies', value: '8,567', trend: '+2.1%' },
    { label: 'Quota Used', value: '45%', trend: '-1.3%' },
    { label: 'API Response', value: '89ms', trend: '↓ 12ms' },
  ]

  return (
    <div className="flex-1 flex flex-col">
      <TopNav title="Dashboard" />
      
      <main className="flex-1 p-8 space-y-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-4 gap-6">
          {stats.map((stat, idx) => (
            <Card key={idx}>
              <p className="text-sm text-gray-600 font-medium">{stat.label}</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
              <p className="text-xs text-green-600 mt-2">{stat.trend}</p>
            </Card>
          ))}
        </div>

        {/* Recent Activity */}
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Requests</h3>
          <DataTable 
            columns={[
              { label: 'IP Address', key: 'ip' },
              { label: 'Protocol', key: 'protocol' },
              { label: 'Status', key: 'status' },
              { label: 'Time', key: 'time' }
            ]}
            data={[
              { ip: '192.168.1.1', protocol: 'HTTP', status: 'Success', time: '2 min ago' },
              { ip: '10.0.0.1', protocol: 'HTTPS', status: 'Success', time: '5 min ago' },
            ]}
            actions={(row) => (
              <div className="flex gap-2">
                <Button size="sm" variant="secondary">View</Button>
              </div>
            )}
          />
        </Card>
      </main>
    </div>
  )
}
