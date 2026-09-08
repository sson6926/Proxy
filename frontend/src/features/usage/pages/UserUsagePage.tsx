import { Card } from '../../../components/ui'
import { PageHeader } from '../../../layouts/components/PageHeader'
import { useUsageStats, useQuota } from '../hooks/useUsage'
import { useState } from 'react'

export function UserUsagePage() {
  const [period, setPeriod] = useState<'day' | 'week' | 'month'>('month')
  const { data: stats } = useUsageStats(period)
  const { data: quota } = useQuota()

  return (
    <div>
      <PageHeader 
        title="Usage" 
        description="View your usage statistics"
      />

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Period</label>
        <select 
          value={period}
          onChange={(e) => setPeriod(e.target.value as 'day' | 'week' | 'month')}
          className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
        >
          <option value="day">Today</option>
          <option value="week">This Week</option>
          <option value="month">This Month</option>
        </select>
      </div>

      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Requests</p>
              <p className="text-2xl font-bold text-gray-900">{stats.requests.toLocaleString()}</p>
            </div>
            <div className="text-4xl">📊</div>
          </Card>

          <Card className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Bandwidth</p>
              <p className="text-2xl font-bold text-gray-900">{stats.bandwidth}MB</p>
            </div>
            <div className="text-4xl">📡</div>
          </Card>

          <Card className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Avg Response</p>
              <p className="text-2xl font-bold text-gray-900">{stats.avgResponseTime}ms</p>
            </div>
            <div className="text-4xl">⚡</div>
          </Card>

          <Card className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Success Rate</p>
              <p className="text-2xl font-bold text-gray-900">{stats.successRate}%</p>
            </div>
            <div className="text-4xl">✅</div>
          </Card>
        </div>
      )}

      {quota && (
        <Card title="Quota Usage">
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-gray-900">API Requests</span>
                <span className="text-sm text-gray-500">{quota.used} / {quota.limit}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full" 
                  style={{ width: `${(quota.used / quota.limit) * 100}%` }}
                ></div>
              </div>
            </div>
            <p className="text-xs text-gray-500">Resets at {quota.resetAt}</p>
          </div>
        </Card>
      )}
    </div>
  )
}
