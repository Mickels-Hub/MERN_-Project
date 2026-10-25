import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function SavedProperties() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSavedProperties();
  }, []);

  const fetchSavedProperties = async () => {
    try {
      const res = await fetch('/api/dashboard/saved');
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
      const res = await fetch('/api/dashboard/saved/toggle', {
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

  if (loading) return <div className="p-8 text-[#64748B]">Loading your saved properties...</div>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#102A43]">Saved Properties</h1>
        <p className="text-[#64748B] text-sm mt-1">Keep your favorite properties together and return to them whenever you need.</p>
      </div>

      {properties.length === 0 ? (
        <div className="bg-white p-10 rounded-2xl text-center shadow-sm">
          <p className="text-[#64748B]">You haven't saved any properties yet.</p>
          <Link to="/properties" className="mt-4 inline-block bg-[#13865D] text-white font-semibold text-sm px-6 py-2.5 rounded-xl">
            Explore Properties
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((prop) => (
            <div key={prop._id} className="bg-white rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between">
              <div>
                <img src={prop.imageUrls?.[0]} alt={prop.title} className="h-48 w-full object-cover" />
                <div className="p-4">
                  <h3 className="font-bold text-[#102A43] text-base truncate">{prop.title}</h3>
                  <p className="text-xs text-[#64748B] mt-1">{prop.address || prop.location}</p>
                  <p className="text-sm font-bold text-[#13865D] mt-2">
                    ₦{prop.regularPrice?.toLocaleString()} {prop.type === 'rent' ? '/yr' : ''}
                  </p>
                </div>
              </div>
              <div className="p-4 pt-0 flex gap-2">
                <Link to={`/listing/${prop._id}`} className="flex-1 text-center bg-[#102A43] text-white text-xs font-semibold py-2 rounded-lg">
                  View Details
                </Link>
                <button onClick={() => handleRemove(prop._id)} className="px-3 py-2 bg-red-50 text-red-600 text-xs font-semibold rounded-lg hover:bg-red-100">
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}