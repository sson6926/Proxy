import React, { useState, useEffect } from 'react';
import { api } from '../../../lib/api';

export default function APIUsageStats() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setStats({
        total_requests_today: 1845,
        total_requests_month: 45678,
        success_rate: 98.2,
        avg_response_time: 85
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  if (loading) return <div className="text-center py-8 text-gray-600">Loading usage stats...</div>;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="stat-card"><div className="stat-label">Requests Today</div><div className="stat-value">{stats?.total_requests_today}</div></div>
        <div className="stat-card"><div className="stat-label">Requests Month</div><div className="stat-value">{stats?.total_requests_month}</div></div>
        <div className="stat-card"><div className="stat-label">Success Rate</div><div className="stat-value text-green-600">{stats?.success_rate}%</div></div>
        <div className="stat-card"><div className="stat-label">Avg Response</div><div className="stat-value text-purple-600">{stats?.avg_response_time}ms</div></div>
      </div>
    </div>
  );
}
