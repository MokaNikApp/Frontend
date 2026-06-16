import { useState } from "react";
import { FiMapPin } from "react-icons/fi";
import { MdOutlineDirectionsCar } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Sidebar from "../../components/Mec-Dashboard/Sidebar";
import Topbar from "../../components/Mec-Dashboard/Topbar";

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

  // ---------------------------------------------------------------------------
  // 1. DYNAMIC API QUERIES (Updated to use your verified route patterns)
  // ---------------------------------------------------------------------------
  
  // Tab 0: Fetch Available Jobs
  const { data: incomingData, isLoading: loadingIncoming } = useQuery({
    queryKey: ["jobsAvailable"],
    queryFn: async () => {
      const res = await axios.get("/jobs/provider/available");
      return res.data; 
    }
  });

  // Tab 1: Fetch Active Jobs by Status Parameter
  const { data: activeData, isLoading: loadingActive } = useQuery({
    queryKey: ["jobsActive"],
    queryFn: async () => {
      const res = await axios.get("/jobs/status/ACCEPTED");
      return res.data;
    }
  });

  // Tab 2: Fetch Completed Jobs by Status Parameter
  const { data: completedData, isLoading: loadingCompleted } = useQuery({
    queryKey: ["jobsCompleted"],
    queryFn: async () => {
      const res = await axios.get("/jobs/status/COMPLETED");
      return res.data;
    }
  });

  // ---------------------------------------------------------------------------
  // 2. DATA MUTATIONS (Updated to match exact URL path parameters)
  // ---------------------------------------------------------------------------
  const acceptJobMutation = useMutation({
    mutationFn: async (jobId) => {
      return await axios.post(`/jobs/${jobId}/accept`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["jobsAvailable"]);
      queryClient.invalidateQueries(["jobsActive"]);
      setActiveTab(1); 
    }
  });

  const declineJobMutation = useMutation({
    mutationFn: async (jobId) => {
      return await axios.post(`/jobs/${jobId}/reject`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["jobsAvailable"]);
    }
  });

  // ---------------------------------------------------------------------------
  // 3. DATA TRANSLATION LAYER
  // ---------------------------------------------------------------------------
  const transformJobs = (rawPayload, targetStatus) => {
    const items = Array.isArray(rawPayload) 
      ? rawPayload 
      : Array.isArray(rawPayload?.data) 
        ? rawPayload.data 
        : [];

    return items.map((j) => ({
      id: j.id || j._id,
      name: j.customerName || j.customer?.name || "Client Request",
      service: j.serviceName || j.title || "Mechanical Service",
      serviceColor: targetStatus === "completed" ? "text-green-600" : "text-blue-600",
      car: `${j.carMake || j.vehicle || "Vehicle"} ${j.carModel || ""}`.trim(),
      scheduledDate: j.scheduledDate || j.bookingTime || "Pending Date",
      completedDate: j.completedAt || j.updatedAt || "Closed",
      distance: j.distance || "Within Area",
      progress: j.progressPercentage || j.progress || 0,
      image: j.image || FALLBACK_IMAGES.default,
      status: targetStatus
    }));
  };

  const incomingJobs = transformJobs(incomingData, "incoming");
  const activeJobs = transformJobs(activeData, "active");
  const completedJobs = transformJobs(completedData, "completed");

  const tabs = [
    { label: "Incoming", jobs: incomingJobs, loading: loadingIncoming },
    { label: "Active", jobs: activeJobs, loading: loadingActive },
    { label: "Completed", jobs: completedJobs, loading: loadingCompleted },
  ];

  const currentTab = tabs[activeTab];
  const currentJobs = currentTab.jobs;

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

          {/* CARDS LIST VIEWPORT */}
          {currentTab.loading ? (
            <div className="flex items-center justify-center h-48 text-xs font-semibold tracking-wide text-gray-400">
              ⚡ RETRIEVING SERVICE TRACKS...
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

                    {/* RENDER DYNAMIC CARD BUTTON ACTIONS */}
                    {job.status === "incoming" && (
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => acceptJobMutation.mutate(job.id)}
                          disabled={acceptJobMutation.isLoading}
                          className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white text-sm font-semibold py-2.5 rounded-lg transition-colors"
                        >
                          {acceptJobMutation.isLoading ? "Accepting..." : "Accept Request"}
                        </button>
                        <button
                          onClick={() => declineJobMutation.mutate(job.id)}
                          disabled={declineJobMutation.isLoading}
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