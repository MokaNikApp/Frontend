import { useState } from "react";
import { FiMapPin } from "react-icons/fi";
import { MdOutlineDirectionsCar } from "react-icons/md";
import Sidebar from "../../components/Mec-Dashboard/Sidebar";
import Topbar from "../../components/Mec-Dashboard/Topbar";

const tabs = ["Incoming (12)", "Active (4)", "Completed"];

const jobRequests = [
  {
    id: 1,
    image: "/images/jr1.png",
    distance: "1.2 miles away",
    name: "John Doe",
    service: "Brake Pad Replacement",
    serviceColor: "text-blue-600",
    scheduledDate: "Oct 25, 10:00 AM",
    car: "2018 Honda Civic • Silver",
  },
  {
    id: 2,
    image: "/images/jr2.png",
    distance: "2.8 miles away",
    name: "Sarah Williams",
    service: "Oil & Filter Change",
    serviceColor: "text-blue-600",
    scheduledDate: "Oct 25, 01:30 PM",
    car: "2021 Toyota RAV4 • Blue",
  },
  {
    id: 3,
    image: "/images/jr3.png",
    distance: "0.5 miles away",
    name: "Michael Chen",
    service: "Engine Diagnostics",
    serviceColor: "text-orange-500",
    scheduledDate: "Oct 26, 08:00 AM",
    car: "2015 BMW 3 Series • Black",
  },
  {
    id: 4,
    image: "/images/jr4.png",
    distance: "4.1 miles away",
    name: "Emma Garcia",
    service: "Tire Rotation & Balance",
    serviceColor: "text-blue-600",
    scheduledDate: "Oct 26, 03:00 PM",
    car: "2019 Ford F-150 • White",
  },
];

export default function JobRequests() {
  const [activeTab, setActiveTab] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [isOnline, setIsOnline] = useState(true);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <div className="flex flex-col lg:flex-row bg-gray-100 min-h-screen overflow-hidden">

      <Sidebar
        isOpen={isOpen}
        toggleSidebar={toggleSidebar}
        isOnline={isOnline}
        setIsOnline={setIsOnline}
      />

      <div className="flex-1 overflow-y-auto">

        <Topbar toggleSidebar={toggleSidebar} isOnline={isOnline} />

        <div className="p-4 sm:p-6">

          {/* HEADER */}
          <h1 className="text-xl sm:text-2xl font-black text-gray-800">Job Requests</h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Manage 12 pending service requests in your current service area.
          </p>

          {/* TABS */}
          <div className="flex border-b border-gray-200 mt-6 mb-6">
            {tabs.map((tab, index) => (
              <button
                key={tab}
                onClick={() => setActiveTab(index)}
                className={`px-4 py-2 text-sm font-semibold border-b-2 transition-colors ${
                  activeTab === index
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* CARDS GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {jobRequests.map((job) => (
              <div key={job.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">

                {/* IMAGE */}
                <div className="relative">
                  <img
                    src={job.image}
                    alt={job.service}
                    className="w-full h-44 object-cover"
                  />
                  <div className="absolute top-3 right-3 flex items-center gap-1 bg-white/90 backdrop-blur-sm text-gray-700 text-xs font-semibold px-2.5 py-1 rounded-full shadow-sm">
                    <FiMapPin size={11} className="text-gray-500" />
                    {job.distance}
                  </div>
                </div>

                {/* BODY */}
                <div className="p-4">
                  <div className="flex items-start justify-between mb-1">
                    <p className="font-bold text-gray-900 text-sm">{job.name}</p>
                    <div className="text-right">
                      <p className="text-xs text-gray-400 uppercase tracking-wide font-semibold">Scheduled</p>
                      <p className="text-xs text-gray-700 font-semibold">{job.scheduledDate}</p>
                    </div>
                  </div>

                  <p className={`text-xs font-semibold mb-3 ${job.serviceColor}`}>
                    {job.service}
                  </p>

                  <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-4">
                    <MdOutlineDirectionsCar size={14} />
                    {job.car}
                  </div>

                  <div className="flex items-center gap-3">
                    <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-2.5 rounded-lg transition-colors">
                      Accept Request
                    </button>
                    <button className="text-gray-500 hover:text-gray-700 text-sm font-semibold px-3 py-2.5 transition-colors">
                      Decline
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>

          {/* BOTTOM ACTIONS */}
          <div className="flex flex-col items-center gap-3 mt-8">
            <button className="border bg-gray-300 border-gray-300 text-gray-900 text-sm font-semibold px-6 py-2.5 rounded-lg hover:bg-gray-50 transition-colors">
              Load More Requests
            </button>
            <p className="text-xs text-gray-400">or</p>
            <button className="flex items-center bg-white text-blue-800 gap-2 border border-blue-800 text-sm font-semibold px-6 py-2.5 rounded-full hover:bg-gray-300 transition-colors">
              <FiMapPin size={14} />
              Switch to Map View
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}