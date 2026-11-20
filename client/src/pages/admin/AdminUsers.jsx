import React, { useEffect, useState } from 'react';

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const res = await fetch('/api/admin/users');
      const data = await res.json();
      if (data.success) setUsers(data.users);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleToggleRestriction = async (userId, currentStatus) => {
    try {
      const res = await fetch(`/api/admin/users/${userId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isRestricted: !currentStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setUsers(users.map((u) => (u._id === userId ? { ...u, isRestricted: !currentStatus } : u)));
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) return <div className="p-6 text-gray-500">Loading Users...</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-[#102A43]">User Management</h1>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100 text-gray-600 text-sm">
              <th className="p-4">User</th>
              <th className="p-4">Email</th>
              <th className="p-4">Role</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-sm">
            {users.map((user) => (
              <tr key={user._id} className="hover:bg-gray-50/50">
                <td className="p-4 flex items-center gap-3">
                  <img src={user.avatar} alt="" className="w-9 h-9 rounded-full object-cover" />
                  <span className="font-semibold text-gray-800">{user.username}</span>
                </td>
                <td className="p-4 text-gray-600">{user.email}</td>
                <td className="p-4">{user.isAdmin ? 'Admin' : 'Regular User'}</td>
                <td className="p-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${user.isRestricted ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
                    {user.isRestricted ? 'Restricted' : 'Active'}
                  </span>
                </td>
                <td className="p-4 text-right">
                  {!user.isAdmin && (
                    <button
                      onClick={() => handleToggleRestriction(user._id, user.isRestricted)}
                      className={`px-3 py-1.5 rounded-xl font-medium text-xs ${user.isRestricted ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}
                    >
                      {user.isRestricted ? 'Unrestrict' : 'Restrict'}
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}