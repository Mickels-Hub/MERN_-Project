import React, { useEffect, useState } from 'react';
import { customFetch } from '../utils/customFetch';
import { Link, useNavigate } from 'react-router-dom';
import { 
  FaSearch, 
  FaMapMarkerAlt, 
  FaArrowRight, 
  FaHome, 
  FaKey, 
  FaClock, 
  FaCompass, 
  FaExchangeAlt, 
  FaShieldAlt, 
  FaFileAlt, 
  FaLock, 
  FaBookmark 
} from 'react-icons/fa';

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [propertyType, setPropertyType] = useState('all');
  const [budget, setBudget] = useState('all');
  const [locationCounts, setLocationCounts] = useState({});
  const navigate = useNavigate();

  // Exact Nigerian Location Image URLs provided
  const locations = [
    {
      name: 'Lekki',
      descriptor: 'Modern living & tech hubs',
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-9v-tuzminDh0cE7ojL1tjb_axrUmuSv9c1EjDR9qgA&s=10',
      query: 'Lekki'
    },
    {
      name: 'Victoria Island',
      descriptor: 'Business district & luxury',
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeZdLT4kRZMz7beX5c7TkJI4Jh9xMnJLLY6OMW8_ruaA&s=10',
      query: 'Victoria Island'
    },
    {
      name: 'Ikoyi',
      descriptor: 'Premium waterfront lifestyle',
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStkkMxMNL4BiG-vRzLnZSSVC-YERK04RbRiuGVO4saJg&s=10',
      query: 'Ikoyi'
    },
    {
      name: 'Ikeja',
      descriptor: 'Central & commercial capital',
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDbcTy8en-K0AghgJWRIHsXfMCIOfgZrr8Qx1fG8H9nA&s=10',
      query: 'Ikeja'
    },
    {
      name: 'Epe',
      descriptor: 'Rapidly growing residential hub',
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJD_-PNqTeLLyaGLucRLSZHhdGJP94ev95n39zHtNLGg&s=10',
      query: 'Epe'
    }
  ];

  // Fetch Live Location Metrics from Backend
  useEffect(() => {
    const fetchLocationStats = async () => {
      try {
        const res = await fetch('/api/listing/get?limit=100');
        const data = await res.json();
        if (Array.isArray(data)) {
          const counts = {};
          locations.forEach(loc => {
            const matchCount = data.filter(item => 
              item.address?.toLowerCase().includes(loc.query.toLowerCase()) ||
              item.name?.toLowerCase().includes(loc.query.toLowerCase())
            ).length;
            counts[loc.name] = matchCount;
          });
          setLocationCounts(counts);
        }
      } catch (error) {
        console.error('Error loading location statistics:', error);
      }
    };

    fetchLocationStats();
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    if (searchTerm.trim()) urlParams.set('searchTerm', searchTerm.trim());
    if (propertyType !== 'all') urlParams.set('type', propertyType);
    if (budget !== 'all') urlParams.set('maxPrice', budget);
    navigate(`/search?${urlParams.toString()}`);
  };

  return (
    <div className="bg-[#F5F7F5] min-h-screen text-[#172B3A] font-sans antialiased selection:bg-[#D7F5E8] selection:text-[#13865D] overflow-x-hidden">
      
      {/* INJECT ANIMATION KEYFRAMES FOR LEFT-TO-RIGHT SLIDE */}
      <style>{`
        @keyframes slideInFromLeft {
          0% {
            opacity: 0;
            transform: translateX(-50px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-slide-left {
          animation: slideInFromLeft 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>

      {/* ================= 1. CINEMATIC HERO SECTION WITH LEFT-TO-RIGHT SLIDE ================= */}
      <section className="relative bg-[#102A43] text-white pt-20 pb-32 sm:pt-28 sm:pb-40 px-4 sm:px-8 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30 scale-105 transition-transform duration-1000"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1920&q=80')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#102A43] via-[#102A43]/90 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* SLIDE-IN ANIMATION CONTAINER */}
          <div className="lg:col-span-8 space-y-6 text-left animate-slide-left">
            
            <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-none text-white">
              Find Your Place in <span className="font-serif italic font-normal text-[#13865D]">Lagos</span>
            </h1>

            <p className="text-slate-200 text-base sm:text-xl font-normal max-w-xl leading-relaxed">
              Discover modern homes, apartments and premium properties across the city.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link 
                to="/search" 
                className="bg-[#174A8B] hover:bg-[#12386a] text-white font-bold px-7 py-3.5 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center gap-2 text-sm transform hover:-translate-y-0.5"
              >
                <span>Explore Locations</span>
                <FaArrowRight size={14} />
              </Link>

              <Link 
                to="/search?type=all" 
                className="bg-white/10 hover:bg-white/20 text-white backdrop-blur-md font-semibold px-7 py-3.5 rounded-2xl shadow-md transition-all duration-300 text-sm transform hover:-translate-y-0.5"
              >
                Find a Home
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* ================= 2. FLOATING SEARCH PANEL ================= */}
      <div className="max-w-6xl mx-auto px-4 sm:px-8 -mt-16 sm:-mt-20 relative z-30 transition-all duration-500">
        <form 
          onSubmit={handleSearchSubmit}
          className="bg-white p-4 sm:p-6 rounded-3xl shadow-2xl grid grid-cols-1 md:grid-cols-12 gap-4 items-center transform hover:shadow-3xl transition-shadow"
        >
          <div className="md:col-span-4 bg-[#F5F7F5] rounded-2xl px-4 py-3.5 flex items-center gap-3">
            <FaMapMarkerAlt className="text-[#174A8B] shrink-0" size={16} />
            <input 
              type="text" 
              placeholder="Search neighborhood e.g. Lekki, Ikoyi..." 
              className="bg-transparent w-full text-sm font-medium text-[#172B3A] placeholder-[#64748B] focus:outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="md:col-span-3 bg-[#F5F7F5] rounded-2xl px-4 py-3.5 flex items-center">
            <select 
              value={propertyType} 
              onChange={(e) => setPropertyType(e.target.value)} 
              className="bg-transparent w-full text-sm font-semibold text-[#172B3A] focus:outline-none cursor-pointer"
            >
              <option value="all">All Property Types</option>
              <option value="rent">Apartments for Rent</option>
              <option value="sale">Homes for Sale</option>
              <option value="rent">Shortlets</option>
            </select>
          </div>

          <div className="md:col-span-3 bg-[#F5F7F5] rounded-2xl px-4 py-3.5 flex items-center">
            <select 
              value={budget} 
              onChange={(e) => setBudget(e.target.value)} 
              className="bg-transparent w-full text-sm font-semibold text-[#172B3A] focus:outline-none cursor-pointer"
            >
              <option value="all">Any Budget (NGN ₦)</option>
              <option value="5000000">Up to ₦5,000,000</option>
              <option value="20000000">Up to ₦20,000,000</option>
              <option value="100000000">Up to ₦100,000,000+</option>
            </select>
          </div>

          <button 
            type="submit" 
            className="md:col-span-2 bg-[#174A8B] hover:bg-[#12386a] text-white font-bold py-3.5 px-6 rounded-2xl flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300 text-sm cursor-pointer"
          >
            <FaSearch size={14} />
            <span>Search</span>
          </button>
        </form>
      </div>

      {/* ================= 3. QUICK-ACTION NAVIGATION ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 pt-12 pb-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          
          <Link to="/search?type=sale" className="bg-white p-5 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 flex items-center gap-3.5 group">
            <div className="w-12 h-12 rounded-full bg-[#D7F5E8] text-[#13865D] flex items-center justify-center shrink-0 group-hover:bg-[#13865D] group-hover:text-white transition-colors">
              <FaHome size={18} />
            </div>
            <div>
              <h3 className="font-bold text-sm text-[#102A43]">Buy</h3>
              <p className="text-xs text-[#64748B] mt-0.5">Find your dream home</p>
            </div>
          </Link>

          <Link to="/search?type=rent" className="bg-white p-5 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 flex items-center gap-3.5 group">
            <div className="w-12 h-12 rounded-full bg-[#D7F5E8] text-[#13865D] flex items-center justify-center shrink-0 group-hover:bg-[#13865D] group-hover:text-white transition-colors">
              <FaKey size={18} />
            </div>
            <div>
              <h3 className="font-bold text-sm text-[#102A43]">Rent</h3>
              <p className="text-xs text-[#64748B] mt-0.5">Flexible living options</p>
            </div>
          </Link>

          <Link to="/search?type=rent" className="bg-white p-5 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 flex items-center gap-3.5 group">
            <div className="w-12 h-12 rounded-full bg-[#D7F5E8] text-[#13865D] flex items-center justify-center shrink-0 group-hover:bg-[#13865D] group-hover:text-white transition-colors">
              <FaClock size={18} />
            </div>
            <div>
              <h3 className="font-bold text-sm text-[#102A43]">Shortlets</h3>
              <p className="text-xs text-[#64748B] mt-0.5">Stay in Lagos</p>
            </div>
          </Link>

          <Link to="/search" className="bg-white p-5 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 flex items-center gap-3.5 group">
            <div className="w-12 h-12 rounded-full bg-[#D7F5E8] text-[#13865D] flex items-center justify-center shrink-0 group-hover:bg-[#13865D] group-hover:text-white transition-colors">
              <FaCompass size={18} />
            </div>
            <div>
              <h3 className="font-bold text-sm text-[#102A43]">Explore Locations</h3>
              <p className="text-xs text-[#64748B] mt-0.5">Discover neighborhoods</p>
            </div>
          </Link>

          <Link to="/dashboard/compare" className="bg-white p-5 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 flex items-center gap-3.5 group col-span-2 sm:col-span-1">
            <div className="w-12 h-12 rounded-full bg-[#D7F5E8] text-[#13865D] flex items-center justify-center shrink-0 group-hover:bg-[#13865D] group-hover:text-white transition-colors">
              <FaExchangeAlt size={18} />
            </div>
            <div>
              <h3 className="font-bold text-sm text-[#102A43]">Compare</h3>
              <p className="text-xs text-[#64748B] mt-0.5">Make the right choice</p>
            </div>
          </Link>

        </div>
      </section>

      {/* ================= 4. MAIN DISCOVERY: EXPLORE LAGOS BY LOCATION ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 py-12">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#102A43]">
              Explore Lagos, One Neighborhood at a Time
            </h2>
            <p className="text-[#64748B] text-sm mt-1">
              Discover the best areas to live, work and invest.
            </p>
          </div>

          <Link to="/search" className="text-[#13865D] hover:text-[#0f6c4a] font-bold text-sm flex items-center gap-1 transition-colors">
            <span>View All Locations</span>
            <FaArrowRight size={12} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {locations.map((loc, idx) => (
            <Link 
              key={idx} 
              to={`/search?searchTerm=${loc.query}`} 
              className="group relative rounded-3xl overflow-hidden h-80 shadow-md hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
            >
              <img 
                src={loc.img} 
                alt={loc.name} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#102A43] via-[#102A43]/20 to-transparent transition-opacity duration-500 group-hover:opacity-90" />
              
              <div className="absolute bottom-5 left-5 right-5 text-white space-y-1 transform transition-transform duration-500 group-hover:translate-y-[-4px]">
                <span className="text-[10px] uppercase tracking-wider font-bold text-[#D7F5E8]">
                  {locationCounts[loc.name] ? `${locationCounts[loc.name]} Properties` : 'Explore Area'}
                </span>
                <h3 className="text-lg font-bold leading-tight group-hover:text-[#D7F5E8] transition-colors">{loc.name}</h3>
                <p className="text-xs text-slate-300 font-normal line-clamp-1">{loc.descriptor}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ================= 5. LIFESTYLE-BASED LOCATION DISCOVERY ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 py-12">
        <div className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-black text-[#102A43]">
            Choose the Area That Fits Your Life
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <Link 
            to="/search?searchTerm=Victoria Island" 
            className="group relative rounded-3xl overflow-hidden h-64 shadow-md hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1.5"
          >
            <img 
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80" 
              alt="City and Business" 
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#102A43] via-[#102A43]/40 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white flex items-end justify-between">
              <div>
                <h3 className="text-xl font-bold">City & Business</h3>
                <p className="text-xs text-slate-200 mt-1">Victoria Island & Ikeja commercial hubs</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-[#13865D] transition-colors duration-300">
                <FaArrowRight size={14} />
              </div>
            </div>
          </Link>

          <Link 
            to="/search?searchTerm=Ikoyi" 
            className="group relative rounded-3xl overflow-hidden h-64 shadow-md hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1.5"
          >
            <img 
              src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80" 
              alt="Waterfront Living" 
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#102A43] via-[#102A43]/40 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white flex items-end justify-between">
              <div>
                <h3 className="text-xl font-bold">Waterfront Living</h3>
                <p className="text-xs text-slate-200 mt-1">Coastal views & serene luxury in Ikoyi</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-[#13865D] transition-colors duration-300">
                <FaArrowRight size={14} />
              </div>
            </div>
          </Link>

          <Link 
            to="/search?searchTerm=Lekki" 
            className="group relative rounded-3xl overflow-hidden h-64 shadow-md hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1.5"
          >
            <img 
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80" 
              alt="Family Friendly" 
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#102A43] via-[#102A43]/40 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white flex items-end justify-between">
              <div>
                <h3 className="text-xl font-bold">Family-Friendly</h3>
                <p className="text-xs text-slate-200 mt-1">Gated estates in Lekki & Ajah</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-[#13865D] transition-colors duration-300">
                <FaArrowRight size={14} />
              </div>
            </div>
          </Link>

        </div>
      </section>

      {/* ================= 6. WHY MIESTATE SECTION ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 py-16">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-black text-[#102A43]">
            Why Search with MiEstate?
          </h2>
          <p className="text-[#64748B] text-sm mt-2">
            A safe, transparent, and streamlined platform for finding property in Nigeria.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="bg-white p-6 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 text-center space-y-3">
            <div className="w-14 h-14 mx-auto rounded-full bg-[#D7F5E8] text-[#13865D] flex items-center justify-center">
              <FaShieldAlt size={22} />
            </div>
            <h3 className="font-bold text-base text-[#102A43]">Admin-Curated Listings</h3>
            <p className="text-xs text-[#64748B] leading-relaxed">
              Property information managed directly by the MiEstate administration.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 text-center space-y-3">
            <div className="w-14 h-14 mx-auto rounded-full bg-[#D7F5E8] text-[#13865D] flex items-center justify-center">
              <FaFileAlt size={22} />
            </div>
            <h3 className="font-bold text-base text-[#102A43]">Clear Information</h3>
            <p className="text-xs text-[#64748B] leading-relaxed">
              Understand every parameter and pricing structure before making a decision.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 text-center space-y-3">
            <div className="w-14 h-14 mx-auto rounded-full bg-[#D7F5E8] text-[#13865D] flex items-center justify-center">
              <FaLock size={22} />
            </div>
            <h3 className="font-bold text-base text-[#102A43]">Secure Contact Access</h3>
            <p className="text-xs text-[#64748B] leading-relaxed">
              Access property contact details securely through our designated access process.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 text-center space-y-3">
            <div className="w-14 h-14 mx-auto rounded-full bg-[#D7F5E8] text-[#13865D] flex items-center justify-center">
              <FaBookmark size={22} />
            </div>
            <h3 className="font-bold text-base text-[#102A43]">Save and Compare</h3>
            <p className="text-xs text-[#64748B] leading-relaxed">
              Keep your favorite properties saved and compare options side-by-side.
            </p>
          </div>

        </div>
      </section>

      {/* ================= 7. ACCOUNT CREATION BANNER ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 py-8">
        <div className="bg-[#102A43] text-white rounded-3xl overflow-hidden shadow-2xl grid grid-cols-1 lg:grid-cols-12 items-center">
          
          <div className="lg:col-span-7 p-8 sm:p-12 space-y-4">
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
              Your Next Move Starts Here
            </h2>
            <p className="text-slate-300 text-sm sm:text-base max-w-lg leading-relaxed">
              Create an account to save your favorite homes and organize your property search.
            </p>
            <div className="pt-2">
              <Link 
                to="/sign-up" 
                className="inline-block bg-[#13865D] hover:bg-[#0f6c4a] text-white font-bold px-8 py-3.5 rounded-2xl shadow-lg transition-all duration-300 text-sm transform hover:-translate-y-0.5"
              >
                Create Your Free Account
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 h-64 lg:h-full relative hidden sm:block overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=800&q=80" 
              alt="Residential Property" 
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>

        </div>
      </section>

      {/* ================= 8. TESTIMONIALS ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 py-16">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-black text-[#102A43]">
            What Our Users Say
          </h2>
          <p className="text-[#64748B] text-sm mt-2">
            Real experiences from homebuyers and tenants in Lagos.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="bg-white p-6 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 space-y-4 flex flex-col justify-between">
            <p className="text-xs text-[#172B3A] italic leading-relaxed">
              "MiEstate helped me discover Lekki Phase 1 neighborhoods before looking at individual apartments. It made choosing our family home smooth."
            </p>
            <div className="flex items-center gap-3 pt-2">
              <div className="w-10 h-10 rounded-full bg-[#102A43] text-white font-bold text-xs flex items-center justify-center">
                OA
              </div>
              <div>
                <h4 className="font-bold text-xs text-[#102A43]">Olamide A.</h4>
                <p className="text-[10px] text-[#64748B]">Lekki Resident</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 space-y-4 flex flex-col justify-between">
            <p className="text-xs text-[#172B3A] italic leading-relaxed">
              "The area comparison and accurate location data saved me so much time when moving my office near Victoria Island."
            </p>
            <div className="flex items-center gap-3 pt-2">
              <div className="w-10 h-10 rounded-full bg-[#174A8B] text-white font-bold text-xs flex items-center justify-center">
                CE
              </div>
              <div>
                <h4 className="font-bold text-xs text-[#102A43]">Chidi E.</h4>
                <p className="text-[10px] text-[#64748B]">Business Owner</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 space-y-4 flex flex-col justify-between">
            <p className="text-xs text-[#172B3A] italic leading-relaxed">
              "Clean layout with no misleading prices. Found a shortlet in Ikoyi within minutes."
            </p>
            <div className="flex items-center gap-3 pt-2">
              <div className="w-10 h-10 rounded-full bg-[#13865D] text-white font-bold text-xs flex items-center justify-center">
                FT
              </div>
              <div>
                <h4 className="font-bold text-xs text-[#102A43]">Fatima T.</h4>
                <p className="text-[10px] text-[#64748B]">Ikoyi Tenant</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ================= 9. FINAL CALL TO ACTION ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 py-8 mb-12">
        <div className="relative bg-[#102A43] text-white rounded-3xl p-8 sm:p-16 text-center space-y-6 overflow-hidden shadow-2xl">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-20 transform hover:scale-105 transition-transform duration-1000"
            style={{ backgroundImage: `url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80')` }}
          />
          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight">
              Ready to Find Your Next Home?
            </h2>
            <p className="text-slate-300 text-sm sm:text-base">
              Discover Lagos neighborhoods and take the next step with MiEstate.
            </p>
            <div className="pt-2">
              <Link 
                to="/search" 
                className="inline-block bg-[#174A8B] hover:bg-[#12386a] text-white font-bold px-9 py-4 rounded-2xl shadow-xl transition-all duration-300 text-sm transform hover:-translate-y-0.5"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 10. PREMIUM NAVY FOOTER ================= */}
      <footer className="bg-[#102A43] text-slate-300 pt-16 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          <div className="space-y-4">
            <Link to="/" className="text-2xl font-black text-white tracking-tight">
              Mi<span className="text-[#13865D]">Estate</span>
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Find. Compare. Move. Discover premier residential and commercial properties across Lagos, Nigeria.
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold text-sm mb-4">Quick Links</h4>
            <ul className="space-y-2.5 text-xs text-slate-400 font-medium">
              <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/search" className="hover:text-white transition-colors">Properties</Link></li>
              <li><Link to="/search" className="hover:text-white transition-colors">Locations</Link></li>
              <li><Link to="/search" className="hover:text-white transition-colors">Property Types</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-sm mb-4">Explore Lagos</h4>
            <ul className="space-y-2.5 text-xs text-slate-400 font-medium">
              <li><Link to="/search?searchTerm=Lekki" className="hover:text-white transition-colors">Lekki</Link></li>
              <li><Link to="/search?searchTerm=Victoria Island" className="hover:text-white transition-colors">Victoria Island</Link></li>
              <li><Link to="/search?searchTerm=Ikoyi" className="hover:text-white transition-colors">Ikoyi</Link></li>
              <li><Link to="/search?searchTerm=Ikeja" className="hover:text-white transition-colors">Ikeja</Link></li>
              <li><Link to="/search?searchTerm=Ajah" className="hover:text-white transition-colors">Ajah</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-sm mb-4">Support</h4>
            <ul className="space-y-2.5 text-xs text-slate-400 font-medium">
              <li><Link to="/contact" className="hover:text-white transition-colors">FAQs</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Help Center</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-8 mt-12 pt-8 text-center text-xs text-slate-500 font-medium">
          <p>© {new Date().getFullYear()} MiEstate. All rights reserved.</p>
        </div>
      </footer>

    </div>
  );
}