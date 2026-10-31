import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function SavedProperties() {
  const [savedProperties, setSavedProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSavedProperties = async () => {
    try {
      const res = await fetch('/api/dashboard/saved', { credentials: 'include' });
      const data = await res.json();
      if (data.success) {
        setSavedProperties(Array.isArray(data.properties) ? data.properties : []);
      }
    } catch (error) {
      console.error('Failed to load saved properties:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSavedProperties();
  }, []);

  const handleDelete = async (propertyId) => {
    try {
      const res = await fetch('/api/dashboard/saved', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ propertyId }),
      });
      const data = await res.json();
      if (data.success) {
        setSavedProperties((prev) => prev.filter((item) => item._id !== propertyId));
      }
    } catch (error) {
      console.error('Failed to remove saved property:', error);
    }
  };

  if (loading) {
    return <div className="py-20 text-center text-[#64748B]">Loading saved properties...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[#172B3A]">Saved Properties</h1>
        <p className="text-[#64748B] text-sm mt-1">Keep your favorite properties together and return to them whenever you need.</p>
      </div>

      {savedProperties.length === 0 ? (
        <div className="bg-white p-16 rounded-3xl shadow-sm text-center text-[#64748B]">
          You have no saved properties yet.
        </div>
      ) : (
        <div className="bg-white rounded-3xl shadow-sm overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#F5F7F5] text-xs font-semibold text-[#64748B] uppercase">
                <th className="p-5">Property</th>
                <th className="p-5">Address</th>
                <th className="p-5">Price</th>
                <th className="p-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F5F7F5]">
              {savedProperties.map((property) => (
                <tr key={property._id} className="hover:bg-[#F5F7F5]/40 transition-colors">
                  <td className="p-5 flex items-center gap-4">
                    <img 
                      src={property.imageUrls?.[0] || 'https://via.placeholder.com/150'} 
                      alt="" 
                      className="w-14 h-14 rounded-2xl object-cover shadow-sm"
                    />
                    <div>
                      <h4 className="font-semibold text-sm text-[#172B3A]">{property.name || property.title}</h4>
                      <span className="text-xs text-[#64748B]">{property.type || 'Residential'}</span>
                    </div>
                  </td>
                  <td className="p-5 text-sm text-[#64748B]">{property.address || property.location}</td>
                  <td className="p-5 text-sm font-semibold text-[#172B3A]">₦{(property.regularPrice || property.price || 0).toLocaleString()}</td>
                  <td className="p-5 text-right space-x-2">
                    <Link
                      to={`/listing/${property._id}`}
                      className="bg-[#102A43] text-white px-4 py-2 rounded-xl text-xs font-medium hover:bg-[#172B3A] transition-colors inline-block"
                    >
                      View Details
                    </Link>
                    <button
                      onClick={() => handleDelete(property._id)}
                      className="bg-red-50 text-red-500 hover:text-red-700 px-4 py-2 rounded-xl text-xs font-medium transition-colors inline-block"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}