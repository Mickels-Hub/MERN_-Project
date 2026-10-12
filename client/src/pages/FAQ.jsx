import { FaPhoneAlt, FaComments, FaCalendarCheck, FaQuestionCircle } from 'react-icons/fa';

export default function FAQ() {
  return (
    <div className='min-h-screen bg-white text-slate-800 font-sans pb-24'>
      
      {/* Header Banner */}
      <div className='bg-[#003580] text-white py-14 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-6xl mx-auto space-y-3'>
          <h1 className='text-3xl sm:text-5xl font-extrabold tracking-tight'>
            Inspection Guide & FAQ
          </h1>
          <p className='text-slate-200 text-sm sm:text-base max-w-3xl font-normal leading-relaxed'>
            Discover how easy it is to find rental flats, connect directly with verified landlords, and inspect properties across Nigeria on MiEstate.
          </p>
        </div>
      </div>

      <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 pt-12'>

        {/* Visual Inspection Walkthrough (Centered Text + Fresh Portrait Images) */}
        <div className='space-y-12'>
          <div className='space-y-2'>
            <h2 className='text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight'>
              How physical inspections work on MiEstate
            </h2>
            <p className='text-slate-600 text-xs sm:text-sm max-w-2xl'>
              We do not use automatic web calendars that clash with landlord schedules. You connect directly with property managers to pick a date and time that fits both of your plans.
            </p>
          </div>

          <div className='space-y-16'>

            {/* Step 1: Vertically Centered Text Right, Fresh Image Left */}
            <div className='flex flex-col md:flex-row items-center gap-8 md:gap-12'>
              <div className='w-full max-w-xs sm:max-w-sm md:w-5/12 overflow-hidden rounded-2xl shrink-0 mx-auto md:mx-0'>
                <img 
                  src='https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&w=800&q=80' 
                  alt='Apartment Keys & Contact' 
                  className='w-full aspect-[3/4] object-cover rounded-2xl block hover:scale-105 transition-transform duration-300'
                />
              </div>
              <div className='w-full md:w-7/12 flex flex-col justify-center space-y-4'>
                <div className='p-3.5 bg-blue-50 text-[#003580] rounded-full w-fit text-xl'>
                  <FaPhoneAlt />
                </div>
                <h3 className='font-bold text-xl sm:text-2xl text-slate-900'>1. Get Direct Landlord Contact Information</h3>
                <p className='text-slate-600 text-xs sm:text-sm leading-relaxed'>
                  When you browse apartments, self-contain flats, or commercial spaces for rent on MiEstate, every verified listing provides direct lines to the landlord or registered property manager.
                </p>
                <p className='text-slate-600 text-xs sm:text-sm leading-relaxed'>
                  You can instantly click to call, send an email, or launch a direct WhatsApp chat without dealing with unverified middlemen or hidden site booking charges.
                </p>
              </div>
            </div>

            {/* Step 2: Vertically Centered Text Right, Fresh Image Left */}
            <div className='flex flex-col md:flex-row items-center gap-8 md:gap-12'>
              <div className='w-full max-w-xs sm:max-w-sm md:w-5/12 overflow-hidden rounded-2xl shrink-0 mx-auto md:mx-0'>
                <img 
                  src='https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80' 
                  alt='Direct Communication with Landlord' 
                  className='w-full aspect-[3/4] object-cover rounded-2xl block hover:scale-105 transition-transform duration-300'
                />
              </div>
              <div className='w-full md:w-7/12 flex flex-col justify-center space-y-4'>
                <div className='p-3.5 bg-blue-50 text-[#003580] rounded-full w-fit text-xl'>
                  <FaComments />
                </div>
                <h3 className='font-bold text-xl sm:text-2xl text-slate-900'>2. Agree on a Convenient Inspection Time</h3>
                <p className='text-slate-600 text-xs sm:text-sm leading-relaxed'>
                  Speak with the landlord directly to confirm apartment availability, rental pricing details, service charge breakdowns, and water or electricity setup.
                </p>
                <p className='text-slate-600 text-xs sm:text-sm leading-relaxed'>
                  Once you agree on a mutual viewing day, the landlord will block out time to meet you at the property location personally.
                </p>
              </div>
            </div>

            {/* Step 3: Vertically Centered Text Right, Fresh Image Left */}
            <div className='flex flex-col md:flex-row items-center gap-8 md:gap-12'>
              <div className='w-full max-w-xs sm:max-w-sm md:w-5/12 overflow-hidden rounded-2xl shrink-0 mx-auto md:mx-0'>
                <img 
                  src='https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80' 
                  alt='Physical Rental Home Inspection' 
                  className='w-full aspect-[3/4] object-cover rounded-2xl block hover:scale-105 transition-transform duration-300'
                />
              </div>
              <div className='w-full md:w-7/12 flex flex-col justify-center space-y-4'>
                <div className='p-3.5 bg-blue-50 text-[#003580] rounded-full w-fit text-xl'>
                  <FaCalendarCheck />
                </div>
                <h3 className='font-bold text-xl sm:text-2xl text-slate-900'>3. Physical Walk-Through & Tenancy Handover</h3>
                <p className='text-slate-600 text-xs sm:text-sm leading-relaxed'>
                  Arrive during daylight hours to inspect the rooms, kitchen fittings, plumbing, prepaid meters, and compound security.
                </p>
                <p className='text-slate-600 text-xs sm:text-sm leading-relaxed'>
                  If satisfied, review the lease agreement contract directly with the landlord, execute payment through official channels, and receive your apartment keys.
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* Frequently Asked Questions */}
        <div className='bg-[#f5f5f5] rounded-2xl p-8 sm:p-12 space-y-8'>
          <h2 className='text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3'>
            <FaQuestionCircle className='text-[#003580]' /> Frequently Asked Questions
          </h2>

          <div className='space-y-6 text-slate-800 text-xs sm:text-sm'>
            <div className='space-y-2 border-b border-slate-200 pb-5'>
              <h3 className='font-bold text-slate-900 text-base'>How do I contact a landlord on MiEstate?</h3>
              <p className='text-slate-600 leading-relaxed'>
                Simply click on any property listing you are interested in. You will find the landlord or verified agency manager's direct phone number, email address, or WhatsApp button to reach out immediately.
              </p>
            </div>

            <div className='space-y-2 border-b border-slate-200 pb-5'>
              <h3 className='font-bold text-slate-900 text-base'>Is MiEstate strictly for rental properties?</h3>
              <p className='text-slate-600 leading-relaxed'>
                Yes! MiEstate is built exclusively to connect tenants with verified residential flats, duplexes, self-contain apartments, and commercial real estate available for rent across Nigeria.
              </p>
            </div>

            <div className='space-y-2 border-b border-slate-200 pb-5'>
              <h3 className='font-bold text-slate-900 text-base'>Does MiEstate charge tenants inspection booking fees?</h3>
              <p className='text-slate-600 leading-relaxed'>
                No. MiEstate is a transparent rental listing directory. Searching for properties and getting direct landlord contacts on MiEstate is completely free for all home seekers.
              </p>
            </div>

            <div className='space-y-2 pb-2'>
              <h3 className='font-bold text-slate-900 text-base'>Are unverified individual property postings allowed?</h3>
              <p className='text-slate-600 leading-relaxed'>
                No. To keep our tenants safe from real estate scams, all property listings on MiEstate are uploaded through verified corporate managers, accredited estate agencies, and super-administrators.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}