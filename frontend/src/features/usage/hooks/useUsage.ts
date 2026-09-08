import { useQuery } from '@tanstack/react-query'
import { usageApi } from '../api/usage.api'

export function useUsageStats(period: 'day' | 'week' | 'month' = 'day') {
  return useQuery({
    queryKey: ['usageStats', period],
    queryFn: () => usageApi.getUsageStats(period),
  })
}

export function useUsageHistory(period: 'day' | 'week' | 'month' = 'month') {
  return useQuery({
    queryKey: ['usageHistory', period],
    queryFn: () => usageApi.getUsageHistory(period),
  })
}

export function useQuota() {
  return useQuery({
    queryKey: ['quota'],
    queryFn: usageApi.getQuota,
  })
}
