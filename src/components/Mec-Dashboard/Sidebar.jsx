import { Link } from "react-router-dom";
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
  FiLogOut
} from "react-icons/fi";

export default function Sidebar({ isOpen, toggleSidebar }) {
  return (
    <>
      {/* OVERLAY */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* SIDEBAR */}
      <div
        className={`
          fixed z-50 top-0 left-0 h-full bg-white w-64 border-r p-6
          transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 lg:static
        `}
      >
        {/* LOGO */}
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-blue-700 p-2 rounded-lg">
            <FiTool className="text-white text-lg" />
          </div>

          <div>
            <h2 className="font-bold text-gray-800">MokaNik</h2>
            <p className="text-xs text-gray-400">Mechanic Portal</p>
          </div>
        </div>

        {/* MENU */}
        <div className="space-y-2 text-sm">

          <Link to="/mec-dashboard" className="flex items-center font-semibold gap-2 px-2 py-2 rounded-md text-blue-600 bg-blue-50">
            <FiGrid /> Dashboard
          </Link>

          <Link to="/mec-dashboard/job-requests" className="flex items-center font-semibold justify-between px-2 py-2 rounded-md text-gray-600 hover:bg-gray-100">
            <span className="flex items-center gap-2">
              <FiClipboard /> Job Requests
            </span>
            <span className="bg-blue-700 text-white text-xs px-2 py-0.5 rounded-full">
              3
            </span>
          </Link>

          <Link to="/mec-dashboard/active-jobs" className="flex items-center font-semibold gap-2 px-2 py-2 rounded-md text-gray-600 hover:bg-gray-100">
            <FiTool /> Active Jobs
          </Link>

          <Link to="/mec-dashboard/completed-jobs" className="flex items-center font-semibold gap-2 px-2 py-2 rounded-md text-gray-600 hover:bg-gray-100">
            <FiCheckCircle /> Completed Jobs
          </Link>

          <Link to="/mec-dashboard/earnings" className="flex items-center font-semibold gap-2 px-2 py-2 rounded-md text-gray-600 hover:bg-gray-100">
            <FiDollarSign /> Earnings
          </Link>

          <Link to="/mec-dashboard/schedule" className="flex items-center font-semibold gap-2 px-2 py-2 rounded-md text-gray-600 hover:bg-gray-100">
            <FiCalendar /> Schedule
          </Link>

          <Link to="/mec-dashboard/messages" className="flex items-center font-semibold gap-2 px-2 py-2 rounded-md text-gray-600 hover:bg-gray-100">
            <FiMessageSquare /> Messages
          </Link>

          <p className="text-xs text-gray-400 font-bold mt-6 px-2">ACCOUNT</p>

          <Link to="/mec-dashboard/profile" className="flex items-center font-semibold gap-2 px-2 py-2 rounded-md text-gray-600 hover:bg-gray-100">
            <FiUser /> Profile
          </Link>

          <Link to="/mec-dashboard/settings" className="flex items-center font-semibold gap-2 px-2 py-2 rounded-md text-gray-600 hover:bg-gray-100">
            <FiSettings /> Settings
          </Link>

          <Link to="/logout" className="flex items-center font-semibold gap-2 px-2 py-2 rounded-md text-red-500 hover:bg-red-50">
            <FiLogOut /> Logout
          </Link>

        </div>
      </div>
    </>
  );
}