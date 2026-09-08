import { ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'

interface NavLink {
  label: string
  path: string
  icon?: string
}

interface SidebarProps {
  title: string
  links: NavLink[]
  children?: ReactNode
}

export function Sidebar({ title, links }: SidebarProps) {
  const location = useLocation()
  
  return (
    <aside className="w-64 bg-white border-r border-gray-200 h-screen sticky top-0">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
      </div>
      
      <nav className="px-4 space-y-2">
        {links.map((link) => {
          const isActive = location.pathname === link.path
          return (
            <Link
              key={link.path}
              to={link.path}
              className={`block px-4 py-2 rounded-lg transition-colors ${
                isActive
                  ? 'bg-blue-50 text-blue-600 font-medium'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              {link.icon && <span className="mr-3">{link.icon}</span>}
              {link.label}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}

interface TopNavProps {
  title: string
  actions?: ReactNode
}

export function TopNav({ title, actions }: TopNavProps) {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="px-6 py-4 flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
        <div className="flex items-center gap-4">
          {actions}
        </div>
      </div>
    </header>
  )
}

interface DataTableProps {
  columns: { label: string; key: string }[]
  data: Record<string, any>[]
  actions?: (row: any) => ReactNode
}

export function DataTable({ columns, data, actions }: DataTableProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            {columns.map((col) => (
              <th key={col.key} className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                {col.label}
              </th>
            ))}
            {actions && <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Actions</th>}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {data.map((row, idx) => (
            <tr key={idx} className="hover:bg-gray-50">
              {columns.map((col) => (
                <td key={col.key} className="px-6 py-4 text-sm text-gray-900">
                  {row[col.key]}
                </td>
              ))}
              {actions && (
                <td className="px-6 py-4 text-sm">
                  {actions(row)}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
