import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function MySearches() {
  const [searches, setSearches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSearches();
  }, []);

  const fetchSearches = async () => {
    try {
      const res = await fetch('/api/dashboard/searches');
      const data = await res.json();
      if (data.success) setSearches(data.searches);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`/api/dashboard/searches/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        setSearches((prev) => prev.filter((s) => s._id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <div className="p-8 text-[#64748B]">Loading saved searches...</div>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#102A43]">My Searches</h1>
        <p className="text-[#64748B] text-sm mt-1">Return to searches that match the properties you're looking for.</p>
      </div>

      {searches.length === 0 ? (
        <div className="bg-white p-10 rounded-2xl text-center shadow-sm">
          <p className="text-[#64748B]">You haven't saved any searches yet.</p>
          <Link to="/properties" className="mt-4 inline-block bg-[#13865D] text-white font-semibold text-sm px-6 py-2.5 rounded-xl hover:bg-[#102A43] transition-colors">
            Start a Search
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {searches.map((s) => (
            <div key={s._id} className="bg-white p-5 rounded-2xl shadow-sm flex items-center justify-between">
              <div>
                <h3 className="font-bold text-[#102A43] text-base">{s.name}</h3>
                <p className="text-xs text-[#64748B] mt-1">
                  Saved on: {new Date(s.createdAt).toLocaleDateString()}
                </p>
              </div>
              <button
                onClick={() => handleDelete(s._id)}
                className="px-3 py-1.5 bg-red-50 text-red-600 text-xs font-semibold rounded-lg hover:bg-red-100 transition-colors"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}