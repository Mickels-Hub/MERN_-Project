import { FaUserShield, FaDatabase, FaLock, FaCookieBite, FaShieldAlt } from 'react-icons/fa';

export default function Privacy() {
  return (
    <div className='min-h-screen bg-white text-slate-800 font-sans pb-24'>
      
      {/* Header Banner */}
      <div className='bg-[#003580] text-white py-14 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-6xl mx-auto space-y-3'>
          <h1 className='text-3xl sm:text-5xl font-extrabold tracking-tight'>
            Privacy Policy
          </h1>
          <p className='text-slate-200 text-sm sm:text-base max-w-3xl font-normal leading-relaxed'>
            How MiEstate protects, encrypts, and handles your personal identification data, search activity, and property inspection preferences.
          </p>
        </div>
      </div>

      <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 pt-12 text-xs sm:text-sm text-slate-700 leading-relaxed'>

        <div className='space-y-3'>
          <h2 className='text-xl font-bold text-slate-900 flex items-center gap-2.5'>
            <FaUserShield className='text-[#003580]' /> 1. Personal Information We Collect
          </h2>
          <p className='text-slate-600 leading-relaxed'>
            To deliver secure property inspection scheduling and account authentication, MiEstate collects the following data categories:
          </p>
          <ul className='list-disc list-inside space-y-2 text-slate-600 pl-2'>
            <li><strong>Account Identifiers:</strong> Your full name, verified email address, contact phone number, and avatar profile picture.</li>
            <li><strong>Activity Metrics:</strong> Saved listing preferences, search queries, inspection booking dates, and device IP metrics.</li>
            <li><strong>Agency Credentials:</strong> Corporate registration documentation, operational licensing, and agency manager badges for corporate accounts.</li>
          </ul>
        </div>

        <div className='space-y-3'>
          <h2 className='text-xl font-bold text-slate-900 flex items-center gap-2.5'>
            <FaDatabase className='text-[#003580]' /> 2. Purpose & Use of Collected Data
          </h2>
          <p className='text-slate-600 leading-relaxed'>
            We use your data strictly to facilitate physical inspection bookings, authenticate user sessions, prevent fraudulent listing creation, route customer support inquiries, and send critical account alerts.
          </p>
        </div>

        <div className='bg-[#f5f5f5] rounded-2xl p-8 space-y-3'>
          <h2 className='text-xl font-bold text-slate-900 flex items-center gap-2.5'>
            <FaLock className='text-[#003580]' /> 3. Data Protection & Non-Disclosure Guarantee
          </h2>
          <p className='text-slate-700 leading-relaxed'>
            All database transmissions are secured using high-grade SSL/TLS encryption protocols. <strong>MiEstate does NOT sell, rent, or trade user personal data to third-party ad brokers.</strong> Information is shared exclusively with accredited property managers when you explicitly submit an inspection request for their listing.
          </p>
        </div>

        <div className='space-y-3'>
          <h2 className='text-xl font-bold text-slate-900 flex items-center gap-2.5'>
            <FaCookieBite className='text-[#003580]' /> 4. Cookies & Local Session Storage
          </h2>
          <p className='text-slate-600 leading-relaxed'>
            MiEstate utilizes essential session cookies and local browser storage to retain authentication tokens, preserve user filter settings, and ensure seamless navigation across pages.
          </p>
        </div>

        <div className='space-y-3'>
          <h2 className='text-xl font-bold text-slate-900 flex items-center gap-2.5'>
            <FaShieldAlt className='text-[#003580]' /> 5. Data Erasure & Rights
          </h2>
          <p className='text-slate-600 leading-relaxed'>
            You retain full ownership of your personal data. You may update your profile or submit a complete data deletion request at any time by contacting our privacy compliance desk at <a href='mailto:miestate4life26@gmail.com' className='text-[#003580] font-bold hover:underline'>miestate4life26@gmail.com</a>.
          </p>
        </div>

      </div>
    </div>
  );
}