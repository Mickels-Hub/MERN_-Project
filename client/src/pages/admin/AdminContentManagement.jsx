import React, { useState } from 'react';

export default function AdminContentManagement() {
  const [adType, setAdType] = useState('picture');
  const [mediaUrl, setMediaUrl] = useState('');
  const [affiliateLink, setAffiliateLink] = useState('');
  const [commissionRate, setCommissionRate] = useState('10%');
  const [message, setMessage] = useState('');

  const handlePublishAd = async (e) => {
    e.preventDefault();
    try {
      const payload = JSON.stringify({ adType, mediaUrl, affiliateLink, commissionRate, active: true });
      const res = await fetch('/api/admin/cms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ section: 'homepage_browser_ad', content: payload }),
      });
      const data = await res.json();
      if (data.success) {
        setMessage('Ad published successfully to user homepage with affiliate tracking enabled!');
      }
    } catch (err) {
      console.error(err);
      setMessage('Error publishing ad.');
    }
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-extrabold text-[#102A43]">Content & Monetization Management</h1>
        <p className="text-gray-500 text-sm mt-1">Broadcast picture/video ads to the user homepage and configure commission payout links.</p>
      </div>

      {message && <div className="p-4 bg-green-50 text-green-700 rounded-2xl font-medium text-sm">{message}</div>}

      <form onSubmit={handlePublishAd} className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 space-y-6">
        <h3 className="text-xl font-bold text-[#102A43] border-b pb-3">New Browser Ad & Commission Stream</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Ad Format</label>
            <select value={adType} onChange={(e) => setAdType(e.target.value)} className="w-full p-3.5 rounded-xl border border-gray-200 font-medium">
              <option value="picture">Picture Ad Banner</option>
              <option value="video">Video Ad Clip</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Commission / Payout Rate</label>
            <input type="text" value={commissionRate} onChange={(e) => setCommissionRate(e.target.value)} placeholder="e.g. 15% per click/unlock" className="w-full p-3.5 rounded-xl border border-gray-200 font-medium" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Media URL (Image or Video Link)</label>
          <input type="url" value={mediaUrl} onChange={(e) => setMediaUrl(e.target.value)} placeholder="https://example.com/ad-banner.jpg" className="w-full p-4 rounded-xl border border-gray-200 font-medium" />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Affiliate Target URL (Where users click to earn commission)</label>
          <input type="url" value={affiliateLink} onChange={(e) => setAffiliateLink(e.target.value)} placeholder="https://partner-brand.com/ref=miestate" className="w-full p-4 rounded-xl border border-gray-200 font-medium" />
        </div>

        <button type="submit" className="px-8 py-4 bg-[#13865D] text-white font-bold rounded-2xl hover:opacity-90 transition-all shadow-md">
          Publish Ad & Activate Commission Tracking
        </button>
      </form>
    </div>
  );
}