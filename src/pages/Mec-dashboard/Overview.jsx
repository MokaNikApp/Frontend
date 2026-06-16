import Sidebar from "../../components/Mec-Dashboard/Sidebar";
import Topbar from "../../components/Mec-Dashboard/Topbar";
import Stats from "../../components/Mec-Dashboard/Stats";
import Schedule from "../../components/Mec-Dashboard/Schedule";
import Activity from "../../components/Mec-Dashboard/Activity";
import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../api/axios";

export default function Overview() {
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);
  const [isOnline, setIsOnline] = useState(true);

  const toggleSidebar = () => setIsOpen(!isOpen);

  // ==========================================
  // 1. FETCH DASHBOARD DATA (WITH TANSTACK QUERY)
  // ==========================================
  const { data: rawResponse, isLoading, error } = useQuery({
    queryKey: ["providerDashboard"],
    queryFn: async () => {
      const response = await api.get("/provider/dashboard");
      return response.data;
    },
    retry: 1, // Avoids endless spamming loops on 500 errors
  });

  console.log(rawResponse); // Debug log to inspect raw API response structure

  // ==========================================
  // 2. ROBUST UNWRAP & FALLBACK STRUCTURES
  // ==========================================
  // Safely normalizes response object variations (response.data vs response.data.data)
  const dashboardData = rawResponse?.data && typeof rawResponse.data === "object" && !Array.isArray(rawResponse.data)
    ? rawResponse.data
    : rawResponse;

  const mecData = dashboardData || {}; 

  // Sync initial availability status from server records if available
  useEffect(() => {
    if (mecData?.provider?.isOnline !== undefined) {
      setIsOnline(mecData.provider.isOnline);
    }
  }, [mecData]);

  // ==========================================
  // 3. TOGGLE AVAILABILITY STATUS MUTATION
  // ==========================================
  const toggleStatusMutation = useMutation({
    mutationFn: async (onlineStatus) => {
      const response = await api.patch("/provider/availability", { isOnline: onlineStatus });
      return response.data;
    },
    onMutate: async (newStatus) => {
      setIsOnline(newStatus);
    },
    onError: (err) => {
      setIsOnline(!isOnline);
      console.error("Failed to update status on server:", err);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["providerDashboard"]);
    },
  });

  const handleStatusChange = (newStatus) => {
    toggleStatusMutation.mutate(newStatus);
  };

  // Global Loading Full-Screen Overlay 
  if (isLoading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-gray-50">
        <div className="text-blue-600 font-semibold animate-pulse flex items-center gap-2">
          <span className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></span>
          Constructing your workspace...
        </div>
      </div>
    );
  }

  // Safe Data Extraction Mappings
  const providerName = mecData.provider?.firstName || mecData.provider?.name?.split(" ")[0] || "Mechanic";
  const todayAppointments = Array.isArray(mecData.todayAppointments) ? mecData.todayAppointments : [];
  const recentActivities = Array.isArray(mecData.recentActivities) ? mecData.recentActivities : [];
  const metrics = mecData.metrics || {};
  
  const todayJobsCount = todayAppointments.length || mecData.todayAppointmentsCount || 0;
  const urgentJobsCount = mecData.urgentAlertsCount ?? 0;

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 dashboard-container">
      
      {/* --- GLOBAL STYLING COMPATIBILITY BLOCKS --- */}
      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-stagger-1 { animation: fadeSlideUp 0.4s ease-out forwards; animation-delay: 0.05s; opacity: 0; }
        .animate-stagger-2 { animation: fadeSlideUp 0.4s ease-out forwards; animation-delay: 0.12s; opacity: 0; }
        .animate-stagger-3 { animation: fadeSlideUp 0.4s ease-out forwards; animation-delay: 0.20s; opacity: 0; }
        .animate-stagger-4 { animation: fadeSlideUp 0.4s ease-out forwards; animation-delay: 0.28s; opacity: 0; }

        .dashboard-container .border-black,
        .dashboard-container [class*="border-gray-700"],
        .dashboard-container [class*="border-gray-800"],
        .dashboard-container [class*="border-gray-900"] {
            border-color: #e5e7eb !important; 
        }
      `}</style>

      {/* Navigation Layout Controls */}
      <Sidebar
        isOpen={isOpen}
        toggleSidebar={toggleSidebar}
        isOnline={isOnline}
        setIsOnline={handleStatusChange}
      />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Topbar 
          toggleSidebar={toggleSidebar} 
          isOnline={isOnline} 
          setIsOnline={handleStatusChange} 
        />

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6">
          
          {/* Non-blocking Error Banner */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-red-700 font-medium animate-stagger-1 shadow-sm">
              <p>
                ⚠️ <strong>Server Connection Alert:</strong> {error?.response?.data?.message || "Internal database profile initialization error (500). Defaulting to layout parameters."}
              </p>
              <button 
                onClick={() => queryClient.invalidateQueries(["providerDashboard"])}
                className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold tracking-wide shadow-sm self-start sm:self-auto transition-colors whitespace-nowrap"
              >
                Retry Stream
              </button>
            </div>
          )}

          {/* GREETING SECTION */}
          <div className="animate-stagger-1 bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:px-8 hover:shadow-md transition-shadow duration-300 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-full opacity-50 pointer-events-none"></div>
            
            <div className="relative z-10">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-gray-800 tracking-tight">
                {/* Fixed the crash point by adding safe optional chaining access */}
                {rawResponse?.greeting || `Welcome back, ${providerName}`}
              </h1>
              <p className="text-sm text-gray-500 mt-1.5 font-medium">
                You have <strong className="text-gray-800">{rawResponse?.upcoming?.length || todayJobsCount}</strong> appointments scheduled for today.{" "}
                {urgentJobsCount > 0 ? (
                  <span className="text-red-500 font-bold">{urgentJobsCount} require immediate attention.</span>
                ) : (
                  "Everything looks stable."
                )}
              </p>
            </div>
          </div>

          {/* METRICS DASHBOARD CARDS */}
          <div className="animate-stagger-2">
            <Stats data={metrics} />
          </div>

          {/* SYSTEM MONITORING CARDS GRID */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            
            {/* Live Operational Schedule List */}
            <div className="xl:col-span-2 animate-stagger-3 bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col overflow-hidden h-full p-6">
              <Schedule data={todayAppointments} />
            </div>

            {/* Audit Logs / Activity Track */}
            <div className="animate-stagger-4 bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col overflow-hidden h-full p-6">
              <Activity data={recentActivities} />
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}