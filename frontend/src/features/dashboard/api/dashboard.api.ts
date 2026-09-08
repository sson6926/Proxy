import axios from 'axios'
import { DashboardStats, RecentActivity } from '../types/dashboard.types'

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'

export const dashboardApi = {
  getStats: async (): Promise<DashboardStats> => {
    const response = await axios.get(`${API_BASE}/api/dashboard/stats`)
    return response.data
  },

  getRecentActivity: async (): Promise<RecentActivity[]> => {
    const response = await axios.get(`${API_BASE}/api/dashboard/activity`)
    return response.data
  },
}
