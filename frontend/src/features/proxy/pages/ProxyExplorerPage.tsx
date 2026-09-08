import { Card, DataTable, Badge } from '../../../components/ui'
import { PageHeader } from '../../../layouts/components/PageHeader'

interface ProxyData {
  id: string
  ip: string
  port: number
  country: string
  status: 'active' | 'inactive' | 'maintenance'
  responseTime: number
}

const mockProxies: ProxyData[] = [
  { id: '1', ip: '192.168.1.1', port: 8080, country: 'US', status: 'active', responseTime: 245 },
  { id: '2', ip: '192.168.1.2', port: 8080, country: 'UK', status: 'active', responseTime: 312 },
  { id: '3', ip: '192.168.1.3', port: 8080, country: 'CA', status: 'maintenance', responseTime: 0 },
]

export function ProxyExplorerPage() {
  return (
    <div>
      <PageHeader 
        title="Proxy Explorer" 
        description="Browse and filter available proxies"
      />
      
      <Card>
        <DataTable
          data={mockProxies}
          columns={[
            { header: 'IP Address', accessor: 'ip' },
            { header: 'Port', accessor: 'port' },
            { header: 'Country', accessor: 'country' },
            { 
              header: 'Status', 
              accessor: (row) => (
                <Badge 
                  variant={row.status === 'active' ? 'success' : row.status === 'maintenance' ? 'warning' : 'error'}
                >
                  {row.status}
                </Badge>
              )
            },
            { header: 'Response Time', accessor: (row) => `${row.responseTime}ms` },
          ]}
        />
      </Card>
    </div>
  )
}
