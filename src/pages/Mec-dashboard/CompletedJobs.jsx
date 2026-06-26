

import React, { useState, useRef, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  FiDownload,
  FiFilter,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import { FaStar, FaRegStar } from "react-icons/fa";
import api from "../../api/axios";
import Sidebar from "../../components/Mec-Dashboard/Sidebar";
import Topbar from "../../components/Mec-Dashboard/Topbar";

// ─── Constants ─────────────────────────────────────────────────────

const filterOptions = [
  "All Services",
  "Oil Change",
  "Brake Service",
  "Diagnostics",
  "Inspection",
  "Transmission",
];

const INITIAL_COLOR_PALETTE = [
  "bg-purple-100 text-purple-600",
  "bg-blue-100 text-blue-600",
  "bg-green-100 text-green-600",
  "bg-amber-100 text-amber-600",
  "bg-rose-100 text-rose-600",
];

// ─── Sub-Components ────────────────────────────────────────────────

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

// ─── Main Component ────────────────────────────────────────────────

export default function CompletedJobs() {
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All Services");
  const filterRef = useRef(null);

  const toggleSidebar = () => setIsOpen(!isOpen);

  // Close filter dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (filterRef.current && !filterRef.current.contains(e.target))
        setShowFilterMenu(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Toggle availability status
  const toggleStatusMutation = useMutation({
    mutationFn: async (onlineStatus) => {
      const response = await api.patch("/provider/availability", {
        isOnline: onlineStatus,
      });
      return response.data;
    },
    onMutate: async (newStatus) => {
      setIsOnline(newStatus);
    },
    onError: () => {
      setIsOnline(!isOnline);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["providerDashboard"]);
    },
  });

  const handleStatusChange = (newStatus) => {
    toggleStatusMutation.mutate(newStatus);
  };

  // ─── FETCH COMPLETED JOBS ──────────────────────────────────────
  const { data: jobsResponse, isLoading } = useQuery({
    queryKey: ["jobsCompleted", currentPage],
    queryFn: async () => {
      const res = await api.get(`/jobs/status/COMPLETED?page=${currentPage}&limit=10`);
      return res.data;
    },
    keepPreviousData: true,
  });

  // ─── Data Extraction ─────────────────────────────────────────
  const items = Array.isArray(jobsResponse?.data) ? jobsResponse.data : [];
  const pagination = jobsResponse?.pagination || {
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  };

  const completedJobs = items.map((j, idx) => {
    let displayDate = "Completed";
    const targetDate = j.completedAt || j.updatedAt || j.scheduledAt || j.createdAt;
    if (targetDate) {
      try {
        displayDate = new Date(targetDate).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        });
      } catch (err) {
        // Fallback
      }
    }

    const fallbackName =
      j.customerName || j.customer?.name || j.user?.firstName || "Client Request";
    const clientName = j.user
      ? `${j.user.firstName || ""} ${j.user.lastName || ""}`.trim()
      : fallbackName;

    const initials =
      clientName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase() || "CR";

    const colorIndex =
      Math.abs(j.id?.toString().charCodeAt(0) || idx) %
      INITIAL_COLOR_PALETTE.length;
    const initialsColor = INITIAL_COLOR_PALETTE[colorIndex];

    const rawPrice = j.price || j.amount || 0;
    const cleanAmount =
      typeof rawPrice === "number"
        ? `SAR ${rawPrice.toLocaleString()}`
        : rawPrice;

    return {
      id: j.id || j._id,
      completedDate: displayDate,
      name: clientName,
      initials,
      initialsColor,
      service: j.title || j.serviceName || j.serviceType || "Mechanical Service",
      serviceColor: "text-[#2563eb]",
      amount: cleanAmount,
      rating: j.rating || j.review?.rating || 5,
      review: j.reviewText || j.review?.comment || j.feedback || "No review left by customer",
    };
  });

  const filteredRecords =
    activeFilter === "All Services"
      ? completedJobs
      : completedJobs.filter((r) =>
          r.service
            .toLowerCase()
            .includes(activeFilter.toLowerCase().replace(" service", ""))
        );

  const avgRating = completedJobs.length
    ? (
        completedJobs.reduce((s, j) => s + (j.rating || 0), 0) /
        completedJobs.length
      ).toFixed(1)
    : "—";

  const totalRevenue = completedJobs
    .reduce((s, j) => {
      const num =
        typeof j.amount === "number"
          ? j.amount
          : parseFloat((j.amount || "0").toString().replace(/[^0-9.]/g, ""));
      return s + (isNaN(num) ? 0 : num);
    }, 0)
    .toLocaleString();

  // ─── Export CSV ────────────────────────────────────────────────
  const handleExport = () => {
    if (completedJobs.length === 0) return;
    const headers = ["Date", "Customer", "Service", "Amount", "Rating", "Review"];
    const rows = completedJobs.map((r) => [
      r.completedDate,
      r.name,
      r.service,
      r.amount,
      r.rating,
      r.review,
    ]);
    const csvContent = [headers, ...rows]
      .map((row) => row.join(","))
      .join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "completed_jobs.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // ─── Loading State ─────────────────────────────────────────────
  if (isLoading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-[#f8fafc]">
        <div className="text-[#2563eb] font-semibold animate-pulse flex items-center gap-2">
          <span className="w-4 h-4 border-2 border-[#2563eb] border-t-transparent rounded-full animate-spin"></span>
          Loading completed jobs...
        </div>
      </div>
    );
  }

  // ─── Render ────────────────────────────────────────────────────
  return (
    <div className="flex h-screen overflow-hidden bg-[#f8fafc]">
      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-stagger-1 { animation: fadeSlideUp 0.4s ease-out forwards; animation-delay: 0.05s; opacity: 0; }
        .animate-stagger-2 { animation: fadeSlideUp 0.4s ease-out forwards; animation-delay: 0.12s; opacity: 0; }
        .animate-stagger-3 { animation: fadeSlideUp 0.4s ease-out forwards; animation-delay: 0.20s; opacity: 0; }
      `}</style>

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

        <main className="flex-1 overflow-y-auto p-6 sm:p-8 lg:p-10 space-y-6">
          {/* ─── Page Header ────────────────────────────────────── */}
          <div className="animate-stagger-1">
            <h1 className="text-[28px] font-extrabold text-[#1f2937] tracking-tight leading-tight">
              Completed Jobs
            </h1>
            <p className="text-[#6b7280] mt-2 text-[15px] leading-relaxed">
              Overview of all services rendered and customer feedback.
            </p>
          </div>

          {/* ─── Stats Cards ────────────────────────────────────── */}
          <div className="animate-stagger-2 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
              <p className="text-[13px] text-gray-500 mb-1">Total Jobs Completed</p>
              <div className="flex items-center gap-3">
                <p className="text-[28px] font-black text-[#1f2937] tracking-tight">
                  {pagination.total.toLocaleString()}
                </p>
                <span className="text-[11px] font-semibold bg-emerald-50 text-emerald-500 px-2.5 py-1 rounded-full">
                  +12% this month
                </span>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
              <p className="text-[13px] text-gray-500 mb-1">Average Satisfaction</p>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <p className="text-[28px] font-black text-[#1f2937] tracking-tight">
                    {avgRating}
                  </p>
                  <FaStar className="text-yellow-400 text-lg" />
                </div>
                <span className="text-[11px] font-semibold bg-gray-100 text-gray-400 px-2.5 py-1 rounded-full ml-auto">
                  Last 90 days
                </span>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
              <p className="text-[13px] text-gray-500 mb-1">Revenue (Jobs Only)</p>
              <div className="flex items-center gap-3">
                <p className="text-[28px] font-black text-[#1f2937] tracking-tight">
                  SAR {totalRevenue}
                </p>
                <span className="text-[11px] font-semibold bg-emerald-50 text-emerald-500 px-2.5 py-1 rounded-full ml-auto">
                  +8.2%
                </span>
              </div>
            </div>
          </div>

          {/* ─── Service History Table ──────────────────────────── */}
          <div className="animate-stagger-3 bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            {/* Table Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <p className="font-bold text-[#1f2937] text-sm">Service History</p>
                <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                  {pagination.total} Records
                </span>
              </div>
              <div className="flex items-center gap-2">
                {/* Filter */}
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
                          onClick={() => {
                            setActiveFilter(opt);
                            setShowFilterMenu(false);
                            setCurrentPage(1);
                          }}
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

                {/* Export */}
                <button
                  onClick={handleExport}
                  disabled={completedJobs.length === 0}
                  className="flex items-center gap-1.5 border border-gray-200 text-gray-600 text-xs font-semibold px-3 py-2 rounded-lg hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  <FiDownload size={13} /> Export
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left text-[11px] font-semibold text-gray-400 px-5 py-3 uppercase tracking-wider">
                      DATE
                    </th>
                    <th className="text-left text-[11px] font-semibold text-gray-400 px-5 py-3 uppercase tracking-wider">
                      CUSTOMER
                    </th>
                    <th className="text-left text-[11px] font-semibold text-gray-400 px-5 py-3 uppercase tracking-wider">
                      SERVICE TYPE
                    </th>
                    <th className="text-left text-[11px] font-semibold text-gray-400 px-5 py-3 uppercase tracking-wider">
                      AMOUNT
                    </th>
                    <th className="text-left text-[11px] font-semibold text-gray-400 px-5 py-3 uppercase tracking-wider">
                      RATING
                    </th>
                    <th className="text-left text-[11px] font-semibold text-gray-400 px-5 py-3 uppercase tracking-wider">
                      REVIEW SUMMARY
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {completedJobs.length === 0 ? (
                    <tr>
                      <td
                        colSpan={6}
                        className="px-5 py-12 text-center text-sm text-gray-400"
                      >
                        <div className="flex flex-col items-center gap-2">
                          <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                            <FiFilter size={20} className="text-gray-300" />
                          </div>
                          <p>No completed jobs found.</p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    completedJobs.map((row, index) => (
                      <tr
                        key={row.id}
                        className={`border-b border-gray-50 hover:bg-gray-50 transition-colors ${
                          index === completedJobs.length - 1 ? "border-0" : ""
                        }`}
                      >
                        <td className="px-5 py-4 text-[13px] text-gray-500 whitespace-nowrap">
                          {row.completedDate}
                        </td>
                        <td className="px-5 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2.5">
                            <div
                              className={`w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0 ${row.initialsColor}`}
                            >
                              {row.initials}
                            </div>
                            <span className="text-[13px] font-semibold text-[#1f2937]">
                              {row.name}
                            </span>
                          </div>
                        </td>
                        <td className="px-5 py-4 whitespace-nowrap">
                          <span className="text-[13px] font-semibold text-[#2563eb]">
                            {row.service}
                          </span>
                        </td>
                        <td className="px-5 py-4 text-[13px] font-semibold text-[#1f2937] whitespace-nowrap">
                          {row.amount}
                        </td>
                        <td className="px-5 py-4 whitespace-nowrap">
                          <StarRating rating={row.rating} />
                        </td>
                        <td
                          className="px-5 py-4 text-[13px] text-gray-500 max-w-xs truncate"
                          title={row.review}
                        >
                          {row.review}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {pagination.totalPages > 0 && (
              <div className="flex items-center justify-between px-5 py-4 border-t border-gray-100">
                <p className="text-xs text-gray-400">
                  Showing {(pagination.page - 1) * pagination.limit + 1} to{" "}
                  {Math.min(
                    pagination.page * pagination.limit,
                    pagination.total
                  )}{" "}
                  of {pagination.total} results
                </p>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="w-8 h-8 flex items-center justify-center rounded-md border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  >
                    <FiChevronLeft size={14} />
                  </button>
                  {Array.from(
                    { length: pagination.totalPages },
                    (_, i) => i + 1
                  ).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-8 h-8 flex items-center justify-center rounded-md text-xs font-semibold transition-colors ${
                        currentPage === page
                          ? "bg-[#2563eb] text-white"
                          : "border border-gray-200 text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                  <button
                    onClick={() =>
                      setCurrentPage((p) =>
                        Math.min(pagination.totalPages, p + 1)
                      )
                    }
                    disabled={currentPage === pagination.totalPages}
                    className="w-8 h-8 flex items-center justify-center rounded-md border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  >
                    <FiChevronRight size={14} />
                  </button>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}