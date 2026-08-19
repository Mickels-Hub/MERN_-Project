import { useSelector } from 'react-redux';
import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);

  return (
    <div className='max-w-md mx-auto my-12 bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden'>
      {/* Decorative Gradient Banner */}
      <div className='h-28 bg-gradient-to-r from-slate-800 via-slate-700 to-slate-900 relative'>
        <div className='absolute -bottom-10 left-1/2 transform -translate-x-1/2 group cursor-pointer'>
          <input
            onChange={(e) => setFile(e.target.files[0])}
            type='file'
            ref={fileRef}
            hidden
            accept='image/*'
          />
          <img
            onClick={() => fileRef.current.click()}
            src={
              file
                ? URL.createObjectURL(file)
                : currentUser?.avatar ||
                  'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
            }
            alt='profile'
            className='rounded-full h-24 w-24 object-cover ring-4 ring-white shadow-lg group-hover:opacity-85 transition duration-200'
          />
          <div
            onClick={() => fileRef.current.click()}
            className='absolute bottom-1 right-1 bg-slate-900 text-white p-1.5 rounded-full shadow-md hover:scale-110 transition'
          >
            <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth='1.5' stroke='currentColor' className='w-4 h-4'>
              <path strokeLinecap='round' strokeLinejoin='round' d='M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z' />
              <path strokeLinecap='round' strokeLinejoin='round' d='M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z' />
            </svg>
          </div>
        </div>
      </div>

      <div className='pt-14 pb-8 px-8'>
        <div className='text-center mb-6'>
          <h1 className='text-2xl font-bold text-slate-800 tracking-tight'>
            {currentUser?.username || 'User Profile'}
          </h1>
          <span className='inline-block mt-1 px-3 py-0.5 bg-emerald-50 text-emerald-600 rounded-full text-xs font-semibold tracking-wide border border-emerald-200'>
            Verified Account
          </span>
        </div>

        <form className='flex flex-col gap-4'>
          <div className='relative'>
            <input
              type='text'
              placeholder='Username'
              defaultValue={currentUser?.username}
              id='username'
              className='w-full bg-slate-50 pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:bg-white text-slate-700 transition text-sm'
            />
            <span className='absolute left-3.5 top-3.5 text-slate-400'>👤</span>
          </div>

          <div className='relative'>
            <input
              type='email'
              placeholder='Email'
              defaultValue={currentUser?.email}
              id='email'
              className='w-full bg-slate-50 pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:bg-white text-slate-700 transition text-sm'
            />
            <span className='absolute left-3.5 top-3.5 text-slate-400'>✉️</span>
          </div>

          <div className='relative'>
            <input
              type='password'
              placeholder='New Password'
              id='password'
              className='w-full bg-slate-50 pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:bg-white text-slate-700 transition text-sm'
            />
            <span className='absolute left-3.5 top-3.5 text-slate-400'>🔒</span>
          </div>

          <button className='bg-slate-900 text-white py-3.5 rounded-xl font-semibold uppercase tracking-wider text-xs hover:bg-slate-800 active:scale-[0.98] transition duration-150 shadow-md mt-2'>
            Update Profile
          </button>

          <Link
            to='/create-listing'
            className='bg-emerald-600 text-white text-center py-3.5 rounded-xl font-semibold uppercase tracking-wider text-xs hover:bg-emerald-700 active:scale-[0.98] transition duration-150 shadow-md'
          >
            Create Listing
          </Link>
        </form>

        <div className='flex justify-between items-center mt-6 pt-5 border-t border-slate-100 text-xs font-semibold'>
          <button type='button' className='text-rose-500 hover:text-rose-700 hover:underline transition'>
            Delete Account
          </button>
          <button type='button' className='text-slate-500 hover:text-slate-800 hover:underline transition'>
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}