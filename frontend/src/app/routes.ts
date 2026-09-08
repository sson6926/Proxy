// User Routes
export const USER_ROUTES = {
  DASHBOARD: '/',
  GET_PROXY: '/get-proxy',
  PROXY_EXPLORER: '/proxy-explorer',
  API_KEYS: '/api-keys',
  USAGE: '/usage',
  API_DOCS: '/api-docs',
  ACCOUNT: '/account',
} as const

// Admin Routes
export const ADMIN_ROUTES = {
  OVERVIEW: '/admin',
  PROXY_INVENTORY: '/admin/proxy-inventory',
  PROXY_HEALTH: '/admin/proxy-health',
  WORKERS: '/admin/workers',
  SOURCES: '/admin/sources',
  USERS: '/admin/users',
  API_KEYS: '/admin/api-keys',
  USAGE: '/admin/usage',
  AUDIT_LOGS: '/admin/audit-logs',
  SYSTEM: '/admin/system',
} as const

export type UserRouteKey = keyof typeof USER_ROUTES
export type AdminRouteKey = keyof typeof ADMIN_ROUTES
