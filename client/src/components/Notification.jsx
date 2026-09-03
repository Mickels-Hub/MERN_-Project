import { useSelector } from 'react-redux';
import React, { useState, useEffect, useRef } from 'react';

export default function Notification() {
  const { currentUser } = useSelector((state) => state.user);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showDropdown, setShowDropdown] = useState(false);
  const audioRef = useRef(null);

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
      const res = await fetch('/api/notifications/get', {
        method: 'GET',
        credentials: 'include',
      });
      
      if (res.ok) {
        const data = await res.json();
        setNotifications(data);
        const unread = data.filter((n) => !n.isRead);
        if (unread.length > unreadCount && unread.length > 0) {
          playChime();
        }
        setUnreadCount(unread.length);
      } else {
        const errorText = await res.text();
        console.log('Server Error Response:', res.status, errorText);
      }
    } catch (error) {
      console.log('Network/Catch Error fetching notifications:', error);
    }
  };

  fetchNotifications();
  const interval = setInterval(fetchNotifications, 30000);
  return () => clearInterval(interval);
}, [currentUser]);
  const handleNotificationClick = async (notificationId, isAlreadyRead) => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    if (isAlreadyRead) return;

    try {
      const res = await fetch(`/api/notifications/${notificationId}/read`, {
        method: 'PUT',
        credentials: 'include',
      });

      if (res.ok) {
        setNotifications((prev) =>
          prev.map((notif) =>
            notif._id === notificationId ? { ...notif, isRead: true } : notif
          )
        );
      }
    } catch (error) {
      console.log('Failed to mark notification as read:', error);
    }
  };

 return (
    <div className="relative">
      {/* Hidden audio element for notification alert chime */}
      <audio ref={audioRef} src="/path-to-sound.mp3" preload="auto" />

      {/* Bell Notification Button */}
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="relative p-2.5 bg-slate-900 border border-slate-800 rounded-xl text-blue-400 hover:text-white hover:border-blue-500 transition"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
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
                <div
                  key={n._id}
                  onClick={() => handleNotificationClick(n._id, n.isRead)}
                  className={`p-3 rounded-xl text-xs space-y-1 cursor-pointer transition ${
                    n.isRead 
                      ? 'bg-slate-900/40 text-slate-400 hover:bg-slate-800/50' 
                      : 'bg-blue-600/10 border border-blue-500/30 text-white font-medium'
                  }`}
                >
                  <p>{n.message}</p>
                  <div className="flex justify-between items-center pt-1">
                    <span className="text-[10px] text-slate-500">
                      {new Date(n.createdAt).toLocaleDateString()}
                    </span>
                    {!n.isRead && (
                      <span className="w-2 h-2 rounded-full bg-blue-500 inline-block"></span>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}