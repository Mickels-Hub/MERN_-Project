import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function CompareProperties() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCompareProperties();
  }, []);

  const fetchCompareProperties = async () => {
    try {
      const res = await fetch('/api/dashboard/compare');
      const data = await res.json();
      if (data.success) setProperties(data.properties);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const handleRemove = async (propertyId) => {
    try {
      const res = await fetch('/api/dashboard/compare/toggle', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ propertyId }),
      });
      const data = await res.json();
      if (data.success) {
        setProperties((prev) => prev.filter((p) => p._id !== propertyId));
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <div className="p-8 text-[#64748B]">Loading comparison...</div>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#102A43]">Compare Properties</h1>
        <p className="text-[#64748B] text-sm mt-1">Compare your shortlisted properties side by side.</p>
      </div>

      {properties.length === 0 ? (
        <div className="bg-white p-10 rounded-2xl text-center shadow-sm">
          <p className="text-[#64748B]">Add properties to compare their features and prices.</p>
          <Link to="/properties" className="mt-4 inline-block bg-[#13865D] text-white font-semibold text-sm px-6 py-2.5 rounded-xl">
            Explore Properties
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((prop) => (
            <div key={prop._id} className="bg-white rounded-2xl p-5 shadow-sm space-y-4 relative">
              <button
                onClick={() => handleRemove(prop._id)}
                className="absolute top-3 right-3 bg-red-100 text-red-600 w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs"
              >
                ✕
              </button>
              <img src={prop.imageUrls?.[0]} alt={prop.title} className="h-40 w-full object-cover rounded-xl" />
              <h3 className="font-bold text-[#102A43] text-lg">{prop.title}</h3>
              <div className="space-y-2 text-sm border-t pt-3 border-gray-100 text-[#172B3A]">
                <p><span className="text-[#64748B]">Price:</span> <strong className="text-[#13865D]">₦{prop.regularPrice?.toLocaleString()}</strong></p>
                <p><span className="text-[#64748B]">Type:</span> {prop.type}</p>
                <p><span className="text-[#64748B]">Bedrooms:</span> {prop.bedrooms || 'Not specified'}</p>
                <p><span className="text-[#64748B]">Bathrooms:</span> {prop.bathrooms || 'Not specified'}</p>
                <p><span className="text-[#64748B]">Location:</span> {prop.address || prop.location}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}