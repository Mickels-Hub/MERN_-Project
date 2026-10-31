import { useEffect, useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import {
  FaSearch,
  FaMapMarkerAlt,
  FaBed,
  FaBath,
  FaSpinner,
} from 'react-icons/fa';

export default function Search() {
  const navigate = useNavigate();
  const location = useLocation();

  const [sidebarData, setSidebarData] = useState({
    searchTerm: '',
    type: 'rent',
    budget: 'all',
  });

  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm') || '';
    const typeFromUrl = urlParams.get('type') || 'rent';
    const budgetFromUrl = urlParams.get('budget') || 'all';

    setSidebarData({
      searchTerm: searchTermFromUrl,
      type: typeFromUrl,
      budget: budgetFromUrl,
    });

    // Strictly fetch ONLY when a search parameter exists in the URL
    if (location.search && searchTermFromUrl.trim() !== '') {
      const fetchListings = async () => {
        setLoading(true);
        setHasSearched(true);
        try {
          const searchQuery = urlParams.toString();
          const res = await fetch(`/api/listing/get?${searchQuery}`);
          const data = await res.json();

          // Safely extract listing array
          const listingArray = Array.isArray(data)
            ? data
            : data.listings || data.data || [];

          setListings(listingArray);
          setLoading(false);
        } catch (err) {
          console.error('Fetch error:', err);
          setListings([]);
          setLoading(false);
        }
      };

      fetchListings();
    } else {
      setHasSearched(false);
      setListings([]);
    }
  }, [location.search]);

