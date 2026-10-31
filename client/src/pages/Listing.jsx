import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { usePaystackPayment } from 'react-paystack';
import { updateUserSuccess } from '../redux/user/userSlice';
import {
  FaBed,
  FaBath,
  FaParking,
  FaChair,
  FaMapMarkerAlt,
  FaShare,
  FaPhoneAlt,
  FaUser,
  FaChevronLeft,
  FaChevronRight,
} from 'react-icons/fa';

export default function Listing() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);

  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);
  const [userPaid, setUserPaid] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const [isSaved, setIsSaved] = useState(false);
  const [isCompared, setIsCompared] = useState(false);

  const params = useParams();
  const listingId = params.listingId || params.id;

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/listing/get/${listingId}`);
        const data = await res.json();
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        const actualProperty = data.listing || (Array.isArray(data) ? data[0] : data);
        setListing(actualProperty);

        if (data.unlocked === true) {
          setUserPaid(true);
        } else {
          setUserPaid(false);
        }
        setLoading(false);
      } catch (err) {
        setError(true);
        setLoading(false);
      }
    };
    fetchListing();
  }, [listingId]);

  useEffect(() => {
    if (currentUser && listingId) {
      setIsSaved(currentUser.savedProperties?.includes(listingId) || false);
      setIsCompared(currentUser.comparedProperties?.includes(listingId) || false);
    }
  }, [currentUser, listingId]);




const handleToggleSave = async () => {
  try {
    const res = await fetch('/api/dashboard/saved', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ propertyId: listing._id }),
    });
    const data = await res.json();
    if (data.success) {
      setIsSaved(data.saved); // data.saved tells us if it's currently saved (true/false)
    }
  } catch (error) {
    console.error('Failed to toggle save:', error);
  }
};

  // 1. Add state inside your Listing component

// 2. Add the toggle function
const handleToggleCompare = async () => {
  try {
    const res = await fetch('/api/dashboard/compare', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ propertyId: listing._id }),
    });
    const data = await res.json();
    if (data.success) {
      setIsCompared(!isCompared);
    }
  } catch (error) {
    console.error('Failed to update compare list:', error);
  }
};

  // State inside your Listing component
const [showReportModal, setShowReportModal] = useState(false);
const [reportReason, setReportReason] = useState('Fake Listing');
const [reportDescription, setReportDescription] = useState('');
const [reportSuccess, setReportSuccess] = useState(false);

const handleReportSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await fetch('/api/reports/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        listingId: listing._id,
        reason: reportReason,
        description: reportDescription,
      }),
    });
    const data = await res.json();
    if (data.success) {
      setReportSuccess(true); // Shows our custom in-app success card instead of a browser alert
      setReportDescription('');
    }
  } catch (error) {
    console.error('Failed to submit report:', error);
  }
};
  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? imageUrls.length - 1 : prev - 1));
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev === imageUrls.length - 1 ? 0 : prev + 1));
  };

  if (loading) return <p className="text-center my-7 text-2xl font-semibold text-slate-700">Loading property...</p>;
  if (error || !listing) return <p className="text-center my-7 text-2xl font-semibold text-red-600">Something went wrong!</p>;

  const title = listing.title || listing.name || 'Property Listing';
  const price = Number(listing.regularPrice || listing.price || 0);
  const address = listing.address || listing.location || 'Location Not Specified';
  const type = listing.propertyType || listing.type || 'rent';
  const imageUrls = listing.imageUrls || listing.images || [];
  const bedrooms = listing.bedrooms || 0;
  const bathrooms = listing.bathrooms || 0;
  const furnished = listing.furnished || false;
  const parking = listing.parking || false;
  const description = listing.description || 'No description provided.';

  const inspectionFeeNaira = 50000;

  const config = {
    reference: new Date().getTime().toString(),
    email: currentUser?.email || 'customer@example.com',
    amount: inspectionFeeNaira * 100,
    publicKey: 'pk_test_c135elae921e7fd4dee73963e3a1c97e4797f327',
  };

  const onSuccess = async (reference) => {
    setUserPaid(true);
    try {
      await fetch('/api/paystack/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          reference: reference.reference || config.reference,
          propertyId: listingId,
          listingTitle: title,
          listingDescription: description,
          amount: inspectionFeeNaira,
          currency: 'NGN',
        }),
      });
    } catch (err) {
      console.error('Failed to log payment on backend:', err);
    }
  };

  const onClose = () => console.log('Payment modal closed');
  const initializePayment = usePaystackPayment(config);

  return (
    <main className="overflow-hidden pb-12">
      {/* 1. Multi-Image Gallery Carousel */}
      {imageUrls.length > 0 ? (
        <div className="relative w-full h-[380px] sm:h-[480px] md:h-[550px] overflow-hidden bg-slate-950 flex justify-center items-center group">
          <div
            className="absolute inset-0 bg-cover bg-center filter blur-xl scale-110 opacity-40 transition-all duration-500"
            style={{ backgroundImage: `url(${imageUrls[currentImageIndex]})` }}
          ></div>

          <img
            src={imageUrls[currentImageIndex]}
            alt={title}
            className="relative z-10 w-full h-full object-contain transition-all duration-500"
          />

          {imageUrls.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/80 text-white p-3 rounded-full backdrop-blur-sm transition"
              >
                <FaChevronLeft className="text-lg" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/80 text-white p-3 rounded-full backdrop-blur-sm transition"
              >
                <FaChevronRight className="text-lg" />
              </button>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 bg-slate-900/80 text-white text-xs px-3 py-1 rounded-full backdrop-blur-md">
                {currentImageIndex + 1} / {imageUrls.length}
              </div>
            </>
          )}

          <div
            className="absolute top-4 right-4 z-20 rounded-full w-10 h-10 sm:w-12 sm:h-12 flex justify-center items-center bg-white/90 backdrop-blur-md cursor-pointer shadow-md hover:scale-105 transition"
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
              setCopied(true);
              setTimeout(() => setCopied(false), 2000);
            }}
          >
            <FaShare className="text-slate-700 text-sm sm:text-base" />
          </div>
          {copied && (
            <p className="absolute top-16 right-4 z-20 bg-slate-900 text-white px-3 py-1.5 rounded-md text-xs shadow-md">
              Link copied!
            </p>
          )}
        </div>
      ) : (
        <div className="w-full h-64 bg-slate-200 flex items-center justify-center text-slate-500 font-medium">
          No Property Images Uploaded
        </div>
      )}

      {/* 2. Content Details & Quick Action Buttons */}
      <div className="flex flex-col max-w-4xl mx-auto p-4 my-7 gap-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-2xl font-bold text-slate-800">
              {title} - ₦{price.toLocaleString()} {type === 'rent' && '/ year'}
            </p>
            <p className="flex items-center gap-2 text-slate-600 text-sm mt-2">
              <FaMapMarkerAlt className="text-green-700" />
              {address}
            </p>
          </div>

          {/* Interactive Bookmark (Save) & Compare Action Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleToggleSave}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all shadow-sm ${
                isSaved
                  ? 'bg-[#102A43] text-white'
                  : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <svg className="w-5 h-5" fill={isSaved ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
              {isSaved ? 'Saved' : 'Save Property'}
            </button>

          {/* Add to Compare Button */}
<button
  onClick={handleToggleCompare}
  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all shadow-sm ${
    isCompared
      ? 'bg-[#13865D] text-white'
      : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-50'
  }`}
