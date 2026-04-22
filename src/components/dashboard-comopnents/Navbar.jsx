



// import React, { useState } from "react"; 
// import { FiSettings, FiBell, FiSearch } from "react-icons/fi";
// import { useNavigate } from "react-router-dom";

// const Navbar = ({ toggleSidebar }) => {
//   const navigate = useNavigate();

//   const [showProfileMenu, setShowProfileMenu] = useState(false);
//   const [showNotifications, setShowNotifications] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");

//   const [profile] = useState({
//     name: "Olamide Premuim",
//     photo: null,
//   });

//   const handleLogout = () => {
//     localStorage.clear();
//     navigate("/login");
//   };

//   const getInitials = (name) => {
//     if (!name) return "U";
//     return name
//       .split(" ")
//       .map((n) => n[0])
//       .join("")
//       .toUpperCase();
//   };

//   return (
//     <nav className="flex items-center justify-between h-16 px-4 bg-white border-b border-gray-200 shadow-sm">
      
//       {/* Left: Sidebar toggle + Search */}
//       <div className="flex items-center flex-1 min-w-0 gap-3">
//         {/* Toggle Button (mobile) */}
//         <button className="text-xl lg:hidden" onClick={toggleSidebar}>
//           ☰
//         </button>

//         {/* Search */}
//         <div className="relative flex-1 w-full max-w-md">
//           <input
//             type="text"
//             placeholder="Search services, vehicles, invoices..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className="w-full py-1 pl-8 pr-3 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
//           />
//           <FiSearch className="absolute text-gray-400 transform -translate-y-1/2 left-2 top-1/2" />
//         </div>
//       </div>

//       {/* Right: Notifications + Profile */}
//       <div className="relative flex items-center gap-3 ml-4">
//         {/* Notifications */}
//         <button
//           className="relative p-1 rounded hover:bg-gray-100"
//           onClick={() => setShowNotifications(!showNotifications)}
//         >
//           <FiBell className="w-5 h-5" />
//           <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
//         </button>

//         {showNotifications && (
//           <div className="absolute right-0 z-50 w-64 p-3 bg-white rounded shadow-lg top-12">
//             No notifications
//           </div>
//         )}

//         {/* Profile info */}
//         <div
//           className="flex items-center min-w-0 gap-2 cursor-pointer"
//           onClick={() => setShowProfileMenu(!showProfileMenu)}
//         >
//           <div className="text-right truncate">
//             <p className="text-sm font-semibold truncate">{profile.name.split(" ")[0]}</p>
//             <p className="text-xs text-gray-500 truncate">{profile.name.split(" ")[1]}</p>
//           </div>

//           {/* Avatar */}
//           {profile.photo ? (
//             <img src={profile.photo} alt="" className="w-8 h-8 rounded-full" />
//           ) : (
//             <div className="w-8 h-8 bg-[#15256E] text-white flex items-center justify-center rounded-full">
//               {getInitials(profile.name)}
//             </div>
//           )}
//         </div>

//         {/* Profile dropdown */}
//         {showProfileMenu && (
//           <div className="absolute right-0 z-50 p-3 mt-2 bg-white rounded shadow-lg w-36">
//             <button
//               onClick={handleLogout}
//               className="w-full px-2 py-1 text-left text-red-500 rounded hover:bg-gray-100"
//             >
//               Logout
//             </button>
//           </div>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;







import React, { useState, useRef, useEffect } from "react";
import { FiBell, FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const Navbar = ({ toggleSidebar }) => {
  const navigate = useNavigate();

  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const notificationRef = useRef();
  const profileRef = useRef();

  const [profile] = useState({
    name: "Olamide Premuim",
    photo: null,
  });

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

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
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
            className="w-full py-2 pl-9 pr-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1C52AF]"
          />
          <FiSearch className="absolute text-gray-400 -translate-y-1/2 left-3 top-1/2" />
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-4 ml-4">

        {/* NOTIFICATIONS */}
        <div className="relative" ref={notificationRef}>
          <button
            className="relative p-2 rounded-lg hover:bg-gray-100 transition"
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <FiBell className="w-5 h-5 text-gray-700" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-3 w-80 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden z-50">
              
              {/* HEADER */}
              <div className="flex items-center justify-between px-4 py-3 border-b">
                <p className="text-sm font-semibold text-gray-800">
                  Notifications
                </p>
                <button
                  onClick={() => navigate("/notification")}
                  className="text-xs text-[#1C52AF] hover:underline"
                >
                  View all
                </button>
              </div>

              {/* LIST */}
              <div className="max-h-72 overflow-y-auto">
                {notifications.length === 0 ? (
                  <p className="p-4 text-sm text-gray-400">
                    No notifications
                  </p>
                ) : (
                  notifications.map((item) => (
                    <div
                      key={item.id}
                      className="px-4 py-3 border-b last:border-none hover:bg-gray-50 transition cursor-pointer"
                    >
                      <div className="flex justify-between items-start gap-3">
                        <div>
                          <p className="text-sm font-medium text-gray-800">
                            {item.title}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            {item.message}
                          </p>
                        </div>
                        <span className="text-[10px] text-gray-400 whitespace-nowrap">
                          {item.time}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* PROFILE */}
        <div
          ref={profileRef}
          className="relative flex items-center gap-2 cursor-pointer"
          onClick={() => setShowProfileMenu(!showProfileMenu)}
        >
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold text-gray-800">
              {profile.name.split(" ")[0]}
            </p>
            <p className="text-xs text-gray-500">
              {profile.name.split(" ")[1]}
            </p>
          </div>

          {/* AVATAR */}
          {profile.photo ? (
            <img
              src={profile.photo}
              alt=""
              className="w-9 h-9 rounded-full object-cover"
            />
          ) : (
            <div className="w-9 h-9 bg-[#15256E] text-white flex items-center justify-center rounded-full text-sm font-semibold">
              {getInitials(profile.name)}
            </div>
          )}

          {/* DROPDOWN */}
          {showProfileMenu && (
            <div className="absolute right-0 mt-3 w-40 bg-white rounded-xl shadow-lg border border-gray-100 p-2 z-50">
              <button
                onClick={handleLogout}
                className="w-full px-3 py-2 text-left text-sm text-red-500 rounded-lg hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;