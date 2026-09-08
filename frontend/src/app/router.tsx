import { Routes, Route, Navigate } from 'react-router-dom'
import { USER_ROUTES, ADMIN_ROUTES } from './routes'

// Auth
import { LoginPage, RegisterPage, ProtectedRoute } from '../features/auth'

// Layouts
import { UserLayout } from '../layouts/UserLayout'
import { AdminLayout } from '../layouts/AdminLayout'

// User Pages
import { DashboardPage } from '../features/dashboard/pages/DashboardPage'
import { GetProxyPage } from '../features/proxy/pages/GetProxyPage'
import { ProxyExplorerPage } from '../features/proxy/pages/ProxyExplorerPage'
import { UserApiKeysPage } from '../features/api-keys/pages/UserApiKeysPage'
import { UserUsagePage } from '../features/usage/pages/UserUsagePage'
import { ApiDocsPage } from '../features/docs/pages/ApiDocsPage'
import { AccountPage } from '../features/account/pages/AccountPage'

// Admin Pages
import { AdminOverviewPage } from '../features/admin-overview/pages/AdminOverviewPage'
import { ProxyInventoryPage } from '../features/proxy/pages/ProxyInventoryPage'
import { ProxyHealthPage } from '../features/proxy/pages/ProxyHealthPage'
import { WorkersPage } from '../features/workers/pages/WorkersPage'
import { SourcesPage } from '../features/sources/pages/SourcesPage'
import { UsersPage } from '../features/users/pages/UsersPage'
import { AdminApiKeysPage } from '../features/api-keys/pages/AdminApiKeysPage'
import { AdminUsagePage } from '../features/usage/pages/AdminUsagePage'
import { AuditLogsPage } from '../features/audit-logs/pages/AuditLogsPage'

export function AppRouter() {
  return (
    <Routes>
      {/* Auth Routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      
      {/* Redirect root to dashboard */}
      <Route path="/" element={<Navigate to={USER_ROUTES.DASHBOARD} replace />} />
      
      {/* User Portal Routes - Protected */}
      <Route
        element={
          <ProtectedRoute>
            <UserLayout />
          </ProtectedRoute>
        }
      >
        <Route path={USER_ROUTES.DASHBOARD} element={<DashboardPage />} />
        <Route path={USER_ROUTES.GET_PROXY} element={<GetProxyPage />} />
        <Route path={USER_ROUTES.PROXY_EXPLORER} element={<ProxyExplorerPage />} />
        <Route path={USER_ROUTES.API_KEYS} element={<UserApiKeysPage />} />
        <Route path={USER_ROUTES.USAGE} element={<UserUsagePage />} />
        <Route path={USER_ROUTES.API_DOCS} element={<ApiDocsPage />} />
        <Route path={USER_ROUTES.ACCOUNT} element={<AccountPage />} />
      </Route>
      
      {/* Admin Portal Routes - Protected */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute requiredRole="admin">
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminOverviewPage />} />
        <Route path={ADMIN_ROUTES.PROXY_INVENTORY.replace('/admin/', '')} element={<ProxyInventoryPage />} />
        <Route path={ADMIN_ROUTES.PROXY_HEALTH.replace('/admin/', '')} element={<ProxyHealthPage />} />
        <Route path={ADMIN_ROUTES.WORKERS.replace('/admin/', '')} element={<WorkersPage />} />
        <Route path={ADMIN_ROUTES.SOURCES.replace('/admin/', '')} element={<SourcesPage />} />
        <Route path={ADMIN_ROUTES.USERS.replace('/admin/', '')} element={<UsersPage />} />
        <Route path={ADMIN_ROUTES.API_KEYS.replace('/admin/', '')} element={<AdminApiKeysPage />} />
        <Route path={ADMIN_ROUTES.USAGE.replace('/admin/', '')} element={<AdminUsagePage />} />
        <Route path={ADMIN_ROUTES.AUDIT_LOGS.replace('/admin/', '')} element={<AuditLogsPage />} />
      </Route>
      
      {/* Catch-all redirect */}
      <Route path="*" element={<Navigate to={USER_ROUTES.DASHBOARD} replace />} />
    </Routes>
  )
}
