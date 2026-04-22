





import React, { useState } from "react";
import Navbar from "../../components/dashboard-comopnents/Navbar";
import Sidebar from "../../components/dashboard-comopnents/Sidebar";
import Payment from "../../components/dashboard-comopnents/Payment";

const PaymentPage = () => {
  const [openSidebar, setOpenSidebar] = useState(false);

  return (
    <div className="bg-gray-50 min-h-screen overflow-x-hidden">
      
      {/* Sidebar */}
      <div
        className={`
          fixed top-0 left-0 z-50 h-screen w-64 bg-white
          transform transition-transform duration-300
          ${openSidebar ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
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

      {/* Main Content */}
      <div className="flex flex-col min-h-screen lg:ml-64 min-w-0">
        
        {/* Navbar */}
        <Navbar toggleSidebar={() => setOpenSidebar(!openSidebar)} />

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-6 overflow-x-auto">
          <Payment />
        </main>

      </div>
    </div>
  );
};

export default PaymentPage;