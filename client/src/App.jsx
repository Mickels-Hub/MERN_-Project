import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Pages
import Home from './pages/home.jsx';
import SignIn from './pages/signin.jsx';
import SignUp from './pages/signup.jsx';
import About from './pages/about.jsx';
import Profile from './pages/profile.jsx';
import Test from './pages/Test.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';
import Community from './pages/Community.jsx';
import Listing from './pages/Listing.jsx';
import Search from './pages/Search.jsx';
import CreateListing from './pages/CreateListing.jsx';
import Locations from './pages/Locations.jsx';
import Help from './pages/Help.jsx';
import Dashboard from './pages/dashboard.jsx';
import Properties from './pages/propertiese.jsx';
import PropertyTypes from './pages/PropertyTypes.jsx';
import CategoryView from './pages/CategoryView';
import LocationView from './pages/LocationView';

// Dropdown Pages
import HowItWorks from './pages/how-it-works.jsx';
import FAQ from './pages/FAQ.jsx';
import Contact from './pages/contact.jsx';
import Terms from './pages/terms.jsx';
import Privacy from './pages/privacy.jsx';

// Components
import Header from './components/header.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        {/* Public Routes */}
        <Route path='/' element={<Home />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/about' element={<About />} />
        <Route path='/test' element={<Test />} />
        <Route path='/search' element={<Search />} />
        <Route path='/listing/:listingId' element={<Listing />} />
        <Route path='/community' element={<Community />} />
        <Route path='/help' element={<Help />} />
        
        {/* Category Navigation Routes */}
        <Route path='/properties' element={<Properties />} />
        <Route path='/property-types' element={<PropertyTypes />} />
        <Route path="/category/:categoryName" element={<CategoryView />} /> {/* <-- NEW ROUTE */}
        <Route path="/location/:locationName" element={<LocationView />} />
        <Route path='/locations' element={<Locations />} />

        {/* More Dropdown Routes */}
        <Route path='/how-it-works' element={<HowItWorks />} />
        <Route path='/faq' element={<FAQ />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/terms' element={<Terms />} />
        <Route path='/privacy' element={<Privacy />} />

        {/* Dashboard & Admin Routes */}
        <Route path='/admin-dashboard' element={<AdminDashboard />} />

        {/* Protected User Routes */}
        <Route element={<PrivateRoute />}>
          <Route path='/profile' element={<Profile />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/create-listing' element={<CreateListing />} />
          <Route path='/update-listing/:listingId' element={<CreateListing />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}