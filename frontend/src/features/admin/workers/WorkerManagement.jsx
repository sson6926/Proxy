import React, { useState, useEffect } from 'react';
import { api } from '../../../lib/api';
import toast from 'react-hot-toast';

export default function WorkerManagement() {
  const [workerStatus, setWorkerStatus] = useState(null);
  const [metrics, setMetrics] = useState(null);
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [triggering, setTriggering] = useState(false);

  useEffect(() => {
    fetchWorkerData();
    const interval = setInterval(fetchWorkerData, 5000); // Refresh every 5s
    return () => clearInterval(interval);
  }, []);

  const fetchWorkerData = async () => {
    try {
      const [statusRes, metricsRes, logsRes] = await Promise.all([
        api.get('/api/admin/workers/status'),
        api.get('/api/admin/workers/metrics'),
        api.get('/api/admin/workers/logs?limit=20')
      ]);
      
      setWorkerStatus(statusRes.data);
      setMetrics(metricsRes.data);
      setLogs(logsRes.data.logs || []);
    } catch (error) {
      console.error('Failed to fetch worker data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleWorker = async () => {
    try {
      const newState = !workerStatus.running;
      await api.post(`/api/admin/workers/toggle?enabled=${newState}`);
      toast.success(`Worker ${newState ? 'started' : 'stopped'}`);
      fetchWorkerData();
    } catch (error) {
      toast.error('Failed to toggle worker');
    }
  };

  const handleTriggerScrape = async () => {
    setTriggering(true);
    try {
      await api.post('/api/admin/workers/trigger-scrape');
      toast.success('Scrape cycle triggered!');
      setTimeout(fetchWorkerData, 2000);
    } catch (error) {
      toast.error('Failed to trigger scrape');
    } finally {
      setTriggering(false);
    }
  };

  const handleRestartWorker = async () => {
    try {
      await api.post('/api/admin/workers/restart');
      toast.success('Worker restarted');
      fetchWorkerData();
    } catch (error) {
      toast.error('Failed to restart worker');
    }
  };

  const handleClearLogs = async () => {
    try {
      await api.post('/api/admin/workers/clear-logs');
      toast.success('Logs cleared');
      setLogs([]);
    } catch (error) {
      toast.error('Failed to clear logs');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-600">Loading worker data...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Worker Status Card */}
      <div className="card">
        <div className="card-header flex justify-between items-center">
          <h2 className="text-xl font-semibold">Worker Status</h2>
          <div className="flex gap-2">
            <button
              onClick={handleToggleWorker}
              className={`btn ${workerStatus?.running ? 'btn-danger' : 'btn-success'}`}
            >
              {workerStatus?.running ? '⏸ Stop Worker' : '▶️ Start Worker'}
            </button>
            <button
              onClick={handleTriggerScrape}
              disabled={triggering || !workerStatus?.running}
              className="btn btn-primary"
            >
              {triggering ? '🔄 Triggering...' : '🚀 Trigger Scrape'}
            </button>
            <button
              onClick={handleRestartWorker}
              className="btn btn-secondary"
            >
              🔄 Restart
            </button>
          </div>
        </div>
        <div className="card-body">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-gray-600">Status</p>
              <p className="font-semibold text-lg">
                {workerStatus?.running ? (
                  <span className="text-green-600">● Running</span>
                ) : (
                  <span className="text-red-600">● Stopped</span>
                )}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Uptime</p>
              <p className="font-semibold text-lg">{workerStatus?.uptime || 'N/A'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Last Run</p>
              <p className="font-semibold text-lg">
                {workerStatus?.last_run 
                  ? new Date(workerStatus.last_run).toLocaleTimeString()
                  : 'Never'}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Next Run</p>
              <p className="font-semibold text-lg">{workerStatus?.next_run || 'N/A'}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="stat-card">
          <div className="stat-label">Total Runs</div>
          <div className="stat-value text-blue-600">{metrics?.total_runs || 0}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Proxies Found</div>
          <div className="stat-value text-green-600">{metrics?.total_proxies_found || 0}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Proxies Alive</div>
          <div className="stat-value text-emerald-600">{metrics?.total_proxies_alive || 0}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Success Rate</div>
          <div className="stat-value text-purple-600">
            {((metrics?.success_rate || 0) * 100).toFixed(1)}%
          </div>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="card">
        <div className="card-header">
          <h2 className="text-xl font-semibold">Performance Metrics</h2>
        </div>
        <div className="card-body">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="p-3 bg-gray-50 rounded">
              <p className="text-sm text-gray-600">Average Duration</p>
              <p className="font-semibold text-lg">{metrics?.average_duration || 'N/A'}</p>
            </div>
            <div className="p-3 bg-gray-50 rounded">
              <p className="text-sm text-gray-600">Failure Count</p>
              <p className="font-semibold text-lg">{metrics?.failure_count || 0}</p>
            </div>
            <div className="p-3 bg-gray-50 rounded">
              <p className="text-sm text-gray-600">Uptime %</p>
              <p className="font-semibold text-lg">{metrics?.uptime_percentage || 0}%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Real-time Logs */}
      <div className="card">
        <div className="card-header flex justify-between items-center">
          <h2 className="text-xl font-semibold">Worker Logs (Real-time)</h2>
          <button
            onClick={handleClearLogs}
            className="text-sm text-red-600 hover:text-red-800"
          >
            Clear Logs
          </button>
        </div>
        <div className="card-body">
          <div className="bg-gray-900 text-gray-100 p-4 rounded font-mono text-sm h-96 overflow-y-auto">
            {logs.length === 0 ? (
              <p className="text-gray-500">No logs available</p>
            ) : (
              <div className="space-y-1">
                {logs.map((log, index) => (
                  <div key={index} className="flex gap-2">
                    <span className="text-gray-500">{log.timestamp}</span>
                    <span
                      className={`font-semibold ${
                        log.level === 'ERROR'
                          ? 'text-red-400'
                          : log.level === 'WARNING'
                          ? 'text-yellow-400'
                          : 'text-green-400'
                      }`}
                    >
                      [{log.level}]
                    </span>
                    <span>{log.message}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Status Summary */}
      <div className="card">
        <div className="card-header">
          <h2 className="text-xl font-semibold">Status Summary</h2>
        </div>
        <div className="card-body">
          <ul className="space-y-2">
            <li className="flex justify-between">
              <span className="text-gray-600">Worker Process:</span>
              <span className={`badge ${workerStatus?.running ? 'badge-success' : 'badge-danger'}`}>
                {workerStatus?.running ? 'Running' : 'Stopped'}
              </span>
            </li>
            <li className="flex justify-between">
              <span className="text-gray-600">Last Successful Run:</span>
              <span className="font-semibold">
                {workerStatus?.last_success
                  ? new Date(workerStatus.last_success).toLocaleString()
                  : 'Never'}
              </span>
            </li>
            <li className="flex justify-between">
              <span className="text-gray-600">Total Cycles:</span>
              <span className="font-semibold">{metrics?.total_runs || 0}</span>
            </li>
            <li className="flex justify-between">
              <span className="text-gray-600">Success Rate:</span>
              <span className="font-semibold text-green-600">
                {((metrics?.success_rate || 0) * 100).toFixed(1)}%
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
