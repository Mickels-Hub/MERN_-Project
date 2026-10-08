import { FaHome, FaBuilding, FaMapMarkedAlt, FaLayerGroup, FaInfoCircle, FaGlobe, FaQuestionCircle, FaChevronDown } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState, useRef } from 'react';

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  
  const profileMenuRef = useRef(null);
  const moreMenuRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(e.target)) {
        setShowProfileMenu(false);
      }
      if (moreMenuRef.current && !moreMenuRef.current.contains(e.target)) {
        setShowMoreMenu(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  return (
    <header className='bg-[#003580] text-white sticky top-0 z-50 shadow-sm'>
      {/* Main Header Bar */}
      <div className='max-w-7xl mx-auto px-4 py-3 flex justify-between items-center'>
        
        {/* Left Side: Brand Name */}
        <div className='flex items-center gap-10'>
          <Link to='/'>
            <span className='font-bold text-xl sm:text-2xl tracking-tight text-white flex items-center gap-1'>
              Naija<span className='text-emerald-400'>Stays</span>
            </span>
          </Link>
        </div>

        {/* Right Side: Utilities */}
        <div className='flex items-center gap-3 text-sm font-medium'>
          <span className='hidden sm:inline-block text-xs bg-blue-900 px-2.5 py-1 rounded text-slate-200'>NGN</span>
          
          <button className='hidden sm:flex items-center justify-center h-8 w-8 rounded-full hover:bg-blue-900 transition text-slate-200'>
            <FaGlobe className='text-sm' />
          </button>

          <Link to='/help' className='flex items-center justify-center h-8 w-8 rounded-full hover:bg-blue-900 transition text-slate-200'>
            <FaQuestionCircle className='text-sm' />
          </Link>

          {currentUser && currentUser.isAdmin && (
            <Link to='/admin-dashboard' className='bg-emerald-600 text-white px-3 py-1.5 rounded text-xs font-bold hover:bg-emerald-500 transition'>
              Admin
            </Link>
          )}

          {currentUser ? (
            <div className='relative' ref={profileMenuRef}>
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className='flex items-center gap-2 focus:outline-none'
              >
                <img src={currentUser.avatar} alt='profile' className='rounded-full h-8 w-8 object-cover border-2 border-white' />
              </button>

              {showProfileMenu && (
                <div className='absolute right-0 mt-2 w-48 bg-slate-900 text-slate-200 shadow-2xl rounded-xl py-2 z-50 flex flex-col border border-slate-800'>
                  <div className='px-4 py-2 border-b border-slate-800 text-xs text-slate-400 truncate'>
                    Signed in as <br /><span className='text-white font-semibold'>{currentUser.username}</span>
                  </div>
                  <Link to='/profile' onClick={() => setShowProfileMenu(false)} className='px-4 py-2.5 text-xs hover:bg-slate-800 transition'>Profile Settings</Link>
                  <Link to='/admin-dashboard' onClick={() => setShowProfileMenu(false)} className='px-4 py-2.5 text-xs hover:bg-slate-800 transition'>My Dashboard</Link>
                  <Link to='/create-listing' onClick={() => setShowProfileMenu(false)} className='px-4 py-2.5 text-xs hover:bg-slate-800 transition'>Post Listing</Link>
                </div>
              )}
            </div>
          ) : (
            <div className='flex items-center gap-2'>
              <Link to='/sign-up' className='bg-white text-[#003580] px-3 py-1.5 rounded text-xs font-bold hover:bg-slate-100 transition'>
                Register
              </Link>
              <Link to='/sign-in' className='bg-white text-[#003580] px-3 py-1.5 rounded text-xs font-bold hover:bg-slate-100 transition'>
                Sign in
              </Link>
            </div>
          )}
        </div>

      </div>

      {/* Category Navigation Bar with "More" Dropdown near About Us */}
      {/* Category Navigation Bar with "More" Dropdown near About Us */}
      <div className='max-w-7xl mx-auto px-4 pb-3 flex items-center gap-3 overflow-visible text-xs sm:text-sm font-medium'>
        <Link to='/search?type=rent' className='flex items-center gap-2 bg-blue-900/80 hover:bg-blue-900 px-4 py-2 rounded-full border border-blue-400/40 transition whitespace-nowrap'>
          <FaHome className='text-white text-sm' /> Buy / Rent
        </Link>
        <Link to='/properties' className='flex items-center gap-2 hover:bg-blue-900/60 px-4 py-2 rounded-full border border-transparent hover:border-blue-400 transition whitespace-nowrap'>
          <FaBuilding className='text-slate-300 text-sm' /> Properties
        </Link>
        <Link to='/locations' className='flex items-center gap-2 hover:bg-blue-900/60 px-4 py-2 rounded-full border border-transparent hover:border-blue-400 transition whitespace-nowrap'>
          <FaMapMarkedAlt className='text-slate-300 text-sm' /> Locations
        </Link>
        <Link to='/property-types' className='flex items-center gap-2 hover:bg-blue-900/60 px-4 py-2 rounded-full border border-transparent hover:border-blue-400 transition whitespace-nowrap'>
          <FaLayerGroup className='text-slate-300 text-sm' /> Property Types
        </Link>
        <Link to='/about' className='flex items-center gap-2 hover:bg-blue-900/60 px-4 py-2 rounded-full border border-transparent hover:border-blue-400 transition whitespace-nowrap'>
          <FaInfoCircle className='text-slate-300 text-sm' /> About Us
        </Link>

        {/* MORE DROPDOWN PLACED NEAR ABOUT US */}
        <div className='relative whitespace-nowrap' ref={moreMenuRef}>
          <button
            onClick={() => setShowMoreMenu(!showMoreMenu)}
            className='flex items-center gap-1.5 hover:bg-blue-900/60 px-4 py-2 rounded-full border border-transparent hover:border-blue-400 transition text-slate-300 focus:outline-none'
          >
            <span>More</span>
            <FaChevronDown className={`text-[10px] transition-transform ${showMoreMenu ? 'rotate-180' : ''}`} />
          </button>

          {showMoreMenu && (
            <div className='absolute left-0 mt-2 w-52 bg-slate-900 text-slate-200 shadow-2xl rounded-xl py-2 z-[100] flex flex-col border border-slate-800 text-left'>
              <Link to='/how-it-works' onClick={() => setShowMoreMenu(false)} className='px-4 py-2.5 text-xs hover:bg-slate-800 transition'>How It Works</Link>
              <Link to='/faq' onClick={() => setShowMoreMenu(false)} className='px-4 py-2.5 text-xs hover:bg-slate-800 transition'>Inspection Guide & FAQ</Link>
              <Link to='/contact' onClick={() => setShowMoreMenu(false)} className='px-4 py-2.5 text-xs hover:bg-slate-800 transition'>Contact Support</Link>
              <div className='border-t border-slate-800 my-1'></div>
              <Link to='/terms' onClick={() => setShowMoreMenu(false)} className='px-4 py-2.5 text-xs hover:bg-slate-800 transition'>Terms & Conditions</Link>
              <Link to='/privacy' onClick={() => setShowMoreMenu(false)} className='px-4 py-2.5 text-xs hover:bg-slate-800 transition'>Privacy Policy</Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}