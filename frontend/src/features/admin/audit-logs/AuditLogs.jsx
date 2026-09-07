import React, { useState, useEffect } from 'react';

export default function AuditLogs() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const actions = ['user.create', 'key.create', 'worker.start', 'proxy.cleanup', 'admin.login'];
    const interval = setInterval(() => {
      setLogs(actions.map((action, i) => ({
        id: i,
        timestamp: new Date().toISOString(),
        action: action,
        user: 'admin',
        success: true
      })));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="card">
      <div className="card-header">
        <h2 className="text-xl font-semibold">Audit Logs</h2>
      </div>
      <div className="card-body overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr><th>Time</th><th>Action</th><th>User</th><th>Status</th></tr>
          </thead>
          <tbody>
            {logs.map((log) => (
              <tr key={log.id}>
                <td>{log.timestamp.slice(11, 19)}</td>
                <td>{log.action}</td>
                <td>{log.user}</td>
                <td className={log.success ? 'text-green-600' : 'text-red-600'}>{log.success ? '✓' : '✗'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
