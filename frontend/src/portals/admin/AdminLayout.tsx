import { Sidebar } from '../components/layout/Common'
import { ReactNode } from 'react'

interface AdminLayoutProps {
  children: ReactNode
}

const adminLinks = [
  { label: 'Overview', path: '/admin', icon: '📊' },
  { label: 'Proxy Inventory', path: '/admin/inventory', icon: '📦' },
  { label: 'Proxy Health', path: '/admin/health', icon: '❤️' },
  { label: 'Workers', path: '/admin/workers', icon: '⚙️' },
  { label: 'Sources', path: '/admin/sources', icon: '📡' },
  { label: 'Users', path: '/admin/users', icon: '👥' },
  { label: 'API Keys', path: '/admin/api-keys', icon: '🔑' },
  { label: 'Usage', path: '/admin/usage', icon: '📈' },
  { label: 'Audit Logs', path: '/admin/audit-logs', icon: '📋' },
  { label: 'System', path: '/admin/system', icon: '⚡' },
]

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar title="Admin Panel" links={adminLinks} />
      <div className="flex-1 overflow-auto">
        {children}
      </div>
    </div>
  )
}
