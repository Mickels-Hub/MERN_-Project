import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function UserOverview() {
  const { currentUser } = useSelector((state) => state.user);
  const [data, setData] = useState({ stats: {}, recentlyViewed: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOverviewData();
  }, []);

  const fetchOverviewData = async () => {
    try {
      const res = await fetch('/api/dashboard/overview');
      const result = await res.json();
      if (result.success) {
        setData(result);
      }
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="py-20 text-center text-[#64748B]">Loading your dashboard...</div>;
  }

  const { stats, recentlyViewed } = data;

  return (
    <div className="space-y-10">
      
      {/* Welcome Banner */}
      <div className="bg-white p-8 rounded-2xl shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-[#102A43]">
            Welcome back, {currentUser.username}
          </h1>
          <p className="text-[#64748B] text-base mt-1">
            Continue your property search and keep your shortlisted homes organized.
          </p>
        </div>
        <Link
          to="/properties"
          className="bg-[#13865D] hover:bg-[#102A43] text-white font-semibold text-sm px-6 py-3 rounded-xl transition-colors shadow-sm"
        >
          Find a Property
        </Link>
      </div>

      {/* Summary Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <p className="text-sm font-semibold text-[#64748B]">Saved Properties</p>
          <p className="text-3xl font-bold text-[#102A43] mt-2">{stats.savedProperties || 0}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <p className="text-sm font-semibold text-[#64748B]">Compared Properties</p>
          <p className="text-3xl font-bold text-[#102A43] mt-2">{stats.comparedProperties || 0}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <p className="text-sm font-semibold text-[#64748B]">Saved Searches</p>
          <p className="text-3xl font-bold text-[#102A43] mt-2">{stats.recentSearches || 0}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <p className="text-sm font-semibold text-[#64748B]">Contact Access Unlocked</p>
          <p className="text-3xl font-bold text-[#102A43] mt-2">{stats.contactAccess || 0}</p>
        </div>
      </div>

      {/* Recently Viewed Properties */}
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-[#102A43]">Recently Viewed Properties</h2>
          <Link to="/properties" className="text-sm font-semibold text-[#13865D] hover:underline">
            View All Properties →
          </Link>
        </div>

        {recentlyViewed.length === 0 ? (
          <div className="bg-white p-10 rounded-2xl text-center text-[#64748B]">
            <p>You haven't viewed any properties recently.</p>
            <Link to="/properties" className="mt-4 inline-block bg-[#102A43] text-white px-6 py-2.5 rounded-xl text-sm font-semibold">
              Explore Properties
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {recentlyViewed.map((prop) => (
              <div key={prop._id} className="bg-white rounded-2xl overflow-hidden shadow-sm flex flex-col">
                <img src={prop.imageUrls?.[0]} alt={prop.title} className="h-48 w-full object-cover" />
                <div className="p-4 flex flex-col flex-1 justify-between">
                  <div>
                    <h3 className="font-bold text-[#102A43] truncate">{prop.title}</h3>
                    <p className="text-xs text-[#64748B] mt-1">{prop.address || prop.location}</p>
                    <p className="text-sm font-bold text-[#13865D] mt-2">
                      ₦{prop.regularPrice?.toLocaleString()} {prop.type === 'rent' ? '/yr' : ''}
                    </p>
                  </div>
                  <Link
                    to={`/listing/${prop._id}`}
                    className="mt-4 block text-center bg-[#102A43] text-white text-xs font-semibold py-2 rounded-lg hover:bg-[#13865D] transition-colors"
                  >
                    View Property
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}