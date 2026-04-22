





import React from "react";
import Background from '../../assets/images/Background.png';
import { useNavigate } from "react-router-dom";

import { 
  HiCheckCircle, 
  HiCash, 
  HiCalendar, 
  HiLocationMarker,
  HiArrowRight   // ✅ FIX added
} from "react-icons/hi";

const ActiveService = () => {

  const navigate = useNavigate(); // ✅ FIX moved inside component

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">

      {/* Active Service Status Card */}
      <div className="lg:col-span-2 p-4 sm:p-6 bg-white shadow-md rounded-xl space-y-5">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
          <p className="font-semibold text-gray-700 text-sm sm:text-base">
            Active Service Status
          </p>
          <p className="text-[#1C52AF] bg-[#E2E8F0] px-3 py-1 text-xs sm:text-sm rounded-full w-fit">
            In Progress
          </p>
        </div>

        {/* Vehicle Info */}
        <div className="flex flex-col sm:flex-row gap-4">
          <img 
            src={Background} 
            alt="Car" 
            className="w-full sm:w-28 h-40 sm:h-28 object-cover rounded-lg"
          />
          <div>
            <p className="font-medium text-base sm:text-lg leading-tight">
              Toyota Camry 2022 - V6 Engine
            </p>
            <p className="text-gray-500 text-sm">
              Full Diagnostic & Engine Tune-up
            </p>
          </div>
        </div>

        {/* Progress */}
        <div>
          <div className="flex justify-between mb-1 text-sm">
            <p className="text-gray-600">Progress</p>
            <p className="text-gray-600 font-medium">65%</p>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 sm:h-4">
            <div
              className="bg-[#1C52AF] h-3 sm:h-4 rounded-full transition-all duration-500"
              style={{ width: '65%' }}
            ></div>
          </div>
        </div>

        {/* Estimated completion */}
        <p className="text-gray-500 text-xs sm:text-sm">
          Estimated completion: 2:00 PM
        </p>

        {/* ✅ BUTTON NOW WORKS */}
        <button
          onClick={() => navigate("/my-service")} // 👈 make sure route matches
          className="group w-full bg-[#1C52AF] text-white py-3 rounded-xl
          flex items-center justify-center gap-2
          text-sm sm:text-base font-medium
          shadow-sm hover:shadow-md
          hover:bg-[#163f8a]
          active:scale-[0.98]
          transition-all duration-300"
        >
          View Service Status
          <HiArrowRight
            className="transition-transform duration-300 group-hover:translate-x-1"
            size={18}
          />
        </button>

      </div>

      {/* Upcoming Section */}
      <div className="p-4 sm:p-6 bg-white shadow-md rounded-xl space-y-4 h-auto">

        <div className="flex justify-between items-center">
          <p className="font-semibold text-gray-700 text-sm sm:text-base">
            Upcoming
          </p>
          <p 
            onClick={() => navigate("/my-service")} // 🔥 optional: make this clickable too
            className="text-blue-600 text-sm cursor-pointer hover:underline"
          >
            View All
          </p>
        </div>

        {[1, 2].map((item, index) => (
          <div key={index} className="flex items-center gap-3 sm:gap-4 p-3 bg-gray-50 rounded-lg">
            
            <div className="flex flex-col items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 text-blue-600 rounded-lg">
              <p className="text-xs sm:text-sm font-bold">
                {index === 0 ? "24" : "28"}
              </p>
              <p className="text-[10px] sm:text-xs">Nov</p>
            </div>

            <div className="flex-1">
              <p className="font-medium text-sm sm:text-base">
                {index === 0 ? "Oil Change" : "Tire Rotation"}
              </p>
              <p className="text-gray-500 text-xs sm:text-sm">
                {index === 0 
                  ? "Honda Civic • 09:00 AM" 
                  : "Toyota Camry • 02:30 PM"}
              </p>
            </div>

            <p className="bg-gray-200 text-gray-700 px-2 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs cursor-pointer hover:bg-gray-300 whitespace-nowrap">
              {index === 0 ? "Reschedule" : "Details"}
            </p>
          </div>
        ))}

      </div>  
    </div>
  );
};

export default ActiveService;