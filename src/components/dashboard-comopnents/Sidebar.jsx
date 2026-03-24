// import { useState } from "react";
// import { Link, useNavigate, useLocation } from "react-router-dom";
// import logo from "../../assets/images/logo.png";
// import {
//   MdDashboard,
//   MdSchool,
//   MdPayment,
//   MdCardMembership,
//   MdLogout,
// } from "react-icons/md";

// const Sidebar = () => {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const [student] = useState({
//     firstName: "User",
//     lastName: "Name",
//   });

//   // Main menu items
//   const mainMenu = [
//     { name: "Dashboard", icon: <MdDashboard />, path: "/dashboard" },
//     { name: "Book Service", icon: <MdSchool />, path: "/Book" },
//     { name: "My Services", icon: <MdSchool />, path: "/services" },
//     { name: "Service History", icon: <MdPayment />, path: "/history" },
//     { name: "Payments", icon: <MdCardMembership />, path: "/payments" },
//   ];

//   // Account menu items
//   const accountMenu = [
//     { name: "Notifications", icon: <MdDashboard />, path: "/notification" },
//     { name: "Profile", icon: <MdSchool />, path: "/profile" },
//     { name: "Settings", icon: <MdSchool />, path: "/settings" },
//   ];

//   const handleLogout = () => {
//     localStorage.clear();
//     navigate("/login");
//   };

//   return (
//     <aside className="flex flex-col w-64 h-screen text-black bg-white">
      
//       {/* Logo */}
//       <div className="px-5">
//         <img src={logo} alt="logo" className="" />
//       </div>

//       {/* Main Menu */}
//       <ul className="flex-1 p-4 space-y-2">
//         {mainMenu.map((item) => (
//           <li key={item.name}>
//             <Link
//               to={item.path}
//               className={`flex items-center gap-3 p-2 rounded hover:bg-gray-100 ${
//                 location.pathname === item.path ? "bg-gray-200" : ""
//               }`}
//             >
//               {item.icon}
//               <span>{item.name}</span>
//             </Link>
//           </li>
//         ))}

//         {/* Account section */}
//         <li className="pt-4">
//           <p className="px-2 text-sm font-semibold text-gray-600">Account</p>
//         </li>

//         {accountMenu.map((item) => (
//           <li key={item.name}>
//             <Link
//               to={item.path}
//               className={`flex items-center gap-3 p-2 rounded hover:bg-gray-100 ${
//                 location.pathname === item.path ? "bg-gray-200" : ""
//               }`}
//             >
//               {item.icon}
//               <span>{item.name}</span>
//             </Link>
//           </li>
//         ))}
//       </ul>

//       {/* Logout */}
//       <div className="p-4 border-t border-gray-300">
//         <button
//           onClick={handleLogout}
//           className="flex items-center gap-2 text-black hover:text-red-500"
//         >
//           <MdLogout />
//           Logout
//         </button>
//       </div>
//     </aside>
//   );
// };

// export default Sidebar;



import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import {
  MdDashboard,
  MdSchool,
  MdPayment,
  MdCardMembership,
  MdLogout,
} from "react-icons/md";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [student] = useState({
    firstName: "User",
    lastName: "Name",
  });

  // Main menu items
  const mainMenu = [
    { name: "Dashboard", icon: <MdDashboard />, path: "/dashboard" },
    { name: "Book Service", icon: <MdSchool />, path: "/Book" },
    { name: "My Services", icon: <MdSchool />, path: "/services" },
    { name: "Service History", icon: <MdPayment />, path: "/history" },
    { name: "Payments", icon: <MdCardMembership />, path: "/payments" },
  ];

  // Account menu items
  const accountMenu = [
    { name: "Notifications", icon: <MdDashboard />, path: "/notification" },
    { name: "Profile", icon: <MdSchool />, path: "/profile" },
    { name: "Settings", icon: <MdSchool />, path: "/settings" },
  ];

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <aside className="flex flex-col w-64 h-screen text-black bg-white shadow-md">
      
      {/* Logo */}
      <div className="flex flex-col items-start px-5 py-4 border-b border-gray-300">
        <img
          src={logo}
          alt="logo"
          className="w-32 sm:w-36"
        />
        
      </div>

      {/* Main Menu */}
      <ul className="flex-1 p-4 space-y-2">
        {mainMenu.map((item) => (
          <li key={item.name}>
            <Link
              to={item.path}
              className={`flex items-center gap-3 p-2 rounded hover:bg-gray-100 transition-colors ${
                location.pathname === item.path ? "bg-gray-200" : ""
              }`}
            >
              {item.icon}
              <span>{item.name}</span>
            </Link>
          </li>
        ))}

        {/* Account section */}
        <li className="pt-4">
          <p className="px-2 text-sm font-semibold text-gray-600 uppercase">Account</p>
        </li>

        {accountMenu.map((item) => (
          <li key={item.name}>
            <Link
              to={item.path}
              className={`flex items-center gap-3 p-2 rounded hover:bg-gray-100 transition-colors ${
                location.pathname === item.path ? "bg-gray-200" : ""
              }`}
            >
              {item.icon}
              <span>{item.name}</span>
            </Link>
          </li>
        ))}
      </ul>

      {/* Logout */}
      <div className="p-4 border-t border-gray-300">
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-black transition-colors hover:text-red-500"
        >
          <MdLogout />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;