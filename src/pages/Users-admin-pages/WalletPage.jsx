import React, { useState } from "react";
import UserNavbar from "../../components/Users-admin-components/UserNavbar";
import UserSidebar from "../../components/Users-admin-components/UserSidebar";
import WalletPanel from "../../components/Users-admin-components/WalletPanel";

const WalletPage = () => {
  const [openSidebar, setOpenSidebar] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* Sidebar */}
      <div className={`fixed top-0 left-0 h-screen w-64 bg-white z-50 transform transition ${openSidebar ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}>
        <UserSidebar />
      </div>

      {/* Overlay */}
      {openSidebar && (
        <div className="fixed inset-0 bg-black/30 lg:hidden" onClick={() => setOpenSidebar(false)} />
      )}

      {/* Main */}
      <div className="lg:ml-64 flex flex-col min-h-screen">
        <UserNavbar toggleSidebar={() => setOpenSidebar(!openSidebar)} />

        <main className="p-6">
          <WalletPanel />
        </main>
      </div>
    </div>
  );
};

export default WalletPage;