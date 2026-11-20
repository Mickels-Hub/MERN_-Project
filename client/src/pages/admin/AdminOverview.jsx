import React, { useEffect, useState } from 'react';

export default function AdminOverview() {
  const [stats, setStats] = useState(null);
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOverview = async () => {
      try {
        const res = await fetch('/api/admin/overview');
        const data = await res.json();
        if (data.success) {
          setStats(data.stats);
          setLogs(data.activityLogs);
        }
      } catch (error) {
        console.error('Error loading admin overview:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchOverview();
  }, []);

  if (loading) return <div className="p-6 text-gray-500">Loading Admin Dashboard...</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-[#102A43]">Admin Overview</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <p className="text-sm font-medium text-gray-500">Registered Users</p>
          <h3 className="text-3xl font-bold text-[#102A43] mt-2">{stats?.registeredUsers || 0}</h3>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <p className="text-sm font-medium text-gray-500">Total Properties</p>
          <h3 className="text-3xl font-bold text-[#102A43] mt-2">{stats?.totalProperties || 0}</h3>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <p className="text-sm font-medium text-gray-500">Total Revenue (₦)</p>
          <h3 className="text-3xl font-bold text-[#13865D] mt-2">₦{stats?.totalRevenue?.toLocaleString() || 0}</h3>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <p className="text-sm font-medium text-gray-500">Pending Requests</p>
          <h3 className="text-3xl font-bold text-amber-600 mt-2">{stats?.pendingRequests || 0}</h3>
        </div>
      </div>

      {/* Recent Activity Logs */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-xl font-bold text-[#102A43] mb-4">System Activity Audit Log</h3>
        <div className="divide-y divide-gray-100">
          {logs.length === 0 ? (
            <p className="text-gray-500 py-4">No recent activity logged.</p>
          ) : (
            logs.map((log) => (
              <div key={log._id} className="py-3 flex justify-between items-center">
                <div>
                  <p className="font-semibold text-gray-800">{log.action}</p>
                  <p className="text-sm text-gray-500">{log.details}</p>
                </div>
                <span className="text-xs text-gray-400">{new Date(log.createdAt).toLocaleString()}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}