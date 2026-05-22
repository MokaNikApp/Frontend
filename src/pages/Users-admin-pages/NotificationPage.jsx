// pages/Users-admin-pages/NotificationPage.jsx
import React, { useState } from "react";
import UserNavbar from "../../components/Users-admin-components/UserNavbar";
import UserSidebar from "../../components/Users-admin-components/UserSidebar";
import AdminNotifications from "../../components/Users-admin-components/AdminNotifications";

const NotificationPage = () => {
  const [openSidebar, setOpenSidebar] = useState(false);

  return (
    <div className="min-h-screen overflow-x-hidden bg-gray-50">

      {/* Sidebar */}
      <div
        className={`
          fixed top-0 left-0 z-50 h-screen w-64 bg-white
          transform transition-transform duration-300
          ${openSidebar ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >
        <UserSidebar />
      </div>

      {/* Overlay */}
      {openSidebar && (
        <div
          className="fixed inset-0 bg-black/30 lg:hidden"
          onClick={() => setOpenSidebar(false)}
        />
      )}

      {/* Main */}
      <div className="flex flex-col min-w-0 min-h-screen lg:ml-64">

        <UserNavbar toggleSidebar={() => setOpenSidebar(!openSidebar)} />

        <main className="flex-1 p-4 overflow-x-auto sm:p-6">
          <AdminNotifications />
        </main>

      </div>
    </div>
  );
};

export default NotificationPage;