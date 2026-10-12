import { FaBalanceScale, FaBan, FaLock, FaShieldAlt, FaFileAlt } from 'react-icons/fa';

export default function Terms() {
  return (
    <div className='min-h-screen bg-white text-slate-800 font-sans pb-24'>
      
      {/* Header Banner */}
      <div className='bg-[#003580] text-white py-14 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-6xl mx-auto space-y-3'>
          <h1 className='text-3xl sm:text-5xl font-extrabold tracking-tight'>
            Terms & Conditions
          </h1>
          <p className='text-slate-200 text-sm sm:text-base max-w-3xl font-normal leading-relaxed'>
            Legal operational framework, strict anti-piracy policies, listing eligibility requirements, and platform governance rules for MiEstate.
          </p>
        </div>
      </div>

      <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 pt-12 text-xs sm:text-sm text-slate-700 leading-relaxed'>

        <div className='space-y-3'>
          <h2 className='text-xl font-bold text-slate-900 flex items-center gap-2.5'>
            <FaBalanceScale className='text-[#003580]' /> 1. Binding Terms of Service
          </h2>
          <p className='text-slate-600 leading-relaxed'>
            By accessing, browsing, creating an account, or scheduling inspections on MiEstate.com, you agree to be bound by these legal terms. These terms govern all user interactions across our mobile applications, web portals, and database interfaces. If you do not accept these terms in full, you must discontinue platform usage immediately.
          </p>
        </div>

        {/* Highlighted Policy Section */}
        <div className='bg-[#f5f5f5] rounded-2xl p-8 space-y-4'>
          <h2 className='text-xl font-bold text-slate-900 flex items-center gap-2.5'>
            <FaBan className='text-rose-600' /> 2. Prohibition of Individual Consumer Listings
          </h2>
          <p className='text-slate-700 leading-relaxed'>
            To guarantee absolute buyer protection and eradicate real estate fraud across Nigeria:
          </p>
          <ul className='list-disc list-inside space-y-2 text-slate-600 pl-2'>
            <li><strong>No Unaccredited Postings:</strong> Individual private users are strictly prohibited from creating property listings on MiEstate. Property submissions are exclusively reserved for accredited enterprise agency managers, certified corporate developers, and platform super-administrators.</li>
            <li><strong>Immediate Sanctions:</strong> Any attempt by unverified parties to post unauthorized property listings or falsify land survey coordinates will lead to immediate account termination, IP ban, and reporting to relevant state land authorities.</li>
          </ul>
        </div>

        <div className='space-y-3'>
          <h2 className='text-xl font-bold text-slate-900 flex items-center gap-2.5'>
            <FaLock className='text-[#003580]' /> 3. Anti-Piracy & Data Mining Prohibitions
          </h2>
          <p className='text-slate-600 leading-relaxed'>
            All digital code bases, visual photographic assets, floor plan layouts, property coordinate maps, and database schemas published on MiEstate are protected under national copyright and intellectual property laws. Automated web scraping, data harvesting, copying, re-publishing, or commercial redistribution of platform content without explicit written consent is illegal and strictly prosecuted.
          </p>
        </div>

        <div className='space-y-3'>
          <h2 className='text-xl font-bold text-slate-900 flex items-center gap-2.5'>
            <FaShieldAlt className='text-[#003580]' /> 4. User Obligations & Identification Verification
          </h2>
          <p className='text-slate-600 leading-relaxed'>
            Users must provide authentic profile credentials when registering and scheduling property inspections. Creating fraudulent alias accounts, impersonating real estate firms, or attempting to bypass security infrastructure will result in permanent account suspension.
          </p>
        </div>

        <div className='space-y-3'>
          <h2 className='text-xl font-bold text-slate-900 flex items-center gap-2.5'>
            <FaFileAlt className='text-[#003580]' /> 5. Limitation of Legal Liability
          </h2>
          <p className='text-slate-600 leading-relaxed'>
            MiEstate acts as a certified digital marketplace connecting buyers and renters with verified property managers. While MiEstate performs title and location audits on all published inventory, clients remain responsible for conducting independent legal verification at state land registries prior to executing final monetary settlements.
          </p>
        </div>

      </div>
    </div>
  );
}