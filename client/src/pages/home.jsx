import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { usePaystackPayment } from 'react-paystack';

const rotatingWords = ["Luxury Living", "Verified Properties", "Prime Real Estate", "Smart Investments"];

export default function Home() {
  const { currentUser } = useSelector((state) => state.user);
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const navigate = useNavigate();

  // Smooth text rotation timer
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prevIndex) => (prevIndex + 1) % rotatingWords.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  // Paystack configuration (Amount in kobo: #45,000 = 4500000)
  const config = {
    reference: (new Date()).getTime().toString(),
    email: currentUser?.email || "customer@email.com",
    amount: 4500000,
    publicKey: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY,
  };

  const initializePayment = usePaystackPayment(config);

  const onSuccess = async (reference) => {
    try {
      const res = await fetch('/api/user/verify-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reference, email: currentUser?.email }),
      });
      const data = await res.json();
      if (res.ok) {
        alert('Payment successful! Access granted.');
        window.location.reload();
      } else {
        alert(data.message || 'Verification failed');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onClose = () => {
    alert('Transaction window closed.');
  };

  // Fetch listings for Admin or Paid users
  useEffect(() => {
    const fetchListings = async () => {
      try {
        setLoading(true);
        const res = await fetch('/api/listing/get');
        const data = await res.json();
        setListings(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    if (currentUser?.isPaid || currentUser?.email === 'ugochukwumickel15@gmail.com') {
      fetchListings();
    }
  }, [currentUser]);

  const scrollToPortal = () => {
    const portalElement = document.getElementById('portal-section');
    if (portalElement) {
      portalElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

 const handleBrowseSearch = () => {
    if (currentUser) {
      navigate('/search');
    }
  };

  // Advanced Search Handler with pre-set query filters
  const handleAdvancedSearch = () => {
    navigate('/search?type=sale&sort=createdAt&order=desc');
  };

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 selection:bg-blue-600 selection:text-white overflow-x-hidden">

      {/* Hero Section with High-End Motion Styling */}
      <div className="relative overflow-hidden pt-28 pb-24 px-6 lg:px-8 border-b border-slate-800/80 bg-gradient-to-b from-[#0B0F19] to-[#030712]">
        {/* Animated background glow elements */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-blue-600/10 blur-[120px] pointer-events-none rounded-full" />
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold tracking-wider uppercase mb-6 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
            Exclusive Real Estate Portal
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-8 leading-[1.1]">
            Find Your Next Sanctuary for <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-sky-400 transition-all duration-700">
              {rotatingWords[currentWordIndex]}
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-slate-400 text-base sm:text-lg leading-relaxed">
            Experience handpicked, verified architectural properties. Unlock full confidential catalogs, direct agent lines, and exclusive listings instantly.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={scrollToPortal}
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold shadow-xl shadow-blue-600/30 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
            >
              Get Started &rarr;
            </button>
           <button
    onClick={handleBrowseSearch}
    disabled={!currentUser?.email}
    className={`px-8 py-4 rounded-2xl font-bold border transition-all duration-300 ${
      !currentUser?.email
        ? 'bg-slate-900/40 text-slate-600 border-slate-800/50 cursor-not-allowed opacity-60'
        : 'bg-slate-900/80 hover:bg-slate-800 text-slate-300 border-slate-800 cursor-pointer'
    }`}
  >
    Browse Search
  </button>
          </div>
        </div>
      </div>

      {/* Main Portal Content Section */}
      <div id="portal-section" className="max-w-7xl mx-auto px-6 py-20 scroll-mt-12">
        {!currentUser ? (
          /* Guest Gate */
          <div className="max-w-md mx-auto p-8 sm:p-10 rounded-3xl bg-slate-900/60 border border-slate-800/80 shadow-2xl text-center backdrop-blur-2xl">
            <div className="w-14 h-14 mx-auto mb-5 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 text-2xl font-bold shadow-inner">
              🔒
            </div>
            <h2 className="text-2xl font-bold text-white mb-3">Member Authentication</h2>
            <p className="text-slate-400 text-sm mb-6 leading-relaxed">
              Sign in or create your account to gain entry to the exclusive catalog portal.
            </p>
            <div className="flex flex-col gap-3">
              <Link
                to="/sign-in"
                className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold shadow-lg shadow-blue-600/20 transition-all text-center"
              >
                Sign In
              </Link>
              <Link
                to="/sign-up"
                className="w-full py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold border border-slate-700 transition-all text-center"
              >
                Create Account
              </Link>
            </div>
          </div>
        ) : !currentUser.isPaid && currentUser.email !== 'ugochukwumickel15@gmail.com' ? (
          /* Paywall Gate for Unpaid Users */
          <div className="max-w-xl mx-auto p-8 sm:p-12 rounded-3xl bg-slate-900/60 border border-slate-800/80 shadow-2xl text-center backdrop-blur-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-blue-500/20 to-indigo-500/20 border border-blue-500/30 flex items-center justify-center text-blue-400 text-3xl font-bold shadow-inner">
              💎
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-4">Unlock Full Access</h2>
            <p className="text-slate-300 text-base mb-2 font-medium">
              Get lifetime access to verified real estate listings and direct contacts.
            </p>
            <p className="text-slate-400 text-sm mb-8">
              One-time activation fee: <span className="text-blue-400 font-bold">#45,000</span>
            </p>
            <button
              onClick={() => initializePayment({ onSuccess, onClose })}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-lg shadow-xl shadow-blue-600/30 transition-all transform hover:-translate-y-0.5 cursor-pointer"
            >
              Pay #45,000 Now
            </button>
          </div>
        ) : (
          /* Unlocked Listings Feed */
          <div>
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
              <div>
                <h2 className="text-3xl font-extrabold text-white">Verified Properties</h2>
                <p className="text-slate-400 text-sm mt-1">Browse your unlocked exclusive real estate catalog.</p>
              </div>
              <button
                onClick={handleAdvancedSearch}
                className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-blue-400 font-semibold border border-blue-500/20 shadow-md transition-all cursor-pointer"
              >
                Advanced Filter Search &rarr;
              </button>
            </div>

            {loading ? (
              <div className="flex justify-center items-center py-32">
                <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
              </div>
            ) : listings.length === 0 ? (
              <div className="text-center py-20 text-slate-500">
                <p className="text-lg">No listings available at the moment.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {listings.map((listing) => (
                  <div key={listing._id} className="bg-slate-900/40 border border-slate-800 rounded-2xl overflow-hidden shadow-lg hover:border-slate-700 transition-all">
                    <img src={listing.imageUrls?.[0]} alt={listing.name} className="w-full h-48 object-cover" />
                    <div className="p-5">
                      <h3 className="text-lg font-bold text-white truncate">{listing.name}</h3>
                      <p className="text-slate-400 text-sm mt-1 line-clamp-2">{listing.description}</p>
                      <p className="text-blue-400 font-bold mt-4">₦{listing.regularPrice?.toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

    </div>
  );
}