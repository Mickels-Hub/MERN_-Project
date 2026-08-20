import { useSelector, useDispatch } from 'react-redux';
import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
} from '../redux/user/userSlice';

export default function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  const fileRef = useRef(null);
  const dispatch = useDispatch();

  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    setFilePerc(0);
    setFileUploadError(false);

    const MAX_SIZE_KB = 10000;
    if (file.size > MAX_SIZE_KB * 1024) {
      setFileUploadError(true);
      alert('Image too large! Please choose an image under 10,000 KB.');
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadstart = () => {
      setFilePerc(30);
    };

    reader.onload = () => {
      setFilePerc(100);
      setFormData((prev) => ({
        ...prev,
        avatar: reader.result,
      }));
    };

    reader.onerror = () => {
      setFileUploadError(true);
    };
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }

      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  return (
    <div className='min-h-screen py-10 flex flex-col items-center justify-center bg-slate-100'>
      <div className='w-full max-w-md bg-white rounded-3xl shadow-xl overflow-hidden'>
        
        {/* Dark Top Banner */}
        <div className='bg-slate-900 h-36 relative flex justify-center'>
          <input
            onChange={(e) => setFile(e.target.files[0])}
            type='file'
            ref={fileRef}
            hidden
            accept='image/*'
          />

          {/* Profile Picture Overlay */}
          <div className='absolute -bottom-12 group cursor-pointer'>
            <div className='relative w-24 h-24'>
              <img
                onClick={() => fileRef.current.click()}
                src={
                  formData.avatar ||
                  currentUser?.avatar ||
                  'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
                }
                alt='profile'
                className='rounded-full h-24 w-24 object-cover ring-4 ring-white shadow-md group-hover:opacity-85 transition'
              />
              <div
                onClick={() => fileRef.current.click()}
                className='absolute bottom-0 right-0 bg-slate-900 text-white p-2 rounded-full shadow-md hover:scale-110 transition'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth='1.5'
                  stroke='currentColor'
                  className='w-4 h-4'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M6.827 6.175A2.31 2.31 0 0 1 9.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-2.359-1.055L15.91 4.5H8.09l-.263.502Z'
                  />
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z'
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Card Body */}
        <div className='pt-14 pb-8 px-8'>
          
          {/* Upload Status Feedback */}
          <div className='text-center mb-3 min-h-5'>
            {fileUploadError ? (
              <span className='text-rose-500 text-xs font-semibold'>
                Error uploading image (Must be image & less than 10MB)
              </span>
            ) : filePerc > 0 && filePerc < 100 ? (
              <span className='text-slate-600 text-xs font-semibold animate-pulse'>
                Uploading: {filePerc}%
              </span>
            ) : filePerc === 100 && !fileUploadError ? (
              <span className='text-emerald-600 text-xs font-semibold'>
                Image uploaded successfully!
              </span>
            ) : null}
          </div>

          {/* User Info Header */}
          <div className='text-center mb-6'>
            <h2 className='text-2xl font-bold text-slate-800'>
              {currentUser?.username}
            </h2>
            <span className='inline-block bg-emerald-100 text-emerald-600 text-xs font-semibold px-3 py-1 rounded-full mt-2'>
              Verified Account
            </span>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
            
            {/* Username Input */}
            <div className='relative flex items-center'>
              <span className='absolute left-4 text-slate-500'>
                <svg xmlns='http://www.w3.org/2000/svg' className='h-5 w-5' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' />
                </svg>
              </span>
              <input
                type='text'
                placeholder='username'
                defaultValue={currentUser?.username}
                id='username'
                className='w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-12 pr-4 text-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400'
                onChange={handleChange}
              />
            </div>

            {/* Email Input */}
            <div className='relative flex items-center'>
              <span className='absolute left-4 text-slate-500'>
                <svg xmlns='http://www.w3.org/2000/svg' className='h-5 w-5' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' />
                </svg>
              </span>
              <input
                type='email'
                placeholder='email'
                defaultValue={currentUser?.email}
                id='email'
                className='w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-12 pr-4 text-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400'
                onChange={handleChange}
              />
            </div>

            {/* Password Input */}
            <div className='relative flex items-center'>
              <span className='absolute left-4 text-slate-500'>
                <svg xmlns='http://www.w3.org/2000/svg' className='h-5 w-5' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z' />
                </svg>
              </span>
              <input
                type='password'
                placeholder='New Password'
                id='password'
                className='w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-12 pr-4 text-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400'
                onChange={handleChange}
              />
            </div>

            {/* Submit Button INSIDE Form */}
            <button type='submit' className='w-full bg-slate-900 text-white font-bold rounded-xl py-3 mt-2 uppercase tracking-wider hover:bg-slate-800 transition'>
              Update Profile
            </button>

            {/* Restored Create Listing Button */}
            <Link
              className='bg-green-700 text-white p-3 rounded-xl uppercase text-center font-bold hover:opacity-95'
              to={'/create-listing'}
            >
              Create Listing
            </Link>
          </form>

          {/* Restored Delete Account and Sign Out Actions */}
          <div className='flex justify-between mt-5 text-sm font-semibold'>
            <span className='text-red-700 cursor-pointer hover:underline'>
              Delete Account
            </span>
            <span className='text-red-700 cursor-pointer hover:underline'>
              Sign Out
            </span>
          </div>

          {updateSuccess && (
            <p className='text-emerald-600 mt-4 text-center font-semibold text-sm'>
              User updated successfully!
            </p>
          )}

        </div>
      </div>
    </div>
  );
}