import React, { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Notification from './Notification.jsx';

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
    setMobileMenuOpen(false);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  // Helper to check if current user is an admin
  const isAdminUser = currentUser && (
    currentUser.isAdmin === true || 
    currentUser.email === 'ugochukwumickel15@gmail.com'
  );

  return (
    <header className="bg-[#0B0F19] border-b border-slate-800 sticky top-0 z-50 shadow-md w-full">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-3">
        {/* Logo */}
        <Link to="/">
          <h1 className="font-bold text-sm sm:text-xl flex items-center">
            <span className="bg-blue-600 text-white px-2 py-1 rounded-lg mr-1.5 shadow">M</span>
            <span className="text-white">Mikel's</span>
            <span className="text-blue-400 ml-1">Estate</span>
          </h1>
        </Link>

        {/* Search Bar */}
        <form onSubmit={handleSubmit} className="bg-slate-900 border border-slate-800 p-2 rounded-xl hidden sm:flex items-center shadow-inner w-40 sm:w-64">
          <input
            type="text"
            placeholder="Search properties..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-transparent focus:outline-none w-full text-xs sm:text-sm text-white placeholder-slate-500 px-1"
          />
          <button type="submit">
            <FaSearch className="text-slate-400 hover:text-white transition" />
          </button>
        </form>

        {/* Desktop Links & Actions */}
        <div className="flex items-center space-x-4">
          <ul className="hidden md:flex items-center gap-4 text-slate-300 font-medium text-sm">
            <Link to="/" className="hover:text-white transition">Home</Link>
            <Link to="/about" className="hover:text-white transition">About</Link>
            <Link to="/community" className="hover:text-white transition">Community</Link>
            {isAdminUser && (
              <Link to="/admin-dashboard" className="text-yellow-400 hover:text-yellow-300 transition font-semibold">
                Admin Portal
              </Link>
            )}
          </ul>

          <div className="flex items-center space-x-3">
            <Notification />

            {currentUser ? (
              <Link to="/profile">
                <img src={currentUser.avatar} alt="profile" className="rounded-full h-8 w-8 object-cover border border-slate-700 shadow" />
              </Link>
            ) : (
              <Link to="/sign-in">
                <span className="text-slate-200 hover:text-white transition font-semibold bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-xl text-xs sm:text-sm">
                  Sign In
                </span>
              </Link>
            )}

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-slate-300 hover:text-white focus:outline-none p-2 bg-slate-900 border border-slate-800 rounded-lg"
              aria-label="Toggle Navigation Menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Overlay Links */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed top-[57px] left-0 w-full h-[calc(100vh-57px)] bg-[#0B0F19]/95 backdrop-blur-md px-6 py-8 space-y-4 text-lg font-medium text-slate-200 shadow-2xl z-50 flex flex-col">
          <Link to="/" onClick={() => setMobileMenuOpen(false)} className="block py-3 px-4 rounded-xl bg-slate-900/60 border border-slate-800 hover:bg-slate-800 transition">
            Home
          </Link>
          <Link to="/about" onClick={() => setMobileMenuOpen(false)} className="block py-3 px-4 rounded-xl bg-slate-900/60 border border-slate-800 hover:bg-slate-800 transition">
            About
          </Link>
          <Link to="/community" onClick={() => setMobileMenuOpen(false)} className="block py-3 px-4 rounded-xl bg-slate-900/60 border border-slate-800 hover:bg-slate-800 transition">
            Community
          </Link>
          {isAdminUser && (
            <Link to="/admin-dashboard" onClick={() => setMobileMenuOpen(false)} className="block py-3 px-4 rounded-xl bg-yellow-500/10 text-yellow-400 border border-yellow-500/30 transition font-semibold">
              Admin Portal
            </Link>
          )}
        </div>
      )}
    </header>
  );
}