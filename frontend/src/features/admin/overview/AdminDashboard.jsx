import React from 'react';

export default function AdminOverview() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="text-sm text-gray-600 mb-2">Total Users</div>
          <div className="text-3xl font-bold text-blue-600">12</div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="text-sm text-gray-600 mb-2">Total Proxies</div>
          <div className="text-3xl font-bold text-green-600">147</div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="text-sm text-gray-600 mb-2">API Keys</div>
          <div className="text-3xl font-bold text-purple-600">5</div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="text-sm text-gray-600 mb-2">Requests Today</div>
          <div className="text-3xl font-bold text-indigo-600">1,845</div>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center py-2 border-b">
              <span className="text-sm">New user registered</span>
              <span className="text-xs text-gray-500">2 min ago</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b">
              <span className="text-sm">API key created</span>
              <span className="text-xs text-gray-500">15 min ago</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b">
              <span className="text-sm">Proxy health check passed</span>
              <span className="text-xs text-gray-500">30 min ago</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold mb-4">System Status</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm">Control Plane</span>
              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">Healthy</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Data Plane</span>
              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">Healthy</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Workers</span>
              <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium">3/5 Active</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
