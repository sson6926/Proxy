import { Card } from '../../../components/ui'
import { PageHeader } from '../../../layouts/components/PageHeader'
import { useUsageStats, useQuota } from '../hooks/useUsage'
import { StatsGrid } from '../../../components/ui/StatCard'
import { UsageAreaChart, MultiLineChart } from '../../../components/charts/Charts'
import { useState } from 'react'

export function UserUsagePage() {
  const [period, setPeriod] = useState<'day' | 'week' | 'month'>('month')
  const { data: stats, isLoading: statsLoading } = useUsageStats(period)
  const { data: quota, isLoading: quotaLoading } = useQuota()

  const usageStats = [
    { title: 'Requests', value: stats?.requests.toLocaleString() || '0', icon: '📊' },
    { title: 'Bandwidth', value: `${stats?.bandwidth || 0}MB`, icon: '📡' },
    { title: 'Avg Response', value: `${stats?.avgResponseTime || 0}ms`, icon: '⚡' },
    { title: 'Success Rate', value: `${stats?.successRate || 0}%`, icon: '✅' },
  ]

  const chartData = [
    { name: 'Week 1', requests: 4000, bandwidth: 2400 },
    { name: 'Week 2', requests: 3000, bandwidth: 1398 },
    { name: 'Week 3', requests: 2000, bandwidth: 9800 },
    { name: 'Week 4', requests: 2780, bandwidth: 3908 },
  ]

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Usage" 
        description="View your usage statistics"
      />

      <div className="flex justify-between items-center">
        <div>
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
      </div>

      <StatsGrid stats={usageStats} loading={statsLoading} />

      <MultiLineChart
        data={chartData}
        title="Usage Trend"
        lines={['requests', 'bandwidth']}
        loading={statsLoading}
      />

      {quotaLoading ? (
        <Card title="Quota Usage">
          <div className="animate-pulse h-20 bg-gray-100 rounded"></div>
        </Card>
      ) : quota ? (
        <Card title="Quota Usage">
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-gray-900">API Requests</span>
                <span className="text-sm text-gray-500">{quota.used.toLocaleString()} / {quota.limit.toLocaleString()}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className={`h-3 rounded-full transition-all ${
                    (quota.used / quota.limit) > 0.9 ? 'bg-red-600' :
                    (quota.used / quota.limit) > 0.7 ? 'bg-yellow-600' :
                    'bg-blue-600'
                  }`}
                  style={{ width: `${Math.min((quota.used / quota.limit) * 100, 100)}%` }}
                ></div>
              </div>
            </div>
            <p className="text-xs text-gray-500">Resets at {quota.resetAt}</p>
          </div>
        </Card>
      ) : null}
    </div>
  )
}
