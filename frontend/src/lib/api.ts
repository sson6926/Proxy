import axios from 'axios'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'
const DATA_PLANE_URL = process.env.NEXT_PUBLIC_DATA_PLANE_URL || 'http://localhost:8001'

// Control Plane API
export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Data Plane API
export const dataPlaneApi = axios.create({
  baseURL: DATA_PLANE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add auth token to requests
api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
  }
  return config
})

dataPlaneApi.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const apiKey = localStorage.getItem('api_key')
    if (apiKey) {
      config.headers.Authorization = `Bearer ${apiKey}`
    }
  }
  return config
})

// Auth API
export const authAPI = {
  register: (data: { email: string; username: string; password: string }) =>
    api.post('/api/auth/register', data),
  
  login: (username: string, password: string) => {
    const formData = new FormData()
    formData.append('username', username)
    formData.append('password', password)
    return api.post('/api/auth/login', formData, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    })
  },
  
  getMe: () => api.get('/api/auth/me'),
}

// API Keys
export const keysAPI = {
  list: () => api.get('/api/keys'),
  
  create: (name: string) => api.post('/api/keys', { name }),
  
  revoke: (keyId: number) => api.delete(`/api/keys/${keyId}`),
}

// Plans
export const plansAPI = {
  list: () => api.get('/api/plans'),
  
  get: (planId: number) => api.get(`/api/plans/${planId}`),
}

// Proxy
export const proxyAPI = {
  getProxy: (params?: { country?: string; min_score?: number }) =>
    dataPlaneApi.get('/api/v1/proxy', { params }),
  
  getProxies: (params?: { limit?: number; country?: string; min_score?: number }) =>
    dataPlaneApi.get('/api/v1/proxies', { params }),
  
  getPools: () => dataPlaneApi.get('/api/v1/pools'),
}
