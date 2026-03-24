import React from "react";
import { Routes, Route } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import VerifyPage from "./pages/VerifyPage";
import SignupPage from "./components/Signup";
import BookingPageA from "./pages/BookingPageA";
import DashboardPage from './pages/dashboard-pages/DashboardPage'


const App = () => {
  return (
    <div className="bg-gray-100 ">
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/verify" element={<VerifyPage />} />
        <Route path="/booking/:step" element={<BookingPageA />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        
      </Routes>
    </div>
  );
};

export default App;