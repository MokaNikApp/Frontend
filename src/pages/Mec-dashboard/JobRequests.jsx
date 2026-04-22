import { useState } from "react";
import { FiMapPin } from "react-icons/fi";
import { MdOutlineDirectionsCar } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Mec-Dashboard/Sidebar";
import Topbar from "../../components/Mec-Dashboard/Topbar";
import { useJobs } from "../../context/JobsContext";

export default function JobRequests() {
  const [activeTab, setActiveTab] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const navigate = useNavigate();

  const { incomingJobs, activeJobs, completedJobs, acceptJob, declineJob } = useJobs();

  const toggleSidebar = () => setIsOpen(!isOpen);

  const tabs = [
    { label: "Incoming", jobs: incomingJobs },
    { label: "Active", jobs: activeJobs },
    { label: "Completed", jobs: completedJobs },
  ];

  const currentJobs = tabs[activeTab].jobs;

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
          <h1 className="text-xl sm:text-2xl font-black text-gray-800">Job Requests</h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Manage {incomingJobs.length} pending service requests in your current service area.
          </p>

          {/* TABS */}
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

          {/* CARDS GRID */}
          {currentJobs.length === 0 ? (
            <div className="flex items-center justify-center h-48 text-gray-400 text-sm">
              No {tabs[activeTab].label.toLowerCase()} jobs found.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {currentJobs.map((job) => (
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

                    {/* INCOMING: Accept / Decline */}
                    {job.status === "incoming" && (
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => { acceptJob(job.id); setActiveTab(1); }}
                          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-2.5 rounded-lg transition-colors"
                        >
                          Accept Request
                        </button>
                        <button
                          onClick={() => declineJob(job.id)}
                          className="text-gray-500 hover:text-red-500 text-sm font-semibold px-3 py-2.5 transition-colors"
                        >
                          Decline
                        </button>
                      </div>
                    )}

                    {/* ACTIVE: View in Active Jobs */}
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

                    {/* COMPLETED: View in Completed Jobs */}
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

        </main>
      </div>
    </div>
  );
}