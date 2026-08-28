import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Search() {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser } = useSelector((state) => state.user);
  
  const [sidebardata, setSidebardata] = useState({
    searchTerm: '',
    type: 'all',
    parking: false,
    furnished: false,
    offer: false,
    sort: 'createdAt',
    order: 'desc',
  });

  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    const typeFromUrl = urlParams.get('type');
    const parkingFromUrl = urlParams.get('parking');
    const furnishedFromUrl = urlParams.get('furnished');
    const offerFromUrl = urlParams.get('offer');
    const sortFromUrl = urlParams.get('sort');
    const orderFromUrl = urlParams.get('order');

    if (
      searchTermFromUrl ||
      typeFromUrl ||
      parkingFromUrl ||
      furnishedFromUrl ||
      offerFromUrl ||
      sortFromUrl ||
      orderFromUrl
    ) {
      setSidebardata({
        searchTerm: searchTermFromUrl || '',
        type: typeFromUrl || 'all',
        parking: parkingFromUrl === 'true' ? true : false,
        furnished: furnishedFromUrl === 'true' ? true : false,
        offer: offerFromUrl === 'true' ? true : false,
        sort: sortFromUrl || 'createdAt',
        order: orderFromUrl || 'desc',
      });
    }

    const fetchListings = async () => {
      setLoading(true);
      setError(null);
      const searchQuery = urlParams.toString();
      try {
        const res = await fetch(`/api/listing/get?${searchQuery}`);
        const data = await res.json();
        
        // Handle 403 Paywall / Restricted Error from Backend
        if (!res.ok) {
          setError(data.message || 'Access denied.');
          setLoading(false);
          setListings([]);
          return;
        }

        setListings(data);
        setLoading(false);
      } catch (err) {
        setError('Something went wrong while fetching listings.');
        setLoading(false);
      }
    };

    fetchListings();
  }, [location.search]);

  const handleChange = (e) => {
    if (e.target.id === 'all' || e.target.id === 'rent' || e.target.id === 'sale') {
      setSidebardata({ ...sidebardata, type: e.target.id });
    }

    if (e.target.id === 'searchTerm') {
      setSidebardata({ ...sidebardata, searchTerm: e.target.value });
    }

    if (e.target.id === 'parking' || e.target.id === 'furnished' || e.target.id === 'offer') {
      setSidebardata({
        ...sidebardata,
        [e.target.id]: e.target.checked || e.target.checked === 'true' ? true : false,
      });
    }

    if (e.target.id === 'sort_order') {
      const sort = e.target.value.split('_')[0] || 'createdAt';
      const order = e.target.value.split('_')[1] || 'desc';
      setSidebardata({ ...sidebardata, sort, order });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set('searchTerm', sidebardata.searchTerm);
    urlParams.set('type', sidebardata.type);
    urlParams.set('parking', sidebardata.parking);
    urlParams.set('furnished', sidebardata.furnished);
    urlParams.set('offer', sidebardata.offer);
    urlParams.set('sort', sidebardata.sort);
    urlParams.set('order', sidebardata.order);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };
  // Inside your useEffect in Search.jsx
const fetchListings = async () => {
  setLoading(true);
  const res = await fetch(`/api/listing/get?${searchQuery}`);
  
  // ADD THESE EXACT 4 LINES RIGHT HERE:
  if (res.status === 403) {
    navigate('/sign-in');
    return;
  }
  
  const data = await res.json();
  setListings(data);
  setLoading(false);
};

  return (
    <div className="flex flex-col md:flex-row bg-[#030712] min-h-screen text-slate-100">
      {/* Sidebar Filters */}
      <div className="p-7 border-b md:border-r md:border-slate-800 md:min-h-screen w-full md:w-[350px] shrink-0">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label className="font-semibold text-slate-300">Lagos Area / LGA:</label>
            <select
              id="searchTerm"
              value={sidebardata.searchTerm}
              onChange={handleChange}
              className="bg-slate-900 border border-slate-800 rounded-xl p-3 w-full focus:outline-none focus:border-blue-500 text-white text-sm"
            >
              <option value="">All Lagos Areas</option>
              <option value="Eti-Osa">Eti-Osa (Lekki, VI, Ikoyi)</option>
              <option value="Ikeja">Ikeja</option>
              <option value="Alimosho">Alimosho</option>
              <option value="Surulere">Surulere</option>
              <option value="Lagos Island">Lagos Island</option>
              <option value="Lagos Mainland">Lagos Mainland</option>
              <option value="Ikorodu">Ikorodu</option>
              <option value="Ibeju-Lekki">Ibeju-Lekki</option>
              <option value="Apapa">Apapa</option>
              <option value="Kosofe">Kosofe</option>
              <option value="Mushin">Mushin</option>
              <option value="Oshodi-Isolo">Oshodi-Isolo</option>
              <option value="Shomolu">Shomolu</option>
              <option value="Agege">Agege</option>
              <option value="Ojo">Ojo</option>
              <option value="Badagry">Badagry</option>
              <option value="Epe">Epe</option>
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-semibold text-slate-300">Listing Type:</label>
            <div className="flex gap-6 mt-2">
              <div className="flex gap-2 items-center">
                <input type="checkbox" id="all" onChange={handleChange} checked={sidebardata.type === 'all'} className="w-4 h-4 accent-blue-600" />
                <span className="text-sm">All</span>
              </div>
              <div className="flex gap-2 items-center">
                <input type="checkbox" id="rent" onChange={handleChange} checked={sidebardata.type === 'rent'} className="w-4 h-4 accent-blue-600" />
                <span className="text-sm">Rent</span>
              </div>
              <div className="flex gap-2 items-center">
                <input type="checkbox" id="sale" onChange={handleChange} checked={sidebardata.type === 'sale'} className="w-4 h-4 accent-blue-600" />
                <span className="text-sm">Sale</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2 mt-2 w-full">
            <label className="font-semibold text-slate-300">Amenities:</label>
            <div className="flex flex-col gap-2 mt-2 w-full">
              <div className="flex gap-2 items-center">
                <input type="checkbox" id="parking" onChange={handleChange} checked={sidebardata.parking} className="w-4 h-4 accent-blue-600" />
                <span className="text-sm">Parking Space</span>
              </div>
              <div className="flex gap-2 items-center">
                <input type="checkbox" id="furnished" onChange={handleChange} checked={sidebardata.furnished} className="w-4 h-4 accent-blue-600" />
                <span className="text-sm">Furnished</span>
              </div>
              <div className="flex gap-2 items-center">
                <input type="checkbox" id="offer" onChange={handleChange} checked={sidebardata.offer} className="w-4 h-4 accent-blue-600" />
                <span className="text-sm">Special Offer / Discount</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-semibold text-slate-300">Sort By:</label>
            <select
              onChange={handleChange}
              defaultValue={'createdAt_desc'}
              id="sort_order"
              className="bg-slate-900 border border-slate-800 rounded-xl p-3 w-full focus:outline-none focus:border-blue-500 text-white text-sm"
            >
              <option value="regularPrice_desc">Price: High to Low</option>
              <option value="regularPrice_asc">Price: Low to High</option>
              <option value="createdAt_desc">Latest Properties</option>
              <option value="createdAt_asc">Oldest Properties</option>
            </select>
          </div>

          <button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white p-3.5 rounded-xl uppercase font-bold tracking-wide shadow-lg shadow-blue-500/20 transition-all">
            Apply Filters
          </button>
        </form>
      </div>

    {/* Results Section */}
        {/* Results Section */}
{/* Results Section */}
<div className="flex-1 p-7 md:p-10">
  {(!currentUser?.isPaid && currentUser?.email !== 'ugochukwumickel15@gmail.com') ? (
    <div className="p-10 text-center max-w-2xl mx-auto my-16 bg-slate-900/60 backdrop-blur-md shadow-xl rounded-2xl">
      <h2 className="text-2xl font-extrabold text-white mb-4">
        Please sign in & make payment before you can search for listings.
      </h2>
      <p className="text-slate-400 mb-8 text-sm">
        Access is restricted to verified paying members only.
      </p>
      <div className="flex justify-center gap-4">
        <button 
          onClick={() => navigate('/sign-in')} 
          className="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          Sign In
        </button>
        <button 
          onClick={() => navigate('/sign-up')} 
          className="bg-slate-700 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-slate-600 transition border border-slate-500"
        >
          Create Account
        </button>
      </div>
    </div>
  ) : (
    <>
      <h1 className="text-2xl font-extrabold border-b border-slate-800 pb-4 text-white">Listing Results:</h1>
      <div className="p-4 sm:p-7 flex flex-wrap gap-6 justify-center sm:justify-start">
        {!loading && listings.length === 0 && (
          <div className="text-center py-20 w-full">
            <p className="text-xl text-slate-500 font-medium">No properties found for this area.</p>
            <p className="text-sm text-slate-600 mt-2">Try selecting "All Lagos Areas" or check your listing's address details.</p>
          </div>
        )}

        {!loading && listings && listings.map((listing) => (
          <Link
            to={`/listing/${listing._id}`}
            key={listing._id}
            className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl group hover:border-slate-700 transition duration-300 w-full sm:w-[330px] relative"
          >
            {listing.offer && listing.discountPrice && (
              <div className="absolute top-3 left-3 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md z-10">
                SALE
              </div>
            )}
            <img
              src={listing.imageUrls?.[0]}
              alt={listing.name}
              className="w-full h-48 object-cover group-hover:scale-105 transition duration-300"
            />
            <div className="p-5 space-y-2 flex-1 flex flex-col justify-between">
              <h3 className="text-lg font-bold text-white truncate">{listing.name}</h3>
              <p className="text-slate-400 text-sm line-clamp-2 mt-1">{listing.description}</p>
              <div className="flex items-center gap-3 pt-2">
                <p className="text-indigo-400 font-extrabold text-base">
                  ₦{listing.offer ? listing.discountPrice?.toLocaleString() : listing.regularPrice?.toLocaleString()}
                </p>
                {listing.offer && listing.regularPrice && (
                  <p className="text-slate-500 text-sm line-through">
                    ₦{listing.regularPrice?.toLocaleString()}
                  </p>
               )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  )}
</div>
    </div>
  );
}