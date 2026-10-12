import { FaShieldAlt, FaHandshake, FaCheckCircle, FaBuilding, FaUserCheck, FaKey, FaSearch, FaClipboardList } from 'react-icons/fa';

export default function HowItWorks() {
  return (
    <div className='min-h-screen bg-white text-slate-800 font-sans pb-24'>
      
      {/* Top Banner (Booking.com Navy Header) */}
      <div className='bg-[#003580] text-white py-14 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-6xl mx-auto space-y-3'>
          <h1 className='text-3xl sm:text-5xl font-extrabold tracking-tight'>
            How does MiEstate work?
          </h1>
          <p className='text-slate-200 text-sm sm:text-base max-w-3xl font-normal leading-relaxed'>
            Connecting property seekers, verified corporate agencies, and institutional investors across Nigeria through an end-to-end, transparent digital real estate ecosystem.
          </p>
        </div>
      </div>

      <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 pt-12'>

        {/* Core Value Pillars (Booking.com Horizontal Feature Layout) */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          <div className='flex items-start gap-4'>
            <div className='p-3.5 rounded-full bg-blue-50 text-[#003580] text-2xl shrink-0'>
              <FaShieldAlt />
            </div>
            <div className='space-y-1.5'>
              <h3 className='font-bold text-base text-slate-900'>100% Physical & Title Audits</h3>
              <p className='text-xs sm:text-sm text-slate-600 leading-relaxed'>
                Every apartment, residential estate, and commercial land listing undergoes coordinate surveys, land registry title searches, and physical verification before receiving our platform trust stamp.
              </p>
            </div>
          </div>

          <div className='flex items-start gap-4'>
            <div className='p-3.5 rounded-full bg-blue-50 text-[#003580] text-2xl shrink-0'>
              <FaHandshake />
            </div>
            <div className='space-y-1.5'>
              <h3 className='font-bold text-base text-slate-900'>Direct Enterprise Lines</h3>
              <p className='text-xs sm:text-sm text-slate-600 leading-relaxed'>
                Communicate directly with accredited enterprise agency leads and verified asset custodians. Unverified third-party sub-agents and inflated middleman markups are strictly eliminated.
              </p>
            </div>
          </div>

          <div className='flex items-start gap-4'>
            <div className='p-3.5 rounded-full bg-blue-50 text-[#003580] text-2xl shrink-0'>
              <FaCheckCircle />
            </div>
            <div className='space-y-1.5'>
              <h3 className='font-bold text-base text-slate-900'>Structured Legal Handover</h3>
              <p className='text-xs sm:text-sm text-slate-600 leading-relaxed'>
                From booking inspection schedules online to executing registered deed transfers or long-term lease contracts, our platform ensures every transaction is backed by clear legal documentation.
              </p>
            </div>
          </div>
        </div>

        {/* In-Depth Step-by-Step Walkthrough */}
        <div className='space-y-10'>
          <div className='space-y-2'>
            <h2 className='text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight'>
              Your complete journey on MiEstate
            </h2>
            <p className='text-slate-600 text-xs sm:text-sm max-w-2xl'>
              A streamlined, step-by-step framework built to deliver absolute security and convenience at every stage of acquisition.
            </p>
          </div>

          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8'>
            <div className='space-y-3'>
              <div className='w-10 h-10 rounded-full bg-[#003580] text-white font-bold flex items-center justify-center text-sm shadow-sm'>
                1
              </div>
              <h3 className='font-bold text-base text-slate-900'>Precision Search & Filtering</h3>
              <p className='text-xs sm:text-sm text-slate-600 leading-relaxed'>
                Browse real-time listings across prime regions in Lagos, Abuja, Port Harcourt, and emerging growth corridors. Filter by property type, rent or outright purchase, price range, and custom specifications.
              </p>
            </div>

            <div className='space-y-3'>
              <div className='w-10 h-10 rounded-full bg-[#003580] text-white font-bold flex items-center justify-center text-sm shadow-sm'>
                2
              </div>
              <h3 className='font-bold text-base text-slate-900'>Instant Online Inspection</h3>
              <p className='text-xs sm:text-sm text-slate-600 leading-relaxed'>
                Select your preferred date and time slot to book a physical walk-through. Verified agency hosts receive your request and confirm appointments directly through your personal dashboard.
              </p>
            </div>

            <div className='space-y-3'>
              <div className='w-10 h-10 rounded-full bg-[#003580] text-white font-bold flex items-center justify-center text-sm shadow-sm'>
                3
              </div>
              <h3 className='font-bold text-base text-slate-900'>Title Verification & Audits</h3>
              <p className='text-xs sm:text-sm text-slate-600 leading-relaxed'>
                Examine clear records of Certificate of Occupancy (C of O), Governor’s Consent, and official land survey plans provided by our accredited estate managers prior to financial commitment.
              </p>
            </div>

            <div className='space-y-3'>
              <div className='w-10 h-10 rounded-full bg-[#003580] text-white font-bold flex items-center justify-center text-sm shadow-sm'>
                4
              </div>
              <h3 className='font-bold text-base text-slate-900'>Final Contract & Keys</h3>
              <p className='text-xs sm:text-sm text-slate-600 leading-relaxed'>
                Complete lease agreements, pay caution deposits or property purchase sums safely through authorized banking routes, and take physical possession of your key set.
              </p>
            </div>
          </div>
        </div>

        {/* Soft Grey Sectioning (Zero Card Borders) */}
        <div className='bg-[#f5f5f5] rounded-2xl p-8 sm:p-12 space-y-8'>
          <h2 className='text-xl sm:text-2xl font-bold text-slate-900 tracking-tight'>
            Empowering every user in the real estate market
          </h2>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-8 text-slate-700'>
            <div className='space-y-2.5'>
              <div className='font-bold text-slate-900 text-base flex items-center gap-2'>
                <FaUserCheck className='text-[#003580]' /> Home Seekers & Renters
              </div>
              <p className='text-xs sm:text-sm leading-relaxed text-slate-600'>
                Eliminate unverified listings and predatory agency commission fees. Find accurate, active properties with real-time updates and direct scheduling.
              </p>
            </div>

            <div className='space-y-2.5'>
              <div className='font-bold text-slate-900 text-base flex items-center gap-2'>
                <FaBuilding className='text-[#003580]' /> Institutional Investors
              </div>
              <p className='text-xs sm:text-sm leading-relaxed text-slate-600'>
                Analyze rental yields, land appreciation metrics, and high-growth commercial developments with complete title transparency and legal backing.
              </p>
            </div>

            <div className='space-y-2.5'>
              <div className='font-bold text-slate-900 text-base flex items-center gap-2'>
                <FaKey className='text-[#003580]' /> Accredited Estate Agencies
              </div>
              <p className='text-xs sm:text-sm leading-relaxed text-slate-600'>
                Manage multi-property portfolios, automate client inspection workflows, and reach high-intent buyers through our certified enterprise tools.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}