>
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
    />
  </svg>
  {isCompared ? 'In Compare' : '+ Add to Compare'}
</button>
          </div>
        </div>
        

        <div className="flex gap-4">
          <p className="bg-red-900 w-full max-w-[200px] text-white text-center p-1 rounded-md text-sm font-semibold capitalize">
            {type === 'rent' ? 'For Rent' : 'For Sale'}
          </p>
        </div>

        <p className="text-slate-800 text-sm leading-relaxed">
          <span className="font-semibold text-black">Description - </span>
          {description}
        </p>

        <ul className="text-[#13865D] font-semibold text-sm flex flex-wrap items-center gap-4 sm:gap-6 mb-0">
  <li className="flex items-center gap-1 whitespace-nowrap">
    <FaBed className="text-lg" />
    {bedrooms} {bedrooms === 1 ? 'bed' : 'beds'}
  </li>
  <li className="flex items-center gap-1 whitespace-nowrap">
    <FaBath className="text-lg" />
    {bathrooms} {bathrooms === 1 ? 'bath' : 'baths'}
  </li>
  <li className="flex items-center gap-1 whitespace-nowrap">
    <FaChair className="text-lg" />
    {furnished ? 'Furnished' : 'Unfurnished'}
  </li>
  <li className="flex items-center gap-1 whitespace-nowrap">
    <FaParking className="text-lg" />
    {parking ? 'Parking spot' : 'No Parking'}
  </li>
