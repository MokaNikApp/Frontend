import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import {
  MdDashboard,
  MdSchool,
  MdPayment,
  MdCardMembership,
  MdLogout,
  MdNotifications,
  MdPerson,
  MdSettings,
} from "react-icons/md";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [student] = useState({ firstName: "User", lastName: "Name" });

  const mainMenu = [
    { name: "Dashboard", icon: <MdDashboard />, path: "/dashboard" },
    { name: "Book Service", icon: <MdSchool />, path: "/book-service" },
    { name: "My Services", icon: <MdSchool />, path: "/my-service" },
    { name: "Service History", icon: <MdPayment />, path: "/service-history" },
    { name: "Payments", icon: <MdCardMembership />, path: "/payment-management" },
  ];

  const accountMenu = [
    { name: "Notifications", icon: <MdNotifications />, path: "/notify" },
    { name: "Profile", icon: <MdPerson />, path: "/profile" },
  ];

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <aside className="flex flex-col flex-1 min-h-screen bg-white shadow-md overflow-y-auto w-64">
      
      {/* Logo Section */}
      <div className="flex flex-col items-start px-6 py-4 border-b border-gray-200">
        <img src={logo} alt="logo" className="w-36" />
      </div>

      {/* Main Menu */}
      <nav className="flex-1 px-4 py-6 space-y-1">
        {mainMenu.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`flex items-center gap-3 p-3 rounded-lg text-gray-700 text-sm font-medium hover:bg-blue-50 transition-colors ${
              location.pathname === item.path ? "bg-blue-100 text-blue-700" : ""
            }`}
          >
            <span className="text-lg">{item.icon}</span>
            {item.name}
          </Link>
        ))}

        {/* Account Section */}
        <div className="mt-6">
          <p className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Account
          </p>
          <div className="mt-2 space-y-1">
            {accountMenu.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-3 p-3 rounded-lg text-gray-700 text-sm font-medium hover:bg-blue-50 transition-colors ${
                  location.pathname === item.path ? "bg-blue-100 text-blue-700" : ""
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* Logout */}
      <div className="px-4 py-6 border-t border-gray-200">
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-red-600 font-medium hover:bg-red-50 transition-colors"
        >
          <MdLogout className="text-lg" />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;