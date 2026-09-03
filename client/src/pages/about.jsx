import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaShieldAlt, FaChartLine, FaUsers, FaHandshake, FaStar, FaQuoteLeft, FaCheckCircle, FaBuilding, FaArrowRight } from 'react-icons/fa';

export default function About() {
  // Active online users ticker (Total registered accounts moved exclusively to Admin Portal)
  const [activeUsers, setActiveUsers] = useState(1245);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveUsers((prev) => {
        const fluctuation = Math.floor(Math.random() * 5) - 2;
        const updated = prev + fluctuation;
        return updated > 1000 ? updated : 1150;
      });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Image sliders data for each category block
  const securityImages = [
    "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80"
  ];
  const [activeSecImg, setActiveSecImg] = useState(0);

  const directImages = [
    "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80"
  ];
  const [activeDirImg, setActiveDirImg] = useState(0);

  const verifyImages = [
    "https://images.unsplash.com/photo-1554469384-e58fac16e23a?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80"
  ];
  const [activeVerImg, setActiveVerImg] = useState(0);

  // Auto-rotate images gently
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSecImg((prev) => (prev + 1) % securityImages.length);
      setActiveDirImg((prev) => (prev + 1) % directImages.length);
      setActiveVerImg((prev) => (prev + 1) % verifyImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Customer reviews dataset
  const reviews = [
    {
      name: "Adebayo T.",
      role: "Property Investor",
      comment: "Mikel's Estate completely changed how I scout properties in Lagos. The listing verification, secure architecture, and transparency are absolute elite tier.",
      rating: 5,
    },
    {
      name: "Chiamaka N.",
      role: "First-time Homebuyer",
      comment: "Finding a cozy apartment used to be a nightmare filled with sketchy agents until I found this platform. Smooth interface and trusted landlords!",
      rating: 5,
    },
    {
      name: "Ugochukwu C.",
      role: "Real Estate Developer",
      comment: "The admin controls, secure cloud storage, and custom listing reach have doubled our client conversion rates within weeks. Phenomenal engineering.",
      rating: 5,
    }
  ];

  const [currentReview, setCurrentReview] = useState(0);

  useEffect(() => {
    const reviewInterval = setInterval(() => {
      setCurrentReview((prev) => (prev + 1) % reviews.length);
    }, 6000);
    return () => clearInterval(reviewInterval);
  }, [reviews.length]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 overflow-x-hidden pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="max-w-5xl mx-auto text-center my-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-block mb-4 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-sm font-semibold tracking-wide uppercase shadow-lg shadow-blue-500/10"
        >
          The Mikel's Estate Standard
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight"
        >
          Redefining Property Acquisition & <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500">Trust</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-3xl mx-auto text-lg sm:text-xl text-slate-400 leading-relaxed"
        >
          Mikel's Estate was engineered to eliminate opacity in the real estate market. By replacing unverified middlemen and confusing paperwork with transparent digital channels, we connect serious buyers directly with prime residential and commercial listings.
        </motion.p>
      </div>

      {/* Live Active User Counter Section (Total registered accounts is restricted to Admin Portal) */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-md mx-auto my-16 bg-slate-900/60 border border-slate-800/80 rounded-3xl p-8 backdrop-blur-2xl shadow-2xl text-center relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-transparent pointer-events-none"></div>
        <div className="flex items-center justify-center gap-2 text-indigo-400 mb-2 relative z-10">
          <FaChartLine className="text-xl" />
          <span className="text-sm font-semibold uppercase tracking-wider">Active Users Online</span>
        </div>
        <div className="text-4xl sm:text-5xl font-black text-white tracking-tight my-2 relative z-10">
          {activeUsers.toLocaleString()}
        </div>
        <div className="text-xs text-blue-400 mt-2 flex items-center justify-center gap-1.5 font-medium relative z-10">
          <span className="w-2 h-2 rounded-full bg-blue-500 animate-ping"></span> Live connections browsing properties right now
        </div>
      </motion.div>

      {/* Mission & Philosophy Statement */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto my-20 bg-gradient-to-b from-slate-900/80 to-slate-950 border border-slate-800 rounded-3xl p-8 sm:p-12 shadow-xl"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-blue-500/10 rounded-xl border border-blue-500/20 text-blue-400">
            <FaBuilding className="text-2xl" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">Our Vision & Commitment</h2>
        </div>
        <p className="text-slate-300 leading-relaxed mb-6">
          Whether you are securing a cozy 1-room apartment, acquiring high-yield commercial land, or managing property portfolios, our infrastructure guarantees speed and absolute reliability. Every listing goes through strict parameter verification to safeguard your investments.
        </p>
      </motion.div>

      {/* Highlights Sections with Integrated Image Motion Cards */}
      <div className="max-w-6xl mx-auto my-28 space-y-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">Platform Core Highlights</h2>
          <p className="text-slate-400 max-w-xl mx-auto">Designed for clarity, protected by strict verification standards.</p>
        </div>

        {/* Highlight 1: Security & Protection */}
<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
  
  {/* Text Content Column (Slides in from left) */}
  <motion.div 
    initial={{ opacity: 0, x: -40 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.7, ease: "easeOut" }}
  >
    <div className="mb-6 bg-blue-600/10 w-16 h-16 rounded-2xl flex items-center justify-center border border-blue-500/20 text-blue-400">
      <FaShieldAlt className="text-3xl" />
    </div>
    <h3 className="text-2xl font-bold text-white mb-4">Bank-Grade Data Security & Access</h3>
    <p className="text-slate-300 leading-relaxed mb-6">
      Your session security, user credentials, and admin privileges are strictly encrypted. We maintain rigid session boundaries to ensure unauthorized entries are blocked instantly, protecting both your portfolio and personal information.
    </p>
    <div className="flex items-center gap-2 text-blue-400 text-sm font-semibold cursor-pointer hover:text-blue-300">
      <span>Encrypted token architecture</span> <FaArrowRight className="text-xs" />
    </div>
  </motion.div>

  {/* Image Slideshow Column (Slides in from right at the same time) */}
  <motion.div 
    initial={{ opacity: 0, x: 40 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
    className="relative h-72 sm:h-80 rounded-2xl overflow-hidden shadow-2xl border border-slate-800 bg-slate-900"
  >
    <AnimatePresence mode="wait">
      <motion.img
        key={activeSecImg}
        src={securityImages[activeSecImg]}
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.7 }}
        className="absolute inset-0 w-full h-full object-cover"
      />
    </AnimatePresence>
  </motion.div>

</div>

        {/* Highlight 2: Direct Owner Connections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1 relative h-72 sm:h-80 rounded-2xl overflow-hidden border border-slate-800 shadow-2xl">
            <AnimatePresence mode="wait">
              <motion.img
                key={activeDirImg}
                src={directImages[activeDirImg]}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.7 }}
                className="absolute inset-0 w-full h-full object-cover"
                alt="Direct connection showcase"
              />
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none"></div>
          </div>
          <div className="order-1 lg:order-2">
            <div className="mb-6 bg-slate-800/60 w-16 h-16 rounded-2xl flex items-center justify-center border border-slate-700/50 text-indigo-400">
              <FaHandshake className="text-3xl" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Direct Landlord & Manager Access</h3>
            <p className="text-slate-400 leading-relaxed mb-6">
              Skip inflated agency commissions and endless delays. Connect straight with verified property owners, managers, and administrators through structured communication pathways built directly into your user dashboard.
            </p>
            <div className="flex items-center gap-2 text-indigo-400 text-sm font-semibold">
              <span>Zero hidden broker markup</span> <FaArrowRight className="text-xs" />
            </div>
          </div>
        </div>

        {/* Highlight 3: Automated Verification */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="mb-6 bg-slate-800/60 w-16 h-16 rounded-2xl flex items-center justify-center border border-slate-700/50 text-emerald-400">
              <FaCheckCircle className="text-3xl" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Instant Status Verification</h3>
            <p className="text-slate-400 leading-relaxed mb-6">
              Our automated payment gateways and verification workflows confirm subscription statuses instantly. The moment payments clear, restricted listing particulars and premium property details unlock seamlessly without manual delay.
            </p>
            <div className="flex items-center gap-2 text-emerald-400 text-sm font-semibold">
              <span>Automated activation protocols</span> <FaArrowRight className="text-xs" />
            </div>
          </div>
          <div className="relative h-72 sm:h-80 rounded-2xl overflow-hidden border border-slate-800 shadow-2xl">
            <AnimatePresence mode="wait">
              <motion.img
                key={activeVerImg}
                src={verifyImages[activeVerImg]}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.7 }}
                className="absolute inset-0 w-full h-full object-cover"
                alt="Verification showcase"
              />
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none"></div>
          </div>
        </div>
      </div>

      {/* Animated Customer Reviews Carousel */}
      <div className="max-w-4xl mx-auto my-28 text-center">
        <div className="mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">Trusted By Property Leaders</h2>
          <p className="text-slate-400">Genuine feedback from active investors, buyers, and developers.</p>
        </div>

        <div className="bg-gradient-to-br from-slate-900 via-slate-900/90 to-slate-950 border border-slate-800/80 rounded-3xl p-8 sm:p-14 relative overflow-hidden shadow-2xl">
          <FaQuoteLeft className="absolute top-6 left-6 text-slate-800/60 text-7xl pointer-events-none" />
          
          <div className="min-h-[180px] flex flex-col items-center justify-center relative z-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentReview}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
                className="max-w-2xl mx-auto"
              >
                <div className="flex justify-center gap-1.5 text-amber-400 mb-5 text-lg">
                  {[...Array(reviews[currentReview].rating)].map((_, i) => (
                    <FaStar key={i} />
                  ))}
                </div>
                <p className="text-lg sm:text-xl text-slate-200 italic mb-6 leading-relaxed">
                  "{reviews[currentReview].comment}"
                </p>
                <h4 className="font-bold text-white text-base tracking-wide">{reviews[currentReview].name}</h4>
                <span className="text-xs text-blue-400 uppercase tracking-widest font-semibold mt-1 block">{reviews[currentReview].role}</span>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex justify-center gap-2.5 mt-8 relative z-10">
            {reviews.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentReview(i)}
                className={`h-2.5 rounded-full transition-all duration-300 ${currentReview === i ? 'w-10 bg-blue-500 shadow-lg shadow-blue-500/50' : 'w-2.5 bg-slate-700 hover:bg-slate-600'}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}