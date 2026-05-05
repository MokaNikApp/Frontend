import React from "react";
import { useNavigate } from "react-router-dom";
import { FiDownload } from "react-icons/fi";
import MokanicDashboard from "../Users-admin-components/Mokanicdashboard";

const UserDashboard = () => {
  const navigate = useNavigate();

  return (
    <div>

      <div className="flex flex-col gap-4 p-2 md:flex-row md:items-center md:justify-between">

        {/* LEFT TEXT */}
    <div>
          <p className="text-lg font-bold sm:text-xl">
            Dashboard Overview
          </p>
          <p className="mt-1 text-sm text-gray-500">
            Welcome back. Here's what's happening with MokaNik today.
          </p>
        </div>

        {/* RIGHT BUTTONS */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">

          {/* EXPORT BUTTON */}
          <button
            onClick={() => navigate("/export-report")}
            className="flex items-center justify-center gap-2 px-4 py-2 text-sm text-[#1c52af] font-semibold bg-[#D8E3F6] rounded-md transition text-[#1C52AF]"
          >
            <FiDownload className="text-lg" />
            Export Report
          </button>

          {/* BOOK SERVICE */}
          <button
            onClick={() => navigate("/")}
            className="px-4 py-2 text-sm text-white bg-[#1C52AF] rounded-md transition hover:bg-blue-800"
          >
            + Create Booking
          </button>

        </div>

      </div>
      <div className="mt-6">
      <MokanicDashboard />  
      </div>
    </div>
  );
};

export default UserDashboard;



