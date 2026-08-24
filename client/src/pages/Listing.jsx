import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { useSelector } from 'react-redux';
import { Navigation } from 'swiper/modules';
import 'swiper/css/bundle';
import { FaBath, FaBed, FaChair, FaMapMarkerAlt, FaParking, FaShare } from 'react-icons/fa';
import { PaystackButton } from 'react-paystack';

SwiperCore.use([Navigation]);

export default function Listing() {
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);
  const [userPaid, setUserPaid] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const params = useParams();

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
    if (currentUser) {
      setUserPaid(currentUser.isPaid);
    }
  }, [params.listingId, currentUser]);

  // Paystack Configuration for ₦35,000 (3500000 kobo)
  const paystackConfig = {
    reference: new Date().getTime().toString(),
    email: currentUser?.email,
    amount: 3500000, 
    publicKey: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY,
  };

  const handlePaystackSuccessAction = async (reference) => {
    try {
      const res = await fetch('/api/paystack/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reference: reference.reference, userId: currentUser._id }),
      });
      const data = await res.json();
      if (data.success) {
        setUserPaid(true);
        alert('Payment successful! Landlord contact details unlocked.');
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handlePaystackCloseAction = () => {
    console.log('Payment closed');
  };

  const componentProps = {
    ...paystackConfig,
    text: 'Pay ₦35,000 Commission to Unlock Landlord Contact',
    onSuccess: (reference) => handlePaystackSuccessAction(reference),
    onClose: handlePaystackCloseAction,
  };

  return (
    <main>
      {loading && <p className='text-center my-7 text-2xl'>Loading...</p>}
      {error && <p className='text-center my-7 text-2xl text-red-600'>Something went wrong!</p>}
      
      {listing && !loading && !error && (
        <div>
          <Swiper navigation>
            {listing.imageUrls.map((url) => (
              <SwiperSlide key={url}>
                <div
                  className='h-[550px]'
                  style={{ background: `url(${url}) center no-repeat`, backgroundSize: 'cover' }}
                ></div>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className='fixed top-[13%] right-[3%] z-10 bg-slate-100 w-12 h-12 rounded-full flex justify-center items-center cursor-pointer shadow-lg'>
            <FaShare
              className='text-slate-500'
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              }}
            />
          </div>
          {copied && (
            <p className='fixed top-[23%] right-[5%] z-10 bg-slate-200 p-2 rounded-md text-sm shadow-md'>
              Link copied!
            </p>
          )}

          <div className='max-w-4xl mx-auto p-3 flex flex-col gap-4 my-7'>
            <p className='text-2xl font-semibold'>
              {listing.name} - ₦{' '}
              {listing.offer
                ? listing.discountPrice.toLocaleString('en-US')
                : listing.regularPrice.toLocaleString('en-US')}
              {listing.type === 'rent' && ' / year'}
            </p>
            <p className='flex items-center gap-2 text-slate-600 text-sm'>
              <FaMapMarkerAlt className='text-green-700' />
              {listing.address}
            </p>
            <div className='flex gap-4'>
              <span className='bg-red-900 w-full max-w-[200px] text-white text-center p-1 rounded-md'>
                {listing.type === 'rent' ? 'For Rent' : 'For Sale'}
              </span>
              {listing.offer && (
                <span className='bg-green-900 w-full max-w-[200px] text-white text-center p-1 rounded-md'>
                  ₦{(+listing.regularPrice - +listing.discountPrice).toLocaleString('en-US')} OFF
                </span>
              )}
            </div>
            <p className='text-slate-800'>
              <span className='font-semibold text-black'>Description - </span>
              {listing.description}
            </p>
            <ul className='text-green-900 font-semibold text-sm flex flex-wrap items-center gap-4 sm:gap-6'>
              <li className='flex items-center gap-1 whitespace-nowrap'>
                <FaBed className='text-lg' />
                {listing.bedrooms > 1 ? `${listing.bedrooms} beds` : `${listing.bedrooms} bed`}
              </li>
              <li className='flex items-center gap-1 whitespace-nowrap'>
                <FaBath className='text-lg' />
                {listing.bathrooms > 1 ? `${listing.bathrooms} baths` : `${listing.bathrooms} bed`}
              </li>
              <li className='flex items-center gap-1 whitespace-nowrap'>
                <FaParking className='text-lg' />
                {listing.parking ? 'Parking spot' : 'No Parking'}
              </li>
              <li className='flex items-center gap-1 whitespace-nowrap'>
                <FaChair className='text-lg' />
                {listing.furnished ? 'Furnished' : 'Unfurnished'}
              </li>
            </ul>

            {/* Landlord Contact Section with Paystack Protection */}
            {currentUser && (currentUser.email === 'ugochukwumickel15@gmail.com' || userPaid) ? (
              <div className='bg-slate-50 border border-slate-300 p-6 rounded-2xl flex flex-col gap-3 mt-6'>
                <h3 className='text-lg font-bold text-slate-800'>Direct Landlord Contact Details</h3>
                <p className='text-sm text-slate-600'><span className='font-semibold'>Name:</span> {listing.landlordName}</p>
                <p className='text-sm text-slate-600'><span className='font-semibold'>Phone:</span> {listing.landlordPhone}</p>
              </div>
            ) : (
              <div className='bg-amber-50 border border-amber-200 p-6 rounded-2xl flex flex-col items-center text-center gap-3 mt-6'>
                <h3 className='text-lg font-bold text-amber-900'>Want to contact this landlord directly?</h3>
                <p className='text-xs text-amber-700 max-w-md'>
                  Pay a one-time ₦35,000 commission fee via Paystack to unlock direct phone numbers and avoid scam agents completely.
                </p>
                {currentUser ? (
                  <PaystackButton {...componentProps} className='mt-2 px-6 py-3 bg-emerald-600 text-white font-bold rounded-xl text-sm uppercase hover:bg-emerald-700 transition shadow-md' />
                ) : (
                  <p className='text-xs text-red-600 font-semibold'>Please sign in to proceed with payment.</p>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  );
}