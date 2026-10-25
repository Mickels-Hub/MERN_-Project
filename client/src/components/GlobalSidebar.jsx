import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function GlobalSidebar() {
  const { currentUser } = useSelector((state) => state.user);
  const location = useLocation();

  const navItems = [
    {
      name: 'Overview',
      path: '/dashboard',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
    },
    {
      name: 'Saved Properties',
      path: '/dashboard/saved',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
    },
    {
      name: 'Compare Properties',
      path: '/dashboard/compare',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 6l3 18h12l3-18H3zm3 0V4a2 2 0 012-2h8a2 2 0 012 2v2" />
        </svg>
      ),
    },
    {
      name: 'Rental Checklist',
      path: '/dashboard/checklist',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      ),
    },
    {
      name: 'My Searches',
      path: '/dashboard/searches',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      ),
    },
    {
      name: 'Payments & Contact Access',
      path: '/dashboard/payments',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      name: 'Profile & Settings',
      path: '/profile',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
    },
  ];

  return (
    <aside className="fixed left-0 top-[119px] md:top-[125px] h-[calc(100vh-109px)] md:h-[calc(100vh-109px)] w-16 md:w-20 bg-white border-r border-gray-200 z-[999] flex flex-col items-center justify-between py-5 shadow-sm">
      <nav className="flex flex-col items-center gap-2 w-full px-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              title={item.name}
              className={`w-11 h-11 md:w-12 md:h-12 rounded-2xl flex items-center justify-center transition-all ${
                isActive
                  ? 'bg-[#102A43] text-white shadow-md'
                  : 'text-[#64748B] hover:bg-gray-100 hover:text-[#102A43]'
              }`}
            >
              {item.icon}
            </Link>
          );
        })}
      </nav>

      <div className="flex flex-col items-center pb-2">
        {currentUser && (
          <Link
            to="/profile"
            title={currentUser.username}
            className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#13865D] hover:scale-105 transition-transform"
          >
            <img 
              src={currentUser.avatar || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'} 
              alt="Profile" 
              className="w-full h-full object-cover"
            />
          </Link>
        )}
      </div>
    </aside>
  );
} 