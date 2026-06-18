







import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import {
  MdDashboard,
  MdBuild,
  MdAssignment,
  MdHistory,
  MdPayment,
  MdReport,
  MdNotifications,
  MdCardMembership,
  MdLogout,
} from "react-icons/md";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const mainMenu = [
    {
      name: "users-dashboard",
      label: "Dashboard",
      icon: <MdDashboard />,
      path: "/admin-dashboard",
    },
    {
      name: "users-mechanics",
      label: "Mechanics",
      icon: <MdBuild />,
      path: "/admin-mechanics",
    },
    {
      name: "users-my-services",
      label: "Customers",
      icon: <MdAssignment />,
      path: "/customer-management",
    },
    {
      name: "users-service-history",
      label: "Bookings",
      icon: <MdHistory />,
      path: "/admin-booking",
    },
    {
      name: "users-payments",
      label: "Wallet & Payments",
      icon: <MdPayment />,
      path: "/wallet-payments",
    },
    {
      name: "users-dispute",
      label: "Disputes",
      icon: <MdReport />,
      path: "/disputes",
    },
    {
      name: "users-notifications",
      label: "Notifications",
      icon: <MdNotifications />,
      path: "/notifications",
    },
    {
      name: "users-settings",
      label: "Settings",
      icon: <MdCardMembership />,
      path: "/settings",
    },
  ];

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const isActive = (path) => location.pathname.startsWith(path);

  return (
    <aside className="fixed top-0 left-0 z-50 flex flex-col w-64 h-screen bg-white shadow-md">

      {/* Logo */}
      <div className="px-6 py-4 border-b border-gray-200">
        <img src={logo} alt="logo" className="w-36" />
      </div>

      {/* Menu */}
      <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">

        {mainMenu.map((item) => {
          const active = isActive(item.path);

          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center gap-3 p-3 rounded-lg text-sm font-medium transition ${
                active
                  ? "bg-[#1D4ED8] text-white"
                  : "text-[#64748B] hover:text-[#1D4ED8] hover:bg-blue-50"
              }`}
            >
              <span
                className={`text-lg transition ${
                  active
                    ? "text-white"
                    : "text-[#64748B] hover:text-[#1D4ED8]"
                }`}
              >
                {item.icon}
              </span>

              {item.label}
            </Link>
          );
        })}

      </nav>

      {/* Logout */}
      <div className="px-4 py-6 border-t border-gray-200">
        <button
          onClick={handleLogout}
          className="flex items-center w-full gap-2 px-3 py-2 text-red-600 transition rounded-lg hover:bg-red-50"
        >
          <MdLogout className="text-lg" />
          Logout
        </button>
      </div>

    </aside>
  );
};

export default Sidebar;