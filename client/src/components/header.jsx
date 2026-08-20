import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import {useSelector} from 'react-redux';

export default function Header() {
  const {currentUser} = useSelector(state => state.user)
  return (
    <header className="bg-slate-200 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        {/* LOGO + TEXT STARTS HERE */}
        <Link to="/" className="flex items-center gap-2 font-bold tracking-tight text-lg sm:text-2xl">
          {/* Logo Icon Box */}
          <div className="bg-slate-800 text-white w-9 h-9 rounded-lg flex items-center justify-center font-black shadow-sm text-xl">
            M
          </div>
          {/* Brand Text */}
          <div className="flex flex-wrap">
            <span className="text-slate-700">Mikel's</span>
            <span className="text-slate-900 font-extrabold ml-1">Estate</span>
          </div>
        </Link>
        {/* LOGO + TEXT ENDS HERE */}

        <form className="bg-slate-100 p-3 rounded-lg flex items-center">
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent focus:outline-none w-24 sm:w-64"
          />
          <FaSearch className="text-slate-600" />
        </form>
        <ul className='flex gap-4'>
          <Link to='/'>
          <li className='hidden sm:inline text-slate-800 
          hover:underline'>Home</li>
          </Link>
          <Link to='/about'>
          <li className='hidden sm:inline text-slate-800 
          hover:underline'>About
          </li>
          </Link>
    <Link to='/profile' className='flex items-center gap-2'>
  {currentUser ? (
    <>
      <img
        className='rounded-full h-7 w-7 object-cover'
        src={
          currentUser.avatar ||
          'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
        }
        alt='profile'
        onError={(e) => {
          e.target.src =
            'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png';
        }}
      />
      <span className='hidden sm:inline text-slate-700 font-medium hover:underline'>
        Profile
      </span>
    </>
  ) : (
    <li className='text-slate-700 hover:underline'>Sign in</li>
  )}
  </Link>

        </ul>
      </div>
    </header>
  );
}

