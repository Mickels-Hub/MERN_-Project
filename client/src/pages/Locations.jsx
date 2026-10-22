import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FaSearch, 
  FaSpinner, 
  FaArrowRight, 
  FaGlassMartiniAlt, 
  FaTree, 
  FaLaptopCode, 
  FaBriefcase, 
  FaUmbrellaBeach,
  FaExchangeAlt,
  FaCar,
  FaBolt,
  FaMapMarkerAlt
} from 'react-icons/fa';

export default function Locations() {
  const navigate = useNavigate();
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeVibe, setActiveVibe] = useState('all');
  const [regionFilter, setRegionFilter] = useState('all');
  const [showAllLocations, setShowAllLocations] = useState(false);

  // Comparison Engine State
  const [compareArea1, setCompareArea1] = useState('Lekki Phase 1');
  const [compareArea2, setCompareArea2] = useState('Ikeja GRA');

  // Commute Calculator State
  const [commuteOrigin, setCommuteOrigin] = useState('Ikeja');
  const [commuteDestination, setCommuteDestination] = useState('Victoria Island');

  const catalogRef = useRef(null);

  // ALL 24 EXACT LOCATIONS
  const lagosLocations = [
    {
      id: 'sangotedo',
      name: 'Sangotedo',
      region: 'island',
      vibe: 'family',
      tagline: 'Modern suburban living anchored by Novare Lekki Mall.',
      avgRent: '₦1.8M - ₦5M / yr',
      power: '15–18 hrs/day',
      traffic: 'Medium',
      thumb: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQNAWCF0sdkKIb9iGNhdXV-36ylLa6eTs3spZbDQ8fPeFFB9Bgu',
    },
    {
      id: 'ajah',
      name: 'Ajah',
      region: 'island',
      vibe: 'family',
      tagline: 'Fast-growing residential sector with modern gated estates.',
      avgRent: '₦1.5M - ₦5M / yr',
      power: '14–18 hrs/day',
      traffic: 'High',
      thumb: 'https://www.shutterstock.com/image-photo/aerial-view-ajah-lagos-nigeria-260nw-2043226325.jpg',
    },
    {
      id: 'ikoyi',
      name: 'Ikoyi',
      region: 'island',
      vibe: 'luxury',
      tagline: 'Ultra-exclusive residential sanctuary for elite executives.',
      avgRent: '₦8M - ₦35M / yr',
      power: '20–24 hrs/day',
      traffic: 'Low - Medium',
      thumb: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/2/2e/Ikoyi_and_Beyond.jpg/960px-Ikoyi_and_Beyond.jpg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=thumbnail',
    },
    {
      id: 'epe',
      name: 'Epe',
      region: 'island',
      vibe: 'serene',
      tagline: 'Prime investment zone with resort developments and dry land.',
      avgRent: '₦800k - ₦3M / yr',
      power: '14–16 hrs/day',
      traffic: 'Low',
      thumb: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3mBMthbhu4X4zdqG-SEWEMtMKlAGjwYSmVXxBtvvsNg&s=10',
    },
    {
      id: 'lekki',
      name: 'Lekki',
      region: 'island',
      vibe: 'resort',
      tagline: 'Coastal expressway axis packed with leisure parks and gated hubs.',
      avgRent: '₦2M - ₦7M / yr',
      power: '16–20 hrs/day',
      traffic: 'Medium',
      thumb: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqSXtzlRRRaoG6XmQs68DqeFlroLLhOZme-XhlStN64Q&s=10',
    },
    {
      id: 'victoria island',
      name: 'Victoria Island',
      region: 'island',
      vibe: 'business',
      tagline: 'Financial capital of West Africa housing corporate hubs.',
      avgRent: '₦5M - ₦25M / yr',
      power: '20–24 hrs/day',
      traffic: 'High',
      thumb: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmYerqJ6-wtskbaF9SHnFrxgRmK7fwvEr9XCL-8s2w1w&s=10',
    },
    {
      id: 'lekki phase 1',
      name: 'Lekki Phase 1',
      region: 'island',
      vibe: 'nightlife',
      tagline: 'Waterfront luxury, fine dining & vibrant social scene.',
      avgRent: '₦4.5M - ₦15M / yr',
      power: '18–22 hrs/day',
      traffic: 'Medium - High',
      thumb: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmNo-O0LLkowuBgMhDfABHHggSAgytjH318ggajFKalA&s=10',
    },
    {
      id: 'eti-osa',
      name: 'Eti-Osa',
      region: 'island',
      vibe: 'resort',
      tagline: 'Premier coastal corridor spanning Ikoyi, VI, and Lekki.',
      avgRent: '₦3M - ₦12M / yr',
      power: '18–22 hrs/day',
      traffic: 'Medium',
      thumb: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtHSVee_O2_ymqvrcWC77utTHa5vDPHuNivt63pceXjQ&s=10',
    },
    {
      id: 'ibeju-lekki',
      name: 'Ibeju-Lekki',
      region: 'island',
      vibe: 'business',
      tagline: 'The New Lagos industrial free zone hosting deep sea ports.',
      avgRent: '₦1M - ₦4M / yr',
      power: '14–18 hrs/day',
      traffic: 'Low',
      thumb: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8qS4ZarSnamJCcxyYi3pgiV7s58jeO0eB3wiZFsKzsg&s=10',
    },
    {
      id: 'lagos island',
      name: 'Lagos Island',
      region: 'island',
      vibe: 'business',
      tagline: 'Traditional commercial market hub of central Lagos.',
      avgRent: '₦1.2M - ₦5M / yr',
      power: '16–20 hrs/day',
      traffic: 'High',
      thumb: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFqE6bHXZ2T3nnZIO6stN7Cz9UNgSI1Q_cBmnoX0-BpQ&s=10',
    },
    {
      id: 'ikeja gra',
      name: 'Ikeja GRA',
      region: 'mainland',
      vibe: 'serene',
      tagline: 'Serene tree-lined boulevards and high-security residences.',
      avgRent: '₦2.5M - ₦10M / yr',
      power: '18–22 hrs/day',
      traffic: 'Low',
      thumb: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOoXpMlZOegCsj8SArDgtNcDTwxcPRoo1JE_RYuXb_VA&s=10',
    },
    {
      id: 'ikeja central',
      name: 'Ikeja (Central)',
      region: 'mainland',
      vibe: 'business',
      tagline: 'Administrative capital hub near computer village and airports.',
      avgRent: '₦2M - ₦7M / yr',
      power: '18–22 hrs/day',
      traffic: 'High',
      thumb: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQH8GAbg928tkq9NoePkqiSUzedtnbeyDaiVFFTpySWsg&s=10',
    },
    {
      id: 'yaba',
      name: 'Yaba',
      region: 'mainland',
      vibe: 'tech',
      tagline: 'Nigeria’s Silicon Lagoon powering tech startups & universities.',
      avgRent: '₦1.2M - ₦4M / yr',
      power: '15–18 hrs/day',
      traffic: 'Medium',
      thumb: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeObObaEDgJ42RciQDatu1nDv4B5qOZWqdCNKQJ1rqng&s=10',
    },
    {
      id: 'kosofe',
      name: 'Kosofe & Gbagada',
      region: 'mainland',
      vibe: 'serene',
      tagline: 'Strategic mainland transit hub linking directly to the Island.',
      avgRent: '₦1.8M - ₦4.5M / yr',
      power: '16–20 hrs/day',
      traffic: 'Medium',
      thumb: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6Tn_QEI7HN1m0BZDbxxtslOv_0LI0Oeee3ZvvWWLHsQ&s=10',
    },
    {
      id: 'surulere',
      name: 'Surulere',
      region: 'mainland',
      vibe: 'nightlife',
      tagline: 'Vibrant cultural, sports, and entertainment hotspot.',
      avgRent: '₦1.5M - ₦4M / yr',
      power: '15–19 hrs/day',
      traffic: 'Medium',
      thumb: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVGZ3Tyf8HZ2aptuy8uWQqvtPRbtZWZbH0yaX6UoABlA&s=10',
    },
    {
      id: 'ojo',
      name: 'Ojo & FESTAC',
      region: 'mainland',
      vibe: 'business',
      tagline: 'Bustling commercial and maritime trade center along Badagry expressway.',
      avgRent: '₦800k - ₦2.5M / yr',
      power: '12–16 hrs/day',
      traffic: 'High',
      thumb: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrNIrNSI30QsCK5ovBAbIdprHQAckWymCZgcqgE_NoDA&s=10',
    },
    {
      id: 'amuwo-odofin',
      name: 'Amuwo-Odofin & FESTAC',
      region: 'mainland',
      vibe: 'family',
      tagline: 'Master-planned residential community built with organized layouts.',
      avgRent: '₦1.2M - ₦3.5M / yr',
      power: '15–18 hrs/day',
      traffic: 'Medium',
      thumb: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCMijvYOnGOnUeCKb9ZiFWDjtxx1mlmlOfNTijRe6JkQ&s=10',
    },
    {
      id: 'alimosho',
      name: 'Alimosho',
      region: 'mainland',
      vibe: 'family',
      tagline: 'Lagos State’s most populous residential sector with vibrant markets.',
      avgRent: '₦600k - ₦2M / yr',
      power: '12–16 hrs/day',
      traffic: 'High',
      thumb: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEFFWx0bNG-y_Tw_K7b29bbqZpqdAhYL31NJmLBiMzgQ&s=10',
    },
    {
      id: 'agege',
      name: 'Agege',
      region: 'mainland',
      vibe: 'business',
      tagline: 'Historic transportation and trade junction connecting northern Lagos.',
      avgRent: '₦700k - ₦2.2M / yr',
      power: '12–16 hrs/day',
      traffic: 'High',
      thumb: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQGBz6Hlz6fA2DMhZZG6qGfhmnx2zciL92OLXg5bOUqw&s=10',
    },
    {
      id: 'festac',
      name: 'FESTAC Town',
      region: 'mainland',
      vibe: 'family',
      tagline: 'Spacious avenue-based residential town with solid infrastructure.',
      avgRent: '₦1.2M - ₦3.5M / yr',
      power: '15–18 hrs/day',
      traffic: 'Medium',
      thumb: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQU1rhZIAcluTA_sWFkonqRemObFEjwap7j9tCbfdOvMQ&s=10',
    },
    {
      id: 'oshodi-isolo',
      name: 'Oshodi-Isolo',
      region: 'mainland',
      vibe: 'business',
      tagline: 'Lagos State’s primary multi-modal transport and industrial interchange.',
      avgRent: '₦800k - ₦2.8M / yr',
      power: '14–18 hrs/day',
      traffic: 'High',
      thumb: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrNrj28FYS7TLNcVo9Gvsrhq3ftoF_Mv2zRb6gJR2sTQ&s=10',
    },
    {
      id: 'ikorodu',
      name: 'Ikorodu',
      region: 'mainland',
      vibe: 'serene',
      tagline: 'Major industrial expansion hub connected via ferry waterways.',
      avgRent: '₦500k - ₦1.8M / yr',
      power: '12–16 hrs/day',
      traffic: 'Medium',
      thumb: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSC2P1fIkx3X_4B9GfuuZVw-PMGvj6HsbdzpGVBRc1vdg&s=10',
    },
    {
      id: 'apapa',
      name: 'Apapa',
      region: 'mainland',
      vibe: 'business',
      tagline: 'Maritime trade hub hosting Nigeria’s largest international seaports.',
      avgRent: '₦1.5M - ₦6M / yr',
      power: '14–18 hrs/day',
      traffic: 'High',
      thumb: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRa5sjwPP6PeT3-MAWTqP2LEDL6thU3X90EkvBwvPwoAw&s=10',
    },
    {
      id: 'badagry',
      name: 'Badagry',
      region: 'mainland',
      vibe: 'resort',
      tagline: 'Historic heritage city featuring beachfront resorts and eco-tourism.',
      avgRent: '₦500k - ₦2M / yr',
      power: '10–14 hrs/day',
      traffic: 'Low',
      thumb: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSh3wyUhDR6lLO4fHKBw3hH_ENRUlBmSa57gXhui17A6Q&s=10',
    }
  ];

  // LIFESTYLE VIBE CATEGORIES
  const vibeCategories = [
    { id: 'all', label: 'All Vibes', icon: null },
    { id: 'nightlife', label: 'Nightlife & Dining', icon: <FaGlassMartiniAlt /> },
    { id: 'serene', label: 'Quiet & Serene', icon: <FaTree /> },
    { id: 'tech', label: 'Tech & Startups', icon: <FaLaptopCode /> },
    { id: 'business', label: 'Business Hubs', icon: <FaBriefcase /> },
    { id: 'resort', label: 'Resort & Beach', icon: <FaUmbrellaBeach /> },
  ];

  useEffect(() => {
    const fetchAllListings = async () => {
      try {
        setLoading(true);
        const res = await fetch('/api/listing/get?limit=200');
        const data = await res.json();
        const listingArray = Array.isArray(data) ? data : data.listings || data.data || [];
        setListings(listingArray);
        setLoading(false);
      } catch (err) {
        console.error('Failed to load listings:', err);
        setListings([]);
        setLoading(false);
      }
    };
    fetchAllListings();
  }, []);

  // MATCH ACCURATE PROPERTY COUNT FOR EACH AREA
  const getAreaCount = (areaName) => {
    if (!listings || listings.length === 0) return 0;
    const regex = new RegExp(areaName, 'i');
    return listings.filter(
      (item) =>
        regex.test(item.address || '') ||
        regex.test(item.location || '') ||
        regex.test(item.title || '') ||
        regex.test(item.description || '')
    ).length;
  };

 const handleLocationClick = (loc) => {
  navigate(`/location/${encodeURIComponent(loc.name)}`);
};

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/properties?searchTerm=${encodeURIComponent(searchTerm)}`);
    } else if (catalogRef.current) {
      catalogRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleCommuteSearch = (e) => {
    e.preventDefault();
    const url = `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(commuteOrigin + ', Lagos')}&destination=${encodeURIComponent(commuteDestination + ', Lagos')}`;
    window.open(url, '_blank');
  };

  const filteredLocations = lagosLocations.filter((loc) => {
    const matchesSearch = loc.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRegion = regionFilter === 'all' || loc.region === regionFilter;
    const matchesVibe = activeVibe === 'all' || loc.vibe === activeVibe;
    return matchesSearch && matchesRegion && matchesVibe;
  });

  const displayedLocations = showAllLocations
    ? filteredLocations
    : filteredLocations.slice(0, 8);

  const areaData1 = lagosLocations.find(l => l.name === compareArea1) || lagosLocations[0];
  const areaData2 = lagosLocations.find(l => l.name === compareArea2) || lagosLocations[3];

  return (
    <main className="min-h-screen bg-[#FAF9F6] pb-24 font-sans text-[#0D131A]">
      
      {/* 1. HERO SECTION */}
      <div className="relative w-full h-[360px] sm:h-[420px] bg-slate-900 overflow-hidden flex items-center justify-center">
        <img
          src="/location.jpeg"
          alt="Lagos Real Estate"
          className="absolute inset-0 w-full h-full object-cover object-center filter brightness-50 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight drop-shadow-md">
            Find the Neighborhood That Fits Your Lifestyle.
          </h1>

          <form onSubmit={handleSearchSubmit} className="mt-6 max-w-xl mx-auto relative flex items-center">
            <button
              type="submit"
              className="absolute left-4 text-slate-400 hover:text-blue-600 transition-colors text-sm"
              title="Search"
            >
              <FaSearch />
            </button>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by area, landmark, or vibe (e.g. Lekki, Pool, GRA)..."
              className="w-full bg-white/95 backdrop-blur-md pl-11 pr-28 py-4 rounded-full text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 shadow-xl font-medium"
            />
            <button
              type="submit"
              className="absolute right-1.5 bg-slate-900 hover:bg-black text-white font-bold text-xs px-6 py-3 rounded-full transition-all shadow-md cursor-pointer"
            >
              Explore
            </button>
          </form>
        </div>
      </div>

      {/* 2. LIFESTYLE VIBE FILTER CAPSULES */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-8">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {vibeCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveVibe(cat.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition-all shadow-xs cursor-pointer ${
                activeVibe === cat.id
                  ? 'bg-slate-900 text-white shadow-md'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80'
              }`}
            >
              {cat.icon}
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* 3. FEATURED "SPOTLIGHT DISTRICT" BENTO GRID */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-12">
        <div className="mb-6">
          <h2 className="text-xl sm:text-2xl font-black text-[#0D131A] tracking-tight">
            Spotlight Districts
          </h2>
          <p className="text-xs text-[#5A6578] font-normal mt-0.5">
            Most requested high-demand luxury zones in Lagos.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          
          {/* Bento Item 1: Ikoyi */}
          <div 
            onClick={() => handleLocationClick(lagosLocations[2])}
            className="md:col-span-2 relative h-64 sm:h-72 rounded-3xl overflow-hidden cursor-pointer group shadow-xs hover:shadow-md transition-all"
          >
            <img 
              src={lagosLocations[2].thumb} 
              alt="Ikoyi" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
            <div className="absolute bottom-6 left-6 right-6 text-white flex justify-between items-end">
              <div>
                <span className="bg-[#D4AF37] text-slate-950 font-extrabold text-[9px] uppercase px-2.5 py-1 rounded-full tracking-wider">
                  Ultra-Luxury
                </span>
                <h3 className="text-xl sm:text-2xl font-black mt-2">{lagosLocations[2].name}</h3>
                <p className="text-xs text-slate-200 font-light mt-1 max-w-md">{lagosLocations[2].tagline}</p>
              </div>
              <span className="hidden sm:flex items-center gap-1 bg-white/20 backdrop-blur-md text-white text-xs font-bold px-4 py-2 rounded-full group-hover:bg-slate-900 transition-colors">
                Explore <FaArrowRight />
              </span>
            </div>
          </div>

          {/* Bento Item 2: Lekki Phase 1 */}
          <div 
            onClick={() => handleLocationClick(lagosLocations[6])}
            className="relative h-64 sm:h-72 rounded-3xl overflow-hidden cursor-pointer group shadow-xs hover:shadow-md transition-all"
          >
            <img 
              src={lagosLocations[6].thumb} 
              alt="Lekki Phase 1" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <span className="bg-emerald-600 text-white font-extrabold text-[9px] uppercase px-2.5 py-1 rounded-full tracking-wider">
                Most Popular
              </span>
              <h3 className="text-xl font-black mt-2">{lagosLocations[6].name}</h3>
              <p className="text-xs text-slate-200 font-light mt-1">{lagosLocations[6].tagline}</p>
            </div>
          </div>

        </div>
      </div>

      {/* 4. ALL 24 DISTRICTS CATALOGUE */}
      <div ref={catalogRef} className="max-w-7xl mx-auto px-4 sm:px-6 mt-16">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-[#0D131A] tracking-tight">
              All Lagos Destinations ({filteredLocations.length})
            </h2>
            <p className="text-xs text-[#5A6578] font-normal mt-0.5">
              Select any district card to view verified active rental & sale properties.
            </p>
          </div>

          <div className="flex items-center gap-1.5 bg-slate-200/60 p-1 rounded-2xl self-start md:self-auto">
            <button
              onClick={() => setRegionFilter('all')}
              className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                regionFilter === 'all'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All ({lagosLocations.length})
            </button>
            <button
              onClick={() => setRegionFilter('island')}
              className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                regionFilter === 'island'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Island
            </button>
            <button
              onClick={() => setRegionFilter('mainland')}
              className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                regionFilter === 'mainland'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Mainland
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center my-16 gap-2 text-slate-500">
            <FaSpinner className="animate-spin text-3xl text-slate-800" />
            <p className="font-semibold text-xs">Loading destinations...</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {displayedLocations.map((loc) => {
                const liveCount = getAreaCount(loc.name);

                return (
                  <div
                    key={loc.id}
                    onClick={() => handleLocationClick(loc)}
                    className="group cursor-pointer flex flex-col bg-white p-3.5 rounded-3xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all"
                  >
                    {/* Large Image Card */}
                    <div className="relative w-full h-48 rounded-2xl overflow-hidden bg-slate-200 shadow-xs">
                      <img
                        src={loc.thumb}
                        alt={loc.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <span className="absolute top-3 right-3 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
                        {liveCount} {liveCount === 1 ? 'Property' : 'Properties'}
                      </span>
                    </div>

                    {/* Destination Info Below Image */}
                    <div className="mt-3.5 px-1">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-black text-[#0D131A] group-hover:text-blue-600 transition-colors">
                          {loc.name}
                        </h3>
                        <span className="text-[10px] font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-md">
                          {loc.avgRent.split(' - ')[0]} avg
                        </span>
                      </div>
                      <p className="text-[11px] text-[#5A6578] font-light mt-1 line-clamp-2">
                        {loc.tagline}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {filteredLocations.length > 8 && (
              <div className="text-center mt-10">
                <button
                  onClick={() => setShowAllLocations(!showAllLocations)}
                  className="inline-flex items-center gap-2 bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 text-xs font-bold px-8 py-3 rounded-full shadow-xs transition-all cursor-pointer"
                >
                  {showAllLocations ? 'Show Less Destinations' : `View All ${filteredLocations.length} Destinations`}
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* 5. INTERACTIVE DISTRICT COMPARISON ENGINE */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-16">
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xs border border-slate-200/80">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-[#0D131A] tracking-tight">
                District Comparison
              </h2>
              <p className="text-xs text-[#5A6578] font-normal mt-0.5">
                Compare side-by-side metrics before choosing where to rent or buy.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <select 
                value={compareArea1} 
                onChange={(e) => setCompareArea1(e.target.value)}
                className="bg-slate-100 text-slate-800 text-xs font-bold px-3 py-2 rounded-xl border border-slate-200 focus:outline-none cursor-pointer"
              >
                {lagosLocations.map(l => <option key={l.id} value={l.name}>{l.name}</option>)}
              </select>
              <span className="text-xs font-bold text-slate-400">VS</span>
              <select 
                value={compareArea2} 
                onChange={(e) => setCompareArea2(e.target.value)}
                className="bg-slate-100 text-slate-800 text-xs font-bold px-3 py-2 rounded-xl border border-slate-200 focus:outline-none cursor-pointer"
              >
                {lagosLocations.map(l => <option key={l.id} value={l.name}>{l.name}</option>)}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Area 1 Card */}
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/60">
              <div className="flex items-center gap-3 mb-4">
                <img src={areaData1.thumb} alt={areaData1.name} className="w-12 h-12 rounded-xl object-cover" />
                <div>
                  <h3 className="text-sm font-black text-[#0D131A]">{areaData1.name}</h3>
                  <span className="text-[10px] font-bold text-slate-500 uppercase">{areaData1.region} Region</span>
                </div>
              </div>
              <ul className="space-y-2.5 text-xs">
                <li className="flex justify-between py-1.5 border-b border-slate-200/60">
                  <span className="text-slate-500 font-medium">Avg. Annual Rent:</span>
                  <span className="font-bold text-slate-800">{areaData1.avgRent}</span>
                </li>
                <li className="flex justify-between py-1.5 border-b border-slate-200/60">
                  <span className="text-slate-500 font-medium">Power Reliability:</span>
                  <span className="font-bold text-emerald-700 flex items-center gap-1"><FaBolt /> {areaData1.power}</span>
                </li>
                <li className="flex justify-between py-1.5">
                  <span className="text-slate-500 font-medium">Traffic Level:</span>
                  <span className="font-bold text-slate-800 flex items-center gap-1"><FaCar /> {areaData1.traffic}</span>
                </li>
              </ul>
            </div>

            {/* Area 2 Card */}
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/60">
              <div className="flex items-center gap-3 mb-4">
                <img src={areaData2.thumb} alt={areaData2.name} className="w-12 h-12 rounded-xl object-cover" />
                <div>
                  <h3 className="text-sm font-black text-[#0D131A]">{areaData2.name}</h3>
                  <span className="text-[10px] font-bold text-slate-500 uppercase">{areaData2.region} Region</span>
                </div>
              </div>
              <ul className="space-y-2.5 text-xs">
                <li className="flex justify-between py-1.5 border-b border-slate-200/60">
                  <span className="text-slate-500 font-medium">Avg. Annual Rent:</span>
                  <span className="font-bold text-slate-800">{areaData2.avgRent}</span>
                </li>
                <li className="flex justify-between py-1.5 border-b border-slate-200/60">
                  <span className="text-slate-500 font-medium">Power Reliability:</span>
                  <span className="font-bold text-emerald-700 flex items-center gap-1"><FaBolt /> {areaData2.power}</span>
                </li>
                <li className="flex justify-between py-1.5">
                  <span className="text-slate-500 font-medium">Traffic Level:</span>
                  <span className="font-bold text-slate-800 flex items-center gap-1"><FaCar /> {areaData2.traffic}</span>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </div>

      {/* 6. CLEAN AIRBNB/BOOKING STYLE COMMUTE & ROUTE PLANNER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-16">
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs">
          <div className="max-w-2xl">
            <h2 className="text-xl sm:text-2xl font-black text-[#0D131A] tracking-tight">
              Smart Lagos Commute & Route Planner
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-normal mt-1">
              Calculate estimated travel times and directions between any two Lagos districts directly on Google Maps.
            </p>
          </div>

          <form onSubmit={handleCommuteSearch} className="mt-6 space-y-4 max-w-xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                  Origin District
                </label>
                <input
                  type="text"
                  value={commuteOrigin}
                  onChange={(e) => setCommuteOrigin(e.target.value)}
                  placeholder="e.g. Ikeja"
                  className="w-full bg-slate-50 text-slate-800 text-xs px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                  Destination District
                </label>
                <input
                  type="text"
                  value={commuteDestination}
                  onChange={(e) => setCommuteDestination(e.target.value)}
                  placeholder="e.g. Victoria Island"
                  className="w-full bg-slate-50 text-slate-800 text-xs px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-slate-900 hover:bg-black text-white text-xs font-bold py-3.5 px-4 rounded-xl transition flex items-center justify-center gap-2 shadow-xs cursor-pointer"
            >
              <FaMapMarkerAlt /> Calculate Route in Google Maps
            </button>
          </form>
        </div>
      </div>

    </main>
  );
}