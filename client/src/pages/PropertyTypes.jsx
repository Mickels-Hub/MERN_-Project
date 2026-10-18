import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowRight, FaSpinner } from 'react-icons/fa';

const categoriesBgImage = '/categories-hero.jpeg';

export default function PropertyTypes() {
  const navigate = useNavigate();
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllListings = async () => {
      try {
        setLoading(true);
        const res = await fetch('/api/listing/get?limit=200');
        if (!res.ok) throw new Error(`HTTP Error ${res.status}`);

        const data = await res.json();
        const listingArray = Array.isArray(data)
          ? data
          : data.listings || data.data || [];

        setListings(listingArray);
        setLoading(false);
      } catch (err) {
        console.error('Failed to load listings for categories:', err);
        setListings([]);
        setLoading(false);
      }
    };

    fetchAllListings();
  }, []);

  // EXACT ORIGINAL PREFERRED UNSPLASH IMAGES
  const categories = [
    {
      id: 'apartment',
      title: 'Flats & Apartments',
      description: 'Self-contained luxury flats, 2-bedroom & 3-bedroom serviced apartments.',
      image:
        'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'duplex',
      title: 'Duplexes & Mansions',
      description: 'Spacious detached, semi-detached duplexes, and luxury family villas.',
      image:
        'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'studio',
      title: 'Self Contain & Studios',
      description: 'Cozy, affordable single-room spaces ideal for students and professionals.',
      image:
        'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'shortlet',
      title: 'Shortlets & Serviced',
      description: 'Fully furnished short-stay apartments with 24/7 power and Wi-Fi.',
      image:
        'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'commercial',
      title: 'Commercial & Offices',
      description: 'Prime office spaces, retail shops, and commercial hubs across Lagos.',
      image:
        'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'land',
      title: 'Land & Plots',
      description: 'Dry plots of land for residential and commercial real estate development.',
      image:
        'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80',
    },
  ];

  // SYNCHRONIZED COUNTING LOGIC
  const getCategoryCount = (typeKey) => {
    if (!listings || listings.length === 0) return 0;

    return listings.filter((item) => {
      const pType = (item.propertyType || item.type || '').toLowerCase().trim();
      const title = (item.title || item.name || '').toLowerCase();
      const desc = (item.description || '').toLowerCase();

      if (typeKey === 'apartment') {
        return pType === 'apartment' || /\bapartment\b|\bflat\b/.test(title) || /\bapartment\b|\bflat\b/.test(desc);
      }
      if (typeKey === 'duplex') {
        return pType === 'duplex' || /\bduplex\b|\bmansion\b|\bterrace\b|\bvilla\b/.test(title);
      }
      if (typeKey === 'studio') {
        return pType === 'studio' || /\bstudio\b|\bself contain\b|\b1 room\b|\bone room\b/.test(title);
      }
      if (typeKey === 'shortlet') {
        return pType === 'shortlet' || /\bshortlet\b|\bserviced\b|\bshort stay\b/.test(title);
      }
      if (typeKey === 'commercial') {
        return pType === 'commercial' || /\bcommercial\b|\boffice\b|\bshop\b/.test(title);
      }
      if (typeKey === 'land') {
        const isBuilding = /\bapartment\b|\bflat\b|\broom\b|\bduplex\b|\bhouse\b/.test(title);
        const hasLandWord = pType === 'land' || /\bland\b|\bplot\b|\bacre\b|\bhectare\b/.test(title);
        return hasLandWord && !isBuilding;
      }

      return false;
    }).length;
  };

  return (
    <main className="min-h-screen bg-slate-100/60 pb-20 font-sans">
      {/* HERO BANNER */}
      <div className="relative w-full h-[320px] sm:h-[420px] bg-slate-950 overflow-hidden flex items-center justify-center">
        <img
          src={categoriesBgImage}
          alt="Our Categories"
          className="absolute inset-0 w-full h-full object-cover object-center filter brightness-75 scale-105 transition-transform duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-black/30"></div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight drop-shadow-md mb-3">
            Our Categories
          </h1>
          <p className="text-slate-200 text-base sm:text-lg max-w-2xl mx-auto font-light drop-shadow-sm">
            Explore verified real estate in Lagos categorized by structure and lifestyle preference.
          </p>
          <div className="mt-4 inline-block bg-emerald-600 text-white text-xs sm:text-sm font-bold px-5 py-2 rounded-full shadow-lg">
            {categories.length} Architectural Categories
          </div>
        </div>
      </div>

      {/* BORDERLESS CATEGORY CARDS GRID */}
      <div className="max-w-7xl mx-auto px-4 mt-12">
        {loading ? (
          <div className="flex flex-col items-center justify-center my-20 gap-3 text-slate-500">
            <FaSpinner className="animate-spin text-4xl text-emerald-600" />
            <p className="font-semibold text-sm">Counting category listings...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((cat) => {
              const liveCount = getCategoryCount(cat.id);

              return (
                <div
                  key={cat.id}
                  onClick={() => navigate(`/category/${cat.id}`)}
                  className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between cursor-pointer group"
                >
                  <div className="h-56 w-full bg-slate-900 overflow-hidden relative">
                    <img
                      src={cat.image}
                      alt={cat.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                    <span className="absolute bottom-4 right-4 bg-emerald-600 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-md">
                      {liveCount} {liveCount === 1 ? 'Property' : 'Properties'}
                    </span>
                  </div>

                  <div className="p-7 flex flex-col flex-1 justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-black text-slate-800 group-hover:text-emerald-600 transition-colors tracking-tight">
                        {cat.title}
                      </h3>
                      <p className="text-xs text-slate-500 leading-relaxed font-normal mt-2">
                        {cat.description}
                      </p>
                    </div>

                    <div className="pt-4 flex items-center justify-between">
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                        Browse Category
                      </span>
                      <span className="text-emerald-600 font-extrabold flex items-center gap-1 group-hover:translate-x-1.5 transition-transform text-sm">
                        Explore <FaArrowRight className="text-xs" />
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}