import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function MySearches() {
  const [searches, setSearches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSearches();
  }, []);

  const fetchSearches = async () => {
    try {
      const res = await fetch('/api/user/searches', { credentials: 'include' });
      const data = await res.json();
      
      console.log('API Response Data:', data); // <-- Add this log

      if (Array.isArray(data)) {
        setSearches(data);
      } else if (data.success && Array.isArray(data.searches)) {
        setSearches(data.searches);
      } else if (Array.isArray(data.userSearches)) {
        setSearches(data.userSearches);
      }
    } catch (error) {
      console.error('Failed to load search history:', error);
    } finally {
      setLoading(false);
    }
  };

const handleDelete = async (searchId) => {
    try {
      const res = await fetch(`/api/user/search/${searchId}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      const data = await res.json();

      if (data.success || res.ok) {
        setSearches((prevSearches) =>
          prevSearches.filter((item) => (item._id || item.id) !== searchId)
        );
      }
    } catch (error) {
      console.error('Error deleting search item:', error);
    }
  };

  const handleClearAll = async () => {
    try {
      const res = await fetch('/api/user/searches', {
        method: 'DELETE',
        credentials: 'include',
      });
      const data = await res.json();
      if (data.success) {
        setSearches([]);
      }
    } catch (error) {
      console.error('Failed to clear search history:', error);
    }
  };

  if (loading) {
    return <div className="p-8 text-center text-slate-500 font-medium">Loading search history...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-[#172B3A]">My Saved Searches</h1>
          <p className="text-sm text-[#64748B]">Review and manage your recent property search queries.</p>
        </div>
        {searches.length > 0 && (
          <button
            onClick={handleClearAll}
            className="text-xs font-semibold text-red-600 bg-red-50 hover:bg-red-100 px-4 py-2.5 rounded-xl transition-colors"
          >
            Clear History
          </button>
        )}
      </div>

      {/* History Table */}
      {searches.length === 0 ? (
        <div className="bg-white p-12 rounded-3xl shadow-sm text-center space-y-3">
          <p className="text-slate-500 font-medium">You have no recorded search history yet.</p>
          <Link to="/search" className="inline-block text-sm text-[#13865D] font-semibold hover:underline">
            Start searching properties →
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-3xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#F8FAFC] text-xs uppercase tracking-wider text-[#64748B]">
                  <th className="py-4 px-6 font-semibold">Search Term</th>
                  <th className="py-4 px-6 font-semibold">Date Saved</th>
                  <th className="py-4 px-6 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {searches.map((item) => (
                  <tr key={item._id} className="hover:bg-slate-50 transition-colors">
                    {/* Search Term & Quick Rerun Link */}
                    <td className="py-4 px-6 font-semibold text-[#172B3A]">
                      <Link
                        to={`/search?searchTerm=${encodeURIComponent(item.query)}`}
                        className="hover:text-[#13865D] transition-colors"
                      >
                        🔍 "{item.query}"
                      </Link>
                    </td>

                    {/* Date Formatting */}
                    <td className="py-4 px-6 text-[#64748B]">
                      {new Date(item.createdAt || item.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </td>

                    {/* Action Button: Delete Only */}
                    <td className="py-4 px-6 text-right">
                      <button
                    onClick={() => handleDelete(item._id)}
                    className="text-red-500 hover:underline"
                >
              Delete  
            </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}