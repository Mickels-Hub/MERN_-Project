import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { usePaystackPayment } from 'react-paystack';
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
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);
  const [userPaid, setUserPaid] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const params = useParams();
  const listingId = params.listingId || params.id;
  const { currentUser } = useSelector((state) => state.user);

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
        setError(false);
      } catch (err) {
        setError(true);
        setLoading(false);
      }
    };
    fetchListing();
  }, [listingId]);

  if (loading)
    return <p className='text-center my-7 text-2xl font-semibold text-slate-700'>Loading property...</p>;
  if (error || !listing)
    return <p className='text-center my-7 text-2xl font-semibold text-red-600'>Something went wrong!</p>;

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
    publicKey: 'pk_test_c135e1ae921e7fd4dee73963e3a1c97e4797f327',
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
        }),
      });
    } catch (err) {
      console.error('Failed to log payment on backend:', err);
    }
  };

  const onClose = () => console.log('Payment modal closed');
  const initializePayment = usePaystackPayment(config);

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? imageUrls.length - 1 : prev - 1));
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev === imageUrls.length - 1 ? 0 : prev + 1));
  };

  return (
    <main className="overflow-hidden">
      {/* 1. Multi-Image Side-by-Side Gallery Carousel with Left/Right Scroll */}
      {imageUrls.length > 0 ? (
        <div className='relative w-full h-[380px] sm:h-[480px] md:h-[550px] overflow-hidden bg-slate-950 flex justify-center items-center group'>
          {/* Ambient Blurred Background */}
          <div
            className='absolute inset-0 bg-cover bg-center filter blur-xl scale-110 opacity-40 transition-all duration-500'
            style={{ backgroundImage: `url(${imageUrls[currentImageIndex]})` }}
          ></div>

          {/* Active Main Image */}
          <img
            src={imageUrls[currentImageIndex]}
            alt={title}
            className='relative z-10 w-full h-full object-contain transition-all duration-500'
          />

          {/* Left Navigation Arrow */}
          {imageUrls.length > 1 && (
            <button
              onClick={prevImage}
              className='absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/80 text-white p-3 rounded-full backdrop-blur-sm transition'
            >
              <FaChevronLeft className='text-lg' />
            </button>
          )}

          {/* Right Navigation Arrow */}
          {imageUrls.length > 1 && (
            <button
              onClick={nextImage}
              className='absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/80 text-white p-3 rounded-full backdrop-blur-sm transition'
            >
              <FaChevronRight className='text-lg' />
            </button>
          )}

          {/* Image Counter Badge */}
          {imageUrls.length > 1 && (
            <div className='absolute bottom-4 left-1/2 -translate-x-1/2 z-20 bg-slate-900/80 text-white text-xs px-3 py-1 rounded-full backdrop-blur-md font-semibold'>
              {currentImageIndex + 1} / {imageUrls.length}
            </div>
          )}

          {/* Share Button */}
          <div
            className='absolute top-4 right-4 z-20 rounded-full w-10 h-10 sm:w-12 sm:h-12 flex justify-center items-center bg-white/90 backdrop-blur-md cursor-pointer shadow-lg hover:bg-white transition'
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
              setCopied(true);
              setTimeout(() => setCopied(false), 2000);
            }}
          >
            <FaShare className='text-slate-700 text-sm sm:text-base' />
          </div>
          {copied && (
            <p className='absolute top-16 right-4 z-20 bg-slate-900 text-white px-3 py-1.5 rounded-md text-xs shadow-md'>
              Link copied!
            </p>
          )}
        </div>
      ) : (
        <div className='w-full h-64 bg-slate-200 flex items-center justify-center text-slate-500 font-medium'>
          No Property Images Uploaded
        </div>
      )}

      {/* 2. Content Details (Sahand Borderless Layout) */}
      <div className='flex flex-col max-w-4xl mx-auto p-3 my-7 gap-4'>
        <p className='text-2xl font-semibold text-slate-800'>
          {title} - ₦{price.toLocaleString()}
          {type === 'rent' && ' / year'}
        </p>

        <p className='flex items-center gap-2 text-slate-600 text-sm'>
          <FaMapMarkerAlt className='text-green-700' />
          {address}
        </p>

        <div className='flex gap-4'>
          <p className='bg-red-900 w-full max-w-[200px] text-white text-center p-1 rounded-md text-sm font-semibold capitalize'>
            {type === 'rent' ? 'For Rent' : 'For Sale'}
          </p>
        </div>

        <p className='text-slate-800 text-sm leading-relaxed'>
          <span className='font-semibold text-black'>Description - </span>
          {description}
        </p>

        <ul className='text-green-900 font-semibold text-sm flex flex-wrap items-center gap-4 sm:gap-6 my-2'>
          <li className='flex items-center gap-1 whitespace-nowrap'>
            <FaBed className='text-lg' />
            {bedrooms} {bedrooms === 1 ? 'bed' : 'beds'}
          </li>
          <li className='flex items-center gap-1 whitespace-nowrap'>
            <FaBath className='text-lg' />
            {bathrooms} {bathrooms === 1 ? 'bath' : 'baths'}
          </li>
          <li className='flex items-center gap-1 whitespace-nowrap'>
            <FaChair className='text-lg' />
            {furnished ? 'Furnished' : 'Unfurnished'}
          </li>
          <li className='flex items-center gap-1 whitespace-nowrap'>
            <FaParking className='text-lg' />
            {parking ? 'Parking spot' : 'No Parking'}
          </li>
        </ul>

        {/* 3. Paystack Inspection Lock */}
        <div className='mt-4 pt-2'>
          {!userPaid ? (
            <div className='flex flex-col items-start gap-2'>
              <p className='text-slate-600 text-sm'>
                Inspection Fee: <span className='font-bold text-slate-900'>₦{inspectionFeeNaira.toLocaleString()}</span>
              </p>
              <button
                onClick={() => initializePayment(onSuccess, onClose)}
                className='text-emerald-700 font-bold hover:text-emerald-900 underline underline-offset-4 text-base cursor-pointer bg-transparent p-0 border-none'
              >
                Pay inspection fee to view landlord contact details →
              </button>
            </div>
          ) : (
            <div className='flex flex-col gap-2 text-slate-800 text-sm mt-2'>
              <p className='font-bold text-slate-900 flex items-center gap-2 text-base'>
                <FaUser className='text-emerald-700' /> Landlord & Agent Contact Details:
              </p>
              <p><span className='font-semibold'>Name:</span> {listing.landlord?.name || 'N/A'}</p>
              <p className='flex items-center gap-2'>
                <FaPhoneAlt className='text-emerald-700' />
                <span className='font-semibold'>Phone:</span> {listing.landlord?.phone || 'N/A'}
              </p>
              <p><span className='font-semibold'>Office Address:</span> {listing.landlord?.location || listing.landlord?.address || 'N/A'}</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}