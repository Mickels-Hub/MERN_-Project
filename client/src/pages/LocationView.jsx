import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FaMapMarkerAlt, FaBed, FaBath, FaArrowLeft, FaSpinner, FaSearch } from 'react-icons/fa';

export default function LocationView() {
  const { locationName } = useParams();
  const navigate = useNavigate();
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLocationListings = async () => {
      try {
        setLoading(true);
        setError(null);

        // Explicitly console log to debug
        console.log(`[LocationView] Fetching properties for location: "${locationName}"`);

        const res = await fetch(`/api/listing/get?limit=200&searchTerm=${encodeURIComponent(locationName)}`);
        
        console.log(`[LocationView] API Response Status: ${res.status}`);
        
        if (!res.ok) {
          throw new Error(`HTTP Error ${res.status}: Failed to fetch listings`);
        }

        const data = await res.json();
        console.log(`[LocationView] Raw API Response Data:`, data);

        const listingArray = Array.isArray(data) ? data : data.listings || data.data || [];
        
        // Strict client-side filter to ensure ONLY properties matching locationName are shown
        const regex = new RegExp(locationName, 'i');
        const matchedListings = listingArray.filter((item) =>
          regex.test(item.address || '') ||
          regex.test(item.location || '') ||
          regex.test(item.title || '') ||
          regex.test(item.description || '')
        );

        console.log(`[LocationView] Matched ${matchedListings.length} listings for "${locationName}"`);
        setListings(matchedListings);
        setLoading(false);
      } catch (err) {
        console.error('[LocationView] Error loading location listings:', err);
        setError(err.message);
        setListings([]);
        setLoading(false);
      }
    };

    if (locationName) {
      fetchLocationListings();
    }
  }, [locationName]);

  return (
    <main className="min-h-screen bg-[#FAF9F6] pb-24 pt-8 font-sans text-[#0D131A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Navigation & Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate('/locations')}
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-slate-900 bg-white border border-slate-200 px-4 py-2 rounded-full shadow-xs transition-all cursor-pointer"
          >
            <FaArrowLeft /> Back to Locations
          </button>
        </div>

        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs mb-10">
          <span className="text-emerald-700 bg-emerald-50 text-[10px] font-extrabold uppercase px-3 py-1 rounded-full tracking-wider">
            Verified Neighborhood
          </span>
          <h1 className="text-2xl sm:text-4xl font-black text-[#0D131A] tracking-tight mt-3 capitalize">
            Properties in {locationName}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-normal mt-1">
            Browse active homes, apartments, and commercial listings available in {locationName}.
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center my-20 gap-3 text-slate-500">
            <FaSpinner className="animate-spin text-4xl text-slate-800" />
            <p className="font-semibold text-xs">Searching listings in {locationName}...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-2xl text-xs font-bold text-center my-8">
            Error: {error}
          </div>
        )}

        {/* Results Grid */}
        {!loading && !error && (
          <>
            {listings.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/80 shadow-xs max-w-xl mx-auto my-12">
                <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto text-2xl mb-4">
                  <FaSearch />
                </div>
                <h3 className="text-lg font-black text-[#0D131A]">No properties available</h3>
                <p className="text-xs text-slate-500 font-normal mt-1.5 leading-relaxed">
                  There are currently no active property listings in <strong>{locationName}</strong>. Check back soon or explore neighboring districts.
                </p>
                <button
                  onClick={() => navigate('/locations')}
                  className="mt-6 bg-slate-900 hover:bg-black text-white text-xs font-bold px-6 py-3 rounded-full transition-all shadow-xs cursor-pointer"
                >
                  Explore Other Locations
                </button>
              </div>
            ) : (
              <div>
                <div className="mb-6 flex items-center justify-between">
                  <p className="text-xs font-bold text-slate-500">
                    Showing {listings.length} {listings.length === 1 ? 'Property' : 'Properties'} in {locationName}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {listings.map((item) => (
                    <Link
                      key={item._id}
                      to={`/listing/${item._id}`}
                      className="group bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col"
                    >
                      <div className="relative w-full h-48 bg-slate-200 overflow-hidden">
                        <img
                          src={item.imageUrls?.[0] || 'https://via.placeholder.com/400x300'}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        {item.type && (
                          <span className="absolute top-3 left-3 bg-black/70 backdrop-blur-md text-white text-[9px] font-extrabold uppercase px-2.5 py-1 rounded-full">
                            FOR {item.type.toUpperCase()}
                          </span>
                        )}
                      </div>

                      <div className="p-4 flex flex-col justify-between flex-grow">
                        <div>
                          <h3 className="text-sm font-black text-[#0D131A] group-hover:text-blue-600 transition-colors line-clamp-1">
                            {item.title}
                          </h3>
                          <p className="text-[11px] text-slate-500 font-medium flex items-center gap-1 mt-1 line-clamp-1">
                            <FaMapMarkerAlt className="text-emerald-600 shrink-0" />
                            {item.address || item.location || locationName}
                          </p>
                        </div>

                        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                          <div className="flex items-center gap-3 text-slate-600 text-[11px] font-bold">
                            <span className="flex items-center gap-1">
                              <FaBed className="text-slate-400" /> {item.bedrooms || 0} Beds
                            </span>
                            <span className="flex items-center gap-1">
                              <FaBath className="text-slate-400" /> {item.bathrooms || 0} Baths
                            </span>
                          </div>
                        </div>

                        <div className="mt-3 flex items-center justify-between">
                          <span className="text-sm font-black text-emerald-700">
                            ₦{Number(item.regularPrice || item.price || 0).toLocaleString()}
                            {item.type === 'rent' ? <span className="text-[10px] font-normal text-slate-500">/yr</span> : ''}
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

      </div>
    </main>
  );
}