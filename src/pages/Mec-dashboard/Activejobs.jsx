import { useState, useRef, useEffect } from "react";
import { FiMoreVertical, FiMapPin, FiChevronDown, FiTruck } from "react-icons/fi";
import Sidebar from "../../components/Mec-Dashboard/Sidebar";
import Topbar from "../../components/Mec-Dashboard/Topbar";

const allJobs = [
  {
    id: 1,
    status: "IN PROGRESS",
    customerName: "John Doe",
    carModel: "Toyota Camry",
    plateNumber: "ABC-1234",
    carImage: "/images/ca1.png",
    startedAgo: "Started 2h ago",
    serviceName: "Transmission Fluid Change",
    progress: 65,
    avatars: ["/images/av1.png", "/images/av2.png"],
    type: "inprogress",
    pickupAddress: null,
  },
  {
    id: 2,
    status: "EN ROUTE",
    customerName: "Sarah Smith",
    carModel: "Honda CR-V",
    plateNumber: "XYZ-9876",
    carImage: "/images/ca2.png",
    startedAgo: "ETA 15 mins",
    serviceName: null,
    progress: null,
    avatars: ["/images/av3.png"],
    type: "enroute",
    pickupAddress: "452 Oak Street, West Avenue",
  },
  {
    id: 3,
    status: "IN PROGRESS",
    customerName: "Michael Chen",
    carModel: "BMW M4",
    plateNumber: "K-FAST-99",
    carImage: "/images/ca3.png",
    startedAgo: "Started 45m ago",
    serviceName: "Full Engine Diagnostic",
    progress: 20,
    avatars: ["/images/av4.png"],
    type: "inprogress",
    pickupAddress: null,
  },
  {
    id: 4,
    status: "EN ROUTE",
    customerName: "Robert Miller",
    carModel: "Ford F-150",
    plateNumber: "TRK-2200",
    carImage: "/images/ca4.png",
    startedAgo: "Arriving Now",
    serviceName: "Towing Service",
    progress: null,
    avatars: ["/images/av5.png"],
    type: "enroute",
    pickupAddress: "Highway 101, Exit 24",
  },
];

const statusOptions = ["Mark Complete", "Update Progress", "Contact Customer", "Cancel Job"];
const dotMenuOptions = ["View Details", "Reassign Job", "Contact Customer", "Cancel Job"];

