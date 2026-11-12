import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Pages
import Home from './pages/home';
import SignIn from './pages/signin';
import SignUp from './pages/signup';
import About from './pages/about';
import Properties from './pages/propertiese.jsx';
import Listing from './pages/Listing';
import Search from './pages/Search';
import CreateListing from './pages/CreateListing';
import Locations from './pages/Locations';
import LocationView from './pages/LocationView';
import CategoryView from './pages/CategoryView';
import PropertyTypes from './pages/PropertyTypes';
import Help from './pages/Help';
import FAQ from './pages/FAQ';
import Contact from './pages/contact';
import Terms from './pages/terms';
import Privacy from './pages/privacy';
import HowItWorks from './pages/how-it-works';
import Profile from './pages/profile';
import AdminDashboard from './pages/AdminDashboard';
import Dashboard from './pages/dashboard';

// Dashboard Sub-Pages
import SavedProperties from './pages/dashboard/SavedProperties';
import CompareProperties from './pages/dashboard/CompareProperties';
import RentalChecklist from './pages/dashboard/RentalChecklist';
import MySearches from './pages/dashboard/MySearches';
import PaymentsContactAccess from './pages/dashboard/PaymentsContactAccess';

// Components & Layouts
import Header from './components/header';
import ProtectedRoute from './components/ProtectedRoute';
import UserLayout from './components/UserLayout';
import GlobalSidebar from './components/GlobalSidebar'; // Brought back globally

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-100 flex flex-col">
        {/* Top Header */}
        <Header />

        {/* Layout container with GlobalSidebar on the left */}
        <div className="flex flex-1 relative">
          <GlobalSidebar />

          <main className="flex-1 min-h-screen">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/sign-in" element={<SignIn />} />
              <Route path="/sign-up" element={<SignUp />} />
              <Route path="/about" element={<About />} />
              <Route path="/search" element={<Search />} />
              <Route path="/how-it-works" element={<HowItWorks />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/community" element={<Help />} />
              <Route path="/help" element={<Help />} />
              <Route path="/admin-dashboard" element={<AdminDashboard />} />

              {/* Protected Routes (Guests redirected to /signup) */}
              <Route element={<ProtectedRoute />}>
                <Route path="/listing/:listingId" element={<Listing />} />
                <Route path="/properties" element={<Properties />} />
                <Route path="/property-types" element={<PropertyTypes />} />
                <Route path="/category/:categoryName" element={<CategoryView />} />
                <Route path="/location/:locationName" element={<LocationView />} />
                <Route path="/locations" element={<Locations />} />

                {/* User Dashboard Sub-Routes Inside UserLayout */}
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
      </div>
    </BrowserRouter>
  );
}