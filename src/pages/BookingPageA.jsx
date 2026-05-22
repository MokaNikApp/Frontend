// import React, { useState, useRef, useEffect } from "react";
// import { FiBell, FiSearch } from "react-icons/fi";
// import { useNavigate } from "react-router-dom";

// const Navbar = ({ toggleSidebar }) => {
//   const navigate = useNavigate();

//   const [showProfileMenu, setShowProfileMenu] = useState(false);
//   const [showNotifications, setShowNotifications] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");

//   const notificationRef = useRef();
//   const profileRef = useRef();

//   const [profile] = useState({
//     name: "Olamide Premuim",
//     photo: null,
//   });

//   const notifications = [
//     {
//       id: 1,
//       title: "Service Completed",
//       message: "Toyota Corolla is ready for pickup",
//       time: "2m ago",
//     },
//     {
//       id: 2,
//       title: "New Booking",
//       message: "You have a new service request",
//       time: "10m ago",
//     },
//     {
//       id: 3,
//       title: "Payment Received",
//       message: "₦45,000 payment confirmed",
//       time: "1h ago",
//     },
//   ];

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

//   // Close dropdowns when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (
//         notificationRef.current &&
//         !notificationRef.current.contains(e.target)
//       ) {
//         setShowNotifications(false);
//       }

//       if (profileRef.current && !profileRef.current.contains(e.target)) {
//         setShowProfileMenu(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   return (
//     <nav className="flex items-center justify-between h-16 px-4 bg-white border-b border-gray-200 shadow-sm">
      
//       {/* LEFT */}
//       <div className="flex items-center flex-1 min-w-0 gap-3">
//         <button className="text-xl lg:hidden" onClick={toggleSidebar}>
//           ☰
//         </button>

//         {/* SEARCH */}
//         <div className="relative flex-1 w-full max-w-md">
//           <input
//             type="text"
//             placeholder="Search services, vehicles..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className="w-full py-2 pl-9 pr-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1C52AF]"
//           />
//           <FiSearch className="absolute text-gray-400 -translate-y-1/2 left-3 top-1/2" />
//         </div>
//       </div>

//       {/* RIGHT */}
//       <div className="flex items-center gap-4 ml-4">

//         {/* NOTIFICATIONS */}
//         <div className="relative" ref={notificationRef}>
//           <button
//             className="relative p-2 transition rounded-lg hover:bg-gray-100"
//             onClick={() => setShowNotifications(!showNotifications)}
//           >
//             <FiBell className="w-5 h-5 text-gray-700" />
//             <span className="absolute w-2 h-2 bg-red-500 rounded-full top-1 right-1"></span>
//           </button>

//           {showNotifications && (
//             <div className="absolute right-0 z-50 mt-3 overflow-hidden bg-white border border-gray-100 shadow-lg w-80 rounded-xl">
              
//               {/* HEADER */}
//               <div className="flex items-center justify-between px-4 py-3 border-b">
//                 <p className="text-sm font-semibold text-gray-800">
//                   Notifications
//                 </p>
//                 <button
//                   onClick={() => navigate("/notification")}
//                   className="text-xs text-[#1C52AF] hover:underline"
//                 >
//                   View all
//                 </button>
//               </div>

//               {/* LIST */}
//               <div className="overflow-y-auto max-h-72">
//                 {notifications.length === 0 ? (
//                   <p className="p-4 text-sm text-gray-400">
//                     No notifications
//                   </p>
//                 ) : (
//                   notifications.map((item) => (
//                     <div
//                       key={item.id}
//                       className="px-4 py-3 transition border-b cursor-pointer last:border-none hover:bg-gray-50"
//                     >
//                       <div className="flex items-start justify-between gap-3">
//                         <div>
//                           <p className="text-sm font-medium text-gray-800">
//                             {item.title}
//                           </p>
//                           <p className="mt-1 text-xs text-gray-500">
//                             {item.message}
//                           </p>
//                         </div>
//                         <span className="text-[10px] text-gray-400 whitespace-nowrap">
//                           {item.time}
//                         </span>
//                       </div>
//                     </div>
//                   ))
//                 )}
//               </div>
//             </div>
//           )}
//         </div>

//         {/* PROFILE */}
//         <div
//           ref={profileRef}
//           className="relative flex items-center gap-2 cursor-pointer"
//           onClick={() => setShowProfileMenu(!showProfileMenu)}
//         >
//           <div className="hidden text-right sm:block">
//             <p className="text-sm font-semibold text-gray-800">
//               {profile.name.split(" ")[0]}
//             </p>
//             <p className="text-xs text-gray-500">
//               {profile.name.split(" ")[1]}
//             </p>
//           </div>

//           {/* AVATAR */}
//           {profile.photo ? (
//             <img
//               src={profile.photo}
//               alt=""
//               className="object-cover rounded-full w-9 h-9"
//             />
//           ) : (
//             <div className="w-9 h-9 bg-[#15256E] text-white flex items-center justify-center rounded-full text-sm font-semibold">
//               {getInitials(profile.name)}
//             </div>
//           )}

//           {/* DROPDOWN */}
//           {showProfileMenu && (
//             <div className="absolute right-0 z-50 w-40 p-2 mt-3 bg-white border border-gray-100 shadow-lg rounded-xl">
//               <button
//                 onClick={handleLogout}
//                 className="w-full px-3 py-2 text-sm text-left text-red-500 rounded-lg hover:bg-gray-100"
//               >
//                 Logout
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;




import BookingA from "../components/BookingA";

const BookingPageA = () => {
  return <BookingA />;
};

export default BookingPageA;