import { useQuery } from '@tanstack/react-query'
import { dashboardApi } from '../api/dashboard.api'

export function useDashboardStats() {
  return useQuery({
    queryKey: ['dashboardStats'],
    queryFn: dashboardApi.getStats,
  })
}

export function useRecentActivity() {
  return useQuery({
    queryKey: ['recentActivity'],
    queryFn: dashboardApi.getRecentActivity,
  })
}
