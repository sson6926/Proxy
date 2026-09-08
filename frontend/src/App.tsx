import { Routes, Route, Navigate } from 'react-router-dom'
import UserPortal from './portals/user'
import AdminPortal from './portals/admin'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/*" element={<UserPortal />} />
      <Route path="/admin/*" element={<AdminPortal />} />
    </Routes>
  )
}

export default App
