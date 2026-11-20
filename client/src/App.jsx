import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

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
import Dashboard from './pages/dashboard';

// Dashboard Sub-Pages
import SavedProperties from './pages/dashboard/SavedProperties';
import CompareProperties from './pages/dashboard/CompareProperties';
import RentalChecklist from './pages/dashboard/RentalChecklist';
import MySearches from './pages/dashboard/MySearches';
import PaymentsContactAccess from './pages/dashboard/PaymentsContactAccess';

// Admin Pages
import AdminLayout from './pages/admin/AdminLayout';
import AdminOverview from './pages/admin/AdminOverview';
import AdminUsers from './pages/admin/AdminUsers';
import AdminPayments from './pages/admin/AdminPayments';
import AdminReports from './pages/admin/AdminReports';
import AdminReportsAnalytics from './pages/admin/AdminReportsAnalytics';
import AdminActivityLogs from './pages/admin/AdminActivityLogs';
import AdminHomepageManagement from './pages/admin/AdminHomepageManagement';
import AdminContentManagement from './pages/admin/AdminContentManagement';

// Components & Layouts
import Header from './components/header';
import ProtectedRoute from './components/ProtectedRoute';
import UserLayout from './components/UserLayout';
import GlobalSidebar from './components/GlobalSidebar';
import AdminSidebar from './components/AdminSidebar';
import AdminProtectedRoute from './components/AdminProtectedRoute';

export default function App() {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-100 flex flex-col">
        {/* Top Header */}
        <Header />

        {/* Layout container with Sidebar on the left and content on the right */}
        <div className="flex flex-1 relative">
          {currentUser && currentUser.isAdmin ? <AdminSidebar /> : <GlobalSidebar />}

          <main className="flex-1 min-h-screen overflow-x-hidden">
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

              {/* Protected Routes */}
              <Route element={<ProtectedRoute />}>
                <Route path="/listing/:listingId" element={<Listing />} />
                <Route path="/properties" element={<Properties />} />
                <Route path="/property-types" element={<PropertyTypes />} />
                <Route path="/category/:categoryName" element={<CategoryView />} />
                <Route path="/location/:locationName" element={<LocationView />} />
                <Route path="/locations" element={<Locations />} />
                <Route path="/create-listing" element={<CreateListing />} />
                <Route path="/update-listing/:listingId" element={<CreateListing />} />
              </Route>

              {/* User Dashboard Sub-Routes */}
              <Route element={<UserLayout />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/dashboard/saved" element={<SavedProperties />} />
                <Route path="/dashboard/compare" element={<CompareProperties />} />
                <Route path="/dashboard/checklist" element={<RentalChecklist />} />
                <Route path="/dashboard/searches" element={<MySearches />} />
                <Route path="/dashboard/payments" element={<PaymentsContactAccess />} />
                <Route path="/profile" element={<Profile />} />
              </Route>

              {/* Admin Panel Protected Routes */}
              <Route element={<AdminProtectedRoute />}>
                <Route path="/admin" element={<AdminLayout />}>
                  <Route index element={<AdminOverview />} />
                  <Route path="users" element={<AdminUsers />} />
                  <Route path="payments" element={<AdminPayments />} />
                  <Route path="reports" element={<AdminReports />} />
                  <Route path="analytics" element={<AdminReportsAnalytics />} />
                  <Route path="logs" element={<AdminActivityLogs />} />
                  <Route path="cms" element={<AdminHomepageManagement />} />
                  <Route path="content" element={<AdminContentManagement />} />
                </Route>
              </Route>
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}