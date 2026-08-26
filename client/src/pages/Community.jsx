import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export default function Community() {
  const { currentUser } = useSelector((state) => state.user);
  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState('');
  const [replyText, setReplyText] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch('/api/community/get');
        const data = await res.json();
        if (res.ok) setPosts(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchPosts();
  }, []);

  const handleSubmitPost = async (e) => {
    e.preventDefault();
    if (!currentUser) return alert('Please sign in to post!');
    try {
      const res = await fetch('/api/community/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content }),
      });
      const data = await res.json();
      if (res.ok) {
        setPosts([data, ...posts]);
        setContent('');
        setError(null);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Failed to connect to server');
    }
  };

  const handleSendReply = async (postId) => {
    const text = replyText[postId];
    if (!text) return;
    try {
      const res = await fetch(`/api/community/reply/${postId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: text }),
      });
      const updatedPost = await res.json();
      if (res.ok) {
        setPosts(posts.map((p) => (p._id === postId ? updatedPost : p)));
        setReplyText({ ...replyText, [postId]: '' });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeletePost = async (postId) => {
    try {
      const res = await fetch(`/api/community/delete/${postId}`, { method: 'DELETE' });
      if (res.ok) {
        setPosts(posts.filter((p) => p._id !== postId));
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='max-w-3xl mx-auto p-4 my-8 text-slate-100'>
      {/* Banner */}
      <div className='bg-gradient-to-r from-blue-900/80 to-indigo-900/80 border border-blue-800/50 p-6 rounded-3xl shadow-2xl mb-8 text-center'>
        <h1 className='text-3xl font-black text-white mb-2'>🌐 Community Group Chat & Feed</h1>
        <p className='text-slate-300 text-sm'>
          Real-time style discussions, chats, and replies with your members and sub-admins.
        </p>
      </div>

      {/* Post Box */}
      {currentUser ? (
        <form onSubmit={handleSubmitPost} className='bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-xl mb-8'>
          {error && <p className='text-red-400 text-xs mb-2'>{error}</p>}
          <textarea
            rows='3'
            placeholder='Broadcast a message to the community group...'
            className='w-full bg-slate-800 border border-slate-700 p-3 rounded-xl text-white focus:outline-none focus:border-blue-500 resize-none text-sm'
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          ></textarea>
          <div className='flex justify-end mt-2'>
            <button
              type='submit'
              className='px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm rounded-xl shadow-lg transition-all cursor-pointer'
            >
              Send Message
            </button>
          </div>
        </form>
      ) : (
        <div className='bg-slate-900 border border-slate-800 p-4 rounded-xl text-center mb-6 text-sm text-slate-400'>
          Sign in to participate in the community chat.
        </div>
      )}

      {/* Feed Threads */}
      <div className='space-y-6'>
        {posts.length === 0 ? (
          <p className='text-slate-500 text-center py-10'>No chat messages yet.</p>
        ) : (
          posts.map((post) => (
            <div key={post._id} className='bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-xl'>
              {/* Post Header */}
              <div className='flex justify-between items-center mb-3'>
                <div className='flex items-center gap-3'>
                  <img src={post.avatar} alt='' className='w-9 h-9 rounded-full object-cover border border-slate-700' />
                  <div>
                    <h3 className='font-bold text-slate-200 text-sm'>{post.username}</h3>
                    <span className='text-[11px] text-slate-500'>{new Date(post.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                </div>
                {(currentUser && (currentUser._id === post.userRef || currentUser.email === 'ugochukwumickel15@gmail.com' || currentUser.role === 'moderator')) && (
                  <button
                    onClick={() => handleDeletePost(post._id)}
                    className='text-red-400 hover:text-red-300 text-xs font-bold px-2.5 py-1 bg-red-950/50 border border-red-900 rounded-lg cursor-pointer'
                  >
                    Delete
                  </button>
                )}
              </div>

              <p className='text-slate-300 text-sm leading-relaxed mb-4'>{post.content}</p>

              {/* Replies Thread Section */}
              <div className='border-t border-slate-800 pt-3 pl-4 sm:pl-8 space-y-3 mt-3'>
                {post.replies && post.replies.map((reply, idx) => (
                  <div key={idx} className='bg-slate-800/50 border border-slate-700/40 p-3 rounded-xl flex gap-3 items-start'>
                    <img src={reply.avatar || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'} alt='' className='w-7 h-7 rounded-full object-cover mt-0.5' />
                    <div className='flex-1 text-xs'>
                      <div className='flex justify-between items-center mb-1'>
                        <span className='font-bold text-slate-300'>{reply.username}</span>
                        <span className='text-[10px] text-slate-500'>{new Date(reply.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      </div>
                      <p className='text-slate-300'>{reply.content}</p>
                    </div>
                  </div>
                ))}

                {/* Reply Input Box */}
                {currentUser && (
                  <div className='flex gap-2 mt-3'>
                    <input
                      type='text'
                      placeholder='Write a reply...'
                      className='flex-1 bg-slate-800 border border-slate-700 px-3 py-2 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500'
                      value={replyText[post._id] || ''}
                      onChange={(e) => setReplyText({ ...replyText, [post._id]: e.target.value })}
                    />
                    <button
                      onClick={() => handleSendReply(post._id)}
                      className='px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs cursor-pointer'
                    >
                      Reply
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}