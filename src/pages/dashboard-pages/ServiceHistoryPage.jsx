


import React, { useState } from "react";
import Navbar from "../../components/dashboard-comopnents/Navbar";
import Sidebar from "../../components/dashboard-comopnents/Sidebar";
import ServiceHistory from "../../components/dashboard-comopnents/ServiceHistory";

const ServiceHistoryPage = () => {
  const [openSidebar, setOpenSidebar] = useState(false);

  return (
    <div className="flex min-h-screen bg-white overflow-x-hidden">
      
      {/* Sidebar */}
      <div
        className={`
          fixed top-0 left-0 z-50 h-full w-64 bg-white
          transform transition-transform duration-300
          ${openSidebar ? "translate-x-0" : "-translate-x-full"}
          lg:relative lg:translate-x-0 lg:flex lg:flex-col lg:h-auto
        `}
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
      <div className="flex flex-col flex-1 min-w-0">
        
        {/* Navbar */}
        <Navbar toggleSidebar={() => setOpenSidebar(!openSidebar)} />

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-6 w-full">
          
          {/* IMPORTANT: Only this handles horizontal scroll */}
          <div className="w-full overflow-x-auto">
            <ServiceHistory />
          </div>

        </main>

      </div>
    </div>
  );
};

export default ServiceHistoryPage;

