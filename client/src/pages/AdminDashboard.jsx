import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaUsers } from 'react-icons/fa'

export default function AdminDashboard() {
const [stats, setStats] = useState({
    totalUsers: 0,
    totalListings: 0,
    communityMembers: 0,
    communityPosts: 0,
    activeSubAdmins: 0,
  });
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
  const fetchAdminStats = async () => {
    try {
      const res = await fetch('/api/admin/stats', { credentials: 'include' });
      const data = await res.json();
      if (res.ok) {
        setStats(data);
      }
    } catch (error) {
      console.log('Error fetching admin stats:', error.message);
    } finally {
      setLoading(false);
    }
  };

  fetchAdminStats();
}, []);

  const { currentUser } = useSelector((state) => state.user);
  const [users, setUsers] = useState([]);
  const [listings, setListings] = useState([]);
  const [communityPosts, setCommunityPosts] = useState([]);
  const [notifications, setNotifications] = useState([]);
const [showNotifications, setShowNotifications] = useState(false);
const [totalUsers, setTotalUsers] = useState(0);
const [signupNotifications, setSignupNotifications] = useState([])
  
  // Toggle state just like Sahand's profile listings
  const [showListingsError, setShowListingsError] = useState(false);
  const [userListings, setUserListings] = useState([]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({ username: '', email: '', password: '', role: 'user' });
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTotalUsers = async () => {
      try {
        const res = await fetch('/api/user/total-users');
        const data = await res.json();
        if (res.ok) {
          setTotalUsers(data.totalUsers);
        }
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTotalUsers();
  }, []);
  useEffect(() => {
  const fetchNotifications = async () => {
    try {
      const res = await fetch('/api/notifications/get');
      const data = await res.json();
      if (res.ok) {
        setNotifications(data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  if (currentUser && currentUser.isAdmin) {
    fetchNotifications();
  }
}, [currentUser]);
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
  const fetchSignups = async () => {
    try {
      const res = await fetch('/api/notifications/get', {
        method: 'GET',
        credentials: 'include',
      });
      if (res.ok) {
        const data = await res.json();
        // Filter specifically for sign-in/signup notifications
        const signups = data.filter((n) => n.message && n.message.includes('signed in'));
        setSignupNotifications(signups);
      }
    } catch (error) {
      console.log('Error fetching signups:', error);
    }
  };

  if (currentUser && currentUser.email === 'ugochukwumickel15@gmail.com') {
    fetchSignups();
  }

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

        <div className="relative">
  {/* Notification Bell Button */}
  <button 
    onClick={() => setShowNotifications(!showNotifications)}
    className="relative p-2 text-slate-300 hover:text-white transition"
  >
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
    </svg>
    
    {/* Unread Badge Count */}
    {notifications.length > 0 && (
      <span className="absolute top-1 right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center font-bold">
        {notifications.length}
      </span>
    )}
  </button>

  {/* Dropdown Menu */}
  {showNotifications && (
    <div className="absolute right-0 mt-2 w-80 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl py-3 px-4 z-50 max-h-96 overflow-y-auto">
      <h3 className="text-white font-semibold text-sm mb-2 border-b border-slate-800 pb-2">Admin Notifications</h3>
      {notifications.length === 0 ? (
        <p className="text-slate-400 text-xs text-center py-4">No new notifications</p>
      ) : (
        notifications.map((notif) => (
          <div key={notif._id} className="mb-2 p-2 bg-slate-800/60 rounded-xl border border-slate-700/50">
            <p className="text-slate-200 text-xs font-medium">{notif.message}</p>
            <span className="text-[10px] text-slate-400 mt-1 block">
              {new Date(notif.createdAt).toLocaleTimeString()}
            </span>
          </div>
        ))
      )}
    </div>
  )}
</div>

      {/* Stats Overview Cards */}
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
  <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl shadow">
    <h3 className="text-slate-400 text-xs uppercase font-bold tracking-wider">Total Listings</h3>
    <p className="text-2xl font-extrabold text-white mt-1">{loading ? '...' : stats.totalListings.toLocaleString()}</p>
  </div>
  <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl shadow">
    <h3 className="text-slate-400 text-xs uppercase font-bold tracking-wider">Community Members</h3>
    <p className="text-2xl font-extrabold text-white mt-1">{loading ? '...' : stats.communityMembers.toLocaleString()}</p>
  </div>
  <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl shadow">
    <h3 className="text-slate-400 text-xs uppercase font-bold tracking-wider">Community Posts</h3>
    <p className="text-2xl font-extrabold text-white mt-1">{loading ? '...' : stats.communityPosts.toLocaleString()}</p>
  </div>
  <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl shadow">
    <h3 className="text-slate-400 text-xs uppercase font-bold tracking-wider">Active Sub-Admins</h3>
    <p className="text-2xl font-extrabold text-white mt-1">{loading ? '...' : stats.activeSubAdmins.toLocaleString()}</p>
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
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-3xl text-white shadow-xl">
      <div className="flex items-center gap-4">
        <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-2xl text-blue-400">
          <FaUsers className="text-2xl" />
        </div>
        <div>
          <p className="text-sm text-slate-400 font-medium uppercase tracking-wider">Total Registered Accounts</p>
          <h3 className="text-3xl font-black mt-1 text-white">
           {loading ? '...' : stats.totalUsers}
          </h3>
        </div>
      </div>
    </div>
    <div className="bg-white p-6 rounded-lg shadow-md mt-6 border border-slate-200">
  <h3 className="text-lg font-semibold mb-4 text-slate-800">Admin Live Signup Logs</h3>
  <div className="space-y-3 max-h-60 overflow-y-auto">
    {signupNotifications.length === 0 ? (
      <p className="text-sm text-slate-500">No new user signups recorded yet.</p>
    ) : (
      signupNotifications.map((notif) => (
        <div key={notif._id} className="p-3 bg-slate-50 border border-slate-100 rounded-md text-sm text-slate-700 flex justify-between items-center">
          <span>{notif.message}</span>
          <span className="text-xs text-slate-400">
            {new Date(notif.createdAt).toLocaleDateString()}
          </span>
        </div>
      ))
    )}
  </div>
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