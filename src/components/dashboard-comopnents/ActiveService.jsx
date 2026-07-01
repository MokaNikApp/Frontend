


import React from "react";
import { useNavigate } from "react-router-dom";
import { HiArrowRight, HiCalendar } from "react-icons/hi";
import Background from '../../assets/images/Background.png';

const ActiveService = ({ activeServices = [], upcomingServices = [] }) => {
  const navigate = useNavigate();

  const active = activeServices[0] || null;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">

      {/* ── Active Service Status Card ── */}
      <div className="lg:col-span-2 p-4 sm:p-6 bg-white shadow-md rounded-xl space-y-5">

        {/* Header — always shown */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
          <p className="font-semibold text-gray-700 text-sm sm:text-base">
            Active Service Status
          </p>
          <p className={`px-3 py-1 text-xs sm:text-sm rounded-full w-fit ${
            active
              ? "text-[#1C52AF] bg-[#E2E8F0]"
              : "text-gray-400 bg-gray-100"
          }`}>
            {active ? (active.status || "In Progress") : "No Active Service"}
          </p>
        </div>

        {active ? (
          <>
            {/* Vehicle Info */}
            <div className="flex flex-col sm:flex-row gap-4">
              <img
                src={active.vehicleImage || Background}
                alt="Car"
                className="w-full sm:w-28 h-40 sm:h-28 object-cover rounded-lg"
              />
              <div>
                <p className="font-medium text-base sm:text-lg leading-tight">
                  {active.vehicleName || "Vehicle"}
                </p>
                <p className="text-gray-500 text-sm">
                  {active.serviceType || "Service"}
                </p>
              </div>
            </div>
            {active.estimatedCompletion && (
              <p className="text-gray-500 text-xs sm:text-sm">
                Estimated completion: {active.estimatedCompletion}
              </p>
            )}

            <button
              onClick={() => navigate("/my-service")}
              className="group w-full bg-[#1C52AF] text-white py-3 rounded-xl
                flex items-center justify-center gap-2 text-sm sm:text-base font-medium
                shadow-sm hover:shadow-md hover:bg-[#163f8a] active:scale-[0.98] transition-all duration-300"
            >
              View Service Status
              <HiArrowRight
                className="transition-transform duration-300 group-hover:translate-x-1"
                size={18}
              />
            </button>
          </>
        ) : (
          /* Empty state body */
          <div className="flex flex-col items-center justify-center text-center py-10 space-y-4">
            <div className="p-4 bg-blue-50 rounded-full">
              <HiCalendar className="text-[#1C52AF] text-3xl" />
            </div>
            <div>
              <p className="font-medium text-gray-600">No service currently in progress</p>
              <p className="text-gray-400 text-sm mt-1">
                Book a service and it will appear here once it's underway.
              </p>
            </div>
            
          </div>
        )}
      </div>

      {/* ── Upcoming Section ── */}
      <div className="p-4 sm:p-6 bg-white shadow-md rounded-xl space-y-4">

        <div className="flex justify-between items-center">
          <p className="font-semibold text-gray-700 text-sm sm:text-base">Upcoming</p>
          {upcomingServices.length > 0 && (
            <p
              onClick={() => navigate("/my-service")}
              className="text-blue-600 text-sm cursor-pointer hover:underline"
            >
              View All
            </p>
          )}
        </div>

        {upcomingServices.length > 0 ? (
          upcomingServices.slice(0, 2).map((item, index) => (
            <div key={item.id || index} className="flex items-center gap-3 sm:gap-4 p-3 bg-gray-50 rounded-lg">
              <div className="flex flex-col items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 text-blue-600 rounded-lg">
                <p className="text-xs sm:text-sm font-bold">{item.day}</p>
                <p className="text-[10px] sm:text-xs">{item.month}</p>
              </div>
              <div className="flex-1">
                <p className="font-medium text-sm sm:text-base">{item.serviceType}</p>
                <p className="text-gray-500 text-xs sm:text-sm">
                  {item.vehicleName} • {item.time}
                </p>
              </div>
              <p className="bg-gray-200 text-gray-700 px-2 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs cursor-pointer hover:bg-gray-300 whitespace-nowrap">
                {item.action || "Details"}
              </p>
            </div>
          ))
        ) : (
          /* Empty upcoming state */
          <div className="flex flex-col items-center justify-center text-center py-8 space-y-3">
            <div className="p-3 bg-gray-50 rounded-full">
              <HiCalendar className="text-gray-300 text-3xl" />
            </div>
            <div>
              <p className="text-gray-500 text-sm font-medium">No upcoming appointments</p>
              <p className="text-gray-400 text-xs mt-1">
                Your scheduled services will show up here.
              </p>
            </div>
            <p
              onClick={() => navigate("/book-service")}
              className="text-[#1C52AF] text-xs cursor-pointer hover:underline font-medium"
            >
              Schedule one now →
            </p>
          </div>
        )}
      </div>

    </div>
  );
};

export default ActiveService;