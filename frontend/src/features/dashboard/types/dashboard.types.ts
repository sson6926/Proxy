export interface DashboardStats {
  totalProxies: number
  activeProxies: number
  totalRequests: number
  avgResponseTime: number
}

export interface RecentActivity {
  id: string
  type: 'request' | 'proxy_added' | 'proxy_removed'
  description: string
  timestamp: string
  status: 'success' | 'failed'
}
