import Sidebar from "../../components/Mec-Dashboard/Sidebar";
import Topbar from "../../components/Mec-Dashboard/Topbar";
import Stats from "../../components/Mec-Dashboard/Stats";
import Schedule from "../../components/Mec-Dashboard/Schedule";
import Activity from "../../components/Mec-Dashboard/Activity";
import { useState } from "react";

export default function Overview() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOnline, setIsOnline] = useState(true);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">

      <Sidebar
        isOpen={isOpen}
        toggleSidebar={toggleSidebar}
        isOnline={isOnline}
        setIsOnline={setIsOnline}
      />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">

        <Topbar toggleSidebar={toggleSidebar} isOnline={isOnline} setIsOnline={setIsOnline} />

        <main className="flex-1 overflow-y-auto p-4 sm:p-6">

          {/* GREETING */}
          <h1 className="text-xl sm:text-2xl font-black text-gray-800">
            Good morning, Marco
          </h1>

          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            You have 4 appointments scheduled for today. One requires immediate attention.
          </p>

          <Stats />

          {/* MAIN GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
            <div className="lg:col-span-2">
              <Schedule />
            </div>
            <div>
              <Activity />
            </div>
          </div>

        </main>
      </div>
    </div>
  );
}