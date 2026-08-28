import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import OAuth from '../components/OAuth';

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    setLoading(true);
    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    if (data.success === false) {
      setError(data.message);
      setLoading(false);
      return;
    }
    setLoading(false);
    setError(null);
    navigate('/signin')
  } catch (error) {
    setLoading(false);
    setError(error.message);
  }
};
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign Up</h1>
      <form onSubmit={handleSubmit}  className='flex flex-col gap-4'>
        <input 
          type='text' 
          placeholder='username' 
          className='bg-white p-3 rounded-lg outline-none
           shadow-sm focus:ring-2
           focus:ring-slate-400 transition-all' 
          id='username' onChange={handleChange}/>
        <input 
          type='email' 
          placeholder='email' 
          className='bg-white p-3 rounded-lg outline-none 
          shadow-sm focus:ring-2
           focus:ring-slate-400 transition-all' 
          id='email' onChange={handleChange} />
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
           { loading ? 'loading...': 'Sign Up'}
          </button>
          <OAuth/>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Have an account?</p>
        <Link to={"/sign-in"} >
        <span className="text-blue-700 hover: underline ">Sign in</span>
        </Link>
      </div>
      {error && <p className="text-red-500 mt-5">{error}</p>}
      </div>
    );
}
