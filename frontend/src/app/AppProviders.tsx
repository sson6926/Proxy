import { ReactNode } from 'react'
import { QueryProvider } from './providers/QueryProvider'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from '../features/auth'
import { ToastProvider } from '../components/toast/ToastProvider'

interface AppProvidersProps {
  children: ReactNode
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <BrowserRouter>
      <QueryProvider>
        <AuthProvider>
          <ToastProvider />
          {children}
        </AuthProvider>
      </QueryProvider>
    </BrowserRouter>
  )
}
