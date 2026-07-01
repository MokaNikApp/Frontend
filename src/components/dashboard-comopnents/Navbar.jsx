

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
  FiHome,
  FiMenu,
  FiGrid,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";

// ─── NOTIFICATION CONFIG ──────────────────────────────────────────────────────
const notificationConfig = {
  "Service Completed": {
    icon: FiCheckCircle,
    color: "text-emerald-600",
    bg: "bg-emerald-50 dark:bg-emerald-900/20",
  },
  "New Booking": {
    icon: FiCalendar,
    color: "text-blue-600",
    bg: "bg-blue-50 dark:bg-blue-900/20",
  },
  "Payment Received": {
    icon: FiCreditCard,
    color: "text-amber-600",
    bg: "bg-amber-50 dark:bg-amber-900/20",
  },
};

// ─── ROLE HELPERS ─────────────────────────────────────────────────────────────
const getDashboardRoute = (role) => {
  switch (role?.toLowerCase()) {
    case "admin":    return "/admin";
    case "mechanic": return "/mechanic";
    default:         return "/dashboard";
  }
};

const getDashboardLabel = (role) => {
  switch (role?.toLowerCase()) {
    case "admin":    return "Admin Panel";
    case "mechanic": return "Mechanic Portal";
    default:         return "My Dashboard";
  }
};

const getRoleBadgeStyle = (role) => {
  switch (role?.toLowerCase()) {
    case "admin":
      return "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300";
    case "mechanic":
      return "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300";
    default:
      return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300";
  }
};

const getInitials = (firstName, lastName) => {
  const f = firstName?.[0] ?? "";
  const l = lastName?.[0] ?? "";
  return (f + l).toUpperCase() || "U";
};

// ─── TIME AGO HELPER ──────────────────────────────────────────────────────────
const timeAgo = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now - date) / 1000);

  if (seconds < 60) return "Just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return date.toLocaleDateString();
};

