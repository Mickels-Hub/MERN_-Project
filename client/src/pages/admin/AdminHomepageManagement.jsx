import React, { useState, useEffect } from 'react';

export default function AdminHomepageManagement() {
  const [heroTitle, setHeroTitle] = useState('Find Your Place in Lagos');
  const [fontFamily, setFontFamily] = useState('Inter');
  const [animationEffect, setAnimationEffect] = useState('fade-in-3d');
  const [previewImage, setPreviewImage] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Handle PC file upload & convert to Base64
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveHomepageUI = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const payload = {
        heroTitle,
        fontFamily,
        animationEffect,
        bgImageUrl: previewImage,
      };

      const res = await fetch('/api/admin/cms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ section: 'homepage_ui_ux', content: JSON.stringify(payload) }),
      });

      const data = await res.json();
      if (data.success) {
        setMessage('Homepage UI/UX designs, 3D animations, and background image applied successfully!');
      } else {
        setMessage('Failed to update homepage settings.');
      }
    } catch (err) {
      console.error(err);
      setMessage('An error occurred while saving.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto pb-12">
      <div>
        <h1 className="text-3xl font-extrabold text-[#102A43]">Homepage UI/UX & Design Studio</h1>
        <p className="text-gray-500 text-sm mt-1">Upload custom background images from your PC, configure 3D animations, and adjust global typography.</p>
      </div>

      {message && (
        <div className="p-4 bg-green-50 border border-green-200 text-green-700 rounded-2xl font-medium text-sm">
          {message}
        </div>
      )}

      <form onSubmit={handleSaveHomepageUI} className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 space-y-6">
        <h3 className="text-xl font-bold text-[#102A43] border-b pb-3">Visuals & Background Customizer</h3>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Upload New Homepage Background Image (From PC)</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-3 file:px-6 file:rounded-xl file:border-0 file:text-sm file:font-bold file:bg-[#102A43] file:text-white hover:file:bg-[#13865D] file:cursor-pointer transition-all"
          />
          {previewImage && (
            <div className="mt-4 relative w-full h-48 rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
              <img src={previewImage} alt="Background Preview" className="w-full h-full object-cover" />
              <span className="absolute bottom-3 left-3 bg-black/60 text-white text-xs px-3 py-1 rounded-lg backdrop-blur-sm">New Background Ready</span>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Font Family & Styling</label>
            <select
              value={fontFamily}
              onChange={(e) => setFontFamily(e.target.value)}
              className="w-full p-4 rounded-2xl border border-gray-200 focus:outline-none focus:border-[#13865D] font-medium bg-gray-50"
            >
              <option value="Inter">Inter (Modern Clean Sans)</option>
              <option value="Poppins">Poppins (Smooth Rounded)</option>
              <option value="Roboto">Roboto (Standard Tech)</option>
              <option value="Playfair Display">Playfair Display (Luxury Serif)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">UI/UX Animation & 3D Effect</label>
            <select
              value={animationEffect}
              onChange={(e) => setAnimationEffect(e.target.value)}
              className="w-full p-4 rounded-2xl border border-gray-200 focus:outline-none focus:border-[#13865D] font-medium bg-gray-50"
            >
              <option value="fade-in-3d">3D Perspective Depth & Smooth Fade</option>
              <option value="smooth-parallax">Smooth Scroll Parallax Effect</option>
              <option value="glassmorphism">Glassmorphism Frosted Cards</option>
              <option value="none">Standard Minimalist</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Main Hero Title Heading</label>
          <input
            type="text"
            value={heroTitle}
            onChange={(e) => setHeroTitle(e.target.value)}
            className="w-full p-4 rounded-2xl border border-gray-200 focus:outline-none focus:border-[#13865D] font-medium bg-gray-50"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-4 bg-[#102A43] text-white font-bold rounded-2xl hover:bg-[#13865D] transition-all shadow-md shadow-gray-200"
        >
          {loading ? 'Applying Changes...' : 'Save & Apply UI/UX Design Instantly'}
        </button>
      </form>
    </div>
  );
}