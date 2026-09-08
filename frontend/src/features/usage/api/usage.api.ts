import { apiClient } from '../../../lib/api-client'

export interface UsageStats {
  requests: number
  bandwidth: number
  avgResponseTime: number
  successRate: number
  period: 'day' | 'week' | 'month'
}

export interface UsageHistory {
  date: string
  requests: number
  bandwidth: number
}

export const usageApi = {
  getUsageStats: async (period: 'day' | 'week' | 'month' = 'day'): Promise<UsageStats> => {
    const response = await apiClient.get('/api/usage/stats', { params: { period } })
    return response.data
  },

  getUsageHistory: async (period: 'day' | 'week' | 'month' = 'month'): Promise<UsageHistory[]> => {
    const response = await apiClient.get('/api/usage/history', { params: { period } })
    return response.data
  },

  getQuota: async (): Promise<any> => {
    const response = await apiClient.get('/api/usage/quota')
    return response.data
  },
}
