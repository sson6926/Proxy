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

export interface Quota {
  used: number
  limit: number
  resetAt: string
}
