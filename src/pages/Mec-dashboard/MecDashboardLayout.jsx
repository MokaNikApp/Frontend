import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/Mec-Dashboard/Sidebar";
import Topbar from "../../components/Mec-Dashboard/Topbar";

export default function MecDashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isOnline, setIsOnline] = useState(true);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <Sidebar
        isOpen={sidebarOpen}
        toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        isOnline={isOnline}
        setIsOnline={setIsOnline}
      />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Topbar
          toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          isOnline={isOnline}
        />
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}