import { ReactNode } from 'react'

interface EmptyStateProps {
  title: string
  description: string
  action?: ReactNode
  icon?: string
}

export function EmptyState({ title, description, action, icon = '📦' }: EmptyStateProps) {
  return (
    <div className="text-center py-12 px-4 bg-gray-50 rounded-lg border border-dashed border-gray-300">
      <div className="text-6xl mb-4">{icon}</div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-sm text-gray-500 mb-6 max-w-sm mx-auto">{description}</p>
      {action && <div className="flex justify-center">{action}</div>}
    </div>
  )
}

export function EmptyTableState({ title, description, action }: EmptyStateProps) {
  return (
    <div className="py-12">
      <EmptyState title={title} description={description} action={action} />
    </div>
  )
}

export function EmptyDashboardState({ title, description, action }: EmptyStateProps) {
  return (
    <div className="py-8">
      <EmptyState title={title} description={description} action={action} />
    </div>
  )
}
