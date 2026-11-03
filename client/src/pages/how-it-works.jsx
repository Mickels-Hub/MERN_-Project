import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FaShieldAlt, 
  FaHandshake, 
  FaCheckCircle, 
  FaUserShield, 
  FaChartLine, 
  FaBuilding, 
  FaArrowRight 
} from 'react-icons/fa';

export default function HowItWorks() {
  return (
    <div className="bg-[#F5F7F5] min-h-screen text-[#172B3A] font-sans antialiased selection:bg-[#D7F5E8] selection:text-[#13865D] overflow-x-hidden">
      
      {/* INJECT ANIMATION KEYFRAMES FOR LEFT-TO-RIGHT SLIDE */}
      <style>{`
        @keyframes slideInFromLeft {
          0% {
            opacity: 0;
            transform: translateX(-50px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-slide-left {
          animation: slideInFromLeft 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>

      {/* ================= 1. HERO HEADER WITH LEFT-TO-RIGHT ANIMATION & CURSIVE ACCENT ================= */}
      <section className="relative bg-[#102A43] text-white pt-20 pb-28 px-4 sm:px-8 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20 scale-105"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#102A43] via-[#102A43]/90 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto space-y-6 text-left animate-slide-left">
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-none text-white">
            How does MiEstate work?
          </h1>

          <p className="text-slate-200 text-base sm:text-xl font-normal max-w-2xl leading-relaxed">
            Connecting property seekers, verified Lagos landlords, and real estate professionals through an authenticated, transparent digital property marketplace.
          </p>

          <div className="pt-2 flex flex-wrap gap-4">
            <Link 
              to="/search" 
              className="bg-[#174A8B] hover:bg-[#12386a] text-white font-bold px-7 py-3.5 rounded-2xl shadow-xl transition-all duration-300 flex items-center gap-2 text-sm transform hover:-translate-y-0.5"
            >
              <span>Explore Verified Properties</span>
              <FaArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* ================= 2. CORE AUDIT & TRUST HIGHLIGHTS ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 -mt-10 relative z-30">
        <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-xl space-y-12">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-3">
              <div className="w-14 h-14 rounded-2xl bg-[#D7F5E8] text-[#13865D] flex items-center justify-center">
                <FaShieldAlt size={24} />
              </div>
              <h3 className="font-bold text-lg text-[#102A43]">Verified Lagos Properties</h3>
              <p className="text-xs text-[#64748B] leading-relaxed">
                Every apartment, duplex, and residential land listing undergoes physical inspection checks, land registry search verification, and direct administrator approval before appearing on MiEstate.
              </p>
            </div>

            <div className="space-y-3">
              <div className="w-14 h-14 rounded-2xl bg-[#D7F5E8] text-[#13865D] flex items-center justify-center">
                <FaHandshake size={24} />
              </div>
              <h3 className="font-bold text-lg text-[#102A43]">Direct Landlord Access</h3>
              <p className="text-xs text-[#64748B] leading-relaxed">
                Connect directly with property owners, verified managers, and accredited agents across Lekki, Ikoyi, Victoria Island, and Ikeja without predatory middleman markups.
              </p>
            </div>

            <div className="space-y-3">
              <div className="w-14 h-14 rounded-2xl bg-[#D7F5E8] text-[#13865D] flex items-center justify-center">
                <FaCheckCircle size={24} />
              </div>
              <h3 className="font-bold text-lg text-[#102A43]">Transparent Leasing & Sales</h3>
              <p className="text-xs text-[#64748B] leading-relaxed">
                From scheduling physical property viewings to reviewing clear rental agreements and purchase terms, our platform ensures every transaction is straightforward and secure.
              </p>
            </div>
          </div>

          {/* 4-STEP NUMERIC WORKFLOW */}
          <div className="pt-10 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-full bg-[#102A43] text-white font-bold text-sm flex items-center justify-center">1</div>
              <h4 className="font-bold text-sm text-[#102A43]">Location & Price Discovery</h4>
              <p className="text-xs text-[#64748B] leading-relaxed">
                Browse real-time property listings across prime Lagos neighborhoods. Filter instantly by property type, rental duration, sale price, and exact room counts.
              </p>
            </div>

            <div className="space-y-3">
              <div className="w-10 h-10 rounded-full bg-[#102A43] text-white font-bold text-sm flex items-center justify-center">2</div>
              <h4 className="font-bold text-sm text-[#102A43]">Schedule Property Tour</h4>
              <p className="text-xs text-[#64748B] leading-relaxed">
                Select your preferred date and time slot to tour the apartment or home in person. Coordinate directly with listing representatives through your user dashboard.
              </p>
            </div>

            <div className="space-y-3">
              <div className="w-10 h-10 rounded-full bg-[#102A43] text-white font-bold text-sm flex items-center justify-center">3</div>
              <h4 className="font-bold text-sm text-[#102A43]">Review Property Details</h4>
              <p className="text-xs text-[#64748B] leading-relaxed">
                Examine comprehensive specifications, accurate pricing, security deposits, annual maintenance structures, and neighborhood amenities prior to making commitments.
              </p>
            </div>

            <div className="space-y-3">
              <div className="w-10 h-10 rounded-full bg-[#102A43] text-white font-bold text-sm flex items-center justify-center">4</div>
              <h4 className="font-bold text-sm text-[#102A43]">Secure Lease & Move In</h4>
              <p className="text-xs text-[#64748B] leading-relaxed">
                Finalize your lease terms or property purchase agreement securely through verified banking channels, receive your keys, and move into your new home.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* ================= 3. EMPOWERING EVERY USER IN THE MARKET ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 py-16">
        <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-sm space-y-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#102A43]">
              Empowering every user in the real estate market
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-[#102A43] font-bold text-base">
                <FaUserShield className="text-[#13865D]" size={20} />
                <span>Home Seekers & Renters</span>
              </div>
              <p className="text-xs text-[#64748B] leading-relaxed">
                Find verified apartments, townhouses, and shortlets without hidden agent fees or misleading listings. Enjoy transparent communication and saved search tracking.
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2 text-[#102A43] font-bold text-base">
                <FaChartLine className="text-[#13865D]" size={20} />
                <span>Property Investors</span>
              </div>
              <p className="text-xs text-[#64748B] leading-relaxed">
                Discover high-yield residential plots and commercial real estate investments across high-growth Lagos corridors with clear pricing metrics.
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2 text-[#102A43] font-bold text-base">
                <FaBuilding className="text-[#13865D]" size={20} />
                <span>Verified Landlords & Agents</span>
              </div>
              <p className="text-xs text-[#64748B] leading-relaxed">
                List your residential properties directly on MiEstate to connect with serious, high-intent renters and buyers across Nigeria.
              </p>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
