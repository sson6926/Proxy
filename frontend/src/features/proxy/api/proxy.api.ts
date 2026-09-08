import { apiClient } from '../../../lib/api-client'

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

export const proxyApi = {
  getProxies: async (params?: { protocol?: string; country?: string; limit?: number }): Promise<ProxyListResponse> => {
    const response = await apiClient.get('/api/proxies/', { params })
    return response.data
  },

  getRandomProxy: async (protocol: string = 'http'): Promise<Proxy> => {
    const response = await apiClient.get('/api/proxies/random', { params: { protocol } })
    return response.data
  },

  requestProxy: async (data: GetProxyRequest): Promise<Proxy[]> => {
    const response = await apiClient.post('/api/proxies/request', data)
    return response.data
  },

  getProxyHealth: async (): Promise<any> => {
    const response = await apiClient.get('/api/proxies/health')
    return response.data
  },
}
