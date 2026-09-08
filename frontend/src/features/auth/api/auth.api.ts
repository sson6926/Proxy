import { apiClient } from '../../../lib/api-client'
import { LoginRequest, RegisterRequest, AuthResponse } from '../types/auth.types'

export const authApi = {
  login: async (data: LoginRequest): Promise<AuthResponse> => {
    const formData = new FormData()
    formData.append('username', data.email)
    formData.append('password', data.password)
    
    const response = await apiClient.post('/api/auth/login', formData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
    return response.data
  },

  register: async (data: RegisterRequest): Promise<AuthResponse> => {
    const response = await apiClient.post('/api/auth/register', data)
    return response.data
  },

  logout: async (): Promise<void> => {
    await apiClient.post('/api/auth/logout')
  },

  getCurrentUser: async () => {
    const response = await apiClient.get('/api/auth/me')
    return response.data
  },

  refreshToken: async (): Promise<AuthResponse> => {
    const response = await apiClient.post('/api/auth/refresh')
    return response.data
  },
}
