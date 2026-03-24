
import React, { useState } from "react";
import Navbar from "../../components/dashboard-comopnents/Navbar";
import Sidebar from "../../components/dashboard-comopnents/Sidebar";
import Dashboard from "../../components/dashboard-comopnents/Dashboard";



const DashboardPage = () => {
  const [openSidebar, setOpenSidebar] = useState(false);

  return (
    <div className="flex min-h-screen bg-white">
      
      {/* Sidebar */}
      <div
        className={`fixed lg:static z-50 top-0 left-0 h-full transition-transform duration-300 
        ${openSidebar ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      >
        <Sidebar />
      </div>

      {/* Overlay (mobile only) */}
      {openSidebar && (
        <div
          className="fixed inset-0 bg-black/30 lg:hidden"
          onClick={() => setOpenSidebar(false)}
        />
      )}

      {/* Right Side */}
      <div className="flex flex-col flex-1">
        
        {/* Navbar */}
        <Navbar toggleSidebar={() => setOpenSidebar(!openSidebar)} />

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-6">
          <Dashboard />
        </main>

      </div>
    </div>
  );
};

export default DashboardPage;
