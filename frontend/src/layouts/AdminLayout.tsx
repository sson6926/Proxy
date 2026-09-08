import { Outlet } from 'react-router-dom'
import { Sidebar } from './components/Sidebar'
import { TopNav } from './components/TopNav'
import { ADMIN_ROUTES } from '../app/routes'

const adminNavItems = [
  { label: 'Overview', path: ADMIN_ROUTES.OVERVIEW, icon: '📊' },
  { label: 'Proxy Inventory', path: ADMIN_ROUTES.PROXY_INVENTORY, icon: '📦' },
  { label: 'Proxy Health', path: ADMIN_ROUTES.PROXY_HEALTH, icon: '💚' },
  { label: 'Workers', path: ADMIN_ROUTES.WORKERS, icon: '⚙️' },
  { label: 'Sources', path: ADMIN_ROUTES.SOURCES, icon: '🌐' },
  { label: 'Users', path: ADMIN_ROUTES.USERS, icon: '👥' },
  { label: 'API Keys', path: ADMIN_ROUTES.API_KEYS, icon: '🔑' },
  { label: 'Usage', path: ADMIN_ROUTES.USAGE, icon: '📈' },
  { label: 'Audit Logs', path: ADMIN_ROUTES.AUDIT_LOGS, icon: '📋' },
  { label: 'System', path: ADMIN_ROUTES.SYSTEM, icon: '🔧' },
]

export function AdminLayout() {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar items={adminNavItems} title="Admin Portal" />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopNav />
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
