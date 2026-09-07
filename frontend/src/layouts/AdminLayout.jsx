import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import { useNavigate } from 'react-router-dom';

const AdminLayout = () => {
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { path: '/admin', label: '📊 Overview', icon: '📊' },
    { path: '/admin/proxy-health', label: '🏥 Proxy Health', icon: '🏥' },
    { path: '/admin/usage-stats', label: '📈 Usage Stats', icon: '📈' },
    { path: '/admin/audit-logs', label: '📝 Audit Logs', icon: '📝' },
    { path: '/admin/workers', label: '⚙️ Worker Control', icon: '⚙️' },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 text-white flex flex-col">
        <div className="p-6">
          <h2 className="text-2xl font-bold">Admin Panel</h2>
          <p className="text-gray-400 text-sm mt-1">Feature-based Navigation</p>
        </div>
        
        <nav className="flex-1 px-4 space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/admin'}
              className={({ isActive }) =>
                `flex items-center px-4 py-3 rounded-lg transition-colors ${
                  isActive 
                    ? 'bg-blue-600 text-white' 
                    : 'hover:bg-gray-800 text-gray-200'
                }`
              }
            >
              <span className="mr-3">{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
          
          <div className="pt-8 mt-8 border-t border-gray-700">
            <button
              onClick={handleLogout}
              className="flex items-center px-4 py-3 rounded-lg hover:bg-red-900 text-red-300 w-full text-left"
            >
              <span className="mr-3">🚪</span>
              Logout
            </button>
          </div>
        </nav>
        
        <div className="p-4 text-sm text-gray-400 border-t border-gray-700">
          <p>Proxy Platform v1.0</p>
          <p className="text-xs">Feature-based architecture</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;