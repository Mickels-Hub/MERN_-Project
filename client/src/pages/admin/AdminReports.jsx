import React, { useState, useEffect } from 'react';

export default function AdminReports() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchReports = async () => {
    try {
      const res = await fetch('/api/reports/admin/all');
      const data = await res.json();
      if (data.success) {
        setReports(data.reports || []);
      }
    } catch (err) {
      console.error('Error fetching reports:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const handleUpdateStatus = async (reportId, newStatus) => {
    try {
      const res = await fetch(`/api/reports/admin/${reportId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setReports(reports.map((r) => (r._id === reportId ? { ...r, status: newStatus } : r)));
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <div className="p-8 text-gray-500 font-medium">Loading live user reports...</div>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[#102A43]">User Reports & Listing Flags</h1>
        <p className="text-gray-500 text-sm mt-1">Review customer-submitted reports from listings, user emails, and exact messages.</p>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        {reports.length === 0 ? (
          <div className="p-12 text-center text-gray-400 font-medium">No user reports or flags submitted yet.</div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/80 border-b border-gray-100 text-gray-600 text-xs font-bold uppercase tracking-wider">
                <th className="p-5">Reporter / User</th>
                <th className="p-5">Reason</th>
                <th className="p-5">Exact Message / Details</th>
                <th className="p-5">Status</th>
                <th className="p-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {reports.map((report) => {
                const username = report.resolvedUser?.username || report.userId?.username || 'Registered User';
                const email = report.resolvedUser?.email || report.userId?.email || 'No email recorded';
                const reason = report.resolvedReason || report.reason || 'General Report';
                const messageText = report.resolvedMessage || report.description || report.message || 'No additional message provided.';

                return (
                  <tr key={report._id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="p-5">
                      <p className="font-bold text-gray-900">{username}</p>
                      <p className="text-xs text-[#13865D] font-medium">{email}</p>
                    </td>
                    <td className="p-5 font-semibold text-[#102A43]">{reason}</td>
                    <td className="p-5 text-gray-700 max-w-md">
                      <p className="bg-gray-50 p-3 rounded-xl border border-gray-100 font-normal">{messageText}</p>
                    </td>
                    <td className="p-5">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        report.status === 'Resolved' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                      }`}>
                        {report.status || 'pending'}
                      </span>
                    </td>
                    <td className="p-5 text-right space-x-2">
                      <button
                        onClick={() => handleUpdateStatus(report._id, 'Resolved')}
                        className="px-4 py-2 bg-[#13865D] text-white font-bold rounded-xl text-xs hover:opacity-90 transition-opacity"
                      >
                        Resolve
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}