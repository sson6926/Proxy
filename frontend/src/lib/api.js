import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://son.lab'
const DATA_PLANE_URL = import.meta.env.VITE_DATA_PLANE_URL || 'http://son.lab/api/v1'

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
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

dataPlaneApi.interceptors.request.use((config) => {
  const apiKey = localStorage.getItem('api_key')
  if (apiKey) {
    config.headers.Authorization = `Bearer ${apiKey}`
  }
  return config
})

// Auth API
export const authAPI = {
  register: (data) =>
    api.post('/api/auth/register', data),
  
  login: (username, password) => {
    const formData = new URLSearchParams()
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
  
  create: (name) => api.post('/api/keys', { name }),
  
  revoke: (keyId) => api.delete(`/api/keys/${keyId}`),
}

// Plans
export const plansAPI = {
  list: () => api.get('/api/plans'),
  
  get: (planId) => api.get(`/api/plans/${planId}`),
}

// Proxy
export const proxyAPI = {
  getProxy: (params) =>
    dataPlaneApi.get('/proxy', { params }),
  
  getProxies: (params) =>
    dataPlaneApi.get('/proxies', { params }),
  
  getPools: () => dataPlaneApi.get('/pools'),
}
