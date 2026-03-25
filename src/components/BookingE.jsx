import React from "react";
import { useNavigate } from "react-router-dom";
import { HiCheckCircle } from "react-icons/hi";
import illustration from "../assets/images/illustration.png";

const BookingE = ({ currentStep = 5, totalSteps = 5 }) => {
  const navigate = useNavigate();
  const progressPercentage = (currentStep / totalSteps) * 100;

  return (
    <div className=" flex items-center justify-center p-4 bg-gray-50">
      {/* Main Container */}
      <div className="w-full max-w-2xl space-y-6">
        
        {/* Illustration */}
        <div className="flex items-center justify-center bg-white rounded-xl p-6 border border-gray-200">
          <img
            src={illustration}
            alt="Illustration"
            className="w-full max-h-[300px] object-contain"
          />
        </div>

        {/* Application Status Card */}
        <div className="flex flex-col justify-between border border-[#1D52AF] rounded-xl p-6 bg-white">
          
          {/* Top Section */}
          <div className="space-y-6">
            {/* Step Info */}
            <div className="flex items-center gap-4 text-[#1D52AF]">
              <HiCheckCircle className="text-green-500 text-2xl" />
              <div>
                <p className="font-semibold">
                  Step {currentStep}: Application Submitted!
                </p>
                <p className="text-gray-500 text-sm">
                  {currentStep} / {totalSteps}
                </p>
              </div>
            </div>

            {/* Verification Status */}
            <div className="space-y-3">
              <div className="flex justify-between text-[#1D52AF] font-semibold">
                <p>Verification Status</p>
                <p className="font-medium">Pending</p>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden">
                <div
                  className="h-3 transition-all duration-500"
                  style={{
                    width: `${progressPercentage}%`,
                    backgroundColor: "#1D52AF",
                  }}
                ></div>
              </div>

              <div className="flex justify-between text-xs text-gray-500">
                <p>Pending Admin Approval</p>
                <p>Reviewing</p>
              </div>
            </div>
            <div className="text-gray-600 text-xs sm:text-sm md:text-base leading-relaxed">
              <p>
                We're currently reviewing your application and credentials. This
                process typically takes 24–48 hours. You'll be notified via
                email once your account is fully approved.
              </p>
            </div>
          </div>

          {/* Bottom Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <button
              onClick={() => navigate("/portal")}
              className="flex-1 bg-[#1D52AF] text-white py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Go to Portal
            </button>
            <button
              onClick={() => navigate("/dashboard")}
              className="flex-1 border border-[#1D52AF] text-[#1D52AF] py-3 rounded-lg hover:bg-blue-50 transition"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingE;