import { Card, DataTable, Badge } from '../../../components/ui'
import { PageHeader } from '../../../layouts/components/PageHeader'
import { useProxies } from '../hooks/useProxies'
import { useState } from 'react'

export function ProxyExplorerPage() {
  const [filters, setFilters] = useState({ protocol: '', country: '', limit: 10 })
  const { data, isLoading } = useProxies(filters)

  return (
    <div>
      <PageHeader 
        title="Proxy Explorer" 
        description="Browse and filter available proxies"
      />
      
      <Card className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Protocol</label>
            <select 
              value={filters.protocol}
              onChange={(e) => setFilters({ ...filters, protocol: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
            >
              <option value="">All Protocols</option>
              <option value="http">HTTP</option>
              <option value="https">HTTPS</option>
              <option value="socks5">SOCKS5</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
            <input 
              type="text"
              placeholder="e.g., US"
              value={filters.country}
              onChange={(e) => setFilters({ ...filters, country: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Limit</label>
            <input 
              type="number"
              value={filters.limit}
              onChange={(e) => setFilters({ ...filters, limit: parseInt(e.target.value) })}
              min={1}
              max={100}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
            />
          </div>
        </div>
      </Card>

      <Card>
        <DataTable
          data={data?.proxies || []}
          loading={isLoading}
          columns={[
            { header: 'IP Address', accessor: 'ip' },
            { header: 'Port', accessor: 'port' },
            { header: 'Protocol', accessor: 'protocol' },
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
