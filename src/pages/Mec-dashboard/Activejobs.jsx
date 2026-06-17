import { useState, useRef, useEffect } from "react";
import { FiMoreVertical, FiMapPin, FiChevronDown, FiTruck } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// Correctly importing your custom configured api instance!
import api from "../../api/axios"; 
import Sidebar from "../../components/Mec-Dashboard/Sidebar";
import Topbar from "../../components/Mec-Dashboard/Topbar";

const dotMenuOptions = ["View Details", "Reassign Job", "Contact Customer", "Cancel Job"];
const FALLBACK_AVATAR = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80";
const FALLBACK_CAR = "https://images.unsplash.com/photo-1617886326072-1bed7f8d2228?auto=format&fit=crop&w=600&q=80";

function JobCard({ job, onComplete, onUpdateProgress, isCompleting }) {
  const [showStatusMenu, setShowStatusMenu] = useState(false);
  const [showDotMenu, setShowDotMenu] = useState(false);
  const [progressInput, setProgressInput] = useState(job.progress);
  const [showProgressEdit, setShowProgressEdit] = useState(false);
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

  const statusOptions = [
    { 
      label: isCompleting ? "Completing..." : "Mark Complete", 
      action: () => { onComplete(job.id); setShowStatusMenu(false); } 
    },
    { label: "Update Progress", action: () => { setShowProgressEdit(true); setShowStatusMenu(false); } },
    { label: "Contact Customer", action: () => { setShowStatusMenu(false); } },
    { label: "Cancel Job", action: () => { setShowStatusMenu(false); } },
  ];

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
            <p className="font-bold text-gray-900 text-sm">{job.name}</p>
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
              <span className="text-xs text-gray-400">{job.scheduledDate}</span>
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

      {/* PROGRESS BAR */}
      {isInProgress && job.service && (
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <p className="text-xs text-gray-500">{job.service}</p>
            <p className="text-xs font-bold text-blue-600">{job.progress}%</p>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${job.progress}%` }}
            />
          </div>
          {showProgressEdit && (
            <div className="flex items-center gap-2 mt-2">
              <input
                type="range" min="0" max="100"
                value={progressInput}
                onChange={(e) => setProgressInput(Number(e.target.value))}
                className="flex-1"
              />
              <span className="text-xs font-bold text-blue-600 w-8">{progressInput}%</span>
              <button
                onClick={() => { onUpdateProgress(job.id, progressInput); setShowProgressEdit(false); }}
                className="text-xs bg-blue-600 text-white px-2.5 py-1 rounded-lg font-semibold shadow-sm hover:bg-blue-700 transition-colors"
              >
                Save
              </button>
            </div>
          )}
        </div>
      )}

      {/* PICKUP ADDRESS */}
      {isEnRoute && job.pickupAddress && (
        <div className="flex items-start gap-2 bg-orange-50 rounded-lg px-3 py-2">
          <FiMapPin size={14} className="text-orange-500 mt-0.5 shrink-0" />
          <div>
            <p className="text-xs font-semibold text-gray-700">Pick-up Request</p>
            <p className="text-xs text-gray-500">{job.pickupAddress}</p>
          </div>
        </div>
      )}

      {/* TOWING SERVICE */}
      {isEnRoute && job.service && job.service.toLowerCase().includes("tow") && (
        <div className="flex items-start gap-2 bg-orange-50 rounded-lg px-3 py-2">
          <FiTruck size={14} className="text-orange-500 mt-0.5 shrink-0" />
          <div>
            <p className="text-xs font-semibold text-gray-700">{job.service}</p>
            <p className="text-xs text-gray-500">{job.pickupAddress}</p>
          </div>
        </div>
      )}

      {/* BOTTOM ROW */}
      <div className="flex items-center justify-between mt-auto">
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
                  key={opt.label}
                  onClick={opt.action}
                  disabled={opt.label === "Completing..."}
                  className={`w-full text-left px-4 py-2 text-xs font-medium hover:bg-gray-50 transition-colors ${
                    opt.label === "Cancel Job" ? "text-red-500" : "text-gray-700"
                  }`}
                >
                  {opt.label}
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
  const queryClient = useQueryClient();

  const toggleSidebar = () => setIsOpen(!isOpen);

  // ---------------------------------------------------------------------------
  // 1. FETCH ONGOING SERVICES FROM SERVER
  // ---------------------------------------------------------------------------
  const { data: rawData, isLoading } = useQuery({
    queryKey: ["jobsActive"],
    queryFn: async () => {
      const res = await api.get("/jobs/status/ACCEPTED");
      return res.data;
    }
  });

  // ---------------------------------------------------------------------------
  // 2. MUTATIONS FOR UPDATING STATUS & PROGRESS
  // ---------------------------------------------------------------------------
  const completeJobMutation = useMutation({
    mutationFn: async (jobId) => {
      // Endpoint syntax matches your job request actions
      return await api.post(`/jobs/${jobId}/complete`); 
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["jobsActive"]);
    }
  });

  const updateProgressMutation = useMutation({
    mutationFn: async ({ jobId, progressPercentage }) => {
      return await api.patch(`/jobs/${jobId}`, { progressPercentage });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["jobsActive"]);
    }
  });

  const handleComplete = (id) => {
    completeJobMutation.mutate(id);
  };

  const handleUpdateProgress = (id, percentage) => {
    updateProgressMutation.mutate({ jobId: id, progressPercentage: percentage });
  };

  // ---------------------------------------------------------------------------
  // 3. TRANSLATION LAYER (Adapting Backend Data to match original UI fields)
  // ---------------------------------------------------------------------------
  const items = Array.isArray(rawData) 
    ? rawData 
    : Array.isArray(rawData?.data) 
      ? rawData.data 
      : [];

  const activeJobs = items.map((j) => {
    let displayDate = j.scheduledAt || "Pending Date";
    if (j.scheduledAt) {
      try {
        displayDate = new Date(j.scheduledAt).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        });
      } catch (e) {
        // Fallback
      }
    }

    const clientName = j.user ? `${j.user.firstName || ""} ${j.user.lastName || ""}`.trim() : "Client Request";
    const currentProgress = j.progressPercentage || j.progress || 0;

    return {
      id: j.id,
      name: clientName,
      // If progress is greater than 0, mark as inprogress, otherwise show as enroute
      type: currentProgress > 0 ? "inprogress" : "enroute", 
      carModel: j.description || "Vehicle Request",
      plateNumber: j.plateNumber || "KJA-123AA", 
      scheduledDate: displayDate,
      service: j.title || "Mechanical Service",
      progress: currentProgress,
      pickupAddress: j.pickupAddress || "Customer Location Base",
      carImage: j.image || FALLBACK_CAR,
      avatars: [j.user?.avatar || FALLBACK_AVATAR]
    };
  });

  const filters = [
    { label: "All Jobs", value: "all" },
    { label: "En Route", value: "enroute" },
    { label: "In Progress", value: "inprogress" },
  ];

  const filteredJobs =
    activeFilter === "all"
      ? activeJobs
      : activeJobs.filter((job) => job.type === activeFilter);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">

      <Sidebar
        isOpen={isOpen}
        toggleSidebar={toggleSidebar}
        isOnline={isOnline}
        setIsOnline={setIsOnline}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Topbar toggleSidebar={toggleSidebar} isOnline={isOnline} setIsOnline={setIsOnline} />

        <main className="flex-1 overflow-y-auto p-4 sm:p-6">

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
          {isLoading ? (
            <div className="flex items-center justify-center h-48 text-xs font-semibold tracking-wide text-gray-400 animate-pulse">
              ⚡ LOADING ACTIVE REPAIR TRACKS...
            </div>
          ) : filteredJobs.length === 0 ? (
            <div className="flex items-center justify-center h-48 text-gray-400 text-sm">
              No jobs found for this filter.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {filteredJobs.map((job) => (
                <JobCard
                  key={job.id}
                  job={job}
                  onComplete={handleComplete}
                  onUpdateProgress={handleUpdateProgress}
                  isCompleting={completeJobMutation.isLoading}
                />
              ))}
            </div>
          )}

        </main>
      </div>
    </div>
  );
}