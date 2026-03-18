




import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HiArrowRight, HiOutlineClock, HiOutlineLocationMarker } from "react-icons/hi";

const BookingB = ({ currentStep, totalSteps }) => {
  const [experience, setExperience] = useState("");
  const [workshop, setWorkshop] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [areas, setAreas] = useState("");

  const navigate = useNavigate();
  const progressPercentage = (currentStep / totalSteps) * 100;

  const handleNext = (e) => {
    e.preventDefault();
    navigate(`/booking/${currentStep + 1}`);
  };

  const handleBack = () => {
    navigate(`/booking/${currentStep - 1}`);
  };

  return (
    <div className="max-w-xl gap-5 p-4 mx-auto space-y-6 bg-white sm:max-w-3xl sm:p-6">
      {/* Step Info */}
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-gray-700 sm:text-base">
          Step {currentStep}: Professional Details
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

      {/* Intro Text */}
      <div className="mb-4">
        <h2 className="text-base font-semibold sm:text-lg">Professional Details</h2>
        <p className="text-xs text-gray-600 sm:text-sm">
          Tell us about your expertise and service location to help us match you with the right jobs.
        </p>
      </div>

      <form onSubmit={handleNext} className="flex flex-col gap-3 sm:gap-5">
        {/* Experience */}

        <div className="">
        <div className="relative">
          <label className="block mb-1 text-xs font-semibold text-gray-700 sm:text-sm">
            Years of Experience
          </label>
          <HiOutlineClock className="absolute text-gray-400 top-9 left-3 sm:top-10" />
          <input
            type="number"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            required
            className="w-full pl-10 p-2 sm:p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1D52AF]"
            placeholder="e.g. 5"
          />
        

        {/* Workshop */}
        <input
          type="text"
          placeholder="Workshop Name (Optional)"
          value={workshop}
          onChange={(e) => setWorkshop(e.target.value)}
          className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1D52AF]"
        />

        {/* Specialization */}
        <input
          type="text"
          placeholder="Primary Specialization"
          value={specialization}
          onChange={(e) => setSpecialization(e.target.value)}
          required
          className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1D52AF]"
        />

        </div>
        </div>

        {/* Areas */}
        <div className="relative">
          <label className="block mb-1 text-xs font-semibold text-gray-700 sm:text-sm">
            Service City / Areas
          </label>
          <HiOutlineLocationMarker className="absolute text-gray-400 top-9 left-3 sm:top-10" />
          <input
            type="text"
            value={areas}
            onChange={(e) => setAreas(e.target.value)}
            required
            className="w-full pl-10 p-2 sm:p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1D52AF]"
            placeholder="Enter city name or neighborhoods"
          />
          <p className="mt-1 text-xs text-gray-500">Separate multiple areas with commas.</p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-2 mt-3 sm:flex-row sm:gap-4">
          <button
            type="button"
            onClick={handleBack}
            className="flex-1 p-3 text-white bg-gray-400 rounded-lg hover:bg-gray-500"
          >
            Back
          </button>
          <button
            type="submit"
            className="flex-1 p-3 text-white bg-[#1D52AF] rounded-lg flex items-center justify-center gap-2 hover:bg-blue-700"
          >
            Next Step <HiArrowRight />
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookingB;