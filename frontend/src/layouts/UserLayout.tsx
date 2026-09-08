import { Outlet } from 'react-router-dom'
import { Sidebar } from './components/Sidebar'
import { TopNav } from './components/TopNav'
import { USER_ROUTES } from '../app/routes'

const userNavItems = [
  { label: 'Dashboard', path: USER_ROUTES.DASHBOARD, icon: '📊' },
  { label: 'Get Proxy', path: USER_ROUTES.GET_PROXY, icon: '🔌' },
  { label: 'Proxy Explorer', path: USER_ROUTES.PROXY_EXPLORER, icon: '🔍' },
  { label: 'API Keys', path: USER_ROUTES.API_KEYS, icon: '🔑' },
  { label: 'Usage', path: USER_ROUTES.USAGE, icon: '📈' },
  { label: 'API Docs', path: USER_ROUTES.API_DOCS, icon: '📖' },
  { label: 'Account', path: USER_ROUTES.ACCOUNT, icon: '👤' },
]

export function UserLayout() {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar items={userNavItems} title="Proxy Platform" />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopNav />
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
