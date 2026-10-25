import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Pages
import Home from './pages/home.jsx';
import SignIn from './pages/signin.jsx';
import SignUp from './pages/signup.jsx';
import About from './pages/about.jsx';
import Properties from './pages/propertiese.jsx';
import Listing from './pages/Listing.jsx';
import Search from './pages/Search.jsx';
import CreateListing from './pages/CreateListing.jsx';
import Locations from './pages/Locations.jsx';
import LocationView from './pages/LocationView.jsx';
import CategoryView from './pages/CategoryView.jsx';
import PropertyTypes from './pages/PropertyTypes.jsx';
import Help from './pages/Help.jsx';
import FAQ from './pages/FAQ.jsx';
import Contact from './pages/contact.jsx';
import Terms from './pages/terms.jsx';
import Privacy from './pages/privacy.jsx';
import HowItWorks from './pages/how-it-works.jsx';
import Profile from './pages/profile.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';

// Dashboard Sub-Pages
import Dashboard from './pages/dashboard.jsx';
import SavedProperties from './pages/dashboard/SavedProperties.jsx';
import CompareProperties from './pages/dashboard/CompareProperties.jsx';
import RentalChecklist from './pages/dashboard/RentalChecklist.jsx';
import MySearches from './pages/dashboard/MySearches.jsx';
import PaymentsContactAccess from './pages/dashboard/PaymentsContactAccess.jsx';

// Components
import Header from './components/header.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import UserLayout from './components/UserLayout.jsx';
import GlobalSidebar from './components/GlobalSidebar.jsx';

export default function App() {
  return (
    <BrowserRouter>
      {/* Header spans full width across top */}
      <Header />

      {/* Sidebar fixed underneath header */}
      <GlobalSidebar />

      {/* Main container with precise left margin matching sidebar width */}
      <div className="pl-16 md:pl-20 min-h-screen flex flex-col bg-[#F5F7F5]">
        <main className="flex-1">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/about" element={<About />} />
            <Route path="/search" element={<Search />} />
            <Route path="/listing/:listingId" element={<Listing />} />
            <Route path="/community" element={<Help />} />
            <Route path="/help" element={<Help />} />

            {/* Category Navigation Routes */}
            <Route path="/properties" element={<Properties />} />
            <Route path="/property-types" element={<PropertyTypes />} />
            <Route path="/category/:categoryName" element={<CategoryView />} />
            <Route path="/location/:locationName" element={<LocationView />} />
            <Route path="/locations" element={<Locations />} />

            {/* More Dropdown Routes */}
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />

            {/* Dashboard & Admin Routes */}
            <Route path="/admin-dashboard" element={<AdminDashboard />} />

            {/* Protected User Dashboard Routes */}
            <Route element={<ProtectedRoute />}>
              <Route element={<UserLayout />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/dashboard/saved" element={<SavedProperties />} />
                <Route path="/dashboard/compare" element={<CompareProperties />} />
                <Route path="/dashboard/checklist" element={<RentalChecklist />} />
                <Route path="/dashboard/searches" element={<MySearches />} />
                <Route path="/dashboard/payments" element={<PaymentsContactAccess />} />
                <Route path="/profile" element={<Profile />} />
              </Route>

              <Route path="/create-listing" element={<CreateListing />} />
              <Route path="/update-listing/:listingId" element={<CreateListing />} />
            </Route>
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}