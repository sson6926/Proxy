import { Card, Button, Badge, DataTable } from '../../../components/ui'
import { PageHeader } from '../../../layouts/components/PageHeader'
import { useProxyRotation } from '../hooks/useProxyRotation'
import { useState } from 'react'

export function ProxyRotationPage() {
  const {
    settings,
    currentProxy,
    proxyPool,
    rotationHistory,
    rotateProxy,
    addToPool,
    removeFromPool,
    clearPool,
    updateSettings,
    getStats,
  } = useProxyRotation()

  const [newProxy, setNewProxy] = useState('')

  const handleAddProxy = () => {
    if (newProxy.trim()) {
      addToPool(newProxy.trim())
      setNewProxy('')
    }
  }

  const rotationStrategies = [
    { value: 'random', label: 'Random', description: 'Select proxies randomly' },
    { value: 'round-robin', label: 'Round Robin', description: 'Rotate in order' },
    { value: 'latency-based', label: 'Latency Based', description: 'Select lowest latency' },
    { value: 'geographic', label: 'Geographic', description: 'Select by location' },
  ]

  const stats = getStats()

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Proxy Rotation" 
        description="Manage rotation settings and strategy"
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card title="Current Status" description="Active proxy and rotation stats">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">Current Proxy</span>
              <Badge variant={currentProxy ? 'success' : 'default'}>
                {currentProxy || 'No proxy selected'}
              </Badge>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">Pool Size</span>
              <span className="font-medium">{stats.totalProxies}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">Strategy</span>
              <Badge variant="outline">{stats.strategy}</Badge>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">Rotation Count</span>
              <span className="font-medium">{stats.rotationCount}</span>
            </div>

            <Button
              variant="primary"
              onClick={() => rotateProxy('manual rotation')}
              disabled={proxyPool.length === 0}
              className="w-full"
            >
              Rotate Now
            </Button>
          </div>
        </Card>

        <Card title="Rotation Settings" description="Configure rotation strategy">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Strategy
              </label>
              <select 
                value={settings.strategy}
                onChange={(e) => updateSettings({ strategy: e.target.value as any })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
              >
                {rotationStrategies.map((strategy) => (
                  <option key={strategy.value} value={strategy.value}>
                    {strategy.label} - {strategy.description}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Refresh Interval (seconds)
              </label>
              <input 
                type="number"
                value={settings.refreshInterval}
                onChange={(e) => updateSettings({ refreshInterval: parseInt(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                min={10}
                max={3600}
              />
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={settings.healthCheckEnabled}
                  onChange={(e) => updateSettings({ healthCheckEnabled: e.target.checked })}
                  className="h-4 w-4 text-blue-600"
                />
                <label className="ml-2 text-sm text-gray-700">Health Check</label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={settings.autoSwitch}
                  onChange={(e) => updateSettings({ autoSwitch: e.target.checked })}
                  className="h-4 w-4 text-blue-600"
                />
                <label className="ml-2 text-sm text-gray-700">Auto-switch</label>
              </div>
            </div>
          </div>
        </Card>

        <Card title="Add Proxy" description="Add proxy to rotation pool">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Proxy URL
              </label>
              <input 
                type="text"
                value={newProxy}
                onChange={(e) => setNewProxy(e.target.value)}
                placeholder="http://proxy.example.com:8080"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
              />
            </div>

            <Button
              variant="primary"
              onClick={handleAddProxy}
              disabled={!newProxy.trim()}
              className="w-full"
            >
              Add to Pool
            </Button>

            <Button
              variant="danger"
              onClick={clearPool}
              disabled={proxyPool.length === 0}
              className="w-full"
            >
              Clear Pool
            </Button>
          </div>
        </Card>
      </div>

      <Card title="Proxy Pool">
        {proxyPool.length > 0 ? (
          <DataTable
            data={proxyPool.map(proxy => ({ proxy, status: proxy === currentProxy ? 'active' : 'idle' }))}
            columns={[
              { header: 'Proxy', accessor: 'proxy' },
              { 
                header: 'Status', 
                accessor: (row) => (
                  <Badge variant={row.status === 'active' ? 'success' : 'default'}>
                    {row.status}
                  </Badge>
                )
              },
              { 
                header: 'Action', 
                accessor: (row) => (
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      variant="secondary"
                      onClick={() => removeFromPool(row.proxy)}
                    >
                      Remove
                    </Button>
                  </div>
                )
              },
            ]}
          />
        ) : (
          <div className="text-center py-8 text-gray-500">
            No proxies in rotation pool
          </div>
        )}
      </Card>

      <Card title="Rotation History" description="Last 10 rotations">
        {rotationHistory.length > 0 ? (
          <DataTable
            data={rotationHistory}
            columns={[
              { header: 'Time', accessor: (row) => new Date(row.time).toLocaleString() },
              { header: 'Proxy', accessor: 'proxy' },
              { header: 'Reason', accessor: 'reason' },
            ]}
          />
        ) : (
          <div className="text-center py-8 text-gray-500">
            No rotation history yet
          </div>
        )}
      </Card>
    </div>
  )
}
