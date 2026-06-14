




import React, { useState, useRef, useEffect } from "react";
import {
  FiBell,
  FiSearch,
  FiCheckCircle,
  FiCalendar,
  FiCreditCard,
  FiUser,
  FiLogOut,
  FiChevronDown,
  FiX,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";

// ─── NOTIFICATION TYPE CONFIG ─────────────────────────────────────────────────
const notificationConfig = {
  "Service Completed": { icon: FiCheckCircle, color: "text-emerald-500", bg: "bg-emerald-50" },
  "New Booking": { icon: FiCalendar, color: "text-blue-500", bg: "bg-blue-50" },
  "Payment Received": { icon: FiCreditCard, color: "text-amber-500", bg: "bg-amber-50" },
};

const Navbar = ({ toggleSidebar }) => {
  const navigate = useNavigate();

  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [profile, setProfile] = useState(null);

  const notificationRef = useRef();
  const profileRef = useRef();

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

  // Fetch profile on mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await api.get("/auth/profile");
        setProfile(data);
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      }
    };

    fetchProfile();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const getInitials = (firstName, lastName) => {
    const f = firstName?.[0] ?? "";
    const l = lastName?.[0] ?? "";
    return (f + l).toUpperCase() || "U";
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(e.target)
      ) {
        setShowNotifications(false);
      }

      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="flex items-center justify-between h-16 px-4 bg-white border-b border-gray-200/80 shadow-sm dark:bg-gray-900 dark:border-gray-800">
      {/* LEFT */}
      <div className="flex items-center flex-1 min-w-0 gap-3">
        <button
          className="flex items-center justify-center w-9 h-9 -ml-1 text-xl transition rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 lg:hidden"
          onClick={toggleSidebar}
        >
          ☰
        </button>

        {/* SEARCH */}
        <div className="relative flex-1 w-full max-w-md group">
          <FiSearch className="absolute text-gray-400 transition -translate-y-1/2 left-3 top-1/2 group-focus-within:text-[#1C52AF]" />
          <input
            type="text"
            placeholder="Search services, vehicles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-9 py-2 pl-9 pr-3 text-sm transition-all border rounded-lg 
              bg-gray-50/80 border-transparent text-gray-900 placeholder:text-gray-400
              focus:bg-white focus:border-[#1C52AF]/30 focus:ring-2 focus:ring-[#1C52AF]/10
              dark:bg-gray-800/50 dark:border-transparent dark:text-gray-100 dark:placeholder:text-gray-500
              dark:focus:bg-gray-900 dark:focus:border-[#1C52AF]/40 dark:focus:ring-[#1C52AF]/20"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute -translate-y-1/2 right-2 top-1/2 p-0.5 text-gray-400 hover:text-gray-600 rounded"
            >
              <FiX className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-1 ml-4 sm:gap-2">
        {/* NOTIFICATIONS */}
        <div className="relative" ref={notificationRef}>
          <button
            className="relative flex items-center justify-center w-9 h-9 transition rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <FiBell className="w-[18px] h-[18px] text-gray-600 dark:text-gray-300" />
            <span className="absolute w-2 h-2 bg-red-500 border-2 border-white rounded-full top-1.5 right-1.5 dark:border-gray-900"></span>
          </button>

          {showNotifications && (
            <div className="absolute right-0 z-50 mt-2 overflow-hidden bg-white border border-gray-200/80 shadow-xl w-80 rounded-xl dark:bg-gray-900 dark:border-gray-800">
              <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 dark:border-gray-800">
                <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">
                  Notifications
                </p>
                <button
                  onClick={() => navigate("/notification")}
                  className="text-xs font-medium text-[#1C52AF] hover:underline dark:text-blue-400"
                >
                  View all
                </button>
              </div>

              <div className="overflow-y-auto max-h-80">
                {notifications.length === 0 ? (
                  <div className="flex flex-col items-center py-8 text-gray-400">
                    <FiBell className="w-8 h-8 mb-2 opacity-40" />
                    <p className="text-sm">No notifications</p>
                  </div>
                ) : (
                  notifications.map((item) => {
                    const config = notificationConfig[item.title] || {
                      icon: FiBell,
                      color: "text-gray-500",
                      bg: "bg-gray-100",
                    };
                    const Icon = config.icon;

                    return (
                      <div
                        key={item.id}
                        className="flex items-start gap-3 px-4 py-3 transition border-b border-gray-50 cursor-pointer last:border-none hover:bg-gray-50/80 dark:border-gray-800 dark:hover:bg-gray-800/50"
                      >
                        <div
                          className={`flex-shrink-0 flex items-center justify-center w-8 h-8 mt-0.5 rounded-full ${config.bg} dark:bg-opacity-20`}
                        >
                          <Icon className={`w-4 h-4 ${config.color}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                            {item.title}
                          </p>
                          <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400 line-clamp-1">
                            {item.message}
                          </p>
                          <span className="mt-1.5 text-[11px] text-gray-400 dark:text-gray-500">
                            {item.time}
                          </span>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          )}
        </div>

        {/* PROFILE */}
        <div className="relative" ref={profileRef}>
          <button
            className={`flex items-center gap-2 pl-1.5 pr-2.5 py-1 rounded-full transition border
              ${showProfileMenu 
                ? "bg-gray-100 border-gray-200 dark:bg-gray-800 dark:border-gray-700" 
                : "border-transparent hover:bg-gray-100 hover:border-gray-200 dark:hover:bg-gray-800 dark:hover:border-gray-700"
              }`}
            onClick={() => setShowProfileMenu(!showProfileMenu)}
          >
            {profile?.profileImage ? (
              <img
                src={profile.profileImage}
                alt={`${profile.firstName} ${profile.lastName}`}
                className="object-cover rounded-full w-7 h-7"
              />
            ) : (
              <div className="flex items-center justify-center w-7 h-7 bg-[#15256E] text-white rounded-full text-xs font-semibold">
                {profile ? getInitials(profile.firstName, profile.lastName) : "…"}
              </div>
            )}

            <div className="hidden text-left sm:block">
              <p className="text-[13px] font-semibold leading-tight text-gray-800 dark:text-gray-200">
                {profile?.firstName ?? "—"}
              </p>
              <p className="text-[11px] leading-tight text-gray-500 capitalize dark:text-gray-400">
                {profile?.role ?? ""}
              </p>
            </div>

            <FiChevronDown
              className={`w-3.5 h-3.5 text-gray-400 transition-transform duration-200 hidden sm:block dark:text-gray-500 ${
                showProfileMenu ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* DROPDOWN — Profile + Logout only */}
          {showProfileMenu && (
            <div className="absolute right-0 z-50 w-56 p-1.5 mt-2 bg-white border border-gray-200/80 shadow-xl rounded-xl dark:bg-gray-900 dark:border-gray-800">
              {/* User info header */}
              <div className="px-3 py-2.5 mb-1 border-b border-gray-100 dark:border-gray-800">
                <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">
                  {profile?.firstName} {profile?.lastName}
                </p>
                <p className="mt-0.5 text-xs text-gray-500 truncate dark:text-gray-400">
                  {profile?.email}
                </p>
              </div>

              {/* Menu items */}
              <button
                onClick={() => {
                  navigate("/profile");
                  setShowProfileMenu(false);
                }}
                className="flex items-center w-full gap-2.5 px-3 py-2 text-sm text-gray-700 transition rounded-lg hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
              >
                <FiUser className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                Profile
              </button>

              <div className="mt-1 pt-1 border-t border-gray-100 dark:border-gray-800">
                <button
                  onClick={handleLogout}
                  className="flex items-center w-full gap-2.5 px-3 py-2 text-sm text-red-600 transition rounded-lg hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
                >
                  <FiLogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;