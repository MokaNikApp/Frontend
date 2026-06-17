import { useState } from "react";
import { FiMapPin, FiAlertTriangle } from "react-icons/fi";
import { MdOutlineDirectionsCar } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "../../api/axios";
import Sidebar from "../../components/Mec-Dashboard/Sidebar";
import Topbar from "../../components/Mec-Dashboard/Topbar";

// Hardcoded production base URL from your verified Postman setup to prevent routing mixups
const BASE_URL = "https://backend-production-080f.up.railway.app";

const FALLBACK_IMAGES = {
  default: "https://images.unsplash.com/photo-1617886326072-1bed7f8d2228?auto=format&fit=crop&w=600&q=80"
};

export default function JobRequests() {
  const [activeTab, setActiveTab] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const toggleSidebar = () => setIsOpen(!isOpen);

  // Helper to grab token safely from localStorage
  const getAuthHeader = () => {
    const token = localStorage.getItem("token"); 
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  // ---------------------------------------------------------------------------
  // 1. DYNAMIC API QUERIES (Using absolute URLs + Token Headers)
  // ---------------------------------------------------------------------------
  
  // Tab 0: Fetch Available Jobs
  const { data: incomingData, isLoading: loadingIncoming, error: errorIncoming, isError: isErrorIncoming } = useQuery({
    queryKey: ["jobsAvailable"],
    queryFn: async () => {
      const res = await axios.get(`${BASE_URL}/jobs/provider/available`, {
        headers: getAuthHeader()
      });
      return res.data; 
    }
  });

  // Tab 1: Fetch Active Jobs
  const { data: activeData, isLoading: loadingActive, error: errorActive, isError: isErrorActive } = useQuery({
    queryKey: ["jobsActive"],
    queryFn: async () => {
      const res = await axios.get(`${BASE_URL}/jobs/status/ACCEPTED`, {
        headers: getAuthHeader()
      });
      return res.data;
    }
  });

  // Tab 2: Fetch Completed Jobs
  const { data: completedData, isLoading: loadingCompleted, error: errorCompleted, isError: isErrorCompleted } = useQuery({
    queryKey: ["jobsCompleted"],
    queryFn: async () => {
      const res = await axios.get(`${BASE_URL}/jobs/status/COMPLETED`, {
        headers: getAuthHeader()
      });
      return res.data;
    }
  });

  // ---------------------------------------------------------------------------
  // 2. DATA MUTATIONS (Compatible with TanStack Query v4 & v5)
  // ---------------------------------------------------------------------------
  const acceptJobMutation = useMutation({
    mutationFn: async (jobId) => {
      return await axios.post(`${BASE_URL}/jobs/${jobId}/accept`, {}, {
        headers: getAuthHeader()
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["jobsAvailable"]);
      queryClient.invalidateQueries(["jobsActive"]);
      setActiveTab(1); 
    }
  });

  const declineJobMutation = useMutation({
    mutationFn: async (jobId) => {
      return await axios.post(`${BASE_URL}/jobs/${jobId}/reject`, {}, {
        headers: getAuthHeader()
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["jobsAvailable"]);
    }
  });

  // Safe status checking variables for button loading state indicators
  const isAccepting = acceptJobMutation.isPending || acceptJobMutation.isLoading;
  const isDeclining = declineJobMutation.isPending || declineJobMutation.isLoading;

  // ---------------------------------------------------------------------------
  // 3. SECURE DATA TRANSLATION LAYER (Guarded against unexpected property crashes)
  // ---------------------------------------------------------------------------
  const transformJobs = (rawPayload, targetStatus) => {
    if (!rawPayload) return [];
    
    const items = Array.isArray(rawPayload) 
      ? rawPayload 
      : Array.isArray(rawPayload?.data) 
        ? rawPayload.data 
        : [];

    return items.map((j) => {
      if (!j) return null;

      // Clean format date string from ISO ("2026-06-17T11:00..." -> "Jun 17, 11:00 AM")
      let displayDate = j.scheduledAt || j.scheduledDate || j.bookingTime || "Pending Date";
      if (j.scheduledAt) {
        try {
          displayDate = new Date(j.scheduledAt).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          });
        } catch (e) {
          // Fall back gracefully if parsing fails
        }
      }

      // Safeguard nested customer mapping values
      const fallbackName = j.customerName || j.customer?.name || "Client Request";
      const fullName = j.user 
        ? `${j.user.firstName || ""} ${j.user.lastName || ""}`.trim() 
        : fallbackName;

      return {
        id: j.id || j._id || Math.random().toString(),
        name: fullName || "Client Request",
        service: j.title || j.serviceName || "Mechanical Service",
        serviceColor: targetStatus === "completed" ? "text-green-600" : "text-blue-600",
        car: j.description || `${j.carMake || "Vehicle"} ${j.carModel || ""}`.trim(),
        scheduledDate: displayDate,
        completedDate: j.completedAt || j.updatedAt || "Closed",
        distance: j.distance || "Within Area",
        progress: j.progressPercentage || j.progress || 0,
        image: j.image || FALLBACK_IMAGES.default,
        status: targetStatus
      };
    }).filter(Boolean); // Cleans out any unexpected null array objects
  };

  const incomingJobs = transformJobs(incomingData, "incoming");
  const activeJobs = transformJobs(activeData, "active");
  const completedJobs = transformJobs(completedData, "completed");

  const tabs = [
    { label: "Incoming", jobs: incomingJobs, loading: loadingIncoming, isError: isErrorIncoming, error: errorIncoming },
    { label: "Active", jobs: activeJobs, loading: loadingActive, isError: isErrorActive, error: errorActive },
    { label: "Completed", jobs: completedJobs, loading: loadingCompleted, isError: isErrorCompleted, error: errorCompleted },
  ];

  const currentTab = tabs[activeTab];
  const currentJobs = currentTab?.jobs || [];

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
          <h1 className="text-xl sm:text-2xl font-black text-gray-800">Job Requests</h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Manage {incomingJobs.length} pending service requests in your current service area.
          </p>

          {/* TABS CONTROLLER */}
          <div className="flex border-b border-gray-200 mt-6 mb-6">
            {tabs.map((tab, index) => (
              <button
                key={tab.label}
                onClick={() => setActiveTab(index)}
                className={`px-4 py-2 text-sm font-semibold border-b-2 transition-colors ${
                  activeTab === index
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab.label} ({tab.jobs.length})
              </button>
            ))}
          </div>

          {/* CATCH LIVE CONNECTION ERRORS INSTEAD OF BLANKING OUT */}
          {currentTab.isError ? (
            <div className="bg-red-50 border border-red-200 rounded-xl p-5 text-center my-4 max-w-xl mx-auto">
              <FiAlertTriangle className="text-red-500 text-2xl mx-auto mb-2" />
              <h3 className="text-red-800 font-bold text-sm">Network Synchronization Error</h3>
              <p className="text-red-600 text-xs mt-1 select-all font-mono bg-white p-2 border rounded border-red-100">
                {currentTab.error?.message || "Check network configurations"}
              </p>
              <p className="text-[11px] text-gray-400 mt-2">
                Verify that your auth token hasn't expired and your API server is active.
              </p>
            </div>
          ) : currentTab.loading ? (
            <div className="flex items-center justify-center h-48 text-xs font-semibold tracking-wide text-gray-400 animate-pulse">
              ⚡ RETRIEVING SERVICE TRACKS FROM SERVER...
            </div>
          ) : currentJobs.length === 0 ? (
            <div className="flex items-center justify-center h-48 text-gray-400 text-sm">
              No {currentTab.label.toLowerCase()} jobs found.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {currentJobs.map((job) => (
                <div key={job.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                  
                  <div className="relative">
                    <img src={job.image} alt={job.service} className="w-full h-44 object-cover" />
                    <div className="absolute top-3 right-3 flex items-center gap-1 bg-white/90 backdrop-blur-sm text-gray-700 text-xs font-semibold px-2.5 py-1 rounded-full shadow-sm">
                      <FiMapPin size={11} className="text-gray-500" />
                      {job.distance}
                    </div>
                  </div>

                  <div className="p-4">
                    <div className="flex items-start justify-between mb-1">
                      <p className="font-bold text-gray-900 text-sm">{job.name}</p>
                      <div className="text-right">
                        <p className="text-xs text-gray-400 uppercase tracking-wide font-semibold">Scheduled</p>
                        <p className="text-xs text-gray-700 font-semibold">{job.scheduledDate}</p>
                      </div>
                    </div>

                    <p className={`text-xs font-semibold mb-3 ${job.serviceColor}`}>{job.service}</p>

                    <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-4">
                      <MdOutlineDirectionsCar size={14} />
                      {job.car}
                    </div>

                    {/* ACTIONS INTERACTION CONTROLLER */}
                    {job.status === "incoming" && (
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => acceptJobMutation.mutate(job.id)}
                          disabled={isAccepting}
                          className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white text-sm font-semibold py-2.5 rounded-lg transition-colors"
                        >
                          {isAccepting ? "Accepting..." : "Accept Request"}
                        </button>
                        <button
                          onClick={() => declineJobMutation.mutate(job.id)}
                          disabled={isDeclining}
                          className="text-gray-500 hover:text-red-500 disabled:text-gray-300 text-sm font-semibold px-3 py-2.5 transition-colors"
                        >
                          Decline
                        </button>
                      </div>
                    )}

                    {job.status === "active" && (
                      <div className="flex items-center gap-3">
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <p className="text-xs text-gray-500">{job.service}</p>
                            <p className="text-xs font-bold text-blue-600">{job.progress}%</p>
                          </div>
                          <div className="w-full bg-gray-100 rounded-full h-1.5">
                            <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: `${job.progress}%` }} />
                          </div>
                        </div>
                        <button
                          onClick={() => navigate("/mec-dashboard/active-jobs")}
                          className="text-blue-600 text-xs font-semibold px-3 py-2.5 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors"
                        >
                          View
                        </button>
                      </div>
                    )}

                    {job.status === "completed" && (
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-green-600 bg-green-50 px-3 py-1.5 rounded-lg">
                          ✓ Completed — {job.completedDate}
                        </span>
                        <button
                          onClick={() => navigate("/mec-dashboard/completed-jobs")}
                          className="text-blue-600 text-xs font-semibold px-3 py-2.5 hover:underline transition-colors"
                        >
                          View Details
                        </button>
                      </div>
                    )}

                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="flex flex-col items-center gap-3 mt-8">
            <button className="border bg-white border-gray-200 text-gray-700 text-sm font-semibold px-6 py-2.5 rounded-lg hover:bg-gray-50 transition-colors">
              Load More Requests
            </button>
            <p className="text-xs text-gray-400">or</p>
            <button className="flex items-center bg-white text-blue-600 gap-2 border border-blue-200 text-sm font-semibold px-6 py-2.5 rounded-full hover:bg-gray-50 transition-colors">
              <FiMapPin size={14} />
              Switch to Map View
            </button>
          </div>

        </main>
      </div>
    </div>
  );
}