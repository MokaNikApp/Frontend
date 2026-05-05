import React, { useState } from "react";
import UserNavbar from "../../components/Users-admin-components/UserNavbar";
import UserSidebar from "../../components/Users-admin-components/UserSidebar";
import CustomerManagement from "../../components/Users-admin-components/CustomerManagement";

const CustomerPage = () => {
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

      {/* Overlay (mobile only) */}
      {openSidebar && (
        <div
          className="fixed inset-0 bg-black/30 lg:hidden"
          onClick={() => setOpenSidebar(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex flex-col min-w-0 min-h-screen lg:ml-64">

        {/* Navbar */}
        <UserNavbar toggleSidebar={() => setOpenSidebar(!openSidebar)} />

        {/* Page Content */}
        <main className="flex-1 p-4 overflow-x-auto sm:p-6">
          <CustomerManagement />
        </main>

      </div>
    </div>
  );
};

export default CustomerPage;