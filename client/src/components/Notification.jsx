import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export default function Notification() {
  const { currentUser } = useSelector((state) => state.user);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showDropdown, setShowDropdown] = useState(false);

  // Native synthesized "tintin" notification chime function
  const playChime = () => {
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, audioCtx.currentTime); // High A note
      osc.frequency.exponentialRampToValueAtTime(440, audioCtx.currentTime + 0.15);

      gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.15);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + 0.15);
    } catch (e) {
      console.log("Audio Context not supported or blocked", e);
    }
  };

  useEffect(() => {
    if (!currentUser) return;

    const fetchNotifications = async () => {
      try {
        const res = await fetch('/api/notifications/get');
        const data = await res.json();
        if (res.ok) {
          setNotifications(data);
          const unread = data.filter((n) => !n.isRead);
          
          // Play native chime if unread count increases
          if (unread.length > unreadCount && unread.length > 0) {
            playChime();
          }
          
          setUnreadCount(unread.length);
        }
      } catch (error) {
        console.log('Error fetching notifications:', error);
      }
    };

    fetchNotifications();
    const interval = setInterval(fetchNotifications, 30000);
    return () => clearInterval(interval);
  }, [currentUser, unreadCount]);

  if (!currentUser) return null;

  return (
    <div className="relative">
      {/* Bell Button */}
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="relative p-2.5 bg-slate-900 border border-slate-800 rounded-xl text-blue-400 hover:text-white hover:border-blue-500 transition-all shadow"
      >
        🔔
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center shadow-lg animate-pulse">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown Box */}
      {showDropdown && (
        <div className="absolute right-0 mt-3 w-80 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden z-50 p-4 text-slate-100">
          <div className="flex justify-between items-center border-b border-slate-800 pb-3 mb-3">
            <h4 className="font-bold text-sm text-white">Notifications</h4>
            {unreadCount > 0 && (
              <span className="text-xs bg-blue-600/20 text-blue-400 px-2 py-0.5 rounded-full font-medium">
                {unreadCount} new
              </span>
            )}
          </div>

          <div className="max-h-64 overflow-y-auto space-y-2">
            {notifications.length === 0 ? (
              <p className="text-xs text-slate-500 text-center py-6">No notifications yet.</p>
            ) : (
              notifications.map((n) => (
                <div key={n._id} className="p-3 bg-slate-950/60 border border-slate-800/80 rounded-xl text-xs space-y-1">
                  <p className="text-slate-300 font-medium">{n.message}</p>
                  <span className="text-[10px] text-slate-500">{new Date(n.createdAt).toLocaleDateString()}</span>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}