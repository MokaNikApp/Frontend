import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import {
  MdDashboard,
  MdDirectionsCar,
  MdCalendarMonth,
  MdBuild,
  MdHistory,
  MdPayment,
  MdReceiptLong,
  MdNotifications,
  MdPerson,
  MdSettings,
  MdLogout,
} from "react-icons/md";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const mainMenu = [
    { name: "Dashboard", icon: <MdDashboard />, path: "/dashboard" },
    { name: "Vehicles", icon: <MdDirectionsCar />, path: "/vehicles" },
    { name: "Book Service", icon: <MdCalendarMonth />, path: "/book-service" },
    { name: "My Services", icon: <MdBuild />, path: "/my-service" },
    { name: "Service History", icon: <MdHistory />, path: "/service-history" },
    { name: "Payments", icon: <MdPayment />, path: "/payment" },
    { name: "Payment History", icon: <MdReceiptLong />, path: "/payment-history" },
  ];

  const accountMenu = [
    { name: "Notifications", icon: <MdNotifications />, path: "/notify" },
    { name: "Profile", icon: <MdPerson />, path: "/profile" },
    { name: "Settings", icon: <MdSettings />, path: "/settings" },
  ];

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <aside className="fixed top-0 left-0 h-screen w-64 bg-white border-r border-gray-200 flex flex-col z-50">
      
      {/* Logo */}
      <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-center">
        <img src={logo} alt="logo" className="w-32 h-auto object-contain" />
      </div>

      {/* Menu */}
      <nav className="flex-1 px-3 py-6 overflow-y-auto">
        <div className="space-y-1">
          {mainMenu.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors duration-200 ${
                isActive(item.path)
                  ? "bg-blue-50 text-blue-700"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <span className={`text-xl ${isActive(item.path) ? "text-blue-600" : "text-gray-400"}`}>
                {item.icon}
              </span>
              {item.name}
            </Link>
          ))}
        </div>

        {/* Account Section */}
        <div className="mt-8">
          <p className="px-3 mb-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Account
          </p>
          <div className="space-y-1">
            {accountMenu.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors duration-200 ${
                  isActive(item.path)
                    ? "bg-blue-50 text-blue-700"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <span className={`text-xl ${isActive(item.path) ? "text-blue-600" : "text-gray-400"}`}>
                  {item.icon}
                </span>
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* Logout */}
      <div className="px-3 py-4 border-t border-gray-100">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors duration-200"
        >
          <MdLogout className="text-xl" />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;





// import { Link, useNavigate, useLocation } from "react-router-dom";
// import logo from "../../assets/images/logo.png";
// import {
//   MdDashboard,
//   MdSchool,
//   MdPayment,
//   MdCardMembership,
//   MdLogout,
//   MdNotifications,
//   MdPerson,
// } from "react-icons/md";

// const Sidebar = () => {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const mainMenu = [
//     { name: "Dashboard", icon: <MdDashboard />, path: "/dashboard" },
//     { name: "Vehicles", icon: <MdSchool />, path: "/vehicles" },
//     { name: "Book Service", icon: <MdSchool />, path: "/book-service" },
//     { name: "My Services", icon: <MdSchool />, path: "/my-service" },
//     { name: "Service History", icon: <MdPayment />, path: "/service-history" },
//     { name: "Payments", icon: <MdCardMembership />, path: "/payment" },
//     { name: "Payment-History", icon: <MdCardMembership />, path: "/payment-history" },
//   ];

//   const accountMenu = [
//     { name: "Notifications", icon: <MdNotifications />, path: "/notify" },
//     { name: "Profile", icon: <MdPerson />, path: "/profile" },
//     { name: "Settings", icon: <MdPerson />, path: "/settings" },
//   ];

//   const handleLogout = () => {
//     localStorage.clear();
//     navigate("/login");
//   };

//   return (
//     <aside className="fixed top-0 left-0 h-screen w-64 bg-white shadow-md flex flex-col z-50">
      
//       {/* Logo */}
//       <div className="px-6 py-4 border-b border-gray-200">
//         <img src={logo} alt="logo" className="w-36" />
//       </div>

//       {/* Menu */}
//       <nav className="flex-1 px-4 py-6 space-y-1">
//         {mainMenu.map((item) => (
//           <Link
//             key={item.name}
//             to={item.path}
//             className={`flex items-center gap-3 p-3 rounded-lg text-sm font-medium transition ${
//               location.pathname === item.path
//                 ? "bg-blue-100 text-blue-700"
//                 : "text-gray-700 hover:bg-blue-50"
//             }`}
//           >
//             <span className="text-lg">{item.icon}</span>
//             {item.name}
//           </Link>
//         ))}

//         {/* Account */}
//         <div className="mt-6">
//           <p className="px-3 text-xs text-gray-400 uppercase tracking-wider">
//             Account
//           </p>

//           <div className="mt-2 space-y-1">
//             {accountMenu.map((item) => (
//               <Link
//                 key={item.name}
//                 to={item.path}
//                 className={`flex items-center gap-3 p-3 rounded-lg text-sm font-medium transition ${
//                   location.pathname === item.path
//                     ? "bg-blue-100 text-blue-700"
//                     : "text-gray-700 hover:bg-blue-50"
//                 }`}
//               >
//                 <span className="text-lg">{item.icon}</span>
//                 {item.name}
//               </Link>
//             ))}
//           </div>
//         </div>
//       </nav>

//       {/* Logout */}
//       <div className="px-4 py-6 border-t border-gray-200">
//         <button
//           onClick={handleLogout}
//           className="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-red-600 hover:bg-red-50 transition"
//         >
//           <MdLogout className="text-lg" />
//           Logout
//         </button>
//       </div>
//     </aside>
//   );
// };

// export default Sidebar;