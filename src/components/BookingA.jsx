


import React, { useState, useEffect } from "react";
import { HiArrowRight, HiShieldCheck } from "react-icons/hi";
import { useParams, useNavigate } from "react-router-dom";
import BookingB from "./BookingB";

const BookingA = () => {
  // ROUTER
  const { step } = useParams();
  const navigate = useNavigate();

  const currentStep = parseInt(step) || 1;
  const totalSteps = 5;
  const progressPercentage = (currentStep / totalSteps) * 100;

  // FORM STATES
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Redirect if invalid step
  useEffect(() => {
    if (currentStep < 1 || currentStep > totalSteps) {
      navigate("/booking/1");
    }
  }, [currentStep, navigate]);

  const handleNext = (e) => {
    e.preventDefault();
    if (currentStep === 1 && password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    const nextStep = currentStep + 1;
    if (nextStep <= totalSteps) {
      navigate(`/booking/${nextStep}`);
    } else {
      alert("All steps completed 🎉");
    }
  };

  const handleBack = () => {
    const prevStep = currentStep - 1;
    if (prevStep >= 1) {
      navigate(`/booking/${prevStep}`);
    }
  };

  return (
    <>
      {currentStep === 1 && (
        <div className="max-w-xl p-4 mx-auto space-y-6 bg-white sm:max-w-3xl sm:p-6">
          {/* Step Info */}
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-gray-700 sm:text-base">
              Step {currentStep}: Personal Information
            </p>
            <p className="text-sm text-gray-500 sm:text-base">
              {currentStep}/{totalSteps}
            </p>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-2 bg-gray-200 rounded-full">
            <div
              className="bg-[#1D52AF] h-2 rounded-full"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <p className="text-xs text-gray-500 sm:text-sm">Onboarding Progress</p>

          {/* Form Card */}
          <div className="p-4 border-2 border-gray-200 rounded-lg shadow-sm sm:p-6">
            <h1 className="mb-1 text-base font-semibold sm:text-lg">
              Personal Information
            </h1>
            <p className="mb-3 text-xs text-gray-600 sm:text-sm">
              Let's start with your basic details.
            </p>

            <form onSubmit={handleNext} className="flex flex-col gap-3 sm:gap-5">
              {/* Full Name */}
              <div>
                <label className="block mb-1 text-xs font-semibold text-gray-700 sm:text-sm">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1D52AF]"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label className="block mb-1 text-xs font-semibold text-gray-700 sm:text-sm">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1D52AF]"
                  required
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block mb-1 text-xs font-semibold text-gray-700 sm:text-sm">
                  Phone Number
                </label>
                <input
                  type="tel"
                  placeholder="Enter your phone number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1D52AF]"
                  required
                />
              </div>

              {/* Passwords */}
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="p-2 border border-gray-300 rounded-lg sm:p-3"
                  required
                />

                <input
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="p-2 border border-gray-300 rounded-lg sm:p-3"
                  required
                />
              </div>

              {/* Button */}
              <button
                type="submit"
                className="w-full mt-2 flex items-center justify-center gap-2 p-3 text-white bg-[#1D52AF] rounded-lg hover:bg-blue-700"
              >
                Next Step <HiArrowRight />
              </button>
            </form>

            {/* Security Info */}
            <div className="flex items-start gap-2 p-3 mt-4 bg-gray-100 rounded-lg">
              <HiShieldCheck className="text-xl text-green-500" />
              <p className="text-xs sm:text-sm">
                Your information is securely encrypted.
              </p>
            </div>
          </div>

          {/* Back button for steps > 1 */}
          {currentStep > 1 && (
            <button
              onClick={handleBack}
              className="p-3 mt-4 text-white bg-gray-400 rounded-lg"
            >
              Back
            </button>
          )}

          {/* Login */}
          <p className="text-sm text-center text-gray-600">
            Already have an account?{" "}
            <a href="/login" className="text-[#1D52AF] font-medium">
              Log in here
            </a>
          </p>
        </div>
      )}

      {/* Next steps */}
      {currentStep === 2 && <BookingB currentStep={currentStep} totalSteps={totalSteps} />}
    </>
  );
};

export default BookingA;