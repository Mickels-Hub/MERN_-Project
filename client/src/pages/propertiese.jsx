import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FaMapMarkerAlt,
  FaBed,
  FaBath,
  FaSpinner,
  FaCamera,
  FaSortAmountDown,
} from 'react-icons/fa';

const heroBgImage = '/hero.jpeg';

export default function Properties() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeType, setActiveType] = useState('all');
  const [sortOption, setSortOption] = useState('createdAt-desc');

  useEffect(() => {
    fetchCatalogListings();
  }, [activeType, sortOption]);

  const fetchCatalogListings = async () => {
    setLoading(true);
    try {
      const [sortField, sortOrder] = sortOption.split('-');
      const params = new URLSearchParams();

      if (activeType !== 'all') params.set('type', activeType);
      params.set('sort', sortField);
      params.set('order', sortOrder);

      const res = await fetch(`/api/listing/get?${params.toString()}`);
      const data = await res.json();

      const listingArray = Array.isArray(data)
        ? data
        : data.listings || data.data || [];

      setListings(listingArray);
      setLoading(false);
    } catch (err) {
      console.error('Failed to load catalog:', err);
      setListings([]);
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50/70 pb-20">
      {/* 1. HERO BANNER */}
      <div className="relative w-full h-[320px] sm:h-[420px] bg-slate-950 overflow-hidden flex items-center justify-center">
        <img
          src={heroBgImage}
          alt="Our Properties"
          className="absolute inset-0 w-full h-full object-cover object-center filter brightness-75 scale-105 transition-transform duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-black/30"></div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight drop-shadow-lg mb-3">
            Our Properties
          </h1>
          <p className="text-slate-200 text-base sm:text-lg max-w-2xl mx-auto font-light drop-shadow-md">
            Discover luxury homes, apartments, duplexes, and commercial spaces verified across Lagos.
          </p>
          <div className="mt-4 inline-block bg-emerald-600/90 text-white text-xs sm:text-sm font-semibold px-4 py-1.5 rounded-full backdrop-blur-md shadow-md">
            {listings.length} Properties Available
          </div>
        </div>
      </div>

      {/* 2. TRANSACTION CONTROLS (RENT / SALE / SORTING) */}
      <div className="max-w-7xl mx-auto px-4 mt-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl shadow-sm">
          {/* Rent / Sale Filter Pills */}
          <div className="flex items-center bg-slate-100/80 p-1 rounded-xl">
            <button
              onClick={() => setActiveType('all')}
              className={`px-5 py-2 text-xs font-bold rounded-lg transition-all ${
                activeType === 'all'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All Listings
            </button>
            <button
              onClick={() => setActiveType('rent')}
              className={`px-5 py-2 text-xs font-bold rounded-lg transition-all ${
                activeType === 'rent'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              For Rent
            </button>
            <button
              onClick={() => setActiveType('sale')}
              className={`px-5 py-2 text-xs font-bold rounded-lg transition-all ${
                activeType === 'sale'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              For Sale
            </button>
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2">
            <FaSortAmountDown className="text-slate-400 text-xs" />
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="bg-slate-100/80 border-none text-slate-700 text-xs rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer font-semibold"
            >
              <option value="createdAt-desc">Newest First</option>
              <option value="regularPrice-asc">Price: Low to High</option>
              <option value="regularPrice-desc">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* 3. BORDERLESS PROPERTY GRID */}
        {loading ? (
          <div className="flex flex-col items-center justify-center my-20 gap-3 text-slate-500">
            <FaSpinner className="animate-spin text-4xl text-emerald-600" />
            <p className="font-medium text-sm">Loading properties catalog...</p>
          </div>
        ) : listings.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center my-12 max-w-lg mx-auto shadow-sm">
            <p className="text-xl font-bold text-slate-800">No properties available</p>
            <p className="text-xs text-slate-500 mt-2">
              There are currently no active listings matching your chosen transaction filter.
            </p>
            <button
              onClick={() => setActiveType('all')}
              className="mt-4 bg-emerald-600 text-white text-xs font-bold px-4 py-2 rounded-xl hover:bg-emerald-700 transition"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
            {listings.map((item) => {
              const imgs = item.imageUrls || item.images || [];
              const primaryImg = imgs[0] || '';
              const priceVal = Number(item.regularPrice || item.price || 0);
              const titleText = item.title || item.name || 'Property Listing';
              const locationText = item.address || item.location || 'Lagos, Nigeria';

              return (
                <Link
                  key={item._id}
                  to={`/listing/${item._id}`}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col group"
                >
                  <div className="h-52 w-full bg-slate-900 overflow-hidden relative">
                    {primaryImg ? (
                      <img
                        src={primaryImg}
                        alt={titleText}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-400 text-xs">
                        No Photo Uploaded
                      </div>
                    )}

                    <span className="absolute top-3 left-3 bg-slate-900/80 text-white text-[10px] font-bold px-2.5 py-1 rounded-md uppercase backdrop-blur-md">
                      For {item.type || item.propertyType || 'Rent'}
                    </span>

                    {imgs.length > 0 && (
                      <span className="absolute bottom-3 right-3 bg-black/60 text-white text-[10px] font-semibold px-2 py-0.5 rounded-md backdrop-blur-sm flex items-center gap-1">
                        <FaCamera /> {imgs.length}
                      </span>
                    )}
                  </div>

                  <div className="p-5 flex flex-col flex-1 justify-between gap-3">
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

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                      <p className="text-base font-extrabold text-emerald-700">
                        ₦{priceVal.toLocaleString()}
                        {(item.type || item.propertyType) === 'rent' && (
                          <span className="text-xs font-normal text-slate-500"> /yr</span>
                        )}
                      </p>
                      <span className="text-xs text-emerald-600 font-bold group-hover:translate-x-1 transition-transform">
                        Explore →
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}