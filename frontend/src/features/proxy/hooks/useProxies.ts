import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { proxyApi } from '../api/proxy.api'
import { GetProxyRequest } from '../types/proxy.types'

export function useProxies(params?: { protocol?: string; country?: string; limit?: number }) {
  return useQuery({
    queryKey: ['proxies', params],
    queryFn: () => proxyApi.getProxies(params),
  })
}

export function useRandomProxy(protocol: string = 'http') {
  return useQuery({
    queryKey: ['randomProxy', protocol],
    queryFn: () => proxyApi.getRandomProxy(protocol),
    enabled: false, // Only fetch when manually triggered
  })
}

export function useRequestProxy() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (data: GetProxyRequest) => proxyApi.requestProxy(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['proxies'] })
    },
  })
}

export function useProxyHealth() {
  return useQuery({
    queryKey: ['proxyHealth'],
    queryFn: proxyApi.getProxyHealth,
    refetchInterval: 30000, // Refresh every 30 seconds
  })
}
