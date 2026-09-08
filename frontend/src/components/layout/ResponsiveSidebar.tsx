import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../../../features/auth'
import { LogoutButton } from '../../../features/auth/components/LogoutButton'
import { Menu, X } from 'lucide-react'

interface SidebarLink {
  label: string
  path: string
  icon: string
}

interface SidebarProps {
  links: SidebarLink[]
}

export function ResponsiveSidebar({ links }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()
  const { user } = useAuth()

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-lg bg-white border border-gray-200 hover:bg-gray-50"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 transform lg:transform-none transition-transform duration-200 z-40
        w-64 bg-white border-r border-gray-200 overflow-y-auto
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-900">Proxy Platform</h1>
          <p className="text-sm text-gray-500 mt-1">{user?.role === 'admin' ? '👨‍💼 Admin' : '👤 User'}</p>
        </div>

        <nav className="px-4 py-2 space-y-2">
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg text-sm transition ${
                location.pathname === link.path
                  ? 'bg-blue-50 text-blue-600 font-medium'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <span className="text-lg">{link.icon}</span>
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="absolute bottom-6 left-6 right-6">
          <LogoutButton variant="secondary" className="w-full" />
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 lg:hidden z-30"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  )
}