// ─── COMPONENT ────────────────────────────────────────────────────────────────
const Navbar = ({ toggleSidebar }) => {
  const navigate = useNavigate();

  const [showProfileMenu, setShowProfileMenu]     = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery]             = useState("");
  const [profile, setProfile]                     = useState(null);
  const [notifications, setNotifications]         = useState([]);
  const [notifLoading, setNotifLoading]           = useState(false);
  const [unreadCount, setUnreadCount]             = useState(0);

  const notificationRef = useRef(null);
  const profileRef      = useRef(null);

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

  // Fetch notifications from backend
  useEffect(() => {
    const fetchNotifications = async () => {
      setNotifLoading(true);
      try {
        const { data } = await api.get("/notifications?limit=10&page=1");
        // Handle both { data: [...] } and direct [...] response shapes
        const notifList = Array.isArray(data) ? data : data?.data ?? [];
        setNotifications(notifList);
        setUnreadCount(notifList.filter((n) => !n.isRead).length);
      } catch (error) {
        console.error("Failed to fetch notifications:", error);
        setNotifications([]);
        setUnreadCount(0);
      } finally {
        setNotifLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (notificationRef.current && !notificationRef.current.contains(e.target)) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const dashRoute = getDashboardRoute(profile?.role);
  const dashLabel = getDashboardLabel(profile?.role);
  const badgeStyle = getRoleBadgeStyle(profile?.role);

  return (
    <nav className="flex items-center justify-between h-14 px-3 sm:px-5 bg-white border-b border-gray-200/80 shadow-sm dark:bg-gray-900 dark:border-gray-800">

      {/* ── LEFT ─────────────────────────────────────────────────── */}
      <div className="flex items-center flex-1 min-w-0 gap-1 sm:gap-2">

        {/* Sidebar toggle (mobile) */}
        <button
          onClick={toggleSidebar}
          className="flex items-center justify-center w-8 h-8 rounded-lg text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 transition-colors lg:hidden flex-shrink-0"
          aria-label="Toggle sidebar"
        >
          <FiMenu className="w-[17px] h-[17px]" />
        </button>

       

        {/* Search */}
        <div className="relative flex-1 max-w-sm group">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 group-focus-within:text-[#1C52AF] transition-colors pointer-events-none" />
          <input
            type="text"
            placeholder="Search services, vehicles…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-8 pl-8 pr-8 text-[13px] rounded-lg border border-transparent bg-gray-100 text-gray-900 placeholder:text-gray-400
              focus:bg-white focus:border-[#1C52AF]/40 focus:ring-2 focus:ring-[#1C52AF]/10 outline-none transition-all
              dark:bg-gray-800 dark:text-gray-100 dark:placeholder:text-gray-500 dark:focus:bg-gray-900 dark:focus:border-[#1C52AF]/40"
            aria-label="Search"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded p-0.5"
              aria-label="Clear search"
            >
              <FiX className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>

      {/* ── RIGHT ────────────────────────────────────────────────── */}
      <div className="flex items-center gap-1 ml-3">

        {/* Notifications */}
        <div className="relative" ref={notificationRef}>
          <button
            onClick={() => {
              setShowNotifications((v) => !v);
              setShowProfileMenu(false);
            }}
            className="relative flex items-center justify-center w-8 h-8 rounded-lg text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 transition-colors"
            aria-label="Notifications"
          >
            <FiBell className="w-[17px] h-[17px]" />
            {/* Unread badge */}
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 min-w-[14px] h-[14px] px-0.5 flex items-center justify-center bg-red-500 text-white text-[9px] font-bold rounded-full border border-white dark:border-gray-900">
                {unreadCount > 9 ? "9+" : unreadCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 top-full mt-2 w-80 bg-white border border-gray-200/80 rounded-xl shadow-xl overflow-hidden z-50 dark:bg-gray-900 dark:border-gray-800">
              {/* Header */}
              <div className="flex items-center justify-between px-4 py-2.5 border-b border-gray-100 dark:border-gray-800">
                <p className="text-[13px] font-semibold text-gray-800 dark:text-gray-100">
                  Notifications
                </p>
                <button
                  onClick={() => {
                    navigate("/notify");
                    setShowNotifications(false);
                  }}
                  className="text-[11px] font-medium text-[#1C52AF] hover:underline dark:text-blue-400"
                >
                  View all
                </button>
              </div>

              {/* Items */}
              <div className="overflow-y-auto max-h-72">
                {notifLoading ? (
                  <div className="flex flex-col items-center py-8 text-gray-400">
                    <div className="w-5 h-5 border-2 border-gray-300 border-t-[#1C52AF] rounded-full animate-spin mb-2" />
                    <p className="text-sm">Loading...</p>
                  </div>
                ) : notifications.length === 0 ? (
                  <div className="flex flex-col items-center py-8 text-gray-400">
                    <FiBell className="w-7 h-7 mb-2 opacity-40" />
                    <p className="text-sm">No notifications</p>
                  </div>
                ) : (
                  notifications.map((item) => {
                    const cfg = notificationConfig[item.title] || {
                      icon: FiBell,
                      color: "text-gray-500",
                      bg: "bg-gray-100 dark:bg-gray-800",
                    };
                    const Icon = cfg.icon;
                    return (
                      <div
                        key={item.id}
                        className={`flex items-start gap-3 px-4 py-3 border-b border-gray-50 last:border-none hover:bg-gray-50/80 dark:border-gray-800 dark:hover:bg-gray-800/50 cursor-pointer transition-colors ${
                          !item.isRead ? "bg-blue-50/40 dark:bg-blue-900/10" : ""
                        }`}
                        onClick={() => {
                          // Optional: mark as read on click
                          if (!item.isRead) {
                            api.patch(`/notifications/${item.id}/read`).catch(() => {});
                            setNotifications((prev) =>
                              prev.map((n) => (n.id === item.id ? { ...n, isRead: true } : n))
                            );
                            setUnreadCount((c) => Math.max(0, c - 1));
                          }
                        }}
                      >
                        <div className={`flex-shrink-0 flex items-center justify-center w-8 h-8 mt-0.5 rounded-full ${cfg.bg}`}>
                          <Icon className={`w-3.5 h-3.5 ${cfg.color}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[13px] font-medium text-gray-800 dark:text-gray-200">
                            {item.title}
                          </p>
                          <p className="mt-0.5 text-[11px] text-gray-500 dark:text-gray-400 truncate">
                            {item.body}
                          </p>
                          <span className="mt-1 text-[10px] text-gray-400 dark:text-gray-500">
                            {timeAgo(item.createdAt)}
                          </span>
                        </div>
                        {/* Unread dot */}
                        {!item.isRead && (
                          <span className="flex-shrink-0 w-2 h-2 mt-2 bg-blue-500 rounded-full" />
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="w-px h-5 bg-gray-200 dark:bg-gray-700 mx-1" />

        {/* Profile pill */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => {
              setShowProfileMenu((v) => !v);
              setShowNotifications(false);
            }}
            className={`flex items-center gap-2 pl-1 pr-2.5 py-1 rounded-full border transition-all
              ${showProfileMenu
                ? "bg-gray-100 border-gray-300 dark:bg-gray-800 dark:border-gray-700"
                : "border-gray-200 hover:bg-gray-100 hover:border-gray-300 dark:border-gray-700 dark:hover:bg-gray-800"
              }`}
            aria-label="Profile menu"
          >
            {/* Avatar */}
            {profile?.profileImage ? (
              <img
                src={profile.profileImage}
                alt={`${profile.firstName} ${profile.lastName}`}
                className="w-7 h-7 rounded-full object-cover flex-shrink-0"
              />
            ) : (
              <div className="w-7 h-7 rounded-full bg-[#1C52AF] text-white flex items-center justify-center text-[11px] font-semibold flex-shrink-0">
                {profile ? getInitials(profile.firstName, profile.lastName) : "…"}
              </div>
            )}

            {/* Name + role (hidden on small screens) */}
            <div className="hidden sm:flex flex-col text-left leading-none">
              <span className="text-[13px] font-semibold text-gray-800 dark:text-gray-200">
                {profile?.firstName ?? "—"}
              </span>
              <span className="text-[10px] text-gray-500 dark:text-gray-400 capitalize mt-0.5">
                {profile?.role ?? ""}
              </span>
            </div>

            {/* Role badge */}
            {profile?.role && (
              <span className={`hidden sm:inline text-[10px] font-semibold px-1.5 py-0.5 rounded capitalize flex-shrink-0 ${badgeStyle}`}>
                {profile.role}
              </span>
            )}

            <FiChevronDown
              className={`w-3 h-3 text-gray-400 dark:text-gray-500 transition-transform duration-200 flex-shrink-0 ${
                showProfileMenu ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* Profile dropdown */}
          {showProfileMenu && (
            <div className="absolute right-0 top-full mt-2 w-56 bg-white border border-gray-200/80 rounded-xl shadow-xl overflow-hidden z-50 dark:bg-gray-900 dark:border-gray-800">

              {/* User info */}
              <div className="px-3.5 py-3 border-b border-gray-100 dark:border-gray-800">
                <p className="text-[13px] font-semibold text-gray-800 dark:text-gray-100">
                  {profile?.firstName} {profile?.lastName}
                </p>
                <p className="mt-0.5 text-[11px] text-gray-500 dark:text-gray-400 truncate">
                  {profile?.email}
                </p>
              </div>

              {/* Menu items */}
              <div className="p-1.5">
                {/* Home */}
                <button
                  onClick={() => { navigate("/"); setShowProfileMenu(false); }}
                  className="flex items-center w-full gap-2.5 px-3 py-2 text-[13px] text-gray-700 rounded-lg hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 transition-colors"
                >
                  <FiHome className="w-3.5 h-3.5 text-gray-400 dark:text-gray-500 flex-shrink-0" />
                  Home
                </button>

                {/* Dashboard (role-aware) */}
                <button
                  onClick={() => { navigate(dashRoute); setShowProfileMenu(false); }}
                  className="flex items-center w-full gap-2.5 px-3 py-2 text-[13px] text-[#1C52AF] font-medium rounded-lg hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/20 transition-colors"
                >
                  <FiGrid className="w-3.5 h-3.5 flex-shrink-0" />
                  {dashLabel}
                </button>

                {/* Profile */}
                <button
                  onClick={() => { navigate("/profile"); setShowProfileMenu(false); }}
                  className="flex items-center w-full gap-2.5 px-3 py-2 text-[13px] text-gray-700 rounded-lg hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 transition-colors"
                >
                  <FiUser className="w-3.5 h-3.5 text-gray-400 dark:text-gray-500 flex-shrink-0" />
                  Profile settings
                </button>
              </div>

              {/* Logout */}
              <div className="p-1.5 border-t border-gray-100 dark:border-gray-800">
                <button
                  onClick={handleLogout}
                  className="flex items-center w-full gap-2.5 px-3 py-2 text-[13px] text-red-600 rounded-lg hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20 transition-colors"
                >
                  <FiLogOut className="w-3.5 h-3.5 flex-shrink-0" />
                  Log out
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