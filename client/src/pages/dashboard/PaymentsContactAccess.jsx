import { useState, useEffect } from 'react';

export default function PaymentsContactAccess() {
  const [unlocks, setUnlocks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      const res = await fetch('/api/dashboard/payments-access');
      const data = await res.json();
      if (data.success) setUnlocks(data.unlocks);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  if (loading) return <div className="p-8 text-[#64748B]">Loading payment history...</div>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#102A43]">Payments & Contact Access</h1>
        <p className="text-[#64748B] text-sm mt-1">Review your payment history and manage access to property contact details.</p>
      </div>

      {unlocks.length === 0 ? (
        <div className="bg-white p-10 rounded-2xl text-center shadow-sm text-[#64748B]">
          <p>You haven't made any property contact unlocks or payment transactions yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {unlocks.map((item) => (
            <div key={item._id} className="bg-white p-5 rounded-2xl shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <p className="text-xs font-bold text-[#13865D] uppercase tracking-wide">Status: {item.status}</p>
                <h3 className="font-bold text-[#102A43] text-base mt-1">{item.propertyId?.title || 'Property Contact Unlock'}</h3>
                <p className="text-xs text-[#64748B]">Ref: {item.transactionRef || item._id}</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-[#102A43]">₦{item.amount?.toLocaleString() || '1,000'}</p>
                <span className="text-xs text-[#64748B]">{new Date(item.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}