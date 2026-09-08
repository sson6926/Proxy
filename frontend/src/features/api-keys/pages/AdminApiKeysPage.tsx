import { Card, DataTable, Badge, Button } from '../../../components/ui'
import { PageHeader } from '../../../layouts/components/PageHeader'
import { useApiKeys } from '../hooks/useApiKeys'
import { EmptyTableState } from '../../../components/ui/EmptyState'
import { useState } from 'react'

interface ApiKeyWithExpiry {
  id: string
  name: string
  key: string
  userId: string
  userName: string
  createdAt: string
  expiresAt: string | null
  lastUsed: string | null
  status: 'active' | 'expired' | 'revoked'
}

export function AdminApiKeysPage() {
  const { data: apiKeys = [], isLoading } = useApiKeys()
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'active' | 'expired' | 'revoked'>('all')
  const [selectedUser, setSelectedUser] = useState<string>('all')

  const filteredKeys = apiKeys.filter((key: ApiKeyWithExpiry) => {
    if (selectedStatus !== 'all' && key.status !== selectedStatus) return false
    if (selectedUser !== 'all' && key.userId !== selectedUser) return false
    return true
  })

  const users = Array.from(new Set(apiKeys.map((key: ApiKeyWithExpiry) => `${key.userName} (${key.userId.substring(0, 6)}...)`)))

  return (
    <div className="space-y-6">
      <PageHeader 
        title="API Keys" 
        description="Manage all API keys"
        action={<Button variant="primary">Revoke All Expired</Button>}
      />

      <Card>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <select 
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value as any)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="expired">Expired</option>
              <option value="revoked">Revoked</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">User</label>
            <select 
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
            >
              <option value="all">All Users</option>
              {users.map((user) => (
                <option key={user} value={user}>{user}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Action</label>
            <div className="flex gap-2">
              <Button variant="secondary" className="w-full">Export CSV</Button>
            </div>
          </div>
        </div>
      </Card>

      <Card>
        {isLoading ? (
          <div className="space-y-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="animate-pulse h-12 bg-gray-100 rounded"></div>
            ))}
          </div>
        ) : filteredKeys.length > 0 ? (
          <DataTable
            data={filteredKeys}
            columns={[
              { header: 'Name', accessor: 'name' },
              { header: 'User', accessor: 'userName' },
              { header: 'Key', accessor: (row) => `${row.key.substring(0, 10)}...` },
              { header: 'Created', accessor: 'createdAt' },
              { header: 'Expires', accessor: (row) => row.expiresAt || 'Never' },
              { 
                header: 'Status', 
                accessor: (row) => (
                  <Badge 
                    variant={row.status === 'active' ? 'success' : row.status === 'expired' ? 'warning' : 'error'}
                  >
                    {row.status}
                  </Badge>
                )
              },
              { header: 'Last Used', accessor: (row) => row.lastUsed || 'Never' },
              { 
                header: 'Action', 
                accessor: (row) => (
                  <div className="flex gap-2">
                    <Button size="sm" variant="secondary">Edit</Button>
                    <Button size="sm" variant="danger">Revoke</Button>
                  </div>
                )
              },
            ]}
          />
        ) : (
          <EmptyTableState
            title="No API keys found"
            description="Try adjusting your filters"
            icon="🔍"
          />
        )}
      </Card>

      <Card title="Key Expiry Stats">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-700">
              {apiKeys.filter((k: ApiKeyWithExpiry) => k.status === 'active').length}
            </div>
            <div className="text-sm text-green-600">Active Keys</div>
          </div>
          <div className="text-center p-4 bg-yellow-50 rounded-lg">
            <div className="text-2xl font-bold text-yellow-700">
              {apiKeys.filter((k: ApiKeyWithExpiry) => k.status === 'expired').length}
            </div>
            <div className="text-sm text-yellow-600">Expired</div>
          </div>
          <div className="text-center p-4 bg-red-50 rounded-lg">
            <div className="text-2xl font-bold text-red-700">
              {apiKeys.filter((k: ApiKeyWithExpiry) => k.status === 'revoked').length}
            </div>
            <div className="text-sm text-red-600">Revoked</div>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-700">
              {apiKeys.length}
            </div>
            <div className="text-sm text-blue-600">Total Keys</div>
          </div>
        </div>
      </Card>
    </div>
  )
}
