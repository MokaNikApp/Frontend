



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
//       <div className="flex items-center gap-3">
//         {/* Toggle Button (mobile) */}
//         <button className="text-xl lg:hidden" onClick={toggleSidebar}>
//           ☰
//         </button>

//         {/* Search */}
//         <div className="relative w-64 max-w-xs">
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
//       <div className="relative flex items-center gap-4">
//         {/* Notifications */}
//         <button
//           className="relative p-1 rounded hover:bg-gray-100"
//           onClick={() => setShowNotifications(!showNotifications)}
//         >
//           <FiBell className="w-5 h-5" />
//           {/* Optional: notification dot */}
//           <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
//         </button>

//         {showNotifications && (
//           <div className="absolute right-0 z-50 w-64 p-3 bg-white rounded shadow-lg top-12">
//             No notifications
//           </div>
//         )}

//         {/* Profile info */}
//         <div
//           className="flex items-center gap-2 cursor-pointer"
//           onClick={() => setShowProfileMenu(!showProfileMenu)}
//         >
//           <div className="text-right">
//             <p className="text-sm font-semibold">{profile.name.split(" ")[0]}</p>
//             <p className="text-xs text-gray-500">{profile.name.split(" ")[1]}</p>
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



import React, { useState } from "react"; 
import { FiSettings, FiBell, FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const Navbar = ({ toggleSidebar }) => {
  const navigate = useNavigate();

  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const [profile] = useState({
    name: "Olamide Premuim",
    photo: null,
  });

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

  return (
    <nav className="flex items-center justify-between h-16 px-4 bg-white border-b border-gray-200 shadow-sm">
      
      {/* Left: Sidebar toggle + Search */}
      <div className="flex items-center flex-1 min-w-0 gap-3">
        {/* Toggle Button (mobile) */}
        <button className="text-xl lg:hidden" onClick={toggleSidebar}>
          ☰
        </button>

        {/* Search */}
        <div className="relative flex-1 w-full max-w-md">
          <input
            type="text"
            placeholder="Search services, vehicles, invoices..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full py-1 pl-8 pr-3 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <FiSearch className="absolute text-gray-400 transform -translate-y-1/2 left-2 top-1/2" />
        </div>
      </div>

      {/* Right: Notifications + Profile */}
      <div className="relative flex items-center gap-3 ml-4">
        {/* Notifications */}
        <button
          className="relative p-1 rounded hover:bg-gray-100"
          onClick={() => setShowNotifications(!showNotifications)}
        >
          <FiBell className="w-5 h-5" />
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {showNotifications && (
          <div className="absolute right-0 z-50 w-64 p-3 bg-white rounded shadow-lg top-12">
            No notifications
          </div>
        )}

        {/* Profile info */}
        <div
          className="flex items-center min-w-0 gap-2 cursor-pointer"
          onClick={() => setShowProfileMenu(!showProfileMenu)}
        >
          <div className="text-right truncate">
            <p className="text-sm font-semibold truncate">{profile.name.split(" ")[0]}</p>
            <p className="text-xs text-gray-500 truncate">{profile.name.split(" ")[1]}</p>
          </div>

          {/* Avatar */}
          {profile.photo ? (
            <img src={profile.photo} alt="" className="w-8 h-8 rounded-full" />
          ) : (
            <div className="w-8 h-8 bg-[#15256E] text-white flex items-center justify-center rounded-full">
              {getInitials(profile.name)}
            </div>
          )}
        </div>

        {/* Profile dropdown */}
        {showProfileMenu && (
          <div className="absolute right-0 z-50 p-3 mt-2 bg-white rounded shadow-lg w-36">
            <button
              onClick={handleLogout}
              className="w-full px-2 py-1 text-left text-red-500 rounded hover:bg-gray-100"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;