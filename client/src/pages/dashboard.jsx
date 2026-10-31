import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function UserOverview() {
  const { currentUser } = useSelector((state) => state.user);

  const [stats, setStats] = useState({
    savedCount: 0,
    comparedCount: 0,
    searchesCount: 0,
    contactUnlocksCount: 0,
  });
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const res = await fetch('/api/dashboard/overview', {
          credentials: 'include',
        });
        const data = await res.json();

        if (data.success && data.stats) {
          setStats({
            savedCount: data.stats.savedProperties || 0,
            comparedCount: data.stats.comparedProperties || 0,
            searchesCount: data.stats.recentSearches || 0,
            contactUnlocksCount: data.stats.contactAccess || 0,
          });

          if (data.recentlyViewed) {
            setRecentlyViewed(data.recentlyViewed);
          }
        }
      } catch (error) {
        console.error('Error fetching dashboard overview:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return <div className="py-20 text-center text-[#64748B]">Loading your dashboard...</div>;
  }

  return (
    <div className="space-y-10 p-6">
      {/* Welcome Banner */}
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {currentUser?.username || 'user'}
          </h1>
          <p className="text-[#64748B] mt-1">
            Continue your property search and keep your shortlisted homes organized.
          </p>
        </div>
        <Link
          to="/search"
          className="bg-[#0D9488] hover:bg-[#0F766E] text-white px-6 py-3 rounded-xl font-medium transition-colors"
        >
          Find a Property
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <span className="text-sm font-medium text-[#64748B]">Saved Properties</span>
          <h2 className="text-4xl font-bold text-gray-900 mt-2">{stats.savedCount}</h2>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <span className="text-sm font-medium text-[#64748B]">Compared Properties</span>
          <h2 className="text-4xl font-bold text-gray-900 mt-2">{stats.comparedCount}</h2>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <span className="text-sm font-medium text-[#64748B]">Saved Searches</span>
          <h2 className="text-4xl font-bold text-gray-900 mt-2">{stats.searchesCount}</h2>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <span className="text-sm font-medium text-[#64748B]">Contact Access Unlocked</span>
          <h2 className="text-4xl font-bold text-gray-900 mt-2">{stats.contactUnlocksCount}</h2>
        </div>
      </div>

      {/* Recently Viewed Properties Section */}
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-gray-900">Recently Viewed Properties</h3>
          <Link to="/properties" className="text-[#0D9488] hover:underline font-medium text-sm">
            View All Properties →
          </Link>
        </div>

        {recentlyViewed.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-[#64748B] mb-4">You haven't viewed any properties recently.</p>
            <Link
              to="/search"
              className="bg-[#0F172A] hover:bg-black text-white px-6 py-3 rounded-xl font-medium transition-colors inline-block"
            >
              Explore Properties
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {recentlyViewed.map((property) => (
              <div key={property._id} className="border rounded-xl overflow-hidden shadow-sm">
                <img
                  src={property.imageUrls?.[0] || 'https://via.placeholder.com/300'}
                  alt={property.name}
                  className="h-48 w-full object-cover"
                />
                <div className="p-4">
                  <h4 className="font-bold text-gray-900 truncate">{property.name}</h4>
                  <p className="text-sm text-[#64748B] truncate">{property.address}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}