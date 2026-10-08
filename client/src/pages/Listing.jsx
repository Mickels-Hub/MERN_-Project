import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { useSelector } from 'react-redux';
import { Navigation } from 'swiper/modules';
import { usePaystackPayment } from 'react-paystack'; // Keep this for Paystack
import 'swiper/css/bundle';
import { FaBath, FaBed, FaChair, FaMapMarkerAlt, FaParking, FaShare, FaPhoneAlt, FaLock, FaUser } from 'react-icons/fa';

SwiperCore.use([Navigation]);

export default function Listing() {
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);
  const [userPaid, setUserPaid] = useState(false); // Tracks if payment was made
  const params = useParams();
const listingId = params.listingId || params.id;
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/listing/get/${params.listingId}`);
        const data = await res.json();
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setListing(data);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchListing();
  }, [params.listingId]);


 // Paystack configuration
  const config = {
    reference: (new Date()).getTime().toString(),
    email: currentUser?.email || 'user@example.com',
    amount: (listing?.regularPrice ? Math.min(listing.regularPrice * 0.05, 5000) : 5000) * 100, // e.g., Inspection fee or percentage
    publicKey: 'pk_test_c135e1ae921e7fd4dee73963e3a1c97e4797f327', // Replace with your actual Paystack public key
  };

  const onSuccess = (reference) => {
    setUserPaid(true); // Unlocks the landlord details upon successful payment!
  };

  const onClose = () => {
    console.log('Payment modal closed');
  };

  const initializePayment = usePaystackPayment(config);

  return (
    <div className="-mt-2">
      {loading && (
        <div className="text-center text-xl my-12 font-semibold text-indigo-600 animate-pulse">
          Loading executive property details...
        </div>
      )}
      {error && (
        <div className="max-w-6xl mx-auto px-4 text-center text-xl my-12 text-red-500 font-semibold bg-red-50 p-4 rounded-2xl border border-red-100">
          Something went wrong! Listing not found or access restricted.
        </div>
      )}
      {listing && !loading && !error && (
        <div>
          {/* Flush Full-Width Elite Swiper Slider */}
          <div className="relative w-full overflow-hidden shadow-md bg-slate-900 group">
            <Swiper navigation pagination={{ clickable: true }} modules={[Navigation]}>
              {listing.imageUrls.map((url, index) => (
                <SwiperSlide key={index}>
                  <div className="h-[450px] md:h-[550px] w-full flex items-center justify-center bg-black">
                    {url.match(/\.(mp4|webm|ogg|mov)$/i) || url.includes('/video/upload/') ? (
                      <video src={url} controls className="w-full h-full object-cover" />
                    ) : (
                      <img src={url} alt="Property slide" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
                    )}
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Floating Glassmorphism Share Button */}
            <div className="absolute top-5 right-5 z-10 bg-white/80 backdrop-blur-md p-3.5 rounded-full flex justify-center items-center cursor-pointer shadow-lg hover:bg-white transition-all"
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              }}
            >
              <FaShare className="text-slate-800 text-base" />
            </div>
            {copied && (
              <div className="absolute top-20 right-5 z-10 bg-slate-900/90 backdrop-blur-md text-white text-xs font-semibold px-3.5 py-2 rounded-xl shadow-xl">
                Link copied to clipboard! ✓
              </div>
            )}
          </div>

          {/* Sahand's Exact Minimalist Text Layout Style */}
          <main className="max-w-6xl mx-auto px-3 my-6">
            
            {/* Title, Price & Type in a single clean row like Sahand */}
            <div className="mb-4">
              <h1 className="text-2xl md:text-3xl font-bold text-slate-800">
                {listing.name} - ₦{listing.regularPrice.toLocaleString()}
                {listing.type === 'rent' && ' / year'}
              </h1>
              
              <p className="flex items-center gap-2 text-slate-600 text-sm mt-2">
                <FaMapMarkerAlt className="text-green-700" />
                {listing.address}
              </p>

              <div className="flex gap-4 mt-3">
                <span className="bg-red-900 text-white.w-full max-w-[200px] text-center p-1 rounded-md text-sm font-semibold">
                  {listing.type === 'rent' ? 'For Rent' : 'For Sale'}
                </span>
                {listing.offer && (
                  <span className="bg-green-900 text-white w-full max-w-[200px] text-center p-1 rounded-md text-sm font-semibold">
                    ₦{listing.discountPrice.toLocaleString()} Discount
                  </span>
                )}
              </div>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-6">
              <div className="lg:col-span-2 flex flex-col gap-4">
                
                {/* Description - Completely borderless and flat, exactly like Sahand */}
                <p className="text-slate-800 text-sm leading-relaxed">
                  <span className="font-semibold text-black">Description - </span>
                  {listing.description}
                </p>

                {/* Key Specifications (Bedrooms, Bathrooms, etc.) */}
                <ul className="text-green-900 font-semibold text-sm flex flex-wrap items-center gap-4 sm:gap-6">
                  <li className="flex items-center gap-1 whitespace-nowrap">
                    <FaBed className="text-lg" />
                    {listing.bedrooms} {listing.bedrooms > 1 ? 'beds' : 'bed'}
                  </li>
                  <li className="flex items-center gap-1 whitespace-nowrap">
                    <FaBath className="text-lg" />
                    {listing.bathrooms} {listing.bathrooms > 1 ? 'baths' : 'bath'}
                  </li>
                  <li className="flex items-center gap-1 whitespace-nowrap">
                    <FaChair className="text-lg" />
                    {listing.furnished ? 'Furnished' : 'Unfurnished'}
                  </li>
                  <li className="flex items-center gap-1 whitespace-nowrap">
                    <FaParking className="text-lg" />
                    {listing.parking ? 'Parking spot' : 'No Parking'}
                  </li>
                </ul>

              </div>

              {/* Right Column / Bottom Section: Landlord Contact & Paystack Unlock */}
          <div className='max-w-5xl mx-auto px-4 my-8'>
            {currentUser && listing.userRef !== currentUser._id && (
              <div className='bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl flex flex-col items-center text-center'>
                <h3 className='text-xl font-bold text-white mb-2'>
                  Unlock Landlord Contact & Exact Location
                </h3>
                <p className='text-slate-400 text-xs sm:text-sm mb-6'>
                  Make a secure inspection/processing payment via Paystack to instantly reveal the property owner&apos;s name, direct phone number, and location details.
                </p>

                {userPaid || listing.isPaid ? (
                  /* UNLOCKED VIEW: Shows Name, Phone, and Location entered from CreateListing */
                  <div className='w-full max-w-lg p-5 bg-emerald-950/40 border border-[#10B981] rounded-xl flex flex-col gap-3 text-left shadow-lg'>
                    <div className='flex items-center justify-between border-b border-emerald-800/50 pb-2'>
                      <span className='text-xs uppercase font-bold text-[#10B981] tracking-wider'>Payment Verified ✓</span>
                      <span className='text-xs text-slate-300 font-mono'>Direct Access Unlocked</span>
                    </div>
                    <div className='text-sm text-slate-200 space-y-2 pt-1'>
                      <p className='flex items-center gap-2'>
                        <FaUser className='text-[#10B981]' />
                        <strong className='text-white'>Landlord / Agent:</strong> {listing.landlordName || 'Property Manager'}
                      </p>
                      <p className='flex items-center gap-2'>
                        <FaPhoneAlt className='text-[#10B981]' />
                        <strong className='text-white'>Direct Phone:</strong> 
                        <a href={`tel:${listing.landlordPhone}`} className='text-[#10B981] underline font-mono'>
                          {listing.landlordPhone || '+234 800 000 0000'}
                        </a>
                      </p>
                      <p className='flex items-center gap-2'>
                        <FaMapMarkerAlt className='text-[#10B981]' />
                        <strong className='text-white'>Exact Location:</strong> {listing.address}, {listing.lagosArea || 'Lagos'}
                      </p>
                    </div>
                  </div>
                ) : (
                  /* LOCKED VIEW: Paystack Button */
                  <button
                    onClick={() => initializePayment({ onSuccess, onClose })}
                    className='w-full max-w-md py-3.5 px-6 bg-[#10B981] text-[#0A192F] font-extrabold rounded-xl uppercase hover:bg-emerald-400 transition shadow-lg tracking-wider text-sm flex items-center justify-center gap-2'
                  >
                    <FaLock className='text-xs' />
                    <span>Pay Inspection Fee to View Contact</span>
                  </button>
                )}
              </div>
            )}
          </div>

            </div>
          </main>
        </div>
      )}
    </div>
  );
}