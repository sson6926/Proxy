export interface Proxy {
  id: string
  ip: string
  port: number
  protocol: 'http' | 'https' | 'socks5'
  country: string
  city?: string
  status: 'active' | 'inactive' | 'maintenance'
  responseTime: number
  lastChecked: string
  uptime: number
}

export interface ProxyListResponse {
  proxies: Proxy[]
  total: number
}

export interface GetProxyRequest {
  protocol?: string
  country?: string
  quantity?: number
}

export interface ProxyHealthMetrics {
  totalProxies: number
  activeProxies: number
  averageResponseTime: number
  uptime: number
}
