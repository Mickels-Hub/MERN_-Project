import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function CompareProperties() {
  const [comparedList, setComparedList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [targetPrice, setTargetPrice] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    fetchComparedProperties();
  }, []);

  const fetchComparedProperties = async () => {
    try {
      const res = await fetch('/api/dashboard/compare', { credentials: 'include' });
      const data = await res.json();
      if (data.success) {
        setComparedList(data.properties);
        setFilteredList(data.properties);
      }
    } catch (error) {
      console.error('Failed to load compared properties:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (propertyId) => {
    try {
      const res = await fetch('/api/dashboard/compare', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ propertyId }),
      });
      const data = await res.json();
      if (data.success) {
        const updated = comparedList.filter((item) => item._id !== propertyId);
        setComparedList(updated);
        setFilteredList(updated);
      }
    } catch (error) {
      console.error('Failed to remove property:', error);
    }
  };

  // Filter by Good Roads keyword in description
  const filterByGoodRoads = () => {
    setActiveFilter('roads');
    const results = comparedList.filter((item) =>
      item.description?.toLowerCase().includes('good road') ||
      item.description?.toLowerCase().includes('good roads')
    );
    setFilteredList(results);
  };

  // Filter by Electricity / Power Supply keyword in description
  const filterByElectricity = () => {
    setActiveFilter('electricity');
    const results = comparedList.filter((item) =>
      item.description?.toLowerCase().includes('power') ||
      item.description?.toLowerCase().includes('electricity') ||
      item.description?.toLowerCase().includes('light')
    );
    setFilteredList(results);
  };

  // Filter by custom Price input
  const filterByPrice = (e) => {
    e.preventDefault();
    setActiveFilter('price');
    if (!targetPrice) {
      setFilteredList(comparedList);
      return;
    }
    const maxPrice = parseFloat(targetPrice);
    const results = comparedList.filter((item) => item.regularPrice <= maxPrice);
    setFilteredList(results);
  };

  const resetFilter = () => {
    setActiveFilter('all');
    setTargetPrice('');
    setFilteredList(comparedList);
  };

  if (loading) {
    return <div className="p-8 text-center text-slate-500">Loading comparison items...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      {/* Header & Title */}
      <div>
        <h1 className="text-3xl font-bold text-[#172B3A]">Compare Properties</h1>
        <p className="text-sm text-[#64748B]">Review your shortlisted properties side by side and filter by your preferences.</p>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white p-4 rounded-2xl shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={resetFilter}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              activeFilter === 'all' ? 'bg-[#102A43] text-white' : 'bg-[#F5F7F5] text-[#64748B] hover:bg-slate-200'
            }`}
          >
            All ({comparedList.length})
          </button>
          <button
            onClick={filterByGoodRoads}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              activeFilter === 'roads' ? 'bg-[#13865D] text-white' : 'bg-[#F5F7F5] text-[#64748B] hover:bg-slate-200'
            }`}
          >
            🛣️ Good Roads
          </button>
          <button
            onClick={filterByElectricity}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              activeFilter === 'electricity' ? 'bg-[#13865D] text-white' : 'bg-[#F5F7F5] text-[#64748B] hover:bg-slate-200'
            }`}
          >
            ⚡ Electricity / Power
          </button>
        </div>

        {/* Price Input Filter Form */}
        <form onSubmit={filterByPrice} className="flex items-center gap-2">
          <input
            type="number"
            placeholder="Max Price (e.g. 5000000)"
            value={targetPrice}
            onChange={(e) => setTargetPrice(e.target.value)}
            className="bg-[#F5F7F5] px-4 py-2 rounded-xl text-sm focus:outline-none w-56"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-[#102A43] text-white text-sm font-semibold rounded-xl hover:bg-[#172B3A] transition-colors"
          >
            Filter Price
          </button>
        </form>
      </div>

      {/* Properties List (Straight Card View) */}
      {filteredList.length === 0 ? (
        <div className="bg-white p-12 rounded-3xl shadow-sm text-center space-y-3">
          <p className="text-slate-500 font-medium">No properties match your active filter criteria.</p>
          {activeFilter !== 'all' && (
            <button onClick={resetFilter} className="text-sm text-[#13865D] font-semibold hover:underline">
              Clear filters
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {filteredList.map((property) => (
            <div key={property._id} className="bg-white p-6 rounded-3xl shadow-sm flex flex-col md:flex-row gap-6 items-start">
              {/* Image */}
              <img
                src={property.imageUrls?.[0] || 'https://via.placeholder.com/300'}
                alt={property.name}
                className="w-full md:w-72 h-48 object-cover rounded-2xl"
              />

              {/* Details */}
              <div className="flex-1 space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#13865D] bg-green-50 px-3 py-1 rounded-full">
                      {property.type || 'Residential'}
                    </span>
                    <h3 className="text-xl font-bold text-[#172B3A] mt-2">{property.name}</h3>
                    <p className="text-sm text-[#64748B] flex items-center gap-1 mt-1">
                      📍 {property.address}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-bold text-[#102A43]">
                      ₦{property.regularPrice?.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-[#64748B] line-clamp-2">
                  <strong className="text-[#172B3A]">Description:</strong> {property.description}
                </p>

                {/* Action Buttons Below */}
                <div className="flex items-center gap-4 pt-3 border-t border-slate-100">
                  <Link
                    to={`/listing/${property._id}`}
                    className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-[#102A43] hover:bg-[#172B3A] transition-colors"
                  >
                    View Details
                  </Link>
                  <button
                    onClick={() => handleRemove(property._id)}
                    className="px-5 py-2.5 rounded-xl text-sm font-semibold text-red-600 bg-red-50 hover:bg-red-100 transition-colors"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}