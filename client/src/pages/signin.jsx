import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {signInStart, signInSuccess, signInFailure} from '../redux/user/userSlice';
import OAuth from '../components/OAuth';


export default function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    dispatch(signInStart());
    const res = await fetch('/api/auth/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    if (data.success === false) {
      dispatch(signInFailure(data.message));
      return;
    }
    dispatch(signInSuccess(data));
    navigate('/')
  } catch (error) {
    dispatch(signInFailure(error.message));
  }
};
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign In</h1>
      <form onSubmit={handleSubmit}  className='flex flex-col gap-4'>
        <input 
          type='text' 
          placeholder='email' 
          className='bg-white p-3 rounded-lg outline-none
           shadow-sm focus:ring-2
           focus:ring-slate-400 transition-all' 
          id='email' onChange={handleChange}/>
        <input 
          type='password' 
          placeholder='password' 
          className='bg-white p-3 rounded-lg outline-none 
          shadow-sm focus:ring-2 focus:ring-slate-400 
          transition-all' 
          id='password' onChange={handleChange} />

          <button disabled={loading} className='bg-slate-700 text-white 
          p-3 rounded-lg uppercase hover:opacity-95 hover:shadow-md transition-all 
          active:scale-[0.98] disabled:opacity-80 font-medium tracking-wide'>
           { loading ? 'loading...': 'Sign In'}
          </button>
          <OAuth />
      </form>
      <div className="flex gap-2 mt-5">
        <p> Dont Have an account?</p>
        <Link to={"/signup"} >
        <span className="text-blue-700 hover: underline ">Sign up</span>
        </Link>
      </div>
      {error && <p className="text-red-500 mt-5">{error}</p>}
      </div>
    );
}
