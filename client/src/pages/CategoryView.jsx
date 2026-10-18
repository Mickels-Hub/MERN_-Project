import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaBed, FaBath, FaSpinner, FaArrowLeft, FaCamera } from 'react-icons/fa';

export default function CategoryView() {
  const { categoryName } = useParams();
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  const categoryTitles = {
    apartment: 'Flats & Apartments',
    duplex: 'Duplexes & Mansions',
    studio: 'Self Contain & Studios',
    shortlet: 'Shortlets & Serviced Apartments',
    commercial: 'Commercial Spaces & Offices',
    land: 'Land & Serviced Plots',
  };

  const title = categoryTitles[categoryName] || categoryName.toUpperCase();

  useEffect(() => {
    const fetchCategoryListings = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/listing/get?category=${categoryName}&limit=100`);
        const data = await res.json();

        const listingArray = Array.isArray(data) ? data : data.listings || data.data || [];
        setListings(listingArray);
        setLoading(false);
      } catch (err) {
        console.error('Category fetch error:', err);
        setListings([]);
        setLoading(false);
      }
    };

    fetchCategoryListings();
  }, [categoryName]);

  return (
    <main className="min-h-screen bg-slate-50/80 py-10 px-4 sm:px-8 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* BACK BUTTON */}
        <Link
          to="/property-types"
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-emerald-600 bg-white px-5 py-2.5 rounded-full shadow-sm hover:shadow transition-all mb-8"
        >
          <FaArrowLeft /> Back to All Categories
        </Link>

        {/* ELEGANT & MINIMAL HEADER (NO GREEN BOX, NO BORDERS) */}
        <div className="mb-10 text-left">
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            {title}
          </h1>
          <p className="text-slate-500 text-sm sm:text-base italic font-light mt-2 max-w-2xl">
            Explore active verified properties under <span className="font-semibold text-emerald-700 font-sans not-italic">{title}</span> across Lagos.
          </p>
        </div>

        {/* BORDERLESS LISTINGS SHOWCASE */}
        {loading ? (
          <div className="flex flex-col items-center justify-center my-20 gap-3 text-slate-500">
            <FaSpinner className="animate-spin text-3xl text-emerald-600" />
            <p className="font-semibold text-xs">Fetching properties...</p>
          </div>
        ) : listings.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center my-8 max-w-md mx-auto shadow-sm">
            <p className="text-xl font-bold text-slate-800">No listings found in {title} 📍</p>
            <p className="text-xs text-slate-500 mt-2 font-normal">
              There are currently no active properties in this category yet. Check back soon!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {listings.map((item) => {
              const imgs = item.imageUrls || item.images || [];
              const primaryImg = imgs[0] || '';
              const priceVal = Number(item.regularPrice || item.price || 0);

              return (
                <Link
                  key={item._id}
                  to={`/listing/${item._id}`}
                  className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col group"
                >
                  <div className="h-52 w-full bg-slate-900 overflow-hidden relative">
                    {primaryImg ? (
                      <img
                        src={primaryImg}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-400 text-xs">
                        No Photo
                      </div>
                    )}

                    {imgs.length > 0 && (
                      <span className="absolute bottom-3 right-3 bg-black/60 text-white text-[10px] font-semibold px-2.5 py-1 rounded-md backdrop-blur-sm flex items-center gap-1">
                        <FaCamera /> {imgs.length}
                      </span>
                    )}
                  </div>

                  <div className="p-5 flex flex-col flex-1 justify-between gap-3">
                    <div>
                      <h3 className="font-extrabold text-slate-800 text-base line-clamp-1 group-hover:text-emerald-600 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-xs text-slate-500 flex items-center gap-1 mt-1 line-clamp-1 font-normal">
                        <FaMapMarkerAlt className="text-emerald-600 flex-shrink-0" />
                        {item.address || 'Lagos, Nigeria'}
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
                      <p className="text-base font-black text-emerald-700">
                        ₦{priceVal.toLocaleString()}
                      </p>
                      <span className="text-xs text-emerald-600 font-extrabold group-hover:translate-x-1 transition-transform">
                        View Details →
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