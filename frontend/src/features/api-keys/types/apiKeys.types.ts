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