</ul>
<button
  onClick={() => setShowReportModal(true)}
  className="text-xs text-red-500 hover:underline block text-left -mt-2 mb-2"
>
  Report this listing
</button>
{showReportModal && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
    <div className="bg-white p-8 rounded-3xl max-w-md w-full space-y-6 shadow-xl text-center">
      {reportSuccess ? (
        <div className="space-y-6 py-4">
          <div className="w-16 h-16 bg-green-50 text-[#13865D] rounded-full flex items-center justify-center mx-auto text-2xl font-bold">
            ✓
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-[#172B3A]">Report Submitted</h3>
            <p className="text-sm text-[#64748B]">
              Your report has been successfully sent to the admin for review. Thank you for keeping the platform safe.
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              setReportSuccess(false);
              setShowReportModal(false);
            }}
            className="w-full py-3 rounded-2xl text-sm font-semibold text-white bg-[#102A43] hover:bg-[#172B3A] transition-colors"
          >
            OK
          </button>
        </div>
      ) : (
        /* Your regular report form goes here */
        <>
          <h3 className="text-xl font-bold text-[#172B3A] text-left">Report Listing</h3>
          <form onSubmit={handleReportSubmit} className="space-y-4 text-left">
            <div>
              <label className="text-xs font-semibold text-[#64748B] uppercase block mb-1">Reason</label>
              <select 
                value={reportReason} 
                onChange={(e) => setReportReason(e.target.value)}
                className="w-full bg-[#F5F7F5] p-3 rounded-2xl text-sm focus:outline-none"
              >
                <option value="Fake Listing">Fake Listing / Scam</option>
                <option value="Incorrect Price">Incorrect Price</option>
                <option value="Already Rented">Already Rented / Sold</option>
                <option value="Other">Other Issues</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-[#64748B] uppercase block mb-1">Description</label>
              <textarea
                rows="4"
                placeholder="Provide details for the admin..."
                value={reportDescription}
                onChange={(e) => setReportDescription(e.target.value)}
                className="w-full bg-[#F5F7F5] p-3 rounded-2xl text-sm focus:outline-none"
                required
              />
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowReportModal(false)}
                className="px-5 py-2.5 rounded-xl text-sm font-semibold text-[#64748B] bg-[#F5F7F5]"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-red-600 hover:bg-red-700"
              >
                Submit Report
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  </div>
)}

        {/* 3. Paystack Inspection Lock */}
        <div className="mt-4 pt-2">
          {!userPaid ? (
            <div className="flex flex-col items-start gap-2">
              <p className="text-slate-600 text-sm">
                Inspection Fee: <span className="font-bold text-slate-950">₦{inspectionFeeNaira.toLocaleString()}</span>
              </p>
              <button
                onClick={() => initializePayment(onSuccess, onClose)}
                className="text-emerald-700 font-bold hover:text-emerald-900 underline underline-offset-4 text-base cursor-pointer bg-transparent p-0 border-none"
              >
                Pay inspection fee to view landlord contact details &rarr;
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-2 text-slate-800 text-sm mt-2 bg-emerald-50 p-4 rounded-xl border border-emerald-100">
              <p className="font-bold text-slate-900 flex items-center gap-2 text-base">
                <FaUser className="text-emerald-700" /> Landlord & Agent Contact Details:
              </p>
              <p className="font-semibold">Name: <span className="font-normal">{listing.landlord?.name || 'N/A'}</span></p>
              <p className="flex items-center gap-2 font-semibold">
                <FaPhoneAlt className="text-emerald-700" /> Phone: <span className="font-normal">{listing.landlord?.phone || 'N/A'}</span>
              </p>
              <p className="font-semibold">Office Address: <span className="font-normal">{listing.landlord?.location || listing.landlord?.address || 'N/A'}</span></p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}