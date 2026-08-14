import React from 'react'
import {Link} from 'react-router-dom'

export default function SignUp() {
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign Up</h1>
      <form className='flex flex-col gap-4'>
        <input 
          type='text' 
          placeholder='username' 
          className='bg-white p-3 rounded-lg outline-none
           shadow-sm focus:ring-2
           focus:ring-slate-400 transition-all' 
          id='username' 
        />
        <input 
          type='email' 
          placeholder='email' 
          className='bg-white p-3 rounded-lg outline-none 
          shadow-sm focus:ring-2
           focus:ring-slate-400 transition-all' 
          id='email' 
        />
        <input 
          type='password' 
          placeholder='password' 
          className='bg-white p-3 rounded-lg outline-none 
          shadow-sm focus:ring-2 focus:ring-slate-400 
          transition-all' 
          id='password' />
          <button className='bg-slate-700 text-white 
          p-3 rounded-lg uppercase hover:opacity-95 hover:shadow-md transition-all 
          active:scale-[0.98] disabled:opacity-80 font-medium tracking-wide'>
            Sign Up
          </button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Have an account?</p>
        <Link to={"/signin"} >
        <spam className="text-blue-700 hover: underline " >Sign in</spam>
        </Link>
      </div>

    </div>
  )
}
