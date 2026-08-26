import { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

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

        <form onSubmit={handleSubmit} className="bg-slate-900/90 border border-slate-800 p-2 rounded-xl flex items-center shadow-inner">
          <input
            type="text"
            placeholder="Search properties..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-transparent focus:outline-none w-24 sm:w-64 text-sm text-slate-200 px-2 placeholder:text-slate-500"
          />
          <button type="submit" className="text-slate-400 hover:text-blue-400 p-1 transition-colors cursor-pointer">
            <FaSearch />
          </button>
        </form>

        <ul className="flex items-center gap-6 text-sm font-semibold">
          <Link to="/" className="hidden lg:inline text-slate-300 hover:text-white transition">
            Home
          </Link>
          <Link to="/about" className="hidden lg:inline text-slate-300 hover:text-white transition">
            About
          </Link>
          <Link to="/community" className="hidden lg:inline text-slate-300 hover:text-white transition">
            Community
          </Link>
          {(currentUser?.isPaid || currentUser?.email === 'ugochukwumickel15@gmail.com') && (
            <Link to="/admin-dashboard" className="text-amber-400 hover:text-amber-300 transition hidden sm:inline">
              Admin Portal
            </Link>
          )}
          <Link to="/profile">
            {currentUser ? (
              <img
                className="rounded-full h-8 w-8 object-cover border border-blue-500/50 shadow"
                src={currentUser.avatar}
                alt="profile"
              />
            ) : (
              <span className="text-slate-300 hover:text-white transition">Sign In</span>
            )}
          </Link>
        </ul>
      </div>
    </header>
  );
}