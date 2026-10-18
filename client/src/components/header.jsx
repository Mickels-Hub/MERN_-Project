import { 
  FaHome, 
  FaGlobe, 
  FaQuestionCircle, 
  FaChevronDown 
} from 'react-icons/fa';
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
    <header className='bg-[#003580] text-white sticky top-0 z-50 shadow-md w-full'>
      {/* Hide native scrollbars for touch scrolling */}
      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      {/* Top Header Row */}
      <div className='max-w-7xl mx-auto px-4 py-3 flex justify-between items-center gap-2'>
        
        {/* Left Side: Plain White Badge with Simple M + MiEstate */}
        <Link to='/' className='flex items-center gap-3 group shrink-0'>
          {/* WHITE ROUNDED BADGE WITH PLAIN M */}
          <div className='w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-200'>
            <span className='text-[#003580] text-xl sm:text-2xl font-semibold'>
              M.
            </span>
          </div>
          
          <div className='flex flex-col'>
            <span className='font-bold text-lg sm:text-xl tracking-tight text-white leading-tight'>
              Mi Estate
            </span>
            <span className='text-[10px] sm:text-[11px] text-slate-300 font-normal tracking-wide leading-none mt-0.5'>
              Find a place to call home
            </span>
          </div>
        </Link>

        {/* Right Side: Utilities & Profile */}
        <div className='flex items-center gap-2 sm:gap-3 text-xs sm:text-sm font-medium shrink-0'>
          <span className='text-xs bg-blue-900/60 hover:bg-blue-900 px-2.5 py-1 rounded text-slate-200 font-semibold transition'>
            NGN ₦
          </span>
          
          <button className='flex items-center justify-center h-8 w-8 rounded-full hover:bg-blue-900/80 transition text-slate-200'>
            <FaGlobe className='text-sm' />
          </button>

          <Link to='/help' className='flex items-center justify-center h-8 w-8 rounded-full hover:bg-blue-900/80 transition text-slate-200'>
            <FaQuestionCircle className='text-sm' />
          </Link>

          {currentUser && currentUser.isAdmin && (
            <Link to='/admin-dashboard' className='bg-emerald-600 text-white px-2.5 py-1 sm:px-3 sm:py-1.5 rounded text-xs font-bold hover:bg-emerald-500 transition shadow-sm'>
              Admin
            </Link>
          )}

          {currentUser ? (
            <div className='relative' ref={profileMenuRef}>
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className='flex items-center gap-2 focus:outline-none'
              >
                <img src={currentUser.avatar} alt='profile' className='rounded-full h-8 w-8 object-cover border-2 border-emerald-400' />
              </button>

              {showProfileMenu && (
                <div className='absolute right-0 mt-2 w-48 bg-slate-900 text-slate-200 shadow-2xl rounded-xl py-2 z-[100] flex flex-col border border-slate-800 text-xs'>
                  <div className='px-4 py-2 border-b border-slate-800 text-slate-400 truncate'>
                    Signed in as <br /><span className='text-white font-semibold'>{currentUser.username}</span>
                  </div>
                  <Link to='/profile' onClick={() => setShowProfileMenu(false)} className='px-4 py-2 hover:bg-slate-800 transition'>Profile Settings</Link>
                  <Link 
                    to={(currentUser?.isAdmin || currentUser?.email === 'ugochukwumickel15@gmail.com') ? '/admin-dashboard' : '/dashboard'}
                    onClick={() => setShowProfileMenu(false)} 
                    className='px-4 py-2 hover:bg-slate-800 transition'
                  >
                    My Dashboard
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <div className='flex items-center gap-1.5 sm:gap-2'>
              <Link to='/sign-up' className='bg-white text-[#003580] px-3 py-1.5 rounded text-xs font-bold hover:bg-slate-100 transition shadow-sm'>
                Register
              </Link>
              <Link to='/sign-in' className='bg-white text-[#003580] px-3 py-1.5 rounded text-xs font-bold hover:bg-slate-100 transition shadow-sm'>
                Sign in
              </Link>
            </div>
          )}
        </div>

      </div>

      {/* Category Navigation Bar */}
      <div className='w-full bg-[#003580] pt-1 pb-3 relative'>
        <div className='max-w-7xl mx-auto px-4 flex items-center justify-between gap-2 text-xs sm:text-sm font-medium'>
          
          {/* Scrollable Nav Items */}
          <div className='flex items-center gap-3 sm:gap-6 overflow-x-auto no-scrollbar scroll-smooth py-1 pr-2 w-full'>
            <Link to='/search?type=rent' className='flex items-center gap-2 bg-blue-900/90 hover:bg-blue-900 px-4 py-2 rounded-full border border-blue-400/40 transition whitespace-nowrap shrink-0 text-white font-semibold'>
              <FaHome className='text-white text-xs' /> Buy / Rent
            </Link>

            <Link to='/properties' className='hover:text-slate-300 transition whitespace-nowrap shrink-0 text-slate-200 font-medium'>
              Properties
            </Link>

            <Link to='/locations' className='hover:text-slate-300 transition whitespace-nowrap shrink-0 text-slate-200 font-medium'>
              Locations
            </Link>

            <Link to='/property-types' className='hover:text-slate-300 transition whitespace-nowrap shrink-0 text-slate-200 font-medium'>
              Property Types
            </Link>

            <Link to='/about' className='hover:text-slate-300 transition whitespace-nowrap shrink-0 text-slate-200 font-medium'>
              About Us
            </Link>
          </div>

          {/* MORE DROPDOWN */}
          <div className='relative whitespace-nowrap shrink-0 z-50' ref={moreMenuRef}>
            <button
              onClick={() => setShowMoreMenu(!showMoreMenu)}
              className='flex items-center gap-1 hover:text-slate-300 transition text-slate-200 font-medium focus:outline-none py-1'
            >
              <span>More</span>
              <FaChevronDown className={`text-[9px] transition-transform ${showMoreMenu ? 'rotate-180' : ''}`} />
            </button>

            {showMoreMenu && (
              <div className='absolute right-0 mt-2 w-48 bg-slate-900 text-slate-200 shadow-2xl rounded-xl py-2 z-[100] flex flex-col border border-slate-800 text-xs text-left'>
                <Link to='/how-it-works' onClick={() => setShowMoreMenu(false)} className='px-4 py-2 hover:bg-slate-800 transition'>How It Works</Link>
                <Link to='/faq' onClick={() => setShowMoreMenu(false)} className='px-4 py-2 hover:bg-slate-800 transition'>Inspection Guide & FAQ</Link>
                <Link to='/contact' onClick={() => setShowMoreMenu(false)} className='px-4 py-2 hover:bg-slate-800 transition'>Contact Support</Link>
                <div className='border-t border-slate-800 my-1'></div>
                <Link to='/terms' onClick={() => setShowMoreMenu(false)} className='px-4 py-2 hover:bg-slate-800 transition'>Terms & Conditions</Link>
                <Link to='/privacy' onClick={() => setShowMoreMenu(false)} className='px-4 py-2 hover:bg-slate-800 transition'>Privacy Policy</Link>
              </div>
            )}
          </div>

        </div>
      </div>
    </header>
  );
}