import { apiClient } from '../../../lib/api-client'

export interface User {
  id: string
  email: string
  username: string
  fullName?: string
  role: 'user' | 'admin'
  status: 'active' | 'inactive' | 'suspended'
  createdAt: string
  lastLogin?: string
}

export interface CreateUserRequest {
  email: string
  username: string
  password: string
  fullName?: string
  role?: 'user' | 'admin'
}

export const usersApi = {
  getUsers: async (): Promise<User[]> => {
    const response = await apiClient.get('/api/users/')
    return response.data
  },

  getUser: async (id: string): Promise<User> => {
    const response = await apiClient.get(`/api/users/${id}`)
    return response.data
  },

  createUser: async (data: CreateUserRequest): Promise<User> => {
    const response = await apiClient.post('/api/users/', data)
    return response.data
  },

  updateUser: async (id: string, data: Partial<User>): Promise<User> => {
    const response = await apiClient.put(`/api/users/${id}`, data)
    return response.data
  },

  deleteUser: async (id: string): Promise<void> => {
    await apiClient.delete(`/api/users/${id}`)
  },
}
