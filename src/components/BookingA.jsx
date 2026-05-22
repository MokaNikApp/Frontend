import React, { useState, useEffect } from "react";
import {
  HiArrowRight,
  HiShieldCheck,
} from "react-icons/hi";

import {
  useParams,
  useNavigate,
} from "react-router-dom";

import {
  ToastContainer,
  toast,
} from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import BookingB from "./BookingB";
import BookingC from "./BookingC";
import BookingD from "./BookingD";
import BookingE from "./BookingE";

import api from "../api/axios";

const BookingA = () => {
  // ROUTER
  const { step } = useParams();
  const navigate = useNavigate();

  // CURRENT STEP
  const currentStep = parseInt(step) || 1;

  // TOTAL STEPS
  const totalSteps = 5;

  // PROGRESS %
  const progressPercentage =
    (currentStep / totalSteps) * 100;

  // FORM STATES
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  // PAGE LOADING
  const [loading, setLoading] =
    useState(false);

  // BUTTON LOADING
  const [buttonLoading, setButtonLoading] =
    useState(false);

  // =========================================
  // FETCH PROFILE
  // =========================================
  useEffect(() => {
    // ONLY FETCH ON STEP 1
    if (currentStep !== 1) return;

    const fetchProfile = async () => {
      try {
        setLoading(true);

        console.log("Fetching profile...");

        const response = await api.get(
          "/auth/profile"
        );

        console.log(
          "PROFILE RESPONSE:",
          response.data
        );

        const data = response.data;

        setFullName(
          `${data.firstName || ""} ${
            data.lastName || ""
          }`
        );

        setEmail(data.email || "");

        setPhoneNumber(
          data.phoneNumber || ""
        );

        toast.success(
          "Profile details fetched successfully"
        );
      } catch (error) {
        console.log(
          "PROFILE ERROR:",
          error.response?.data
        );

        console.error(
          "Failed to fetch profile:",
          error
        );

        toast.error(
          error.response?.data?.message ||
            "Failed to fetch profile"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [currentStep]);

  // =========================================
  // INVALID STEP REDIRECT
  // =========================================
  useEffect(() => {
    if (
      currentStep < 1 ||
      currentStep > totalSteps
    ) {
      navigate("/booking/1");
    }
  }, [currentStep, navigate]);

  // =========================================
  // NEXT STEP
  // =========================================
  const handleNext = async (e) => {
    e.preventDefault();

    // PASSWORD CHECK
    if (
      currentStep === 1 &&
      password !== confirmPassword
    ) {
      toast.error(
        "Passwords do not match"
      );

      return;
    }

    try {
      setButtonLoading(true);

      // SMALL DELAY
      await new Promise((resolve) =>
        setTimeout(resolve, 1000)
      );

      const nextStep = currentStep + 1;

      if (nextStep <= totalSteps) {
        toast.success(
          "Moving to next step"
        );

        navigate(
          `/booking/${nextStep}`
        );
      } else {
        toast.success(
          "All steps completed 🎉"
        );
      }
    } catch (error) {
      console.error(error);

      toast.error(
        "Something went wrong"
      );
    } finally {
      setButtonLoading(false);
    }
  };

  // =========================================
  // BACK STEP
  // =========================================
  const handleBack = () => {
    const prevStep = currentStep - 1;

    if (prevStep >= 1) {
      navigate(
        `/booking/${prevStep}`
      );
    }
  };

  // =========================================
  // LOADING SCREEN
  // =========================================
  if (
    loading &&
    currentStep === 1
  ) {
    return (
      <div className="flex items-center justify-center h-screen text-lg font-semibold">
        Loading profile...
      </div>
    );
  }

  return (
    <>
      {/* ========================================= */}
      {/* STEP 1 */}
      {/* ========================================= */}

      {currentStep === 1 && (
        <div className="max-w-xl p-4 mx-auto space-y-6 bg-white sm:max-w-3xl sm:p-6">
          {/* STEP INFO */}
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-gray-700 sm:text-base">
              Step {currentStep}: Personal
              Information
            </p>

            <p className="text-sm text-gray-500 sm:text-base">
              {currentStep}/
              {totalSteps}
            </p>
          </div>

          {/* PROGRESS BAR */}
          <div className="w-full h-2 bg-gray-200 rounded-full">
            <div
              className="bg-[#1D52AF] h-2 rounded-full transition-all duration-300"
              style={{
                width: `${progressPercentage}%`,
              }}
            />
          </div>

          <p className="text-xs text-gray-500 sm:text-sm">
            Onboarding Progress
          </p>

          {/* FORM CARD */}
          <div className="p-4 border-2 border-gray-200 rounded-lg shadow-sm sm:p-6">
            <h1 className="mb-1 text-base font-semibold sm:text-lg">
              Personal Information
            </h1>

            <p className="mb-3 text-xs text-gray-600 sm:text-sm">
              Let's start with your
              basic details.
            </p>

            <form
              onSubmit={handleNext}
              className="flex flex-col gap-3 sm:gap-5"
            >
              {/* FULL NAME */}
              <div>
                <label className="block mb-1 text-xs font-semibold text-gray-700 sm:text-sm">
                  Full Name
                </label>

                <input
                  type="text"
                  placeholder="Enter your full name"
                  value={fullName}
                  onChange={(e) =>
                    setFullName(
                      e.target.value
                    )
                  }
                  className="w-full p-2 border border-gray-300 rounded-lg sm:p-3 focus:outline-none focus:ring-2 focus:ring-[#1D52AF]"
                  required
                />
              </div>

              {/* EMAIL */}
              <div>
                <label className="block mb-1 text-xs font-semibold text-gray-700 sm:text-sm">
                  Email
                </label>

                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) =>
                    setEmail(
                      e.target.value
                    )
                  }
                  className="w-full p-2 border border-gray-300 rounded-lg sm:p-3 focus:outline-none focus:ring-2 focus:ring-[#1D52AF]"
                  required
                />
              </div>

              {/* PHONE */}
              <div>
                <label className="block mb-1 text-xs font-semibold text-gray-700 sm:text-sm">
                  Phone Number
                </label>

                <input
                  type="tel"
                  placeholder="Enter your phone number"
                  value={phoneNumber}
                  onChange={(e) =>
                    setPhoneNumber(
                      e.target.value
                    )
                  }
                  className="w-full p-2 border border-gray-300 rounded-lg sm:p-3 focus:outline-none focus:ring-2 focus:ring-[#1D52AF]"
                  required
                />
              </div>

              {/* PASSWORDS */}
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) =>
                    setPassword(
                      e.target.value
                    )
                  }
                  className="p-2 border border-gray-300 rounded-lg sm:p-3"
                  required
                />

                <input
                  type="password"
                  placeholder="Confirm Password"
                  value={
                    confirmPassword
                  }
                  onChange={(e) =>
                    setConfirmPassword(
                      e.target.value
                    )
                  }
                  className="p-2 border border-gray-300 rounded-lg sm:p-3"
                  required
                />
              </div>

              {/* BUTTON */}
              <button
                type="submit"
                disabled={
                  buttonLoading
                }
                className="w-full mt-2 flex items-center justify-center gap-2 p-3 text-white bg-[#1D52AF] rounded-lg hover:bg-blue-700 transition disabled:opacity-70"
              >
                {buttonLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>

                    Loading...
                  </>
                ) : (
                  <>
                    Next Step

                    <HiArrowRight />
                  </>
                )}
              </button>
            </form>

            {/* SECURITY INFO */}
            <div className="flex items-start gap-2 p-3 mt-4 bg-gray-100 rounded-lg">
              <HiShieldCheck className="text-xl text-green-500" />

              <p className="text-xs sm:text-sm">
                Your information is
                securely encrypted. We
                use this data to verify
                your identity and ensure
                a safe platform for both
                mechanics and customers.
              </p>
            </div>
          </div>

          {/* LOGIN */}
          <p className="text-sm text-center text-gray-600">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-[#1D52AF] font-medium"
            >
              Log in here
            </a>
          </p>
        </div>
      )}

      {/* ========================================= */}
      {/* STEP 2 */}
      {/* ========================================= */}

      {currentStep === 2 && (
        <BookingB
          currentStep={currentStep}
          totalSteps={totalSteps}
          handleNext={handleNext}
          handleBack={handleBack}
        />
      )}

      {/* ========================================= */}
      {/* STEP 3 */}
      {/* ========================================= */}

      {currentStep === 3 && (
        <BookingC
          currentStep={currentStep}
          totalSteps={totalSteps}
          handleNext={handleNext}
          handleBack={handleBack}
        />
      )}

      {/* ========================================= */}
      {/* STEP 4 */}
      {/* ========================================= */}

      {currentStep === 4 && (
        <BookingD
          currentStep={currentStep}
          totalSteps={totalSteps}
          handleNext={handleNext}
          handleBack={handleBack}
        />
      )}

      {/* ========================================= */}
      {/* STEP 5 */}
      {/* ========================================= */}

      {currentStep === 5 && (
        <BookingE
          currentStep={currentStep}
          totalSteps={totalSteps}
          handleBack={handleBack}
        />
      )}

      {/* TOAST */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
      />
    </>
  );
};

export default BookingA;








