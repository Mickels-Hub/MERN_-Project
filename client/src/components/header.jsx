import { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Notification from './Notification.jsx';

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  return (
    <header className="bg-[#0B0F19] border-b border-slate-800 sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center p-4 px-6">
        <Link to="/">
          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap items-center">
            <span className="bg-blue-600 text-white px-2 py-1 rounded-lg mr-1.5 shadow">M</span>
            <span className="text-white">Mikel's</span>
            <span className="text-blue-400 ml-1">Estate</span>
          </h1>
        </Link>

        <form onSubmit={handleSubmit} className="bg-slate-900 border border-slate-800 p-2.5 rounded-xl flex items-center shadow-inner w-24 sm:w-64 focus-within:border-blue-500 transition-all">
          <input
            type="text"
            placeholder="Search properties..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-transparent focus:outline-none w-24 sm:w-full text-sm text-white placeholder-slate-500 px-1"
          />
          <button>
            <FaSearch className="text-slate-400 hover:text-white transition" />
          </button>
        </form>

        <ul className="flex items-center gap-6">
          <Link to="/" className="hidden lg:inline text-slate-300 hover:text-white transition font-medium text-sm">
            Home
          </Link>
          <Link to="/about" className="hidden lg:inline text-slate-300 hover:text-white transition font-medium text-sm">
            About
          </Link>
          <Link to="/community" className="hidden lg:inline text-slate-300 hover:text-white transition font-medium text-sm">
            Community
          </Link>
          {(currentUser?.isAdmin || currentUser?.email === 'ugochukwumickel15@gmail.com') && (
        <Link to='/admin-dashboard' className='text-yellow-400 hover:text-yellow-300 transition font-semibold text-sm'>
        Admin Portal
      </Link>
      )}

          {/* Notification Bell Component */}
          <Notification />

          {/* Profile / Sign In Link */}
          {currentUser ? (
            <Link to='/profile'>
              <img src={currentUser.avatar} alt='profile' className='rounded-full h-8 w-8 object-cover border border-slate-700 shadow' />
            </Link>
          ) : (
            <Link to='/sign-in'>
              <span className='text-slate-200 hover:text-white transition font-semibold text-sm bg-slate-900 border border-slate-800 px-4 py-2 rounded-xl'>
                Sign In
              </span>
            </Link>
          )}
        </ul>
      </div>
    </header>
  );
}