function JobCard({ job }) {
  const [showStatusMenu, setShowStatusMenu] = useState(false);
  const [showDotMenu, setShowDotMenu] = useState(false);
  const statusRef = useRef(null);
  const dotRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (statusRef.current && !statusRef.current.contains(e.target)) setShowStatusMenu(false);
      if (dotRef.current && !dotRef.current.contains(e.target)) setShowDotMenu(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isInProgress = job.type === "inprogress";
  const isEnRoute = job.type === "enroute";

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex flex-col gap-4">

      {/* TOP ROW */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <img
            src={job.carImage}
            alt={job.carModel}
            className="w-16 h-12 object-cover rounded-lg bg-gray-100"
          />
          <div>
            <p className="font-bold text-gray-900 text-sm">{job.customerName}</p>
            <p className="text-xs text-gray-500">
              {job.carModel}{" "}
              <span className="font-bold text-gray-800">{job.plateNumber}</span>
            </p>
            <div className="flex items-center gap-1.5 mt-1">
              {isInProgress && (
                <span className="flex items-center gap-1 text-xs font-semibold text-blue-600">
                  <span className="w-2 h-2 rounded-full bg-blue-600 inline-block"></span>
                  IN PROGRESS
                </span>
              )}
              {isEnRoute && (
                <span className="flex items-center gap-1 text-xs font-semibold text-orange-500">
                  <span className="w-2 h-2 rounded-full bg-orange-500 inline-block"></span>
                  EN ROUTE
                </span>
              )}
              <span className="text-xs text-gray-400">{job.startedAgo}</span>
            </div>
          </div>
        </div>

        {/* THREE DOTS MENU */}
        <div className="relative" ref={dotRef}>
          <button
            onClick={() => setShowDotMenu(!showDotMenu)}
            className="text-gray-400 hover:text-gray-600 p-1 rounded-md hover:bg-gray-100 transition-colors"
          >
            <FiMoreVertical size={16} />
          </button>
          {showDotMenu && (
            <div className="absolute right-0 top-7 bg-white border border-gray-100 rounded-xl shadow-lg z-20 w-44 py-1 overflow-hidden">
              {dotMenuOptions.map((opt) => (
                <button
                  key={opt}
                  className={`w-full text-left px-4 py-2 text-xs font-medium hover:bg-gray-50 transition-colors ${
                    opt === "Cancel Job" ? "text-red-500" : "text-gray-700"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* PROGRESS BAR — only for In Progress */}
      {isInProgress && job.serviceName && (
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <p className="text-xs text-gray-500">{job.serviceName}</p>
            <p className="text-xs font-bold text-blue-600">{job.progress}%</p>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${job.progress}%` }}
            />
          </div>
        </div>
      )}

      {/* PICKUP ADDRESS — only for En Route */}
      {isEnRoute && job.pickupAddress && (
        <div className="flex items-start gap-2 bg-orange-50 rounded-lg px-3 py-2">
          <FiMapPin size={14} className="text-orange-500 mt-0.5 shrink-0" />
          <div>
            <p className="text-xs font-semibold text-gray-700">Pick-up Request</p>
            <p className="text-xs text-gray-500">{job.pickupAddress}</p>
          </div>
        </div>
      )}

      {/* TOWING SERVICE — Robert Miller special */}
      {isEnRoute && job.serviceName && (
        <div className="flex items-start gap-2 bg-orange-50 rounded-lg px-3 py-2">
          <FiTruck size={14} className="text-orange-500 mt-0.5 shrink-0" />
          <div>
            <p className="text-xs font-semibold text-gray-700">{job.serviceName}</p>
            <p className="text-xs text-gray-500">{job.pickupAddress}</p>
          </div>
        </div>
      )}

      {/* BOTTOM ROW */}
      <div className="flex items-center justify-between mt-auto">
        {/* AVATARS */}
        <div className="flex -space-x-2">
          {job.avatars.map((av, i) => (
            <img
              key={i}
              src={av}
              alt={`avatar-${i}`}
              className="w-8 h-8 rounded-full border-2 border-white object-cover bg-gray-200"
            />
          ))}
        </div>

        {/* UPDATE STATUS DROPDOWN */}
        <div className="relative" ref={statusRef}>
          <button
            onClick={() => setShowStatusMenu(!showStatusMenu)}
            className="flex items-center gap-1.5 border border-gray-200 text-gray-700 text-xs font-semibold px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Update Status <FiChevronDown size={13} />
          </button>
          {showStatusMenu && (
            <div className="absolute right-0 bottom-10 bg-white border border-gray-100 rounded-xl shadow-lg z-20 w-44 py-1 overflow-hidden">
              {statusOptions.map((opt) => (
                <button
                  key={opt}
                  className={`w-full text-left px-4 py-2 text-xs font-medium hover:bg-gray-50 transition-colors ${
                    opt === "Cancel Job" ? "text-red-500" : "text-gray-700"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

    </div>
  );
}

export default function ActiveJobs() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const [activeFilter, setActiveFilter] = useState("all");

  const toggleSidebar = () => setIsOpen(!isOpen);

  const filters = [
    { label: "All Jobs", value: "all" },
    { label: "En Route", value: "enroute" },
    { label: "In Progress", value: "inprogress" },
  ];

  const filteredJobs =
    activeFilter === "all"
      ? allJobs
      : allJobs.filter((job) => job.type === activeFilter);

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
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-gray-800">Ongoing Services</h1>
              <p className="text-xs sm:text-sm text-gray-500 mt-1">
                Real-time status of all active workshop repairs.
              </p>
            </div>
            <div className="flex items-center bg-white border border-gray-200 rounded-lg overflow-hidden w-fit shrink-0">
              {filters.map((f) => (
                <button
                  key={f.value}
                  onClick={() => setActiveFilter(f.value)}
                  className={`px-4 py-2 text-xs font-semibold transition-colors whitespace-nowrap ${
                    activeFilter === f.value
                      ? "bg-blue-600 text-white"
                      : "text-gray-500 hover:bg-gray-50"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* JOBS GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filteredJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>

          {filteredJobs.length === 0 && (
            <div className="flex items-center justify-center h-48 text-gray-400 text-sm">
              No jobs found for this filter.
            </div>
          )}

        </div>
      </div>
    </div>
  );
}