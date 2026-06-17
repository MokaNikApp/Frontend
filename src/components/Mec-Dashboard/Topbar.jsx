import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FiBell, FiSearch, FiMenu } from "react-icons/fi";

export default function Topbar({ toggleSidebar, isOnline, setIsOnline }) {
  
  // 1. INSTANT SYNC: Grab the user data stored right at login
  const loggedInUser = JSON.parse(localStorage.getItem("user") || "null");
  const sessionName = loggedInUser?.name || loggedInUser?.firstName || "";

  // 2. LIVE SYNC: Fetch the active dashboard details from the backend
  const { data: dashboardData } = useQuery({
    queryKey: ["providerDashboardDetails"],
    queryFn: async () => {
      const res = await axios.get("/provider/dashboard");
      return res.data;
    },
    staleTime: 10 * 1000, // Keep cache fresh
  });

  const handleToggle = () => {
    setIsOnline(!isOnline);
  };

  // 3. RESOLVE ACTIVE ACCOUNT NAME
  // Tries the server response structure first, then falls back to the login session name
  const rawName = 
    dashboardData?.user?.name || 
    dashboardData?.name || 
    dashboardData?.profileName || 
    sessionName || 
    "Mechanic";

  // 4. CLEAN REGEX: Strip out "Good Afternoon, " or "Good Morning, " if the backend sends a greeting string
  const cleanDisplayName = rawName.replace(/Good\s\w+,\s/i, "");

  // Dynamic Avatar selection
  const avatarUrl = dashboardData?.user?.avatar || loggedInUser?.avatar || "/images/Profile.png";

  return (
    <div className="bg-white px-4 sm:px-6 py-4 flex items-center justify-between border-b border-gray-200">

      {/* LEFT */}
      <div className="flex items-center gap-3 flex-1">
        <button className="lg:hidden text-gray-700 text-xl" onClick={toggleSidebar}>
          <FiMenu />
        </button>
        <div className="flex items-center bg-gray-100 text-black px-3 py-2 rounded-lg w-40 sm:w-68 lg:w-[40%]">
          <FiSearch className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search requests..."
            className="bg-transparent outline-none text-blue-800 text-sm w-full"
          />
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex sm:gap-6 items-center gap-4">

        {/* ONLINE / OFFLINE TOGGLE */}
        <button
          onClick={handleToggle}
          className="hidden sm:flex border border-gray-200 rounded-lg text-xs whitespace-nowrap shrink-0 overflow-hidden"
        >
          <span
            className={`px-3 py-1.5 font-semibold transition-colors duration-300 ${
              isOnline ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-400"
            }`}
          >
            Online
          </span>
          <span
            className={`px-3 py-1.5 font-semibold transition-colors duration-300 ${
              !isOnline ? "bg-red-100 text-red-500" : "text-gray-400"
            }`}
          >
            Offline
          </span>
        </button>

        {/* BELL */}
        <div className="relative">
          <FiBell className="text-gray-600 text-lg cursor-pointer" />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </div>

        {/* DYNAMIC PROFILE HEAD */}
        <div className="flex items-center gap-3">
          <div className="text-right text-xs hidden sm:block">
            {/* Renders the precise, isolated profile name dynamically */}
            <p className="font-bold text-gray-800 capitalize tracking-wide">
              {cleanDisplayName}
            </p>
            <p className="text-gray-400 text-[10px] uppercase font-semibold tracking-wider mt-0.5">
              Service Provider
            </p>
          </div>
          <img
            src={avatarUrl}
            alt="profile"
            className="w-9 h-9 rounded-full object-cover border border-blue-100 shadow-sm"
            onError={(e) => {
              e.target.src = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80";
            }}
          />
        </div>

      </div>
    </div>
  );
}