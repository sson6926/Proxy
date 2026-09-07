import api from './api';

export const adminApi = {
  // Statistics
  getStats: () => api.get('/api/admin/stats'),
  
  // Users
  getUsers: (skip = 0, limit = 50) => 
    api.get(`/api/admin/users?skip=${skip}&limit=${limit}`),
  
  getUser: (userId) => api.get(`/api/admin/users/${userId}`),
  
  updateUser: (userId, data) => 
    api.patch(`/api/admin/users/${userId}`, data),
  
  // API Keys
  getApiKeys: (skip = 0, limit = 50) => 
    api.get(`/api/admin/api-keys?skip=${skip}&limit=${limit}`),
  
  // System Health
  getHealth: () => api.get('/api/admin/health'),
  
  // Worker Control
  toggleWorker: (enabled) => 
    api.post('/api/admin/workers/toggle', { enabled }),
  
  triggerScrape: () => 
    api.post('/api/admin/workers/trigger-scrape'),
  
  // Proxies
  getProxies: (filters = {}) => {
    const params = new URLSearchParams();
    if (filters.status) params.append('status', filters.status);
    if (filters.country) params.append('country', filters.country);
    if (filters.limit) params.append('limit', filters.limit);
    if (filters.skip) params.append('skip', filters.skip);
    
    return api.get(`/api/admin/proxies?${params.toString()}`);
  },
  
  deleteProxy: (proxyId) => 
    api.delete(`/api/admin/proxies/${proxyId}`),
  
  retryFailedProxies: () => 
    api.post('/api/admin/proxies/retry'),
};

export default adminApi;