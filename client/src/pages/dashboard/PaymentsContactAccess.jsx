import { useEffect, useState } from 'react';

export default function PaymentsContactAccess() {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      const res = await fetch('/api/user/payments');
      const data = await res.json();
      if (data.success !== false) {
        setPayments(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeletePayment = async (paymentId) => {
    try {
      const res = await fetch(`/api/user/payments/${paymentId}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success !== false) {
        setPayments(payments.filter((p) => p._id !== paymentId));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#102A43]">Payments & Contact Access</h1>
        <p className="text-gray-500 text-sm mt-1">
          Review your payment history, view unlocked property details, and manage transaction logs.
        </p>
      </div>

      {payments.length === 0 ? (
        <div className="bg-white rounded-2xl p-10 text-center border border-gray-100 shadow-sm">
          <p className="text-gray-500">You haven't made any property contact unlocks or payment transactions yet.</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-xs font-semibold text-gray-600 uppercase">
                <th className="p-4">Listing Title & Description</th>
                <th className="p-4">Amount Paid</th>
                <th className="p-4">Date & Time</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-sm">
              {payments.map((p) => (
                <tr key={p._id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="p-4 max-w-xs">
                    <div className="font-semibold text-gray-800">{p.listingTitle || 'Property Unlock'}</div>
                    <div className="text-xs text-gray-500 line-clamp-1">{p.listingDescription || 'Contact details access'}</div>
                  </td>
                  <td className="p-4 font-bold text-[#13865D]">
                    {p.currency || 'NGN'} {p.amount ? p.amount.toLocaleString() : '0'}
                  </td>
                  <td className="p-4 text-gray-500 text-xs">
                    {new Date(p.createdAt || Date.now()).toLocaleDateString()} at{' '}
                    {new Date(p.createdAt || Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </td>
                  <td className="p-4">
                    <span className="bg-emerald-100 text-emerald-800 text-xs px-2.5 py-1 rounded-full font-medium">
                      Successful
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => handleDeletePayment(p._id)}
                      className="text-red-600 hover:text-red-800 text-xs font-medium border border-red-200 hover:bg-red-50 px-3 py-1.5 rounded-lg transition-all"
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