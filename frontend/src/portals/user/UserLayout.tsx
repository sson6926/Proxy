import { Sidebar } from '../components/layout/Common'
import { ReactNode } from 'react'

interface UserLayoutProps {
  children: ReactNode
}

const userLinks = [
  { label: 'Dashboard', path: '/dashboard', icon: '📊' },
  { label: 'Get Proxy', path: '/get-proxy', icon: '🔌' },
  { label: 'Proxy Explorer', path: '/explorer', icon: '🔍' },
  { label: 'API Keys', path: '/api-keys', icon: '🔑' },
  { label: 'Usage & Quota', path: '/usage', icon: '📈' },
  { label: 'API Docs', path: '/docs', icon: '📚' },
  { label: 'Account', path: '/account', icon: '👤' },
]

export default function UserLayout({ children }: UserLayoutProps) {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar title="Proxy Platform" links={userLinks} />
      <div className="flex-1 overflow-auto">
        {children}
      </div>
    </div>
  )
}
