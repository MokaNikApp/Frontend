






import { useState, useEffect, useCallback } from "react";
import { FiAlertTriangle, FiX, FiClock, FiMail, FiUser } from "react-icons/fi";
import { MdOutlineDirectionsCar } from "react-icons/md";
import Sidebar from "../../components/Mec-Dashboard/Sidebar";
import Topbar from "../../components/Mec-Dashboard/Topbar";
import api from "../../api/axios";

const TAB_CONFIG = [
  { label: "Incoming", key: "incoming" },
  { label: "Active", key: "active" },
  { label: "Completed", key: "completed" },
  { label: "Declined", key: "declined" },
];

// Statuses that count as "Active"
const ACTIVE_STATUSES = ["ACCEPTED", "EN_ROUTE", "IN_PROGRESS"];

// Statuses that count as "Declined"
const DECLINED_STATUSES = ["REJECTED", "CANCELLED"];

const STATUS_STYLES = {
  PENDING: { badge: "bg-yellow-50 text-yellow-700", label: "Pending" },
  ACCEPTED: { badge: "bg-indigo-50 text-indigo-700", label: "Accepted" },
  EN_ROUTE: { badge: "bg-purple-50 text-purple-700", label: "En Route" },
  IN_PROGRESS: { badge: "bg-blue-50 text-blue-700", label: "In Progress" },
  COMPLETED: { badge: "bg-green-50 text-green-700", label: "Completed" },
  REJECTED: { badge: "bg-red-50 text-red-700", label: "Rejected" },
  CANCELLED: { badge: "bg-red-50 text-red-700", label: "Cancelled" },
};

const currency = (kobo) => {
  if (kobo === null || kobo === undefined || kobo === "") return "";
  return new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN" }).format(
    (Number(kobo) || 0) / 100
  );
};

const formatDate = (iso) => {
  if (!iso) return "";
  try {
    return new Date(iso).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return "";
  }
};

const fullName = (person) => {
  if (!person) return "";
  return [person.firstName, person.lastName].filter(Boolean).join(" ").trim();
};

// Rough progress estimate derived from which timeline timestamps are set
const estimateProgress = (job) => {
  if (!job) return 0;
  if (job.status === "COMPLETED") return 100;
  if (job.startedAt) return 75;
  if (job.enRouteAt) return 50;
  if (job.acceptedAt) return 25;
  return 10;
};

