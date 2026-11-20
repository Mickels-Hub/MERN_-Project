import React, { useState, useEffect } from 'react';

export default function AdminActivityLogs() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const res = await fetch('/api/admin/overview');
        const data = await res.json();
        if (data.success) setLogs(data.activityLogs || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchLogs();
  }, []);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-3xl font-extrabold text-[#102A43]">System Activity Logs</h1>
        <p className="text-gray-500 text-sm mt-1">Real-time audit trail of administrative events and platform security logs.</p>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
        {loading ? (
          <p className="text-gray-500">Loading audit trail...</p>
        ) : logs.length === 0 ? (
          <p className="text-gray-400 py-8 text-center">No system logs recorded yet.</p>
        ) : (
          <div className="divide-y divide-gray-100">
            {logs.map((log) => (
              <div key={log._id} className="py-4 flex justify-between items-center">
                <div>
                  <p className="font-bold text-gray-900">{log.action}</p>
                  <p className="text-sm text-gray-500">{log.details}</p>
                </div>
                <span className="text-xs font-medium text-gray-400 bg-gray-50 px-3 py-1 rounded-full">
                  {new Date(log.createdAt).toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}