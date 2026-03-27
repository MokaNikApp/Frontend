import React from "react";
import { Routes, Route } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";

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

const App = () => {
  return (
    <div className="bg-gray-100 ">
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
        <Route path="/services" element={<Services />} />
        <Route path="/services/:id" element={<ServiceDetail />} />
        <Route path="/providers" element={<Providers />} />
        <Route path="/onboarding" element={<Onboarding />} />

        <Route path="/mec-dashboard" element={<Overview />} />
      </Routes>
    </div>
  );
};

export default App;
