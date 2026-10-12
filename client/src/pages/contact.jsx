import { useState } from 'react';
import { FaPhoneAlt, FaEnvelope, FaInstagram, FaTelegram, FaFacebook, FaTiktok, FaTwitter, FaHeadset, FaGlobe, FaLanguage, FaMapMarkerAlt } from 'react-icons/fa';

export default function Contact() {
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [activeLang, setActiveLang] = useState('English');

  const translations = {
    English: {
      badge: '24/7 Multi-Language Support Portal',
      title: 'Contact MiEstate Support',
      subtitle: 'Need help with property listings, inspection scheduling, or agency verification? Our multi-lingual customer care team is available across Nigeria.',
      hotlineLabel: 'Official Support Hotline',
      emailLabel: 'Official Email Support Desk',
      addressLabel: 'Corporate Headquarters',
      addressText: 'MiEstate Corporate Towers, Victoria Island / Ikeja Central Commercial District, Lagos State, Nigeria.',
      socialTitle: 'Official Social Media Channels',
      socialSubtitle: 'Follow MiEstate across our official social handles for market news, new property drops, and live representative assistance:'
    },
    Yoruba: {
      badge: 'Eto Ijewo Atilẹyin Ede Pupọ 24/7',
      title: 'Kàn sí Atilẹyin MiEstate',
      subtitle: 'Nilo iranlọwọ pẹlu awọn akojọ ile, ṣiṣe eto ayẹwo, tabi ijẹrisi ajo? Ẹgbẹ itọju alabara wa ti n sọ gbogbo ede wa fun ọ ni gbogbo Naijiria.',
      hotlineLabel: 'Nọmba Mogbonwa Itọju Alabara',
      emailLabel: 'Àdírẹ́sì Imeeli Atilẹyin',
      addressLabel: 'Olori Ile-Iṣẹ Wa',
      addressText: 'MiEstate Corporate Towers, Victoria Island / Ikeja Central Commercial District, Lagos State, Nigeria.',
      socialTitle: 'Àwọn Ikannu Awujọ Mogbonwa Wa',
      socialSubtitle: 'Tẹle MiEstate lori awọn ikannu awujọ wa fun awọn irohin ọja ti o tuntun ati iranlọwọ gidi:'
    },
    Hausa: {
      badge: 'Cibiyar Taimakon Harsuna Daban-Daban 24/7',
      title: 'Tuntube Taimakon MiEstate',
      subtitle: 'Shin kuna buƙatar taimako game da jerin gidaje, tsara duba gida, ko tabbatar da hukumar? Tawagar kula da abokan cinikinmu tana nan don taimaka muku a duk fadin Najeriya.',
      hotlineLabel: 'Lambar Wayar Taimako Na Hukuma',
      emailLabel: 'Adireshin Imel Na Taimako',
      addressLabel: 'Otal Din Kamfaninmu',
      addressText: 'MiEstate Corporate Towers, Victoria Island / Ikeja Central Commercial District, Lagos State, Nigeria.',
      socialTitle: 'Kafafen Sadarwa Na Hukuma',
      socialSubtitle: 'Bi MiEstate a shafukanmu na sadarwa domin samun sabbin labarai da taimako daga wakilanmu:'
    },
    Igbo: {
      badge: 'Portal Nkwado Asụsụ Dị Iche Iche 24/7',
      title: 'Kpọtụrụ Nkwado MiEstate',
      subtitle: 'Ị chọrọ enyemaka gbasara ndepụta hụrụ maka ụlọ, nhazi nyocha, ma ọ bụ nkwado ụlọ ọrụ? Ndị otu nlekọta ndị Ahịa anyị dị njikere inyere gị aka na Naịjirịa niile.',
      hotlineLabel: 'Nọmba Ekwentị Nkwado',
      emailLabel: 'Ebe Imel Nkwado',
      addressLabel: 'Isi Ụlọ Ọrụ Anyị',
      addressText: 'MiEstate Corporate Towers, Victoria Island / Ikeja Central Commercial District, Lagos State, Nigeria.',
      socialTitle: 'Chajị Mgbasa Ozi Naịjirịa Anyị',
      socialSubtitle: 'Soro MiEstate na paji mgbasa ozi anyị maka akụkọ ọhụrụ na enyemaka ozugbo:'
    },
    Pidgin: {
      badge: '24/7 Customer Support in Every Language',
      title: 'Contact MiEstate Support Team',
      subtitle: 'You need help with property listings, inspection booking, or agency check? Our support team speak all local languages across Naija.',
      hotlineLabel: 'Direct Official Phone Line',
      emailLabel: 'Official Support Email Address',
      addressLabel: 'Main Office Address',
      addressText: 'MiEstate Corporate Towers, Victoria Island / Ikeja Central Commercial District, Lagos State, Nigeria.',
      socialTitle: 'Official Social Media Pages',
      socialSubtitle: 'Follow MiEstate on social media for new house updates and quick response:'
    }
  };

  const t = translations[activeLang];

  const handleTranslate = () => {
    setActiveLang(selectedLanguage);
  };

  return (
    <div className='min-h-screen bg-white text-slate-800 font-sans pb-24'>
      
      {/* Header Banner */}
      <div className='bg-[#003580] text-white py-14 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-6xl mx-auto space-y-4'>
          <span className='px-3.5 py-1 bg-blue-900/80 text-blue-200 font-semibold text-xs rounded-full inline-block tracking-wider uppercase'>
            {t.badge}
          </span>
          <h1 className='text-3xl sm:text-5xl font-extrabold tracking-tight'>
            {t.title}
          </h1>
          <p className='text-slate-200 text-sm sm:text-base max-w-3xl font-normal leading-relaxed'>
            {t.subtitle}
          </p>

          {/* NIGERIAN LANGUAGE TRANSLATOR BAR */}
          <div className='pt-4 flex flex-wrap items-center gap-3 bg-blue-900/50 p-4 rounded-xl max-w-2xl'>
            <div className='flex items-center gap-2 text-xs font-semibold text-slate-200'>
              <FaLanguage className='text-emerald-400 text-lg' /> Select Your Preferred Language:
            </div>
            
            <select 
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className='bg-white text-slate-900 text-xs font-bold py-2 px-3 rounded-lg focus:outline-none cursor-pointer'
            >
              <option value='English'>English</option>
              <option value='Yoruba'>Yorùbá (Yoruba)</option>
              <option value='Hausa'>Hausa (Harshen Hausa)</option>
              <option value='Igbo'>Asụsụ Igbo (Igbo)</option>
              <option value='Pidgin'>Nigerian Pidgin</option>
            </select>

            <button
              onClick={handleTranslate}
              className='bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs px-4 py-2 rounded-lg transition shadow-md'
            >
              Translate
            </button>
          </div>
        </div>
      </div>

      <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 pt-12'>

        {/* Contact Information Section */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-12'>
          
          {/* Direct Phone, Email, Address */}
          <div className='space-y-8'>
            <h2 className='text-2xl font-bold text-slate-900 flex items-center gap-3'>
              <FaHeadset className='text-[#003580]' /> Direct Lines
            </h2>

            <div className='space-y-6 text-xs sm:text-sm text-slate-700'>
              <div className='flex items-start gap-4'>
                <div className='p-3.5 bg-blue-50 text-[#003580] rounded-full text-xl shrink-0 mt-1'>
                  <FaPhoneAlt />
                </div>
                <div>
                  <span className='text-slate-500 text-xs font-semibold block uppercase tracking-wider'>{t.hotlineLabel}</span>
                  <a href='tel:+2347077877423' className='text-slate-900 font-extrabold text-lg hover:text-[#003580] transition'>
                    +234 7077877423
                  </a>
                  <p className='text-slate-500 text-xs mt-0.5'>Mon – Sat: 8:00 AM – 7:00 PM WAT</p>
                </div>
              </div>

              <div className='flex items-start gap-4'>
                <div className='p-3.5 bg-blue-50 text-[#003580] rounded-full text-xl shrink-0 mt-1'>
                  <FaEnvelope />
                </div>
                <div>
                  <span className='text-slate-500 text-xs font-semibold block uppercase tracking-wider'>{t.emailLabel}</span>
                  <a href='mailto:miestate4life26@gmail.com' className='text-slate-800 font-bold block hover:text-[#003580] transition text-sm'>
                    miestate4life26@gmail.com
                  </a>
                  <a href='mailto:Miestate2027@gmail.com' className='text-slate-800 font-bold block hover:text-[#003580] transition text-sm'>
                    Miestate2027@gmail.com
                  </a>
                </div>
              </div>

              <div className='flex items-start gap-4'>
                <div className='p-3.5 bg-blue-50 text-[#003580] rounded-full text-xl shrink-0 mt-1'>
                  <FaMapMarkerAlt />
                </div>
                <div>
                  <span className='text-slate-500 text-xs font-semibold block uppercase tracking-wider'>{t.addressLabel}</span>
                  <p className='text-slate-800 font-medium leading-relaxed'>
                    {t.addressText}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Social Media Links */}
          <div className='bg-[#f5f5f5] rounded-2xl p-8 space-y-6'>
            <h2 className='text-2xl font-bold text-slate-900'>
              {t.socialTitle}
            </h2>
            <p className='text-slate-600 text-xs sm:text-sm leading-relaxed'>
              {t.socialSubtitle}
            </p>

            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm'>
              <a href='https://instagram.com' target='_blank' rel='noreferrer' className='flex items-center gap-3 bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition text-slate-800'>
                <FaInstagram className='text-pink-600 text-xl shrink-0' />
                <span className='font-bold truncate'>@Miestate</span>
              </a>

              <a href='https://t.me' target='_blank' rel='noreferrer' className='flex items-center gap-3 bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition text-slate-800'>
                <FaTelegram className='text-sky-500 text-xl shrink-0' />
                <span className='font-bold truncate'>@Miestate</span>
              </a>

              <a href='https://facebook.com' target='_blank' rel='noreferrer' className='flex items-center gap-3 bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition text-slate-800'>
                <FaFacebook className='text-blue-600 text-xl shrink-0' />
                <span className='font-bold truncate'>MiEstate</span>
              </a>

              <a href='https://tiktok.com' target='_blank' rel='noreferrer' className='flex items-center gap-3 bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition text-slate-800'>
                <FaTiktok className='text-slate-900 text-xl shrink-0' />
                <span className='font-bold truncate'>MiEstate</span>
              </a>

              <a href='https://x.com' target='_blank' rel='noreferrer' className='flex items-center gap-3 bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition text-slate-800 sm:col-span-2'>
                <FaTwitter className='text-slate-900 text-xl shrink-0' />
                <span className='font-bold truncate'>MiEstate</span>
              </a>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}