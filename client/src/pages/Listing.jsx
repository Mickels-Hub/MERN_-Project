import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { useSelector } from 'react-redux';
import { Navigation } from 'swiper/modules';
import 'swiper/css/bundle';
import { FaBath, FaBed, FaChair, FaMapMarkerAlt, FaParking, FaShare, FaPhoneAlt, FaWhatsapp, FaShieldAlt } from 'react-icons/fa';
import { PaystackButton } from 'react-paystack';

SwiperCore.use([Navigation]);

export default function Listing() {
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);
  const [userPaid, setUserPaid] = useState(false);
  
  // --- NEW: Interactive Feed States ---
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [commentContent, setCommentContent] = useState('');
  const [commentsList, setCommentsList] = useState([]);

  const { currentUser } = useSelector((state) => state.user);
  const params = useParams();

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/listing/get/${params.listingId}`, {
        credentials: 'include',
        });
        const data = await res.json();
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setListing(data);
        setLoading(false);
        setError(false);

        // --- NEW: Populate initial likes and comments ---
        setLikeCount(data.likes ? data.likes.length : 0);
        setLiked(data.likes && data.likes.includes(currentUser?._id));
        setCommentsList(data.comments || []);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchListing();
  }, [params.listingId]);

  // --- NEW: Handlers for Like and Comment ---
  const handleLike = async () => {
    try {
      const res = await fetch(`/api/listing/like/${params.listingId}`, {
        method: 'POST',
      });
      const data = await res.json();
      if (res.ok) {
        setLikeCount(data.likes.length);
        setLiked(data.likes.includes(currentUser?._id));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!commentContent.trim()) return;
    try {
      const res = await fetch(`/api/listing/comment/${params.listingId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: currentUser.username,
          avatar: currentUser.avatar,
          content: commentContent,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setCommentsList(data.comments);
        setCommentContent('');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const paystackConfig = {
    reference: (new Date()).getTime().toString(),
    email: currentUser ? currentUser.email : 'user@example.com',
    amount: 4500000, // #45,000 in kobo
    publicKey: 'pk_test_your_paystack_key_here', 
  };

  const handlePaystackSuccessAction = (reference) => {
    setUserPaid(true);
    console.log(reference);
  };

  const handlePaystackCloseAction = () => {
    console.log('Payment closed');
  };

  const componentProps = {
    ...paystackConfig,
    text: 'Pay #45,000 Now',
    onSuccess: (reference) => handlePaystackSuccessAction(reference),
    onClose: handlePaystackCloseAction,
  };

  return (
<main className="max-w-6xl mx-auto p-4 mb-14">
      {loading && (
        <div className="text-center text-xl my-12 font-semibold text-indigo-600 animate-pulse">
          Loading executive property details...
        </div>
      )}
      {error && (
        <div className="text-center text-xl my-12 text-red-500 font-semibold bg-red-50 p-4 rounded-2xl border border-red-100">
          Something went wrong! Listing not found or access restricted.
        </div>
      )}
        {listing && !loading && error === false && (
        <div>
          {/* Elite Swiper Slider with Smooth Zoom & Glass Controls */}
          <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-100 bg-slate-900 my-4 group">
            <Swiper navigation pagination={{ clickable: true }} modules={[Navigation]}>
              {listing.imageUrls.map((url, index) => (
                <SwiperSlide key={index}>
                  <div className="h-[420px] md:h-[550px] w-full flex items-center justify-center bg-black">
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
            <div className="absolute top-5 right-5 z-10 bg-white/80 backdrop-blur-md p-3.5 rounded-full flex justify-center items-center cursor-pointer shadow-lg hover:bg-white hover:scale-110 transition-all duration-300"
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              }}
            >
              <FaShare className="text-slate-800 text-base" />
            </div>
            {copied && (
              <div className="absolute top-20 right-5 z-10 bg-slate-900/90 backdrop-blur-md text-white text-xs font-semibold px-3.5 py-2 rounded-xl shadow-2xl animate-fade-in">
                Link copied to clipboard! ✓
              </div>
            )}
          </div>

          {/* Header Info & Premium Pricing Section */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-white p-8 rounded-3xl shadow-sm border border-slate-100/80 my-6">
            <div className="space-y-2">
              <span className="inline-block px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 rounded-full border border-indigo-100">
                {listing.type === 'rent' ? 'For Rent' : 'For Sale'}
              </span>
              <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">{listing.name}</h1>
              <p className="flex items-center gap-2 text-slate-500 text-sm font-medium">
                <FaMapMarkerAlt className="text-indigo-600 text-base" />
                {listing.address}
              </p>
            </div>
            <div className="text-left md:text-right bg-slate-50 md:bg-transparent p-4 md:p-0 rounded-2xl w-full md:w-auto">
              <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Asking Investment</p>
              <p className="text-3xl md:text-4xl font-black text-slate-900 mt-1">
                ₦{listing.regularPrice?.toLocaleString()} 
                {listing.type === 'rent' && <span className="text-sm font-normal text-slate-500"> / year</span>}
              </p>
              {listing.offer && (
                <span className="inline-block mt-2 px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-lg border border-emerald-200 shadow-sm">
                  ₦{listing.discountPrice?.toLocaleString()} Special Discount Active
                </span>
              )}
            </div>
          </div>

          {/* Content Layout Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
            <div className="lg:col-span-2 space-y-6">
              {/* Description Box */}
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100/80">
                <h3 className="text-xl font-extrabold text-slate-900 mb-4 pb-2 border-b border-slate-100">Overview & Features</h3>
                <p className="text-slate-600 leading-relaxed whitespace-pre-line text-base">{listing.description}</p>
              </div>

              {/* Key Specifications Grid */}
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100/80">
                <h3 className="text-xl font-extrabold text-slate-900 mb-6 pb-2 border-b border-slate-100">Property Specifications</h3>
                <ul className="grid grid-cols-2 md:grid-cols-4 gap-4 text-slate-700 text-sm font-bold">
                  <li className="flex flex-col items-center justify-center gap-2 p-4 bg-slate-50/80 hover:bg-indigo-50/50 rounded-2xl border border-slate-100 transition-colors">
                    <FaBed className="text-indigo-600 text-2xl" />
                    <span>{listing.bedrooms} {listing.bedrooms > 1 ? 'Bedrooms' : 'Bedroom'}</span>
                  </li>
                  <li className="flex flex-col items-center justify-center gap-2 p-4 bg-slate-50/80 hover:bg-indigo-50/50 rounded-2xl border border-slate-100 transition-colors">
                    <FaBath className="text-indigo-600 text-2xl" />
                    <span>{listing.bathrooms} {listing.bathrooms > 1 ? 'Bathrooms' : 'Bathroom'}</span>
                  </li>
                  <li className="flex flex-col items-center justify-center gap-2 p-4 bg-slate-50/80 hover:bg-indigo-50/50 rounded-2xl border border-slate-100 transition-colors">
                    <FaChair className="text-indigo-600 text-2xl" />
                    <span>{listing.furnished ? 'Furnished' : 'Unfurnished'}</span>
                  </li>
                  <li className="flex flex-col items-center justify-center gap-2 p-4 bg-slate-50/80 hover:bg-indigo-50/50 rounded-2xl border border-slate-100 transition-colors">
                    <FaParking className="text-indigo-600 text-2xl" />
                    <span>{listing.parking ? 'Parking' : 'No Parking'}</span>
                  </li>
                </ul>
              </div>
            </div>

      {/* Right Column: Secure Paystack & Inspection CTA */}
          {currentUser?.email !== 'ugochukwumickel15@gmail.com' && !listing.isPaid && (
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white p-8 rounded-3xl shadow-2xl">
                <h3 className="text-xl font-extrabold mb-3 tracking-wide">Mikel's Estate Security</h3>
                <p className="text-sm text-slate-300 font-medium leading-relaxed mb-6">
                  Verify inspection credentials or complete your platform processing fee securely via Paystack to unlock full documentation.
                </p>

                <div className="mt-4">
                  {userPaid ? (
                    <div className="w-full text-center bg-emerald-600 text-white font-bold py-4 rounded-2xl shadow-lg">
                      Payment Confirmed ✓
                    </div>
                  ) : (
                    <div className="w-full">
                      <PaystackButton {...componentProps} className="w-full text-center bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold p-4 rounded-2xl shadow-lg cursor-pointer transition-all duration-300" />
                    </div>
                    )}
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      )}
    </main>
  );
}