import React from 'react';
import { HiCheckCircle } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';

const Verified = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center sm:py-20 min-h-screen sm:min-h-0 bg-gray-50 px-4 sm:px-6 lg:px-8 space-y-6 text-center">
      
      {/* Verified Icon */}
      <div className="bg-[#EFF4FF] rounded-full p-4 sm:p-6 md:p-8 flex items-center justify-center">
        <HiCheckCircle className="text-[#1C52AF] text-6xl sm:text-8xl md:text-9xl" />
      </div>

      {/* Text */}
      <div className="space-y-2 max-w-md">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800">You are all set</h1>
        <p className="text-sm sm:text-base md:text-lg text-gray-600">
          Welcome to MokaNik! You're ready to book your first car service
          and experience the precision of digital concierge maintenance.
        </p>
        <button
          onClick={() => navigate('/dashboard')} // Only navigates on click
          className="mt-2 px-4 sm:px-6 py-2 sm:py-3 bg-[#1C52AF] text-white rounded-lg hover:bg-[#15418A] transition text-sm sm:text-base"
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
};

export default Verified;