const handleSubmit = async (e) => {
    e.preventDefault();

    const queryTerm = sidebarData.searchTerm?.trim();
    if (!queryTerm) return;

    // 1. Record search query in history backend and WAIT for it to finish
    try {
      await fetch('/api/user/save-search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ query: queryTerm }),
      });
    } catch (err) {
      console.error('Failed to save search history:', err);
    }

    // 2. Update URL parameters to trigger the listing search AFTER saving
    const urlParams = new URLSearchParams();
    urlParams.set('searchTerm', queryTerm);
    if (sidebarData.type) urlParams.set('type', sidebarData.type);
    if (sidebarData.budget && sidebarData.budget !== 'all') {
      urlParams.set('budget', sidebarData.budget);
    }

    navigate(`/search?${urlParams.toString()}`);
  };


  return (
    <main className="min-h-screen bg-slate-50 pb-12">
      {/* 1. Hero Search Banner */}
      <div className="bg-emerald-900 text-white pt-10 pb-20 px-4 text-center relative">
        <h1 className="text-3xl sm:text-4xl font-bold mb-2">
          Find your next home in Lagos
        </h1>
        <p className="text-emerald-100 text-sm sm:text-base max-w-xl mx-auto">
          Explore apartments, houses and properties that fit your needs.
        </p>
      </div>

      {/* 2. Floating Search Form Card */}
      <div className="max-w-3xl mx-auto -mt-12 px-4 relative z-10">
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-xl p-6 flex flex-col gap-4 border border-slate-200"
        >
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1 flex items-center gap-1">
              <FaMapMarkerAlt className="text-emerald-600" /> Location / Area
            </label>
            <input
              type="text"
              placeholder="Type location e.g. Lekki, Ikeja, Yaba, Ajah..."
              className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
              value={sidebarData.searchTerm}
              onChange={(e) =>
                setSidebarData({ ...sidebarData, searchTerm: e.target.value })
              }
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
              Listing Category
            </label>
            <select
              className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition cursor-pointer"
              value={sidebarData.type}
              onChange={(e) =>
                setSidebarData({ ...sidebarData, type: e.target.value })
              }
            >
              <option value="rent">Rent</option>
              <option value="sale">Sale</option>
              <option value="all">All (Rent & Sale)</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
              Your Budget
            </label>
            <select
              className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition cursor-pointer"
              value={sidebarData.budget}
              onChange={(e) =>
                setSidebarData({ ...sidebarData, budget: e.target.value })
              }
            >
              <option value="all">Any Budget</option>
              <option value="1000000">Under ₦1,000,000</option>
              <option value="3000000">Under ₦3,000,000</option>
              <option value="5000000">Under ₦5,000,000</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold p-3.5 rounded-xl transition shadow-md flex items-center justify-center gap-2 cursor-pointer mt-2"
          >
            <FaSearch /> Search Properties
          </button>
        </form>
      </div>

      {/* 3. Search Results & Empty States */}
      <div className="max-w-6xl mx-auto px-4 mt-10">
        {loading && (
          <div className="flex flex-col items-center justify-center my-12 text-slate-600 gap-2">
            <FaSpinner className="animate-spin text-3xl text-emerald-600" />
            <p className="font-semibold text-sm">Searching properties...</p>
          </div>
        )}

        {/* Initial Empty State */}
        {!hasSearched && !loading && (
          <div className="text-center my-12 text-slate-400 font-medium">
            Type a specific location above and click "Search Properties" to view listings.
          </div>
        )}

        {/* NO MATCHES FOUND IN DATABASE */}
        {hasSearched && !loading && listings.length === 0 && (
          <div className="text-center my-12 py-8 bg-white rounded-2xl border border-slate-200 shadow-sm max-w-xl mx-auto p-6">
            <p className="text-xl font-bold text-slate-800">
              Location isn't available yet 📍
            </p>
            <p className="text-sm text-slate-500 mt-2">
              We couldn't find any available properties matching{' '}
              <span className="font-semibold text-emerald-700">"{sidebarData.searchTerm}"</span>.
            </p>
            <p className="text-xs text-slate-400 mt-3">
              Try searching a nearby area like Lekki, Ikeja, or Yaba!
            </p>
          </div>
        )}

        {/* 4. Display Filtered Listings Line */}
        {hasSearched && !loading && listings.length > 0 && (
          <div>
            <h2 className="text-xl font-bold text-slate-800 mb-6 border-b pb-2">
              Available Listings in "{sidebarData.searchTerm}" ({listings.length})
            </h2>

            <div className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-x-auto pb-6 snap-x snap-mandatory">
              {listings.map((item) => {
                const img = item.imageUrls?.[0] || item.images?.[0] || '';
                const priceVal = Number(item.regularPrice || item.price || 0);
                const titleText = item.title || item.name || 'Property Listing';
                const locationText = item.address || item.location || 'Lagos, Nigeria';

                return (
                  <Link
                    key={item._id}
                    to={`/listing/${item._id}`}
                    className="min-w-[280px] sm:min-w-[320px] md:min-w-0 flex-shrink-0 snap-start bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all border border-slate-300 flex flex-col group"
                  >
                    <div className="h-48 w-full bg-slate-900 overflow-hidden relative">
                      {img ? (
                        <img
                          src={img}
                          alt={titleText}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-400 text-xs">
                          No Photo
                        </div>
                      )}
                      <span className="absolute top-3 left-3 bg-slate-900/80 text-white text-[10px] font-bold px-2.5 py-1 rounded-md uppercase backdrop-blur-sm">
                        For {item.propertyType || item.type || 'Rent'}
                      </span>
                    </div>

                    <div className="p-4 flex flex-col flex-1 justify-between gap-2">
                      <div>
                        <h3 className="font-bold text-slate-800 text-base line-clamp-1 group-hover:text-emerald-600 transition">
                          {titleText}
                        </h3>
                        <p className="text-xs text-slate-500 flex items-center gap-1 mt-1 line-clamp-1">
                          <FaMapMarkerAlt className="text-emerald-600 flex-shrink-0" />
                          {locationText}
                        </p>
                      </div>

                      <div className="flex items-center gap-4 text-xs font-semibold text-slate-600 my-1">
                        <span className="flex items-center gap-1">
                          <FaBed className="text-emerald-600" /> {item.bedrooms || 0} Beds
                        </span>
                        <span className="flex items-center gap-1">
                          <FaBath className="text-emerald-600" /> {item.bathrooms || 0} Baths
                        </span>
                      </div>

                      <div className="pt-2 border-t border-slate-200 flex items-center justify-between">
                        <p className="text-base font-extrabold text-emerald-700">
                          ₦{priceVal.toLocaleString()}
                          {(item.propertyType || item.type) === 'rent' && (
                            <span className="text-xs font-normal text-slate-500"> /yr</span>
                          )}
                        </p>
                        <span className="text-xs text-emerald-600 font-semibold group-hover:underline">
                          View details →
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}