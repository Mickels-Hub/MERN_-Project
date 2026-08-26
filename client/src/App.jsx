import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home.jsx';
import SignIn from './pages/signin.jsx';
import SignUp from './pages/signup.jsx';
import About from './pages/about.jsx';
import Profile from './pages/profile.jsx';
import Test from './pages/Test.jsx';
import AdminDashboard from './pages/AdminDashboard';
import Community from './pages/Community';
import Listing from './pages/Listing';
import Search from './pages/Search';
import Header from './components/header.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import CreateListing from './pages/CreateListing';
export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/about' element={<About />} />
        <Route path='/test' element={<Test />} />
        <Route path='/admin-dashboard' element={<AdminDashboard />} />
        <Route path='/community' element={<Community />} />
        <Route path='/listing/:listingId' element={<Listing />} />
        <Route path='/search' element={<Search />} />
        <Route path='/update-listing/:listingId' element={<CreateListing />} />
        <Route element={<PrivateRoute />}>
          <Route path='/profile' element={<Profile />} />
          <Route path='/create-listing' element={<CreateListing />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}