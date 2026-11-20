import React, { useState, useEffect } from 'react';

export default function AdminCMS() {
  const [adTitle, setAdTitle] = useState('');
  const [adLink, setAdLink] = useState('');
  const [bannerText, setBannerText] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Fetch current CMS settings on load
  useEffect(() => {
    const fetchCms = async () => {
      try {
        const res = await fetch('/api/admin/cms');
        const data = await res.json();
        if (data.success && data.settings) {
          const adSettings = data.settings.find((s) => s.section === 'browser_ad');
          if (adSettings?.content) {
            const parsed = typeof adSettings.content === 'string' ? JSON.parse(adSettings.content) : adSettings.content;
            setAdTitle(parsed.title || '');
            setAdLink(parsed.link || '');
            setBannerText(parsed.bannerText || '');
          }
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchCms();
  }, []);

  const handleSaveAds = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      const payload = JSON.stringify({ title: adTitle, link: adLink, bannerText });
      const res = await fetch('/api/admin/cms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ section: 'browser_ad', content: payload }),
      });
      const data = await res.json();
      if (data.success) {
        setMessage('Browser Ads & Homepage Banner updated successfully!');
      }
    } catch (err) {
      console.error(err);
      setMessage('Failed to update ads.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold text-[#102A43]">Homepage CMS & Browser Ads Manager</h1>
        <p className="text-gray-500 text-sm mt-1">Publish promotional banners, browser ads, and external links directly onto your application's homepage.</p>
      </div>

      {message && (
        <div className="p-4 bg-green-50 border border-green-200 text-green-700 rounded-2xl font-medium text-sm">
          {message}
        </div>
      )}

      <form onSubmit={handleSaveAds} className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 space-y-6">
        <h3 className="text-xl font-bold text-[#102A43] border-b pb-3">Active Browser Ad Configuration</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Ad / Promotion Title</label>
            <input
              type="text"
              value={adTitle}
              onChange={(e) => setAdTitle(e.target.value)}
              placeholder="e.g. Special Lagos Real Estate Promo"
              className="w-full p-4 rounded-2xl border border-gray-200 focus:outline-none focus:border-[#13865D] bg-gray-50/50 font-medium"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Destination URL / Link</label>
            <input
              type="url"
              value={adLink}
              onChange={(e) => setAdLink(e.target.value)}
              placeholder="https://example.com/promo"
              className="w-full p-4 rounded-2xl border border-gray-200 focus:outline-none focus:border-[#13865D] bg-gray-50/50 font-medium"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Homepage Browser Banner Marquee Text</label>
          <textarea
            rows="3"
            value={bannerText}
            onChange={(e) => setBannerText(e.target.value)}
            placeholder="Enter the scrolling or highlighted banner text displayed to users on the homepage..."
            className="w-full p-4 rounded-2xl border border-gray-200 focus:outline-none focus:border-[#13865D] bg-gray-50/50 font-medium"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="px-8 py-4 bg-[#102A43] text-white font-bold rounded-2xl hover:bg-[#13865D] transition-all shadow-md shadow-gray-200"
        >
          {loading ? 'Publishing Ad...' : 'Publish Browser Ad & Banner'}
        </button>
      </form>
    </div>
  );
}