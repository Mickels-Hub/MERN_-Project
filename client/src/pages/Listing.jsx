import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { Navigation } from 'swiper/modules';
import 'swiper/css/bundle';
import { 
  FaMapMarkerAlt, 
  FaShare, 
  FaBed, 
  FaBath, 
  FaChair, 
  FaParking 
} from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { usePaystackPayment } from 'react-paystack';
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa';

SwiperCore.use([Navigation]);

export default function Listing() {
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);
  const [userPaid, setUserPaid] = useState(false);
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

    const [commentText, setCommentText] = useState('');

  const handleLike = async () => {
  try {
    const url = `/api/listing/like/${listingId}`;
    console.log("Attempting to fetch URL:", url);
    const res = await fetch(url, {
      method: 'POST',
      credentials: 'include',
    });
    const data = await res.json();
    if (res.ok) {
      setListing(data);
    }
  } catch (error) {
    console.log(error);
  }
};

  const handleDislike = async () => {
    try {
      const res = await fetch(`/api/listing/dislike/${listingId}`, {
     method: 'POST',
    credentials: 'include',
    });
      const data = await res.json();
      if (res.ok) {
        setListing(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    try {
      const res = await fetch(`/api/listing/comment/${listingId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // <--- This sends your JWT cookie to the backend
        body: JSON.stringify({ comment: commentText }),
      });
      const data = await res.json();
      if (res.ok) {
        setListing(data);
        setCommentText('');
      }
    } catch (error) {
      console.log(error);
    }
  };
  // State for reply inputs
const [replyingTo, setReplyingTo] = useState(null);
const [replyText, setReplyText] = useState('');

const handleReplySubmit = async (commentId) => {
  try {
    const res = await fetch(`/api/listing/comment/reply/${listingId}/${commentId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ replyText }),
    });
    const data = await res.json();
    if (res.ok) {
      setListing(data);
      setReplyText('');
      setReplyingTo(null);
    }
  } catch (error) {
    console.log(error);
  }
};
  const config = {
    reference: (new Date()).getTime().toString(),
    email: currentUser?.email || 'user@example.com',
    amount: (listing?.regularPrice || 1000) * 100,
    publicKey: 'pk_test_YourPublicKeyHere',
  };

  const onSuccess = (reference) => {
    setUserPaid(true);
  };

  const onClose = () => {
    console.log('closed');
  };

  const PaystackButton = usePaystackPayment(config);

  const componentProps = {
    ...config,
    text: 'Pay Inspection Fee',
    onSuccess: (reference) => onSuccess(reference),
    onClose: onClose,
  };

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
                {/* Like / Dislike Bar */}
    <div className="flex items-center gap-6 my-4">
   <button onClick={handleLike} className="flex items-center gap-2 text-slate-700 hover:text-blue-600">
    <FaThumbsUp /> <span>{listing.likes?.length || 0}</span>
    </button>
    <button onClick={handleDislike} className="flex items-center gap-2 text-slate-700 hover:text-red-600">
    <FaThumbsDown /> <span>{listing.dislikes?.length || 0}</span>
    </button>
      </div>
    {/* Comments Section */}
<div className="mt-8">
  <h3 className="text-xl font-bold mb-6 text-slate-900">
    Comments ({listing.comments?.length || 0})
  </h3>

  {/* Main Comment Input */}
  <form onSubmit={handleCommentSubmit} className="flex gap-3 mb-8">
    <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-700">
      {currentUser?.username ? currentUser.username.charAt(0).toUpperCase() : 'U'}
    </div>
    <div className="flex-1">
      <input
        type="text"
        placeholder="Add a comment..."
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        className="w-full bg-transparent border-b border-slate-300 pb-1 focus:border-slate-900 outline-none text-sm transition-colors"
      />
      <div className="flex justify-end gap-2 mt-2">
        <button
          type="button"
          onClick={() => setCommentText('')}
          className="px-4 py-1.5 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-full"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-1.5 text-sm font-medium bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
        >
          Comment
        </button>
      </div>
    </div>
  </form>

  {/* Display Comments List */}
  <div className="flex flex-col gap-6">
    {listing.comments?.map((c) => (
      <div key={c._id} className="flex gap-3 text-sm">
        {/* Avatar initial */}
        <div className="w-9 h-9 rounded-full bg-slate-800 text-white flex items-center justify-center font-semibold flex-shrink-0 text-xs">
          {c.username ? c.username.charAt(0).toUpperCase() : 'U'}
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-semibold text-slate-900">@{c.username}</span>
            <span className="text-xs text-slate-500">Just now</span>
          </div>

          <p className="text-slate-800 leading-relaxed mb-2">{c.comment}</p>

          {/* Action buttons (Like/Reply) */}
          <div className="flex items-center gap-4 text-slate-600 text-xs">
            <button
              onClick={() => setReplyingTo(c._id)}
              className="font-medium hover:text-blue-600 transition"
            >
              Reply
            </button>
          </div>

          {/* Conditionally show reply input */}
          {replyingTo === c._id && (
            <div className="flex gap-2 mt-3 pl-2">
              <input
                type="text"
                placeholder="Add a reply..."
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                className="w-full bg-transparent border-b border-slate-300 pb-1 focus:border-slate-900 outline-none text-sm transition-colors"
              />
              <button
                onClick={() => handleReplySubmit(c._id)}
                className="px-3 py-1 bg-blue-600 text-white text-xs font-medium rounded-full hover:bg-blue-700"
              >
                Reply
              </button>
            </div>
          )}

          {/* Nested Replies Stream */}
          {c.replies && c.replies.length > 0 && (
            <div className="flex flex-col gap-4 mt-3 pl-4 border-l-2 border-slate-100">
              {c.replies.map((reply) => (
                <div key={reply._id} className="flex gap-3">
                  <div className="w-7 h-7 rounded-full bg-slate-700 text-white flex items-center justify-center font-semibold text-[10px] flex-shrink-0">
                    {reply.username ? reply.username.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="font-semibold text-slate-900 text-xs">@{reply.username}</span>
                    </div>
                    <p className="text-slate-800 text-xs leading-relaxed">{reply.reply}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    ))}
  </div>
</div>

              </div>

              {/* Right Column: Secure Paystack & Inspection CTA */}
              <div>
                {currentUser?.email !== 'ugochukwumickel15@gmail.com' && !listing.isPaid && (
                  <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-lg sticky top-6">
                    <h3 className="text-lg font-bold mb-2">Mikel's Estate Security</h3>
                    <p className="text-xs text-slate-300 mb-4">
                      Complete your platform processing fee securely via Paystack to unlock full documentation.
                    </p>
                    <div className="mt-2">
                      {userPaid ? (
                        <div className="w-full text-center bg-emerald-600 text-white font-bold py-3 rounded-xl text-sm">
                          Payment Confirmed ✓
                        </div>
                      ) : (
                        <div className="w-full">
                          <PaystackButton {...componentProps} className="w-full text-center bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 rounded-xl text-sm transition-all" />
                        </div>
                      )}
                    </div>
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