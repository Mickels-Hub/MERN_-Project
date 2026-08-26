import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function AdminDashboard() {
  const { currentUser } = useSelector((state) => state.user);
  const [users, setUsers] = useState([]);
  const [listings, setListings] = useState([]);
  const [communityPosts, setCommunityPosts] = useState([]);
  
  // Toggle state just like Sahand's profile listings
  const [showListingsError, setShowListingsError] = useState(false);
  const [userListings, setUserListings] = useState([]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({ username: '', email: '', password: '', role: 'user' });
  const [error, setError] = useState(null);

  // Fetch All Admin Data
  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const resUsers = await fetch('/api/user/get-users');
        const dataUsers = await resUsers.json();
        if (resUsers.ok) setUsers(dataUsers);

        const resListings = await fetch('/api/listing/get?limit=100');
        const dataListings = await resListings.json();
        if (resListings.ok) setListings(dataListings);

        const resCommunity = await fetch('/api/community/get');
        const dataCommunity = await resCommunity.json();
        if (resCommunity.ok) setCommunityPosts(dataCommunity);
      } catch (err) {
        console.log(err);
      }
    };
    if (currentUser && currentUser.email === 'ugochukwumickel15@gmail.com') {
      fetchAdminData();
    }
  }, [currentUser]);

  // Show Listings Toggle Handler (Sahand Style)
  const handleShowListings = async () => {
    try {
      setShowListingsError(false);
      const res = await fetch('/api/listing/get?limit=100');
      const data = await res.json();
      if (!res.ok) {
        setShowListingsError(true);
        return;
      }
      setUserListings(data);
    } catch (error) {
      setShowListingsError(true);
    }
  };

  // Handle Role Change
  const handleRoleChange = async (userId, newRole) => {
    try {
      const res = await fetch(`/api/user/update-role/${userId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: newRole }),
      });
      if (res.ok) {
        setUsers(users.map((u) => (u._id === userId ? { ...u, role: newRole } : u)));
      }
    } catch (err) {
      console.log(err);
    }
  };

  // Handle Delete User
  const handleRemoveUser = async (userId) => {
    if (!window.confirm('Are you sure you want to remove this member?')) return;
    try {
      const res = await fetch(`/api/user/delete/${userId}`, { method: 'DELETE' });
      if (res.ok) {
        setUsers(users.filter((u) => u._id !== userId));
      }
    } catch (err) {
      console.log(err);
    }
  };

  // Handle Delete Community Post
  const handleDeletePost = async (postId) => {
    try {
      const res = await fetch(`/api/community/delete/${postId}`, { method: 'DELETE' });
      if (res.ok) {
        setCommunityPosts(communityPosts.filter((p) => p._id !== postId));
      }
    } catch (err) {
      console.log(err);
    }
  };

  // Handle Delete Listing
  const handleDeleteListing = async (listingId) => {
    try {
      const res = await fetch(`/api/listing/delete/${listingId}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
        return;
      }
      setUserListings((prev) => prev.filter((listing) => listing._id !== listingId));
      setListings((prev) => prev.filter((listing) => listing._id !== listingId));
    } catch (error) {
      console.log(error.message);
    }
  };

  // Handle Add Member Form Submit
  const handleAddMember = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/user/add-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || 'Something went wrong');
        return;
      }
      setUsers([data, ...users]);
      setShowAddModal(false);
      setFormData({ username: '', email: '', password: '', role: 'user' });
      setError(null);
    } catch (err) {
      setError('Failed to connect to server');
    }
  };

  if (!currentUser || currentUser.email !== 'ugochukwumickel15@gmail.com') {
    return (
      <div className="text-center my-20 text-2xl font-extrabold text-red-500">
        Access Denied. Master Admin Clearance Required.
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 my-6 text-slate-100">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-3xl font-black tracking-wide text-white flex items-center gap-3">
            👑 Master Command & Community Portal
          </h1>
          <p className="text-slate-400 mt-1 text-sm">
            Oversee properties, manage team members, and check community activity effortlessly.
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-bold px-4 py-2 rounded-xl shadow transition cursor-pointer text-sm"
        >
          + Add New Member
        </button>
      </div>

      {/* Stats Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl shadow">
          <h3 className="text-slate-400 text-xs uppercase font-bold tracking-wider">Total Listings</h3>
          <p className="text-2xl font-extrabold text-white mt-1">{listings.length}</p>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl shadow">
          <h3 className="text-slate-400 text-xs uppercase font-bold tracking-wider">Community Members</h3>
          <p className="text-2xl font-extrabold text-white mt-1">{users.length}</p>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl shadow">
          <h3 className="text-slate-400 text-xs uppercase font-bold tracking-wider">Community Posts</h3>
          <p className="text-2xl font-extrabold text-white mt-1">{communityPosts.length}</p>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl shadow">
          <h3 className="text-slate-400 text-xs uppercase font-bold tracking-wider">Active Sub-Admins</h3>
          <p className="text-2xl font-extrabold text-white mt-1">
            {users.filter((u) => u.role === 'admin' || u.role === 'sub-admin').length}
          </p>
        </div>
      </div>

      {/* EXACT SAHAND-STYLE SHOW LISTINGS TOGGLE SECTION */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 mb-8 shadow">
        <h2 className="text-lg font-bold text-white mb-3">Master Property Listings</h2>
        <button onClick={handleShowListings} className="text-green-500 hover:underline font-semibold text-sm cursor-pointer">
          Show Listings
        </button>
        <p className="text-red-500 text-xs mt-1">{showListingsError ? 'Error showing listings' : ''}</p>

        {userListings && userListings.length > 0 && (
          <div className="mt-4 flex flex-col gap-4">
            <h3 className="text-center text-xl font-semibold text-white">Your Listings</h3>
            {userListings.map((listing) => (
              <div
                key={listing._id}
                className="flex items-center justify-between p-3 gap-4 border border-slate-800 rounded-lg bg-slate-950"
              >
                <Link to={`/listing/${listing._id}`}>
                  <img src={listing.imageUrls[0]} alt="listing cover" className="h-16 w-16 object-contain rounded-md" />
                </Link>
                <Link
                  className="text-white font-semibold flex-1 hover:underline truncate"
                  to={`/listing/${listing._id}`}
                >
                  <p>{listing.name}</p>
                </Link>

                <div className="flex flex-col items-center gap-1">
                  <button
                    onClick={() => handleDeleteListing(listing._id)}
                    className="text-red-500 uppercase text-xs font-bold hover:underline cursor-pointer"
                  >
                    Delete
                  </button>
                  <Link to={`/update-listing/${listing._id}`}>
                    <button className="text-green-500 uppercase text-xs font-bold hover:underline cursor-pointer">Edit</button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Community Members & Staff Section */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 mb-8 shadow">
        <h2 className="text-lg font-bold text-white mb-4">Community Members & Staff Team</h2>
        <div className="space-y-3">
          {users.map((user) => (
            <div
              key={user._id}
              className="border border-slate-800 bg-slate-950 p-4 rounded-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3"
            >
              <div>
                <p className="text-white font-semibold text-sm">{user.username}</p>
                <p className="text-slate-400 text-xs">{user.email}</p>
              </div>
              <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                <select
                  value={user.role}
                  onChange={(e) => handleRoleChange(user._id, e.target.value)}
                  className="bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-1 text-xs text-white focus:outline-none"
                >
                  <option value="user">User</option>
                  <option value="sub-admin">Sub-Admin</option>
                  <option value="admin">Master Admin</option>
                </select>
                <button
                  onClick={() => handleRemoveUser(user._id)}
                  className="text-red-400 hover:underline text-xs font-semibold cursor-pointer"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Community Discussions Section */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 mb-8 shadow">
        <h2 className="text-lg font-bold text-white mb-4">Community Discussions</h2>
        {communityPosts.length > 0 ? (
          <div className="space-y-3">
            {communityPosts.map((post) => (
              <div
                key={post._id}
                className="border border-slate-800 bg-slate-950 p-4 rounded-xl flex justify-between items-center gap-4"
              >
                <p className="text-slate-300 text-sm truncate flex-1">{post.content || post.title || 'Post Content'}</p>
                <button
                  onClick={() => handleDeletePost(post._id)}
                  className="text-red-400 hover:underline text-xs font-semibold shrink-0 cursor-pointer"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-slate-500 text-sm text-center py-4">No community posts found.</p>
        )}
      </div>

      {/* Add User Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl w-full max-w-md shadow-2xl">
            <h3 className="text-lg font-bold text-white mb-4">Add New Member</h3>
            {error && <p className="text-red-400 bg-red-950/40 p-3 rounded-lg text-xs mb-4 border border-red-900">{error}</p>}
            <form onSubmit={handleAddMember} className="space-y-3">
              <div>
                <label className="text-xs text-slate-400 uppercase font-bold">Username</label>
                <input
                  type="text"
                  required
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  className="w-full mt-1 bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-white text-sm focus:outline-none"
                  placeholder="Enter username"
                />
              </div>
              <div>
                <label className="text-xs text-slate-400 uppercase font-bold">Email</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full mt-1 bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-white text-sm focus:outline-none"
                  placeholder="name@example.com"
                />
              </div>
              <div>
                <label className="text-xs text-slate-400 uppercase font-bold">Password</label>
                <input
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full mt-1 bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-white text-sm focus:outline-none"
                  placeholder="••••••••"
                />
              </div>
              <div>
                <label className="text-xs text-slate-400 uppercase font-bold">Role</label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full mt-1 bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-white text-sm focus:outline-none"
                >
                  <option value="user">User</option>
                  <option value="sub-admin">Sub-Admin</option>
                  <option value="admin">Master Admin</option>
                </select>
              </div>
              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="bg-slate-800 text-slate-300 px-4 py-2 rounded-xl text-xs font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-xl text-xs font-semibold cursor-pointer"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}