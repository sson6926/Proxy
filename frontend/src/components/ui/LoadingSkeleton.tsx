import { Skeleton } from '@tanstack/react-loading-skeleton'
import '@tanstack/react-loading-skeleton/dist/skeleton.css'

interface LoadingCardProps {
  count?: number
  height?: number
}

export function LoadingCard({ count = 3, height = 100 }: LoadingCardProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="p-4 rounded-lg bg-white shadow-sm border border-gray-200">
          <Skeleton height={height} />
        </div>
      ))}
    </div>
  )
}

export function LoadingTable({ rows = 5, columns = 4 }: { rows?: number; columns?: number }) {
  return (
    <div className="space-y-2">
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={rowIndex} className="flex gap-4 p-4 border-b border-gray-100 last:border-0">
          {Array.from({ length: columns }).map((_, colIndex) => (
            <Skeleton key={colIndex} width={100 + Math.random() * 50} height={20} />
          ))}
        </div>
      ))}
    </div>
  )
}

export function LoadingChart() {
  return (
    <div className="h-64 p-4 rounded-lg bg-white shadow-sm border border-gray-200 flex items-center justify-center">
      <Skeleton width="100%" height="100%" />
    </div>
  )
}

export function LoadingEmptyState() {
  return (
    <div className="text-center py-12">
      <Skeleton width={48} height={48} className="mx-auto mb-4 rounded-full" />
      <Skeleton width={200} height={24} className="mx-auto mb-2" />
      <Skeleton width={300} height={16} className="mx-auto" />
    </div>
  )
}

export function LoadingSkeleton({ count = 1, height = 20, width = '100%' }: { count?: number; height?: number; width?: string | number }) {
  return (
    <div className="space-y-2">
      {Array.from({ length: count }).map((_, i) => (
        <Skeleton key={i} height={height} width={width} />
      ))}
    </div>
  )
}
