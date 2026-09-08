import { apiClient } from '../../../lib/api-client'

export interface ApiKey {
  id: string
  key: string
  name: string
  createdAt: string
  lastUsed?: string
  expiresAt?: string
  status: 'active' | 'inactive' | 'expired'
  permissions: string[]
}

export interface CreateApiKeyRequest {
  name: string
  permissions?: string[]
  expiresAt?: string
}

export const apiKeysApi = {
  getApiKeys: async (): Promise<ApiKey[]> => {
    const response = await apiClient.get('/api/api-keys/')
    return response.data
  },

  createApiKey: async (data: CreateApiKeyRequest): Promise<ApiKey> => {
    const response = await apiClient.post('/api/api-keys/', data)
    return response.data
  },

  deleteApiKey: async (id: string): Promise<void> => {
    await apiClient.delete(`/api/api-keys/${id}`)
  },

  regenerateApiKey: async (id: string): Promise<ApiKey> => {
    const response = await apiClient.post(`/api/api-keys/${id}/regenerate`)
    return response.data
  },
}
