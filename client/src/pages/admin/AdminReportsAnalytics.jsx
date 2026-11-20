import React, { useState, useEffect } from 'react';

export default function AdminReportsAnalytics() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await fetch('/api/reports/admin/all');
        const data = await res.json();
        if (data.success) setReports(data.reports || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchReports();
  }, []);

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div>
        <h1 className="text-3xl font-extrabold text-[#102A43]">Reports & Analytics</h1>
        <p className="text-gray-500 text-sm mt-1">Platform analytics overview and active user-submitted compliance reports.</p>
      </div>

      {/* Analytics Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
          <p className="text-sm font-semibold text-gray-500">Total System Reports</p>
          <h3 className="text-3xl font-bold text-[#102A43] mt-2">{reports.length}</h3>
        </div>
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
          <p className="text-sm font-semibold text-gray-500">Pending Resolutions</p>
          <h3 className="text-3xl font-bold text-amber-600 mt-2">
            {reports.filter((r) => r.status !== 'Resolved').length}
          </h3>
        </div>
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
          <p className="text-sm font-semibold text-gray-500">Resolved Tickets</p>
          <h3 className="text-3xl font-bold text-[#13865D] mt-2">
            {reports.filter((r) => r.status === 'Resolved').length}
          </h3>
        </div>
      </div>

      {/* Reports Table */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-bold text-[#102A43]">Recent Compliance Flags</h3>
        </div>
        {loading ? (
          <div className="p-8 text-gray-500">Loading analytics reports...</div>
        ) : reports.length === 0 ? (
          <div className="p-12 text-center text-gray-400">No reports found.</div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-600 text-xs font-bold uppercase tracking-wider">
                <th className="p-4">User</th>
                <th className="p-4">Reason</th>
                <th className="p-4">Message</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {reports.map((r) => (
                <tr key={r._id} className="hover:bg-gray-50/50">
                  <td className="p-4 font-semibold text-gray-900">{r.displayUsername || 'User'}</td>
                  <td className="p-4 text-[#102A43] font-medium">{r.displayReason || r.reason}</td>
                  <td className="p-4 text-gray-600">{r.displayMessage || r.description}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${r.status === 'Resolved' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                      {r.status || 'pending'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}