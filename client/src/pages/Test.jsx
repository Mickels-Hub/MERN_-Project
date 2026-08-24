import { Link } from 'react-router-dom';

export default function Test() {
  const marketHighlights = [
    { title: "Surulere & Yaba Flats", desc: "Clean 2-bedroom and self-contain apartments close to work and tech hubs. No stories.", tag: "Fast Moving" },
    { title: "Ikeja & Ojodu Rentals", desc: "Accessible mainland apartments with steady light and secure compound gates.", tag: "Pocket Friendly" },
    { title: "Ajah & Sangotedo Houses", desc: "Affordable family homes and fenced plots with direct landlord connection.", tag: "Verified Deals" }
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-blue-600 selection:text-white overflow-x-hidden">
      
      {/* Hero Header - Clean White Background */}
      <div className="relative overflow-hidden pt-24 pb-16 px-6 lg:px-8 border-b border-slate-200 bg-slate-50">
        <div className="max-w-5xl mx-auto text-center relative z-10 flex flex-col items-center gap-5">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100 border border-blue-200 text-blue-700 text-xs font-bold tracking-wider uppercase">
            <span className="w-2 h-2 rounded-full bg-blue-600"></span>
            Mikels Estate Market Hub
          </div>

          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-slate-900 leading-[1.1]">
            Real Houses for Real People <br />
            <span className="text-blue-600">
              No Fake Agent Wahala
            </span>
          </h1>

          <p className="max-w-2xl text-slate-600 text-sm sm:text-base leading-relaxed">
            Search genuine apartments across mainland and island locations. Talk directly to verified property managers and secure your next home peacefully.
          </p>
        </div>
      </div>

      {/* Feature Grid / Cards Section - Clean Light Theme */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {marketHighlights.map((item, index) => (
            <div key={index} className="p-8 rounded-3xl bg-white border border-slate-200 hover:border-blue-400 hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
              <div>
                <span className="inline-block px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold mb-4 border border-slate-200">
                  {item.tag}
                </span>
                <h3 className="text-xl font-extrabold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-blue-600 font-bold">
                <span>Verified Listing Standard</span>
                <span>&rarr;</span>
              </div>
            </div>
          ))}
        </div>

        {/* Action Banner */}
        <div className="p-10 sm:p-12 rounded-[2.5rem] bg-slate-900 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-8 text-center sm:text-left">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black mb-2">Ready to find your next apartment?</h2>
            <p className="text-slate-400 text-sm">Jump back to the main portal to access live listings and direct contact numbers.</p>
          </div>
          <Link
            to="/"
            className="px-8 py-4 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold shadow-lg shadow-blue-600/30 transition-all duration-300 whitespace-nowrap"
          >
            Go to Home Portal &rarr;
          </Link>
        </div>
      </div>

    </div>
  );
}