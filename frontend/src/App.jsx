import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import LoginPage from './features/auth/Login'
import RegisterPage from './features/auth/Register'
import DashboardPage from './features/dashboard/Dashboard'
import AdminLayout from './layouts/AdminLayout'

// Admin Feature Pages
import AdminOverview from './features/admin/overview/AdminDashboard'
import ProxyHealthDashboard from './features/admin/proxy-health/ProxyHealthDashboard'
import APIUsageStats from './features/admin/usage-stats/APIUsageStats'
import AuditLogs from './features/admin/audit-logs/AuditLogs'
import WorkerManagement from './features/admin/workers/WorkerManagement'

import { useAuthStore } from './stores/authStore'

// Route Guards
function ProtectedRoute({ children }) {
  const user = useAuthStore((state) => state.user)
  return user ? children : <Navigate to="/login" replace />
}

function AdminRoute({ children }) {
  const user = useAuthStore((state) => state.user)
  
  if (!user) {
    return <Navigate to="/login" replace />
  }
  
  if (!user.is_admin) {
    return <Navigate to="/dashboard" replace />
  }
  
  return children
}

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      <Routes>
        {/* Auth Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        
        {/* User Dashboard (Protected) */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        
        {/* Admin Routes with Layout */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }
        >
          <Route index element={<AdminOverview />} />
          <Route path="proxy-health" element={<ProxyHealthDashboard />} />
          <Route path="usage-stats" element={<APIUsageStats />} />
          <Route path="audit-logs" element={<AuditLogs />} />
          <Route path="workers" element={<WorkerManagement />} />
        </Route>
        
        {/* Default redirect */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
