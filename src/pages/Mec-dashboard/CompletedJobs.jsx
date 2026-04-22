import { useState, useRef, useEffect } from "react";
import { FiDownload, FiFilter, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { FaStar, FaRegStar } from "react-icons/fa";
import Sidebar from "../../components/Mec-Dashboard/Sidebar";
import Topbar from "../../components/Mec-Dashboard/Topbar";
import { useJobs } from "../../context/JobsContext";

const ROWS_PER_PAGE = 5;
const filterOptions = ["All Services", "Oil Change", "Brake Service", "Diagnostics", "Inspection", "Transmission"];

function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i} className="text-yellow-400 text-xs">
          {i <= rating ? <FaStar /> : <FaRegStar />}
        </span>
      ))}
    </div>
  );
}

export default function CompletedJobs() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All Services");
  const filterRef = useRef(null);
  const { completedJobs } = useJobs();

  const toggleSidebar = () => setIsOpen(!isOpen);

  useEffect(() => {
    function handleClickOutside(e) {
      if (filterRef.current && !filterRef.current.contains(e.target)) setShowFilterMenu(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredRecords = activeFilter === "All Services"
    ? completedJobs
    : completedJobs.filter((r) =>
        r.service.toLowerCase().includes(activeFilter.toLowerCase().replace(" service", ""))
      );

  const totalPages = Math.max(1, Math.ceil(filteredRecords.length / ROWS_PER_PAGE));
  const paginated = filteredRecords.slice((currentPage - 1) * ROWS_PER_PAGE, currentPage * ROWS_PER_PAGE);

  const avgRating = completedJobs.length
    ? (completedJobs.reduce((s, j) => s + (j.rating || 0), 0) / completedJobs.length).toFixed(1)
    : "—";

  const totalRevenue = completedJobs.reduce((s, j) => {
    const num = parseFloat((j.amount || "0").replace(/[^0-9.]/g, ""));
    return s + (isNaN(num) ? 0 : num);
  }, 0).toLocaleString();

  const handleExport = () => {
    const headers = ["Date", "Customer", "Service", "Amount", "Rating", "Review"];
    const rows = completedJobs.map((r) => [r.completedDate, r.name, r.service, r.amount, r.rating, r.review]);
    const csvContent = [headers, ...rows].map((row) => row.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "completed_jobs.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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

          {/* PAGE HEADER */}
          <div className="mb-6">
            <h1 className="text-xl sm:text-2xl font-black text-gray-800">Completed Jobs</h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Overview of all services rendered and customer feedback.
            </p>
          </div>

          {/* STATS CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
              <p className="text-xs text-gray-500 mb-1">Total Jobs Completed</p>
              <div className="flex items-center gap-2 justify-between">
                <p className="text-3xl font-black text-gray-900">{completedJobs.length}</p>
                <p className="text-xs bg-green-100 text-green-500 font-semibold mt-1">+12% this month</p>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
              <p className="text-xs text-gray-500 mb-1">Average Satisfaction</p>
              <div className="flex items-center gap-2 justify-between">
                <div className="flex items-center gap-2">
                  <p className="text-3xl font-black text-gray-900">{avgRating}</p>
                  <FaStar className="text-yellow-400 text-xl" />
                </div>
                <p className="text-xs bg-gray-100 text-gray-400 mt-1">Last 90 days</p>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
              <p className="text-xs text-gray-500 mb-1">Revenue (Jobs Only)</p>
              <div className="flex items-center gap-2 justify-between">
                <p className="text-3xl font-black text-gray-900">SAR {totalRevenue}</p>
                <p className="text-xs bg-green-100 text-green-500 font-semibold mt-1">+8.2%</p>
              </div>
            </div>

          </div>

          {/* SERVICE HISTORY TABLE */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">

            {/* TABLE HEADER */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <p className="font-bold text-gray-800 text-sm">Service History</p>
                <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                  {completedJobs.length} Records
                </span>
              </div>
              <div className="flex items-center gap-2">

                {/* FILTER */}
                <div className="relative" ref={filterRef}>
                  <button
                    onClick={() => setShowFilterMenu(!showFilterMenu)}
                    className="flex items-center gap-1.5 border border-gray-200 text-gray-600 text-xs font-semibold px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <FiFilter size={13} /> Filter
                  </button>
                  {showFilterMenu && (
                    <div className="absolute right-0 top-9 bg-white border border-gray-100 rounded-xl shadow-lg z-20 w-44 py-1 overflow-hidden">
                      {filterOptions.map((opt) => (
                        <button
                          key={opt}
                          onClick={() => { setActiveFilter(opt); setShowFilterMenu(false); setCurrentPage(1); }}
                          className={`w-full text-left px-4 py-2 text-xs font-medium transition-colors ${
                            activeFilter === opt
                              ? "bg-blue-50 text-blue-600"
                              : "text-gray-700 hover:bg-gray-50"
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* EXPORT */}
                <button
                  onClick={handleExport}
                  className="flex items-center gap-1.5 border border-gray-200 text-gray-600 text-xs font-semibold px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <FiDownload size={13} /> Export
                </button>

              </div>
            </div>

            {/* TABLE */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left text-xs font-semibold text-gray-400 px-5 py-3">DATE</th>
                    <th className="text-left text-xs font-semibold text-gray-400 px-5 py-3">CUSTOMER</th>
                    <th className="text-left text-xs font-semibold text-gray-400 px-5 py-3">SERVICE TYPE</th>
                    <th className="text-left text-xs font-semibold text-gray-400 px-5 py-3">AMOUNT</th>
                    <th className="text-left text-xs font-semibold text-gray-400 px-5 py-3">RATING</th>
                    <th className="text-left text-xs font-semibold text-gray-400 px-5 py-3">REVIEW SUMM...</th>
                  </tr>
                </thead>
                <tbody>
                  {paginated.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-5 py-8 text-center text-xs text-gray-400">
                        No completed jobs yet.
                      </td>
                    </tr>
                  ) : (
                    paginated.map((row, index) => (
                      <tr
                        key={row.id}
                        className={`border-b border-gray-50 hover:bg-gray-50 transition-colors ${
                          index === paginated.length - 1 ? "border-0" : ""
                        }`}
                      >
                        <td className="px-5 py-4 text-xs text-gray-500 whitespace-nowrap">{row.completedDate}</td>
                        <td className="px-5 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${row.initialsColor}`}>
                              {row.initials}
                            </div>
                            <span className="text-xs font-semibold text-gray-800">{row.name}</span>
                          </div>
                        </td>
                        <td className="px-5 py-4 whitespace-nowrap">
                          <span className={`text-xs font-semibold ${row.serviceColor}`}>{row.service}</span>
                        </td>
                        <td className="px-5 py-4 text-xs font-semibold text-gray-800 whitespace-nowrap">{row.amount}</td>
                        <td className="px-5 py-4 whitespace-nowrap">
                          <StarRating rating={row.rating || 0} />
                        </td>
                        <td className="px-5 py-4 text-xs text-gray-500 max-w-35 truncate">{row.review || "—"}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* PAGINATION */}
            <div className="flex items-center justify-between px-5 py-4 border-t border-gray-100">
              <p className="text-xs text-gray-400">
                Showing {filteredRecords.length === 0 ? 0 : ((currentPage - 1) * ROWS_PER_PAGE) + 1} to {Math.min(currentPage * ROWS_PER_PAGE, filteredRecords.length)} of {filteredRecords.length} results
              </p>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="w-7 h-7 flex items-center justify-center rounded-md border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  <FiChevronLeft size={13} />
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-7 h-7 flex items-center justify-center rounded-md text-xs font-semibold transition-colors ${
                      currentPage === page
                        ? "bg-blue-600 text-white"
                        : "border border-gray-200 text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="w-7 h-7 flex items-center justify-center rounded-md border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  <FiChevronRight size={13} />
                </button>
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}