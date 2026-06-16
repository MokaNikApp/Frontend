import { Link, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import {
  FiGrid,
  FiClipboard,
  FiTool,
  FiCheckCircle,
  FiDollarSign,
  FiCalendar,
  FiMessageSquare,
  FiUser,
  FiSettings,
  FiLogOut,
} from "react-icons/fi";

export default function Sidebar({ isOpen, toggleSidebar, isOnline, setIsOnline }) {
  const location = useLocation();

  // ---------------------------------------------------------------------------
  // SYNC WITH TANSTACK QUERY CACHE (Matches JobRequests.jsx)
  // ---------------------------------------------------------------------------
  const { data: incomingData } = useQuery({
    queryKey: ["jobsAvailable"],
    queryFn: async () => {
      const res = await axios.get("/jobs/provider/available");
      return res.data;
    },
    // Optional: Auto-poll the server every 15 seconds to look for new incoming customer requests
    refetchInterval: 15000, 
  });

  // Handle both flat array payloads and paginated envelope structures safely
  const incomingJobsCount = Array.isArray(incomingData)
    ? incomingData.length
    : Array.isArray(incomingData?.data)
      ? incomingData.data.length
      : 0;

  const linkClass = (path) =>
    `flex items-center font-semibold gap-2 px-2 py-2 rounded-md transition-colors ${
      location.pathname === path
        ? "text-blue-600 bg-blue-50"
        : "text-gray-600 hover:bg-gray-100"
    }`;

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      <div
        className={`
          fixed z-50 top-0 left-0 bg-white w-64 border-r border-gray-200 flex flex-col
          transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 lg:static lg:shrink-0
        `}
        style={{ height: "100vh", overflowY: "auto" }}
      >

        {/* LOGO */}
        <div className="flex items-center gap-3 px-6 pt-6 pb-4">
          <div className="bg-blue-700 p-2 rounded-lg">
            <FiTool className="text-white text-lg" />
          </div>
          <div>
            <h2 className="font-bold text-gray-800">MokaNik</h2>
            <p className="text-xs text-gray-400">Mechanic Portal</p>
          </div>
        </div>

        {/* NAV LINKS */}
        <div className="px-6 py-2">
          <div className="space-y-1 text-sm">

            <Link to="/mec-dashboard" className={linkClass("/mec-dashboard")}>
              <FiGrid /> Dashboard
            </Link>

            <Link
              to="/mec-dashboard/job-requests"
              className={`flex items-center font-semibold justify-between px-2 py-2 rounded-md transition-colors ${
                location.pathname === "/mec-dashboard/job-requests"
                  ? "text-blue-600 bg-blue-50"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <span className="flex items-center gap-2">
                <FiClipboard /> Job Requests
              </span>
              {/* DYNAMIC REAL-TIME BADGE COUNTER */}
              {incomingJobsCount > 0 && (
                <span className="bg-blue-700 text-white text-xs px-2 py-0.5 rounded-full font-bold animate-pulse">
                  {incomingJobsCount}
                </span>
              )}
            </Link>

            <Link to="/mec-dashboard/active-jobs" className={linkClass("/mec-dashboard/active-jobs")}>
              <FiTool /> Active Jobs
            </Link>

            <Link to="/mec-dashboard/completed-jobs" className={linkClass("/mec-dashboard/completed-jobs")}>
              <FiCheckCircle /> Completed Jobs
            </Link>

            <Link to="/mec-dashboard/earnings" className={linkClass("/mec-dashboard/earnings")}>
              <FiDollarSign /> Earnings
            </Link>

            <Link to="/mec-dashboard/schedule" className={linkClass("/mec-dashboard/schedule")}>
              <FiCalendar /> Schedule
            </Link>

            <Link to="/mec-dashboard/messages" className={linkClass("/mec-dashboard/messages")}>
              <FiMessageSquare /> Messages
            </Link>

            <p className="text-xs text-gray-400 font-bold mt-6 px-2">ACCOUNT</p>

            <Link to="/mec-dashboard/profile" className={linkClass("/mec-dashboard/profile")}>
              <FiUser /> Profile
            </Link>

            <Link to="/mec-dashboard/settings" className={linkClass("/mec-dashboard/settings")}>
              <FiSettings /> Settings
            </Link>

            <Link to="/login" className="flex items-center font-semibold gap-2 px-2 py-2 rounded-md text-red-500 hover:bg-red-50">
              <FiLogOut /> Logout
            </Link>

          </div>
        </div>

        {/* STATUS BLOCK */}
        <div className="px-6 py-4 mt-2">
          <div className="bg-blue-700 rounded-xl p-4 flex flex-col gap-3">
            <div>
              <p className="text-white text-xs font-semibold uppercase tracking-wide opacity-70">
                Status
              </p>
              <p className="text-white font-bold text-sm mt-0.5">
                {isOnline ? "You are Online" : "You are Offline"}
              </p>
            </div>
            <button
              onClick={() => setIsOnline(!isOnline)}
              className={`w-full py-2 rounded-lg text-sm font-semibold transition-colors ${
                isOnline
                  ? "bg-white text-blue-700 hover:bg-blue-50"
                  : "bg-green-500 text-white hover:bg-green-600"
              }`}
            >
              {isOnline ? "Go Offline" : "Go Online"}
            </button>
          </div>
        </div>

      </div>
    </>
  );
}