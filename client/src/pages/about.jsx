import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function About() {
  const navigate = useNavigate();

  // Updated 6 location showcase items with provided high-resolution URLs
  const locations = [
    {
      name: 'Lekki Phase 1',
      query: 'Lekki Phase 1',
      image:
        'https://images.openai.com/static-rsc-4/POC8Gja9AvTRJW_BziEKncijyAExMOvhjrfspHFzzN89g-HglepQvgaZ0hJKeK8tDPRVhOmCYIqS92TJ4HWLpMtT8VVrad_zgl6TAkVWh0-MssSTCbYcJ_UawfcyT8decLmGEQ83GszGcQLZgT3xFBYgJ4b7776RrOuNdFUI5Vs?purpose=inline',
    },
    {
      name: 'Victoria Island',
      query: 'Victoria Island',
      image:
        'https://images.openai.com/static-rsc-4/813Zy_EQx1DKPcwNL5sLJbjL-knMEI4bastJWueII9z2iz8fmW7AOS8DfqBAiEslSbJCblyvaAmhZbwTxOBrHRJUhuGuAoO0f75OQ3RMX3u23y1nSt5KyQTbKtvFK2JzurFaTuL9Y1GEiRDKIk2pzqpRs7xLQA_zwnhZu9bsuBY?purpose=inline',
    },
    {
      name: 'Ikoyi',
      query: 'Ikoyi',
      image:
        'https://images.openai.com/static-rsc-4/mSB_9pkxLjQn4uWPlLK-qHcg0ynUMVN04Yet-au8gCQ1GPX0ssSz6x0bciLkS_o8jM1hbUnVc05rs55X3uI597lvdLIb5dxP6LMYfmNcHd212jVUNw8WWfB4aDKiSCS90mcTkk_QFSpK9HMGQb4NqusbXHCW1qHkqeDhY6jbWiH1yHE_4-hmDuiBQOmQA2su?purpose=fullsize',
    },
    {
      name: 'Lekki Expressway / Chevron',
      query: 'Chevron',
      image:
        'https://images.openai.com/static-rsc-4/5Oiomsv1iIKaZ7Sh_-BkREZ3vGSzAVNCN1itFLeFT9DfMij_rlEXvBNKgoKmpTyO_xpBhGD98LCFZ4wqAeXLYmcfo1RhvAx68R_Cyr2yiwhlbCm0SdPNEYSa1qvP1MwW54P9G2CyWDakGZkEyuoWKno6MHaMinPTbi9u6fKTWmny58gEhGw5XuO6OolDiOzW?purpose=fullsize',
    },
    {
      name: 'Ikeja',
      query: 'Ikeja',
      image:
        'https://images.openai.com/static-rsc-4/I3IweU72m2_m49bmJxjI5zgAkulrYySFBBeqi_q4f8s_dO6u3vaaCjT03O0cNKA0T8W0AogRW5xdM9cxNhL37cjHxcA9EabQKCEwnji8zj6CpQVl_5nN-NucaXe5VQwKUha-Gmf0uKDizshYG6S9Uj-TFUfENxDS0UHBJj-m6ZTbhtwvn09REh5SsuYpSQUb?purpose=fullsize',
    },
    {
      name: 'Lagos Island / Isale Eko',
      query: 'Lagos Island',
      image:
        'https://images.openai.com/static-rsc-4/fdPhqErDkJuBSOlLsIQRSPJgujb7IrcEViKkzXeFkTXw9MM6AhE3AYgiPDVm89qMzHBVj6Ps-ImToLY_lTPtsEnMqTtjKax1fuhCYC1JJATBFELHlDoDzUI8GL3qTs0yP-J5K9RVk3aSDbdJcnoDU2XPtnEmRM8XpgDQKKjvs8CTifMzo9FBiiWoHYP5vFvx?purpose=fullsize',
    },
  ];

  return (
    <div className="min-h-screen bg-white text-[#172B3A] font-sans antialiased">
      
      {/* SECTION 2 — HERO SECTION (2-Line Heading & Spacious Bottom Padding) */}
      <section className="bg-white py-16 md:py-24 lg:py-28">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
            
            {/* Left Content */}
            <div className="w-full lg:w-1/2 flex flex-col items-start">
              <span className="text-[#13865D] text-xs sm:text-sm font-semibold tracking-wider uppercase mb-3">
                ABOUT MiESTATE
              </span>
              <h1 className="text-[#102A43] text-4xl sm:text-5xl lg:text-[54px] font-bold leading-[1.12] tracking-tight mb-6 max-w-xl">
                Finding a home should feel simpler.
              </h1>
              <p className="text-[#64748B] text-base sm:text-lg leading-relaxed mb-8 max-w-xl">
                We are building a better way to discover properties across Lagos, helping people explore locations, compare available homes, and take the next step with greater confidence.
              </p>
              <button
                onClick={() => navigate('/properties')}
                className="bg-[#102A43] hover:bg-[#13865D] text-white font-semibold text-base px-8 py-4 rounded-lg transition-colors duration-200 shadow-sm cursor-pointer"
              >
                Explore Properties
              </button>
            </div>

            {/* Right Image */}
            <div className="w-full lg:w-1/2">
              <img
                src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80"
                alt="Modern luxury residential home exterior"
                className="w-full h-[360px] sm:h-[440px] lg:h-[460px] object-cover rounded-2xl shadow-sm"
              />
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 3 — WHO WE ARE (Balanced Height Image Layout) */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12 lg:gap-16">
            
            {/* Left Image */}
            <div className="w-full lg:w-[48%]">
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
                alt="Modern residential building entrance"
                className="w-full h-[340px] sm:h-[420px] lg:h-[440px] object-cover rounded-2xl shadow-sm"
              />
            </div>

            {/* Right Content */}
            <div className="w-full lg:w-[52%] flex flex-col items-start">
              <span className="text-[#13865D] text-xs sm:text-sm font-semibold tracking-wider uppercase mb-3">
                WHO WE ARE
              </span>
              <h2 className="text-[#102A43] text-3xl sm:text-4xl lg:text-[40px] font-bold leading-tight mb-6">
                More than finding a property.
              </h2>
              <div className="space-y-4 text-[#64748B] text-base sm:text-lg leading-relaxed">
                <p>
                  MiEstate is a property-discovery platform designed to help people explore available homes, compare property options, and understand the neighborhoods around them.
                </p>
                <p>
                  From searching for a rental to exploring a property for purchase, our goal is to make the discovery process clearer, more convenient, and easier to navigate.
                </p>
                <p>
                  We believe that finding a home should begin with useful information, straightforward choices, and a better understanding of the place you may call home.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 4 — OUR MISSION AND VISION */}
      <section className="bg-[#102A43] text-white py-20 md:py-28">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
            
            {/* Mission */}
            <div className="flex flex-col items-start">
              <div className="w-12 h-12 rounded-full bg-[#1e3e5c] flex items-center justify-center mb-6 text-[#6EE7B7]">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="9" strokeWidth="2" />
                  <circle cx="12" cy="12" r="5" strokeWidth="2" />
                  <circle cx="12" cy="12" r="1" strokeWidth="2" />
                </svg>
              </div>
              <h3 className="text-white text-2xl sm:text-3xl font-bold mb-4">
                Our Mission
              </h3>
              <p className="text-[#E2E8F0] text-base sm:text-lg leading-relaxed max-w-lg">
                To make discovering and comparing properties in Lagos simpler, clearer, and more accessible.
              </p>
            </div>

            {/* Vision */}
            <div className="flex flex-col items-start">
              <div className="w-12 h-12 rounded-full bg-[#1e3e5c] flex items-center justify-center mb-6 text-[#6EE7B7]">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 className="text-white text-2xl sm:text-3xl font-bold mb-4">
                Our Vision
              </h3>
              <p className="text-[#E2E8F0] text-base sm:text-lg leading-relaxed max-w-lg">
                To become a trusted destination for property discovery, helping people make more informed decisions about where they live, with no Agent Wahala.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 5 — WHAT MAKES MiESTATE DIFFERENT? */}
      <section className="bg-white py-20 md:py-28">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-12">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-[#102A43] text-3xl sm:text-4xl font-bold mb-4">
              What makes MiEstate different?
            </h2>
            <p className="text-[#64748B] text-base sm:text-lg leading-relaxed">
              We are building a property-discovery experience that helps people move from browsing listings to understanding their options.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
            
            {/* Feature 1 */}
            <div className="flex flex-col items-start">
              <div className="text-[#13865D] mb-5">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-[#102A43] text-xl font-bold mb-2">
                Simpler Discovery
              </h3>
              <p className="text-[#64748B] text-base leading-relaxed">
                Search available properties by location, budget, and property type to narrow down your options.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="flex flex-col items-start">
              <div className="text-[#13865D] mb-5">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-[#102A43] text-xl font-bold mb-2">
                Location Intelligence
              </h3>
              <p className="text-[#64748B] text-base leading-relaxed">
                Explore neighborhoods, nearby landmarks, major roads, and useful local information before deciding.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="flex flex-col items-start">
              <div className="text-[#13865D] mb-5">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <h3 className="text-[#102A43] text-xl font-bold mb-2">
                Curated Listings
              </h3>
              <p className="text-[#64748B] text-base leading-relaxed">
                Property listings are published by the MiEstate administration team to maintain a consistent listing experience.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="flex flex-col items-start">
              <div className="text-[#13865D] mb-5">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10h47m0 0l-3-3m3 3l-3 3m8 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-[#102A43] text-xl font-bold mb-2">
                A Clearer Next Step
              </h3>
              <p className="text-[#64748B] text-base leading-relaxed">
                Follow the platform's contact-access process to connect with the relevant property owner or property contact.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 6 — EXPLORE NIGERIA, ONE LOCATION AT A TIME (Static Display Only) */}
      <section className="bg-[#F5F7F5] py-20 md:py-28">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-12">
          
          <div className="max-w-2xl mb-12">
            <h2 className="text-[#102A43] text-3xl sm:text-4xl font-bold mb-4">
              The right home starts with the right location.
            </h2>
            <p className="text-[#64748B] text-base sm:text-lg leading-relaxed">
              Every neighborhood offers a different experience. Discover the areas around your next home, explore available properties, and learn more about the places that matter to you.
            </p>
          </div>

          {/* Static 6 Location Gallery (No Navigation / Fixed) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"> 
            {locations.map((loc, idx) => (
              <div
                key={idx}
                className="relative h-[260px] rounded-xl overflow-hidden shadow-sm"
              >
                <img
                  src={loc.image}
                  alt={loc.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                <div className="absolute bottom-5 left-5 right-5">
                  <span className="text-white text-lg font-bold">
                    {loc.name}
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* SECTION 7 — HOW MiESTATE WORKS */}
      <section className="bg-white py-20 md:py-28">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-12">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-[#102A43] text-3xl sm:text-4xl font-bold mb-4">
              A simpler way to discover your next home.
            </h2>
            <p className="text-[#64748B] text-base sm:text-lg leading-relaxed">
              From the first search to the next step, MiEstate is designed to make property discovery easier to navigate.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
            
            {/* Step 1 */}
            <div className="flex flex-col items-start">
              <div className="w-12 h-12 rounded-full bg-[#D7F5E8] text-[#124C3A] font-bold text-lg flex items-center justify-center mb-6">
                01
              </div>
              <h3 className="text-[#102A43] text-2xl font-bold mb-3">
                Discover
              </h3>
              <p className="text-[#64748B] text-base leading-relaxed">
                Search properties by location, budget, and property type.
              </p>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-start">
              <div className="w-12 h-12 rounded-full bg-[#D7F5E8] text-[#124C3A] font-bold text-lg flex items-center justify-center mb-6">
                02
              </div>
              <h3 className="text-[#102A43] text-2xl font-bold mb-3">
                Compare
              </h3>
              <p className="text-[#64748B] text-base leading-relaxed">
                Review photographs, property details, and location information to understand your options.
              </p>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-start">
              <div className="w-12 h-12 rounded-full bg-[#D7F5E8] text-[#124C3A] font-bold text-lg flex items-center justify-center mb-6">
                03
              </div>
              <h3 className="text-[#102A43] text-2xl font-bold mb-3">
                Take the Next Step
              </h3>
              <p className="text-[#64748B] text-base leading-relaxed">
                Follow the applicable contact-access process and arrange further discussions or a property viewing.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 8 — CLOSING CALL TO ACTION */}
      <section className="bg-[#D7F5E8] py-20 md:py-24">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
            
            <div className="max-w-2xl">
              <h2 className="text-[#102A43] text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
                Your next home starts here.
              </h2>
              <p className="text-[#245D4C] text-base sm:text-lg leading-relaxed">
                Explore properties, discover new neighborhoods, and take the next step with MiEstate.
              </p>
            </div>

            <div>
              <button
                onClick={() => navigate('/properties')}
                className="bg-[#102A43] hover:bg-[#13865D] text-white font-semibold text-base px-9 py-4 rounded-lg transition-colors duration-200 shadow-sm cursor-pointer whitespace-nowrap"
              >
                Find a Property
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 9 — FOOTER */}
      <footer className="bg-[#102A43] text-white pt-16 pb-12">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-12">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 pb-12 border-b border-[#38536B]/40">
            
            {/* Column 1 */}
            <div className="flex flex-col items-start">
              <span className="text-2xl font-bold text-white mb-4">
                Mi<span className="text-[#13865D]">Estate</span>
              </span>
              <p className="text-[#CBD5E1] text-sm leading-relaxed max-w-xs">
                Discover properties and explore neighborhoods across Lagos with MiEstate.
              </p>
            </div>

            {/* Column 2 */}
            <div>
              <h4 className="text-white text-base font-semibold mb-4">
                Explore
              </h4>
              <ul className="space-y-2.5 text-[#CBD5E1] text-sm">
                <li>
                  <Link to="/search?type=sale" className="hover:text-[#6EE7B7] transition-colors">
                    Buy Properties
                  </Link>
                </li>
                <li>
                  <Link to="/search?type=rent" className="hover:text-[#6EE7B7] transition-colors">
                    Rent Properties
                  </Link>
                </li>
                <li>
                  <Link to="/search?category=shortlet" className="hover:text-[#6EE7B7] transition-colors">
                    Shortlets
                  </Link>
                </li>
                <li>
                  <Link to="/locations" className="hover:text-[#6EE7B7] transition-colors">
                    Explore Locations
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3 */}
            <div>
              <h4 className="text-white text-base font-semibold mb-4">
                Company
              </h4>
              <ul className="space-y-2.5 text-[#CBD5E1] text-sm">
                <li>
                  <Link to="/about" className="hover:text-[#6EE7B7] transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="hover:text-[#6EE7B7] transition-colors">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link to="/how-it-works" className="hover:text-[#6EE7B7] transition-colors">
                    How MiEstate Works
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 4 */}
            <div>
              <h4 className="text-white text-base font-semibold mb-4">
                Help & Legal
              </h4>
              <ul className="space-y-2.5 text-[#CBD5E1] text-sm">
                <li>
                  <Link to="/help" className="hover:text-[#6EE7B7] transition-colors">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link to="/privacy" className="hover:text-[#6EE7B7] transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className="hover:text-[#6EE7B7] transition-colors">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>

          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[#CBD5E1] text-xs space-y-4 sm:space-y-0">
            <p>© {new Date().getFullYear()} MiEstate. All rights reserved.</p>
            <p>Designed for Lagos State Property Discovery</p>
          </div>

        </div>
      </footer>

    </div>
  );
}