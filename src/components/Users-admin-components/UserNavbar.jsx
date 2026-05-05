





import React, { useState, useRef, useEffect } from "react";
import { FiBell, FiSearch, FiHelpCircle } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const Navbar = ({ toggleSidebar }) => {
  const navigate = useNavigate();

  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const notificationRef = useRef();

  const notifications = [
    {
      id: 1,
      title: "Service Completed",
      message: "Toyota Corolla is ready for pickup",
      time: "2m ago",
    },
    {
      id: 2,
      title: "New Booking",
      message: "You have a new service request",
      time: "10m ago",
    },
    {
      id: 3,
      title: "Payment Received",
      message: "₦45,000 payment confirmed",
      time: "1h ago",
    },
  ];

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(e.target)
      ) {
        setShowNotifications(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="flex items-center justify-between h-16 px-4 bg-white border-b border-gray-200 shadow-sm">

      {/* LEFT */}
      <div className="flex items-center flex-1 min-w-0 gap-3">

        <button className="text-xl lg:hidden" onClick={toggleSidebar}>
          ☰
        </button>

        {/* SEARCH */}
        <div className="relative flex-1 w-full max-w-md">
          <input
            type="text"
            placeholder="Search services, vehicles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full py-2 pl-9 pr-3 text-sm bg-[#EFF4FF] border border-[#EFF4FF] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          <FiSearch className="absolute text-gray-500 -translate-y-1/2 left-3 top-1/2" />
        </div>

      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-4 ml-4">

        {/* 🔔 NOTIFICATIONS */}
        <div className="relative" ref={notificationRef}>
          <button
            className="relative p-2 transition rounded-lg hover:bg-gray-100"
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <FiBell className="w-5 h-5 text-gray-700" />
            <span className="absolute w-2 h-2 bg-red-500 rounded-full top-1 right-1"></span>
          </button>

          {showNotifications && (
            <div className="absolute right-0 z-50 mt-3 overflow-hidden bg-white border border-gray-100 shadow-lg w-80 rounded-xl">

              <div className="flex items-center justify-between px-4 py-3 border-b">
                <p className="text-sm font-semibold text-gray-800">
                  Notifications
                </p>
                <button
                  onClick={() => navigate("/notification")}
                  className="text-xs text-[#1D4ED8] hover:underline"
                >
                  View all
                </button>
              </div>

              <div className="overflow-y-auto max-h-72">
                {notifications.map((item) => (
                  <div
                    key={item.id}
                    className="px-4 py-3 transition border-b cursor-pointer hover:bg-gray-50"
                  >
                    <p className="text-sm font-medium text-gray-800">
                      {item.title}
                    </p>
                    <p className="text-xs text-gray-500">
                      {item.message}
                    </p>
                    <span className="text-[10px] text-gray-400">
                      {item.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ❓ SUPPORT */}
        <div
          onClick={() => navigate("/support")}
          className="flex items-center gap-2 px-3 py-2 cursor-pointer"
        >
          <div className="flex items-center justify-center w-8 h-8 bg-[#64748B] rounded-full">
            <FiHelpCircle className="text-white" />
          </div>

          <span className="text-sm font-medium text-[#1D4ED8]">
            Support
          </span>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;