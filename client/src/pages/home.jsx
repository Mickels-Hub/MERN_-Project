import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { usePaystackPayment } from 'react-paystack';

const rotatingWords = ["Luxury Living", "Verified Properties", "Prime Real Estate", "Smart Investments"];

export default function Home() {
  const currentUser = useSelector((state) => state.user.currentUser);
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prevIndex) => (prevIndex + 1) % rotatingWords.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

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

  useEffect(() => {
    const fetchListings = async () => {
      try {
        setLoading(true);
        const res = await fetch('/api/listing/get');
        const data = await res.json();
        
        // Filter out any potential duplicate listings by their unique _id to ensure only 1 card per item shows
        const uniqueListings = Array.isArray(data) 
          ? data.filter((listing, index, self) => index === self.findIndex((t) => t._id === listing._id))
          : [];

        setListings(uniqueListings);
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

  const handleBrowseSearch = (e) => {
    e.preventDefault();
    if (currentUser) {
      navigate('/search');
    }
  };

  const handleAdvancedSearch = () => {
    navigate('/search?searchTerm=&type=all&offer=false&parking=false&furnished=false&sort=createdAt&order=desc');
  };

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 selection:bg-blue-600 selection:text-white overflow-x-hidden">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-blue-500/10 blur-[120px] pointer-events-none rounded-full" />

      <div className="relative overflow-hidden pt-28 pb-24 px-6 lg:px-8 border-b border-slate-800/80 bg-gradient-to-b from-[#0B0F19] to-[#030712]">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold mb-6">
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
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold transition-all duration-300 shadow-lg shadow-blue-600/20 cursor-pointer"
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

      <div className="max-w-6xl mx-auto px-4 my-8">
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-indigo-900/50 p-6 sm:p-8 rounded-3xl shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <span className="flex items-center justify-center md:justify-start gap-2 text-indigo-400 font-semibold text-sm tracking-wide uppercase">
              <span>🛡️</span> Verified Platform Protection
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold text-white">Safe Real Estate Transactions in Lagos</h3>
            <p className="text-slate-300 text-sm leading-relaxed max-w-xl">
              We shield you from scammers and direct landlord fraud. All properties are vetted, and inspections are coordinated securely through our official center.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
            <a
              href="tel:+234102377234"
              className="flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-white font-bold py-3.5 px-6 rounded-2xl text-sm transition-all shadow-md"
            >
              <span>📞</span> +234 102 377 234
            </a>
            <a
              href="https://wa.me/234102377234?text=Hello,%20I%20am%20visiting%20your%20platform%20and%20need%20assistance%20with%20a%20property."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3.5 px-6 rounded-2xl text-sm transition-all shadow-md"
            >
              <span>💬</span> Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>

      <div id="portal-section" className="max-w-7xl mx-auto px-6 py-20 scroll-mt-12">
        {!currentUser ? (
          <div className="max-w-md mx-auto p-8 sm:p-10 rounded-3xl bg-slate-900/60 border border-slate-800/80 shadow-2xl text-center backdrop-blur-2xl">
            <div className="w-14 h-14 mx-auto mb-5 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 text-xl">
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
        ) : (!currentUser?.isPaid && currentUser?.email !== 'ugochukwumickel15@gmail.com') ? (
          <div className="max-w-xl mx-auto p-8 sm:p-10 rounded-3xl bg-slate-900/60 border border-slate-800/80 shadow-2xl text-center backdrop-blur-2xl">
            <div className="w-14 h-14 mx-auto mb-5 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 text-xl">
              💎
            </div>
            <h2 className="text-2xl font-bold text-white mb-3">Unlock Full Catalog Access</h2>
            <p className="text-slate-400 text-sm mb-6 leading-relaxed">
              Complete a one-time verification payment of ₦45,000 to unlock direct properties, agent direct lines, and advanced features.
            </p>
            <button
              onClick={() => initializePayment(onSuccess, onClose)}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold shadow-lg shadow-emerald-600/20 transition-all duration-300 cursor-pointer"
            >
              Pay for Full Access (₦45,000)
            </button>
          </div>
        ) : (
          <div className="space-y-16">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-extrabold text-white">Verified Properties</h2>
              <button
                onClick={handleAdvancedSearch}
                className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all shadow-md cursor-pointer"
              >
                Advanced Search Filter &rarr;
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
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {listings.map((listing) => (
                  <Link
                    to={`/listing/${listing._id}`}
                    key={listing._id}
                    className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl group hover:border-slate-700 transition duration-300 flex flex-col"
                  >
                    <img
                      src={listing.imageUrls?.[0]}
                      alt={listing.name}
                      className="w-full h-48 object-cover group-hover:scale-105 transition duration-300"
                    />
                    <div className="p-5 space-y-2 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="text-lg font-bold text-white truncate">{listing.name}</h3>
                        <p className="text-slate-400 text-sm line-clamp-2">{listing.description}</p>
                      </div>
                      <p className="text-indigo-400 font-bold text-base">₦{listing.regularPrice?.toLocaleString()}</p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}