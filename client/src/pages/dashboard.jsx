import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const savedCount = currentUser?.savedListings?.length || currentUser?.savedProperties?.length || 0;
  const comparedCount = currentUser?.comparedProperties?.length || currentUser?.compared?.length || 0;
  const searchesCount = currentUser?.savedSearches?.length || currentUser?.searches?.length || 0;
  const unlockedCount = currentUser?.unlockedContacts?.length || currentUser?.unlocked?.length || 0;

  const [recentListings, setRecentListings] = useState([]);

  useEffect(() => {
    const fetchRecentProperties = async () => {
      if (!currentUser?._id && !currentUser?.id) return;

      try {
        const userId = currentUser._id || currentUser.id;

        // 1. Sync User DB State
        const userRes = await fetch(`/api/user/${userId}`);
        if (userRes.ok) {
          const updatedUser = await userRes.json();
          dispatch({ type: 'user/signInSuccess', payload: updatedUser });
        }

        // 2. Fetch live properties for recently viewed/saved
        const listingsRes = await fetch('/api/listing/get?limit=3');
        if (listingsRes.ok) {
          const data = await listingsRes.json();
          const items = Array.isArray(data) ? data : (data.listings || data.data || []);
          setRecentListings(items);
        } else {
          // Fallback to user saved array
          const rawSaved = currentUser?.savedListings || currentUser?.savedProperties || [];
          setRecentListings(rawSaved);
        }
      } catch (err) {
        console.error('Error loading properties:', err);
      }
    };

    fetchRecentProperties();

    const handleFocus = () => fetchRecentProperties();
    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, [dispatch, currentUser?._id, currentUser?.id]);

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto">
      {/* Welcome Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-slate-900">
          Welcome back, {currentUser?.username || currentUser?.name || 'User'}!
        </h1>
        <p className="text-slate-500 text-sm mt-1">
          Continue your property search and keep your shortlisted homes organized.
        </p>
      </div>

      {/* 4 Stat Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <Link 
          to="/dashboard/saved" 
          className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition border border-slate-100 flex flex-col justify-between"
        >
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
            Saved Properties
          </div>
          <div className="text-4xl font-black text-slate-800">
            {savedCount}
          </div>
        </Link>

        <Link 
          to="/dashboard/compare" 
          className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition border border-slate-100 flex flex-col justify-between"
        >
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
            Compared Properties
          </div>
          <div className="text-4xl font-black text-slate-800">
            {comparedCount}
          </div>
        </Link>

        <Link 
          to="/dashboard/searches" 
          className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition border border-slate-100 flex flex-col justify-between"
        >
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
            Saved Searches
          </div>
          <div className="text-4xl font-black text-slate-800">
            {searchesCount}
          </div>
        </Link>

        <Link 
          to="/dashboard/payments" 
          className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition border border-slate-100 flex flex-col justify-between"
        >
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
            Contact Access Unlocked
          </div>
          <div className="text-4xl font-black text-slate-800">
            {unlockedCount}
          </div>
        </Link>
      </div>

      {/* Recently Viewed Properties Section */}
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-slate-800">
            Recently Viewed Properties
          </h2>
          <Link to="/properties" className="text-blue-600 font-semibold text-sm hover:underline">
            View All Properties →
          </Link>
        </div>

        {recentListings.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-slate-400 text-sm mb-4">You haven't viewed any properties recently.</p>
            <Link 
              to="/properties" 
              className="inline-block bg-slate-900 text-white font-bold text-sm px-6 py-3 rounded-xl hover:bg-slate-800 transition"
            >
              Explore Properties
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recentListings.slice(0, 3).map((item, index) => {
              const price = item.regularPrice || item.price || item.discountPrice;
              const title = item.name || item.title || 'Featured Property';
              const img = item.imageUrls?.[0] || item.imageUrl || 'https://images.unsplash.com/photo-1545324418-ccia3fa18c00';

              return (
                <Link 
                  key={item._id || item.id || index} 
                  to={item._id ? `/listing/${item._id}` : '/properties'} 
                  className="border border-slate-100 rounded-xl p-4 shadow-sm hover:shadow-md transition block bg-slate-50/50"
                >
                  <img 
                    src={img} 
                    alt={title} 
                    className="h-36 w-full object-cover rounded-lg mb-3 bg-slate-200"
                  />
                  <h3 className="font-bold text-slate-800 truncate mb-1">
                    {title}
                  </h3>
                  <div className="text-emerald-600 font-black text-base">
                    ₦ {price ? Number(price).toLocaleString() : 'Price on Request'}
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}