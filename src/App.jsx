import React from "react";
import { Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";

import LoginPage from "./pages/LoginPage";
import VerifyPage from "./pages/VerifyPage";
import Verifypage2 from "./pages/Verifypage2";
import VerifiedPage from "./pages/VerifiedPage";
import CarModelPage from "./pages/CarModelPage";
import SignupPage from "./components/Signup";
import BookingPageA from "./pages/BookingPageA";
import BookServicePage from "./pages/dashboard-pages/BookServicePage";
import MyServicePage from "./pages/dashboard-pages/MyServicePage";
import ServiceHistoryPage from "./pages/dashboard-pages/ServiceHistoryPage";
import DashboardPage from "./pages/dashboard-pages/DashboardPage";
import PaymentPage from "./pages/dashboard-pages/PaymentPage";
import NotificationPage from "./pages/dashboard-pages/NotificationPage";
import ProfilePage from "./pages/dashboard-pages/ProfilePage";

import Home from "./pages/Home";
import Services from "./pages/Services";
import ServiceDetail from "./pages/ServiceDetail";
import Providers from "./pages/Providers";
import Onboarding from "./pages/Onboarding";

import Overview from "./pages/Mec-dashboard/Overview";
import JobRequests from "./pages/Mec-dashboard/JobRequests";
import ActiveJobs from "./pages/Mec-dashboard/Activejobs";
import CompletedJobs from "./pages/Mec-dashboard/CompletedJobs";
import Earnings from "./pages/Mec-dashboard/Earnings";
import Schedule from "./pages/Mec-dashboard/Schedule";
import Messages from "./pages/Mec-dashboard/Messages";
import { JobsProvider } from "./context/JobsContext";

import ContactPage from "./pages/ContactPage";
import TermPage from "./pages/TermPage";
import PrivacyPage from "./pages/PrivacyPage";

// ADMIN DASHBOARD PAGES
import UserDashboardPage from "./pages/Users-admin-pages/UserDashboardPage";
import UserMechanicPage from "./pages/Users-admin-pages/UserMechanicPage";
import CustomerPage from "./pages/Users-admin-pages/CustomerPage";
import UserBookingPage from "./pages/Users-admin-pages/UserBookingPage";
import SettingsPage from "./pages/Users-admin-pages/SettingsPage";
import AdminNotificationPage from "./pages/Users-admin-pages/NotificationPage";
import DisputeSupport from "./pages/Users-admin-pages/DisputeSupport";
// ADMINSECTION — add new admin page imports below this line


const App = () => {
  return (
    <div className="bg-gray-100">
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/verify" element={<VerifyPage />} />
        <Route path="/verify2" element={<Verifypage2 />} />
        <Route path="/verified" element={<VerifiedPage />} />
        <Route path="/car-model" element={<CarModelPage />} />
        <Route path="/booking/:step" element={<BookingPageA />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/book-service" element={<BookServicePage />} />
        <Route path="/my-service" element={<MyServicePage />} />
        <Route path="/service-history" element={<ServiceHistoryPage />} />
        <Route path="/payment-management" element={<PaymentPage />} />
        <Route path="/notify" element={<NotificationPage />} />
        <Route path="/profile" element={<ProfilePage />} />

        <Route path="/home" element={<Home />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/terms" element={<TermPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/services" element={<Services />} />
        <Route path="/services/:id" element={<ServiceDetail />} />
        <Route path="/providers" element={<Providers />} />
        <Route path="/onboarding" element={<Onboarding />} />

        {/* ADMIN DASHBOARD */}
        <Route path="/users-dashboard" element={<UserDashboardPage />} />
        <Route path="/users-mechanics" element={<UserMechanicPage />} />
        <Route path="/customer-management" element={<CustomerPage />} />
        <Route path="/users-booking" element={<UserBookingPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/notifications" element={<AdminNotificationPage />} />
        <Route path="/disputes" element={<DisputeSupport />} />
        {/* ADD NEW ADMIN ROUTES BELOW THIS LINE */}


        {/* MEC DASHBOARD — all wrapped in ONE JobsProvider so state is shared */}
        <Route path="/mec-dashboard/*" element={
          <JobsProvider>
            <Routes>
              <Route index element={<Overview />} />
              <Route path="job-requests" element={<JobRequests />} />
              <Route path="active-jobs" element={<ActiveJobs />} />
              <Route path="completed-jobs" element={<CompletedJobs />} />
              <Route path="earnings" element={<Earnings />} />
              <Route path="schedule" element={<Schedule />} />
              <Route path="messages" element={<Messages />} />
            </Routes>
          </JobsProvider>
        } />

      </Routes>
    </div>
  );
};

export default App;