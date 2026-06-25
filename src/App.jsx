



import React from "react";
import { Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import ScrollToTop from "./components/ScrollToTop";

// AUTH
import LoginPage from "./pages/LoginPage";
import VerifyPage from "./pages/VerifyPage";
import Verifypage2 from "./pages/Verifypage2";
import VerifiedPage from "./pages/VerifiedPage";
import SignupPage from "./pages/SignupPage";
import ForgetPage from "./pages/ForgetPage";
import ResetPage from "./pages/ResetPage";

// MAIN
import Home from "./pages/Home";
import Services from "./pages/Services";
import ServiceDetail from "./pages/ServiceDetail";
import Providers from "./pages/Providers";
import ContactPage from "./pages/ContactPage";
import TermPage from "./pages/TermPage";
import PrivacyPage from "./pages/PrivacyPage";

// BOOKING / DASHBOARD
import CarModelPage from "./pages/CarModelPage";
import BookingPageA from "./pages/BookingPageA";
import BookServicePage from "./pages/dashboard-pages/BookServicePage";
import MyServicePage from "./pages/dashboard-pages/MyServicePage";
import ServiceHistoryPage from "./pages/dashboard-pages/ServiceHistoryPage";
import DashboardPage from "./pages/dashboard-pages/DashboardPage";
import PaymentPage from "./pages/dashboard-pages/PaymentPage";
import NotificationPage from "./pages/dashboard-pages/NotificationPage";
import ProfilePage from "./pages/dashboard-pages/ProfilePage";
import VechiclePage from "./pages/dashboard-pages/VechiclePage";

// ONBOARDING
import Onboarding from "./pages/Onboarding";

// MEC DASHBOARD
import Overview from "./pages/Mec-dashboard/Overview";
import JobRequests from "./pages/Mec-dashboard/JobRequests";
import ActiveJobs from "./pages/Mec-dashboard/Activejobs";
import CompletedJobs from "./pages/Mec-dashboard/CompletedJobs";
import Earnings from "./pages/Mec-dashboard/Earnings";
import Schedule from "./pages/Mec-dashboard/Schedule";
import Messages from "./pages/Mec-dashboard/Messages";
import { JobsProvider } from "./context/JobsContext";
import Profile from "./pages/Mec-dashboard/Profile";

// ADMIN
import UserDashboardPage from "./pages/Users-admin-pages/UserDashboardPage";
import UserMechanicPage from "./pages/Users-admin-pages/UserMechanicPage";
import CustomerPage from "./pages/Users-admin-pages/CustomerPage";
import UserBookingPage from "./pages/Users-admin-pages/UserBookingPage";
import SettingsPage from "./pages/Users-admin-pages/SettingsPage";
import AdminNotificationPage from "./pages/Users-admin-pages/NotificationPage";
import DisputeSupport from "./pages/Users-admin-pages/DisputeSupport";
import WalletPage from "./pages/Users-admin-pages/WalletPage";
import MechanicApprovalPage from "./pages/Users-admin-pages/MechanicApprovalPage";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="bg-gray-100">
        <ScrollToTop />

        <Routes>
          {/* HOME */}
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />

          {/* AUTH */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/verify" element={<VerifyPage />} />
          <Route path="/verify2" element={<Verifypage2 />} />
          <Route path="/verified" element={<VerifiedPage />} />
          <Route path="/forgot-password" element={<ForgetPage />} />
          <Route path="/reset-password" element={<ResetPage />} />

          {/* SERVICES */}
          <Route path="/services" element={<Services />} />
          <Route path="/services/:id" element={<ServiceDetail />} />
          <Route path="/providers" element={<Providers />} />

          {/* CONTACT */}
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/terms" element={<TermPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />

          {/* BOOKING */}
          <Route path="/car-model" element={<CarModelPage />} />
          <Route path="/booking/:step" element={<BookingPageA />} />

          {/* USER DASHBOARD */}
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/book-service" element={<BookServicePage />} />
          <Route path="/my-service" element={<MyServicePage />} />
          <Route path="/service-history" element={<ServiceHistoryPage />} />
          <Route path="/payment/success" element={<PaymentPage />} />
          <Route path="/notify" element={<NotificationPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/vehicles" element={<VechiclePage />} />
          {/* ONBOARDING */}
          <Route path="/onboarding" element={<Onboarding />} />

          {/* ADMIN */}
          <Route path="/admin-dashboard" element={<UserDashboardPage />} />
          <Route path="/admin-mechanics" element={<UserMechanicPage />} />
          <Route path="/customer-management" element={<CustomerPage />} />
          <Route path="/admin-booking" element={<UserBookingPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/notifications" element={<AdminNotificationPage />} />
          <Route path="/disputes" element={<DisputeSupport />} />
          <Route path="/wallet-payments" element={<WalletPage />} />
          <Route path="/mechanic-approval/:id" element={<MechanicApprovalPage />} />

          {/* MEC DASHBOARD */}
          <Route
            path="/mec-dashboard"
            element={
              <JobsProvider>
                <Overview />
              </JobsProvider>
            }
          />
          <Route
            path="/mec-dashboard/job-requests"
            element={
              <JobsProvider>
                <JobRequests />
              </JobsProvider>
            }
          />
          <Route
            path="/mec-dashboard/active-jobs"
            element={
              <JobsProvider>
                <ActiveJobs />
              </JobsProvider>
            }
          />
          <Route
            path="/mec-dashboard/completed-jobs"
            element={
              <JobsProvider>
                <CompletedJobs />
              </JobsProvider>
            }
          />
          <Route
            path="/mec-dashboard/earnings"
            element={
              <JobsProvider>
                <Earnings />
              </JobsProvider>
            }
          />
          <Route
            path="/mec-dashboard/schedule"
            element={
              <JobsProvider>
                <Schedule />
              </JobsProvider>
            }
          />
           <Route
            path="/mec-dashboard/profile"
            element={
              <JobsProvider>
                <Profile />
              </JobsProvider>
            }
          />
          <Route
            path="/mec-dashboard/messages"
            element={
              <JobsProvider>
                <Messages />
              </JobsProvider>
            }
          />
        </Routes>
      </div>
    </QueryClientProvider>
  );
};

export default App;