export default function JobRequests() {
  const [activeTab, setActiveTab] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [isOnline, setIsOnline] = useState(true);

  const [jobsByTab, setJobsByTab] = useState({ incoming: [], active: [], completed: [], declined: [] });
  const [paginationByTab, setPaginationByTab] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [actionLoadingId, setActionLoadingId] = useState(null);

  // Job detail / timeline modal
  const [selectedJob, setSelectedJob] = useState(null);
  const [timeline, setTimeline] = useState([]);
  const [detailLoading, setDetailLoading] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);
  const currentKey = TAB_CONFIG[activeTab].key;
  const currentJobs = jobsByTab[currentKey] || [];

  // --- Fetch jobs for a specific tab ---
  const fetchTabJobs = useCallback(async (tabKey, page = 1) => {
    console.log("[fetchTabJobs] Starting fetch for tab:", tabKey, "page:", page);
    setLoading(true);
    setError(null);
    try {
      if (tabKey === "incoming") {
        console.log("[fetchTabJobs] Fetching incoming jobs from /jobs/provider/available");
        const { data } = await api.get("/jobs/provider/available");
        console.log("[fetchTabJobs] Incoming response:", data);
        const jobs = data?.data || [];
        console.log("[fetchTabJobs] Incoming jobs count:", jobs.length, "jobs:", jobs);
        setJobsByTab((prev) => ({ ...prev, incoming: jobs }));
      } else if (tabKey === "active") {
        console.log("[fetchTabJobs] Fetching active jobs with statuses:", ACTIVE_STATUSES);
        const responses = await Promise.all(
          ACTIVE_STATUSES.map((status) =>
            api.get(`/jobs/status/${status}`).catch((err) => {
              console.log(`[fetchTabJobs] Error fetching status ${status}:`, err?.response?.data || err.message);
              return { data: { data: [] } };
            })
          )
        );
        console.log("[fetchTabJobs] Active raw responses:", responses);
        const merged = responses.flatMap((res) => res.data?.data || []);
        console.log("[fetchTabJobs] Active merged jobs count:", merged.length, "jobs:", merged);
        merged.sort((a, b) => new Date(a.scheduledAt) - new Date(b.scheduledAt));
        setJobsByTab((prev) => ({ ...prev, active: merged }));
      } else if (tabKey === "completed") {
        console.log("[fetchTabJobs] Fetching completed jobs from /jobs/status/COMPLETED, page:", page);
        const { data } = await api.get(`/jobs/status/COMPLETED`, {
          params: { page, limit: 10 },
        });
        console.log("[fetchTabJobs] Completed response:", data);
        const jobs = data?.data || [];
        console.log("[fetchTabJobs] Completed jobs count:", jobs.length, "jobs:", jobs);
        setJobsByTab((prev) => ({
          ...prev,
          completed:
            page === 1
              ? jobs
              : [...(prev.completed || []), ...jobs],
        }));
        setPaginationByTab((prev) => ({ ...prev, completed: data?.pagination }));
      } else if (tabKey === "declined") {
        console.log("[fetchTabJobs] Fetching declined jobs with statuses:", DECLINED_STATUSES);
        const responses = await Promise.all(
          DECLINED_STATUSES.map((status) =>
            api.get(`/jobs/status/${status}`).catch((err) => {
              console.log(`[fetchTabJobs] Error fetching declined status ${status}:`, err?.response?.data || err.message);
              return { data: { data: [] } };
            })
          )
        );
        console.log("[fetchTabJobs] Declined raw responses:", responses);
        const merged = responses.flatMap((res) => res.data?.data || []);
        console.log("[fetchTabJobs] Declined merged jobs count:", merged.length, "jobs:", merged);
        merged.sort((a, b) => new Date(b.updatedAt || b.createdAt) - new Date(a.updatedAt || a.createdAt));
        setJobsByTab((prev) => ({ ...prev, declined: merged }));
      }
    } catch (err) {
      console.error("[fetchTabJobs] Error:", err);
      setError(err?.response?.data?.message || "Failed to load jobs. Please try again.");
    } finally {
      setLoading(false);
      console.log("[fetchTabJobs] Finished fetch for tab:", tabKey);
    }
  }, []);

  // --- PRE-FETCH ALL TABS ON MOUNT ---
  // This ensures all tabs have data ready when you click them
  useEffect(() => {
    console.log("[MOUNT] Pre-fetching all tabs on mount...");
    const loadAll = async () => {
      setLoading(true);
      await Promise.all(
        TAB_CONFIG.map((tab) => fetchTabJobs(tab.key, 1).catch(() => {}))
      );
      setLoading(false);
    };
    loadAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // --- Also fetch when tab changes (for pagination/load-more) ---
  useEffect(() => {
    console.log("[useEffect] Tab changed to:", currentKey);
    // Only fetch if this tab has no data yet (pre-fetch handles initial load)
    if (jobsByTab[currentKey]?.length === 0 && !loading) {
      fetchTabJobs(currentKey, 1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentKey]);

  // --- Accept / Reject incoming jobs ---
  const handleAccept = async (jobId) => {
    console.log("[handleAccept] Accepting job:", jobId);
    setActionLoadingId(jobId);
    setError(null);
    try {
      const response = await api.post(`/jobs/${jobId}/accept`);
      console.log("[handleAccept] Accept response:", response.data);
      setJobsByTab((prev) => ({
        ...prev,
        incoming: prev.incoming.filter((j) => j.id !== jobId),
      }));
      console.log("[handleAccept] Job removed from incoming. Refreshing active tab...");
      fetchTabJobs("active");
    } catch (err) {
      console.error("[handleAccept] Error:", err?.response?.data || err.message);
      setError(err?.response?.data?.message || "Could not accept this job.");
    } finally {
      setActionLoadingId(null);
      console.log("[handleAccept] Done.");
    }
  };

  const handleReject = async (jobId) => {
    console.log("[handleReject] Rejecting job:", jobId);
    setActionLoadingId(jobId);
    setError(null);
    try {
      const response = await api.post(`/jobs/${jobId}/reject`);
      console.log("[handleReject] Reject response:", response.data);
      setJobsByTab((prev) => ({
        ...prev,
        incoming: prev.incoming.filter((j) => j.id !== jobId),
      }));
      console.log("[handleReject] Job removed from incoming. Refreshing declined tab...");
      fetchTabJobs("declined");
    } catch (err) {
      console.error("[handleReject] Error:", err?.response?.data || err.message);
      setError(err?.response?.data?.message || "Could not reject this job.");
    } finally {
      setActionLoadingId(null);
      console.log("[handleReject] Done.");
    }
  };

  // --- Job detail + timeline modal ---
  const openJobDetail = async (jobId) => {
    console.log("[openJobDetail] Opening detail for job:", jobId);
    setDetailLoading(true);
    setSelectedJob(null);
    setTimeline([]);
    setError(null);
    try {
      const [jobRes, timelineRes] = await Promise.all([
        api.get(`/jobs/${jobId}`),
        api.get(`/jobs/${jobId}/timeline`),
      ]);
      console.log("[openJobDetail] Job response:", jobRes.data);
      console.log("[openJobDetail] Timeline response:", timelineRes.data);
      const jobData = jobRes.data?.data || jobRes.data;
      const timelineData = timelineRes.data?.data || timelineRes.data || [];
      console.log("[openJobDetail] Parsed job:", jobData);
      console.log("[openJobDetail] Parsed timeline:", timelineData);
      setSelectedJob(jobData);
      setTimeline(timelineData);
    } catch (err) {
      console.error("[openJobDetail] Error:", err?.response?.data || err.message);
      setError(err?.response?.data?.message || "Could not load job details.");
    } finally {
      setDetailLoading(false);
      console.log("[openJobDetail] Done.");
    }
  };

  const closeJobDetail = () => {
    console.log("[closeJobDetail] Closing modal.");
    setSelectedJob(null);
    setTimeline([]);
  };

  const loadMoreCompleted = () => {
    const pg = paginationByTab.completed;
    console.log("[loadMoreCompleted] Current page:", pg?.page, "Total pages:", pg?.totalPages);
    if (!pg || pg.page >= pg.totalPages) return;
    fetchTabJobs("completed", pg.page + 1);
  };

  console.log("[RENDER] activeTab:", activeTab, "currentKey:", currentKey, "currentJobs count:", currentJobs.length);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} isOnline={isOnline} setIsOnline={setIsOnline} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Topbar toggleSidebar={toggleSidebar} isOnline={isOnline} setIsOnline={setIsOnline} />

        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          <h1 className="text-xl sm:text-2xl font-black text-gray-800">Job Requests</h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Manage {jobsByTab.incoming.length} pending service requests in your current service area.
          </p>

          {error && (
            <div className="mt-4 flex items-center gap-2 bg-red-50 border border-red-100 text-red-600 text-sm px-4 py-3 rounded-lg">
              <FiAlertTriangle size={16} />
              {error}
            </div>
          )}

          {/* TABS CONTROLLER */}
          <div className="flex border-b border-gray-200 mt-6 mb-6">
            {TAB_CONFIG.map((tab, index) => (
              <button
                key={tab.key}
                onClick={() => {
                  console.log("[TabClick] Switching to tab:", tab.key, "index:", index);
                  setActiveTab(index);
                }}
                className={`px-4 py-2 text-sm font-semibold border-b-2 transition-colors ${
                  activeTab === index
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab.label} ({(jobsByTab[tab.key] || []).length})
              </button>
            ))}
          </div>

          {loading && currentJobs.length === 0 ? (
            <div className="flex items-center justify-center h-48 text-gray-400 text-sm">
              Loading jobs…
            </div>
          ) : currentJobs.length === 0 ? (
            <div className="flex items-center justify-center h-48 text-gray-400 text-sm">
              No {TAB_CONFIG[activeTab].label.toLowerCase()} jobs found.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {currentJobs.map((job) => {
                console.log("[RENDER JOB] job.id:", job.id, "status:", job.status);
                const statusStyle = STATUS_STYLES[job.status] || STATUS_STYLES.PENDING;
                const hasProvider = !!job.provider?.firstName;
                const userName = fullName(job.user);

                return (
                  <div key={job.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">

                    <div className="relative h-24 bg-gradient-to-r from-blue-50 to-gray-50 flex items-center px-5">
                      <div className="w-11 h-11 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-base shrink-0">
                        {userName ? userName.charAt(0) : "?"}
                      </div>
                      <div className="ml-3 min-w-0">
                        <p className="font-bold text-gray-900 text-sm truncate">{userName || "—"}</p>
                        {job.user?.email && (
                          <p className="text-xs text-gray-500 flex items-center gap-1 truncate">
                            <FiMail size={11} /> {job.user.email}
                          </p>
                        )}
                      </div>
                      <span className={`absolute top-3 right-3 text-xs font-semibold px-2.5 py-1 rounded-full ${statusStyle.badge}`}>
                        {statusStyle.label}
                      </span>
                    </div>

                    <div className="p-4">
                      <div className="flex items-start justify-between mb-1 gap-3">
                        <p className="font-bold text-gray-900 text-sm">{job.title || "—"}</p>
                        <div className="text-right shrink-0">
                          <p className="text-xs text-gray-400 uppercase tracking-wide font-semibold">Scheduled</p>
                          <p className="text-xs text-gray-700 font-semibold">{formatDate(job.scheduledAt) || "—"}</p>
                        </div>
                      </div>

                      {job.description && (
                        <p className="text-xs text-gray-500 mb-3 line-clamp-2">{job.description}</p>
                      )}

                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-1.5 text-xs text-gray-500">
                          <MdOutlineDirectionsCar size={14} />
                          Ref #{job.id ? job.id.slice(0, 8) : "—"}
                        </div>
                        {job.totalAmount !== null && job.totalAmount !== undefined && (
                          <p className="text-sm font-bold text-gray-800">{currency(job.totalAmount)}</p>
                        )}
                      </div>

                      {hasProvider && currentKey !== "incoming" && (
                        <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-4">
                          <FiUser size={13} />
                          Assigned to {fullName(job.provider)}
                        </div>
                      )}

                      {/* ACTIONS INTERACTION CONTROLLER */}
                      {currentKey === "incoming" && (
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => handleAccept(job.id)}
                            disabled={actionLoadingId === job.id}
                            className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-sm font-semibold py-2.5 rounded-lg transition-colors"
                          >
                            {actionLoadingId === job.id ? "Accepting…" : "Accept Request"}
                          </button>
                          <button
                            onClick={() => handleReject(job.id)}
                            disabled={actionLoadingId === job.id}
                            className="text-gray-500 hover:text-red-500 disabled:opacity-50 text-sm font-semibold px-3 py-2.5 transition-colors"
                          >
                            {actionLoadingId === job.id ? "Declining…" : "Decline"}
                          </button>
                        </div>
                      )}

                      {currentKey === "active" && (
                        <div className="flex items-center gap-3">
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <p className="text-xs text-gray-500">{statusStyle.label}</p>
                              <p className="text-xs font-bold text-blue-600">{estimateProgress(job)}%</p>
                            </div>
                            <div className="w-full bg-gray-100 rounded-full h-1.5">
                              <div
                                className="bg-blue-600 h-1.5 rounded-full"
                                style={{ width: `${estimateProgress(job)}%` }}
                              />
                            </div>
                          </div>
                          <button
                            onClick={() => openJobDetail(job.id)}
                            className="text-blue-600 text-xs font-semibold px-3 py-2.5 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors"
                          >
                            View
                          </button>
                        </div>
                      )}

                      {currentKey === "completed" && (
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-semibold text-green-600 bg-green-50 px-3 py-1.5 rounded-lg">
                            ✓ Completed {job.completedAt ? `— ${formatDate(job.completedAt)}` : ""}
                          </span>
                          <button
                            onClick={() => openJobDetail(job.id)}
                            className="text-blue-600 text-xs font-semibold px-3 py-2.5 hover:underline transition-colors"
                          >
                            View Details
                          </button>
                        </div>
                      )}

                      {currentKey === "declined" && (
                        <div className="flex items-center justify-between">
                          <span className={`text-xs font-semibold px-3 py-1.5 rounded-lg ${statusStyle.badge}`}>
                            ✕ {statusStyle.label} {job.updatedAt || job.createdAt ? `— ${formatDate(job.updatedAt || job.createdAt)}` : ""}
                          </span>
                          <button
                            onClick={() => openJobDetail(job.id)}
                            className="text-blue-600 text-xs font-semibold px-3 py-2.5 hover:underline transition-colors"
                          >
                            View Details
                          </button>
                        </div>
                      )}

                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {currentKey === "completed" &&
            paginationByTab.completed &&
            paginationByTab.completed.page < paginationByTab.completed.totalPages && (
              <div className="flex flex-col items-center gap-3 mt-8">
                <button
                  onClick={loadMoreCompleted}
                  className="border bg-white border-gray-200 text-gray-700 text-sm font-semibold px-6 py-2.5 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Load More Requests
                </button>
              </div>
            )}
        </main>
      </div>

      {/* JOB DETAIL / TIMELINE MODAL */}
      {(detailLoading || selectedJob) && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4"
          onClick={closeJobDetail}
        >
          <div
            className="bg-white rounded-xl shadow-lg w-full max-w-lg max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 sticky top-0 bg-white">
              <p className="font-bold text-gray-900 text-sm">Job Details</p>
              <button onClick={closeJobDetail} className="text-gray-400 hover:text-gray-700">
                <FiX size={18} />
              </button>
            </div>

            {detailLoading ? (
              <div className="p-8 text-center text-sm text-gray-400">Loading details…</div>
            ) : selectedJob ? (
              <div className="p-5">
                <p className="font-bold text-gray-900">{selectedJob.title || "—"}</p>
                {selectedJob.description && (
                  <p className="text-sm text-gray-500 mt-1">{selectedJob.description}</p>
                )}

                <div className="grid grid-cols-2 gap-4 mt-4 text-xs">
                  <div>
                    <p className="text-gray-400 uppercase font-semibold tracking-wide">Customer</p>
                    <p className="text-gray-700 font-semibold mt-0.5">{fullName(selectedJob.user) || "—"}</p>
                    {selectedJob.user?.email && (
                      <p className="text-gray-500">{selectedJob.user.email}</p>
                    )}
                  </div>
                  <div>
                    <p className="text-gray-400 uppercase font-semibold tracking-wide">Amount</p>
                    <p className="text-gray-700 font-semibold mt-0.5">
                      {selectedJob.totalAmount !== null && selectedJob.totalAmount !== undefined
                        ? currency(selectedJob.totalAmount)
                        : "—"}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-400 uppercase font-semibold tracking-wide">Scheduled</p>
                    <p className="text-gray-700 font-semibold mt-0.5">{formatDate(selectedJob.scheduledAt) || "—"}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 uppercase font-semibold tracking-wide">Status</p>
                    <p className="text-gray-700 font-semibold mt-0.5">
                      {STATUS_STYLES[selectedJob.status]?.label || selectedJob.status || "—"}
                    </p>
                  </div>
                </div>

                <div className="mt-6">
                  <p className="text-xs text-gray-400 uppercase font-semibold tracking-wide mb-3">Timeline</p>
                  {timeline.length === 0 ? (
                    <p className="text-xs text-gray-400">No timeline events yet.</p>
                  ) : (
                    <ul className="space-y-3">
                      {timeline.map((event, idx) => (
                        <li key={event.id || idx} className="flex items-start gap-3">
                          <FiClock size={14} className="text-blue-500 mt-0.5 shrink-0" />
                          <div>
                            <p className="text-xs font-semibold text-gray-700">
                              {event.label || event.status || event.title || "—"}
                            </p>
                            <p className="text-xs text-gray-400">
                              {formatDate(event.timestamp || event.createdAt) || "—"}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
}