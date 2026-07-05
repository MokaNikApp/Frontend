
// import React, { useState, useEffect, useMemo } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../../api/axios";
// import {
//   MdOutlineBuild,
//   MdOutlineAttachMoney,
//   MdOutlinePendingActions,
//   MdOutlineCheckCircle,
//   MdOutlineCalendarMonth,
//   MdOutlineArrowForward,
//   MdOutlineFilterList,
//   MdOutlineSearch,
//   MdOutlineRefresh,
//   MdOutlineChevronLeft,
//   MdOutlineChevronRight,
//   MdOutlineMoreVert,
//   MdOutlineLocalOffer,
//   MdOutlinePerson,
//   MdOutlineSchedule,
//   MdOutlineTrendingUp,
//   MdOutlineReceiptLong,
//   MdOutlineWarningAmber,
//   MdOutlineCancel,
//   MdOutlineHourglassEmpty,
//   MdOutlineEngineering,
//   MdOutlinePayment,
// } from "react-icons/md";

// /* ═══════════════════════════════════════════════════════════════
//    STATUS CONFIGURATION — unified visual language
//    ═══════════════════════════════════════════════════════════════ */
// const statusConfig = {
//   PENDING: {
//     label: "Pending",
//     icon: MdOutlineHourglassEmpty,
//     color: "text-amber-600",
//     bg: "bg-amber-50",
//     border: "border-amber-200",
//     dot: "bg-amber-500",
//     chipBg: "bg-amber-100",
//     chipText: "text-amber-700",
//   },
//   ACCEPTED: {
//     label: "Accepted",
//     icon: MdOutlineCheckCircle,
//     color: "text-blue-600",
//     bg: "bg-blue-50",
//     border: "border-blue-200",
//     dot: "bg-blue-500",
//     chipBg: "bg-blue-100",
//     chipText: "text-blue-700",
//   },
//   IN_PROGRESS: {
//     label: "In Progress",
//     icon: MdOutlineEngineering,
//     color: "text-indigo-600",
//     bg: "bg-indigo-50",
//     border: "border-indigo-200",
//     dot: "bg-indigo-500",
//     chipBg: "bg-indigo-100",
//     chipText: "text-indigo-700",
//   },
//   COMPLETED: {
//     label: "Completed",
//     icon: MdOutlineCheckCircle,
//     color: "text-emerald-600",
//     bg: "bg-emerald-50",
//     border: "border-emerald-200",
//     dot: "bg-emerald-500",
//     chipBg: "bg-emerald-100",
//     chipText: "text-emerald-700",
//   },
//   CANCELLED: {
//     label: "Cancelled",
//     icon: MdOutlineCancel,
//     color: "text-red-600",
//     bg: "bg-red-50",
//     border: "border-red-200",
//     dot: "bg-red-500",
//     chipBg: "bg-red-100",
//     chipText: "text-red-700",
//   },
//   PAID: {
//     label: "Paid",
//     icon: MdOutlinePayment,
//     color: "text-emerald-600",
//     bg: "bg-emerald-50",
//     border: "border-emerald-200",
//     dot: "bg-emerald-500",
//     chipBg: "bg-emerald-100",
//     chipText: "text-emerald-700",
//   },
//   UNPAID: {
//     label: "Unpaid",
//     icon: MdOutlineWarningAmber,
//     color: "text-rose-600",
//     bg: "bg-rose-50",
//     border: "border-rose-200",
//     dot: "bg-rose-500",
//     chipBg: "bg-rose-100",
//     chipText: "text-rose-700",
//   },
// };

// const getStatusStyle = (status) =>
//   statusConfig[status] || statusConfig.PENDING;

// /* ═══════════════════════════════════════════════════════════════
//    UTILITY HELPERS
//    ═══════════════════════════════════════════════════════════════ */
// const formatCurrency = (amount) =>
//   new Intl.NumberFormat("en-NG", {
//     style: "currency",
//     currency: "NGN",
//     minimumFractionDigits: 0,
//   }).format(amount);

// const formatDate = (dateString) => {
//   if (!dateString) return "—";
//   const d = new Date(dateString);
//   return d.toLocaleDateString("en-US", {
//     month: "short",
//     day: "numeric",
//     year: "numeric",
//   });
// };

// const formatDateTime = (dateString) => {
//   if (!dateString) return "—";
//   const d = new Date(dateString);
//   return d.toLocaleDateString("en-US", {
//     month: "short",
//     day: "numeric",
//     year: "numeric",
//     hour: "2-digit",
//     minute: "2-digit",
//   });
// };

// const timeAgo = (dateString) => {
//   const date = new Date(dateString);
//   const now = new Date();
//   const seconds = Math.floor((now - date) / 1000);
//   if (seconds < 60) return "Just now";
//   const minutes = Math.floor(seconds / 60);
//   if (minutes < 60) return `${minutes}m ago`;
//   const hours = Math.floor(minutes / 60);
//   if (hours < 24) return `${hours}h ago`;
//   const days = Math.floor(hours / 24);
//   if (days < 7) return `${days}d ago`;
//   return formatDate(dateString);
// };

// /* ═══════════════════════════════════════════════════════════════
//    STAT CARD COMPONENT
//    ═══════════════════════════════════════════════════════════════ */
// const StatCard = ({ title, value, subtitle, icon: Icon, trend, trendUp, accentColor, delay }) => (
//   <div
//     className="relative overflow-hidden rounded-2xl bg-white border border-gray-100 p-6 shadow-sm hover:shadow-md transition-all duration-300 group"
//     style={{ animationDelay: `${delay}ms` }}
//   >
//     {/* Subtle gradient accent */}
//     <div className={`absolute top-0 left-0 w-full h-1 ${accentColor}`} />

//     <div className="flex items-start justify-between">
//       <div className="flex-1">
//         <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
//           {title}
//         </p>
//         <h3 className="text-2xl font-bold text-gray-900 tracking-tight">
//           {value}
//         </h3>
//         {subtitle && (
//           <p className="text-xs text-gray-500 mt-1">{subtitle}</p>
//         )}
//         {trend && (
//           <div className={`flex items-center gap-1 mt-2 text-xs font-medium ${trendUp ? "text-emerald-600" : "text-red-500"}`}>
//             <MdOutlineTrendingUp className={`w-3.5 h-3.5 ${trendUp ? "" : "rotate-180"}`} />
//             {trend}
//           </div>
//         )}
//       </div>
//       <div className={`flex items-center justify-center w-12 h-12 rounded-xl ${accentColor.replace("bg-", "bg-opacity-10 bg-")} text-gray-700 group-hover:scale-110 transition-transform duration-300`}>
//         <Icon className="w-6 h-6 text-gray-600" />
//       </div>
//     </div>
//   </div>
// );

// /* ═══════════════════════════════════════════════════════════════
//    SERVICE ROW COMPONENT (expandable)
//    ═══════════════════════════════════════════════════════════════ */
// const ServiceRow = ({ job, index, isExpanded, onToggle }) => {
//   const status = getStatusStyle(job.status);
//   const StatusIcon = status.icon;
//   const navigate = useNavigate();

//   return (
//     <>
//       <tr
//         className={`group transition-colors duration-150 cursor-pointer ${
//           index % 2 === 0 ? "bg-white" : "bg-gray-50/50"
//         } hover:bg-blue-50/40`}
//         onClick={onToggle}
//       >
//         {/* Service */}
//         <td className="px-6 py-4">
//           <div className="flex items-center gap-4">
//             <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center border border-blue-100">
//               <MdOutlineBuild className="w-5 h-5 text-[#1C52AF]" />
//             </div>
//             <div>
//               <p className="text-sm font-semibold text-gray-900 group-hover:text-[#1C52AF] transition-colors">
//                 {job.title}
//               </p>
//               <p className="text-xs text-gray-500 mt-0.5 line-clamp-1 max-w-[200px]">
//                 {job.description}
//               </p>
//             </div>
//           </div>
//         </td>

//         {/* Status */}
//         <td className="px-6 py-4">
//           <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${status.chipBg} ${status.chipText} border ${status.border}`}>
//             <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
//             {status.label}
//           </span>
//         </td>

//         {/* Amount */}
//         <td className="px-6 py-4">
//           <p className="text-sm font-bold text-gray-900">
//             {formatCurrency(job.totalAmount)}
//           </p>
//           <p className="text-[10px] text-gray-400 mt-0.5">
//             {job.isCompletedByProvider ? "Completed" : "Pending completion"}
//           </p>
//         </td>

//         {/* Scheduled */}
//         <td className="px-6 py-4">
//           <div className="flex items-center gap-1.5 text-sm text-gray-700">
//             <MdOutlineCalendarMonth className="w-4 h-4 text-gray-400" />
//             {formatDate(job.scheduledAt)}
//           </div>
//           <p className="text-[10px] text-gray-400 mt-0.5 ml-5">
//             {timeAgo(job.scheduledAt)}
//           </p>
//         </td>

//         {/* Provider */}
//         <td className="px-6 py-4">
//           {job.provider?.firstName ? (
//             <div className="flex items-center gap-2">
//               <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-[10px] font-bold text-gray-600">
//                 {job.provider.firstName[0]}{job.provider.lastName?.[0] || ""}
//               </div>
//               <span className="text-sm text-gray-700">
//                 {job.provider.firstName} {job.provider.lastName}
//               </span>
//             </div>
//           ) : (
//             <span className="text-sm text-gray-400 italic">Not assigned</span>
//           )}
//         </td>

//         {/* Actions */}
//         <td className="px-6 py-4">
//           <div className="flex items-center justify-end gap-2">
//             <button
//               onClick={(e) => {
//                 e.stopPropagation();
//                 navigate(`/jobs/${job.id}`);
//               }}
//               className="p-2 rounded-lg text-gray-400 hover:text-[#1C52AF] hover:bg-blue-50 transition-colors"
//               title="View details"
//             >
//               <MdOutlineArrowForward className="w-4 h-4" />
//             </button>
//             <button
//               onClick={(e) => e.stopPropagation()}
//               className="p-2 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
//               title="More options"
//             >
//               <MdOutlineMoreVert className="w-4 h-4" />
//             </button>
//           </div>
//         </td>
//       </tr>

//       {/* Expanded Detail Row */}
//       {isExpanded && (
//         <tr>
//           <td colSpan={6} className="px-6 py-0">
//             <div className="bg-gray-50/80 border-y border-gray-100 px-6 py-5 animate-in slide-in-from-top-1 duration-200">
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                 {/* Job Details */}
//                 <div className="space-y-3">
//                   <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
//                     Service Details
//                   </h4>
//                   <div className="space-y-2">
//                     <div className="flex justify-between text-sm">
//                       <span className="text-gray-500">Job ID</span>
//                       <span className="font-mono text-xs text-gray-700 bg-white px-2 py-0.5 rounded border">{job.id.slice(0, 8)}...</span>
//                     </div>
//                     <div className="flex justify-between text-sm">
//                       <span className="text-gray-500">Customer</span>
//                       <span className="text-gray-700 font-medium">{job.user.firstName} {job.user.lastName}</span>
//                     </div>
//                     <div className="flex justify-between text-sm">
//                       <span className="text-gray-500">Vehicle</span>
//                       <span className="text-gray-700">{job.description.replace("Service request for ", "")}</span>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Timeline */}
//                 <div className="space-y-3">
//                   <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
//                     Timeline
//                   </h4>
//                   <div className="space-y-2">
//                     <div className="flex items-center gap-2 text-sm">
//                       <MdOutlineSchedule className="w-4 h-4 text-blue-500" />
//                       <span className="text-gray-500">Scheduled:</span>
//                       <span className="text-gray-700 font-medium">{formatDateTime(job.scheduledAt)}</span>
//                     </div>
//                     {job.acceptedAt && (
//                       <div className="flex items-center gap-2 text-sm">
//                         <MdOutlineCheckCircle className="w-4 h-4 text-emerald-500" />
//                         <span className="text-gray-500">Accepted:</span>
//                         <span className="text-gray-700 font-medium">{formatDateTime(job.acceptedAt)}</span>
//                       </div>
//                     )}
//                     <div className="flex items-center gap-2 text-sm">
//                       <MdOutlinePerson className="w-4 h-4 text-gray-400" />
//                       <span className="text-gray-500">Provider Status:</span>
//                       <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${job.isCompletedByProvider ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}>
//                         {job.isCompletedByProvider ? "Completed" : "Pending"}
//                       </span>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Payment Info */}
//                 <div className="space-y-3">
//                   <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
//                     Payment
//                   </h4>
//                   <div className="bg-white rounded-xl border border-gray-200 p-4">
//                     <div className="flex items-center justify-between mb-2">
//                       <span className="text-sm text-gray-500">Total Amount</span>
//                       <span className="text-lg font-bold text-gray-900">{formatCurrency(job.totalAmount)}</span>
//                     </div>
//                     <div className="w-full h-px bg-gray-100 my-2" />
//                     <div className="flex items-center justify-between">
//                       <span className="text-xs text-gray-400">Payment Status</span>
//                       <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${job.status === "COMPLETED" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}>
//                         {job.status === "COMPLETED" ? "Paid" : "Pending Payment"}
//                       </span>
//                     </div>
//                     {job.status !== "COMPLETED" && (
//                       <button
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           navigate(`/payment?jobId=${job.id}`);
//                         }}
//                         className="mt-3 w-full py-2 bg-[#1C52AF] text-white text-xs font-semibold rounded-lg hover:bg-[#164494] transition-colors flex items-center justify-center gap-1.5"
//                       >
//                         <MdOutlinePayment className="w-4 h-4" />
//                         Pay Now
//                       </button>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </td>
//         </tr>
//       )}
//     </>
//   );
// };

// /* ═══════════════════════════════════════════════════════════════
//    MAIN COMPONENT
//    ═══════════════════════════════════════════════════════════════ */
// const ServiceHistory = () => {
//   const navigate = useNavigate();

//   // ── State ─────────────────────────────────────────────────────
//   const [jobs, setJobs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [activeTab, setActiveTab] = useState("ALL");
//   const [searchQuery, setSearchQuery] = useState("");
//   const [expandedRow, setExpandedRow] = useState(null);
//   const [pagination, setPagination] = useState({
//     page: 1,
//     limit: 10,
//     total: 0,
//     totalPages: 1,
//   });
//   const [stats, setStats] = useState({
//     totalServices: 0,
//     totalSpent: 0,
//     pendingCount: 0,
//     completedCount: 0,
//   });

//   // ── Tabs ──────────────────────────────────────────────────────
//   const tabs = [
//     { key: "ALL", label: "All Services", count: null },
//     { key: "PENDING", label: "Pending", count: null },
//     { key: "ACCEPTED", label: "Accepted", count: null },
//     { key: "IN_PROGRESS", label: "In Progress", count: null },
//     { key: "COMPLETED", label: "Completed", count: null },
//     { key: "CANCELLED", label: "Cancelled", count: null },
//   ];

//   // ── Fetch Data ────────────────────────────────────────────────
//   const fetchJobs = async (status = "ALL", page = 1) => {
//     setLoading(true);
//     setError(null);
//     try {
//       const endpoint =
//         status === "ALL"
//           ? `/jobs?page=${page}&limit=${pagination.limit}`
//           : `/jobs/status/${status}?page=${page}&limit=${pagination.limit}`;

//       const { data } = await api.get(endpoint);
//       const jobList = Array.isArray(data) ? data : data?.data ?? [];
//       const pag = data?.pagination ?? {
//         page: 1,
//         limit: 10,
//         total: jobList.length,
//         totalPages: 1,
//       };

//       setJobs(jobList);
//       setPagination(pag);

//       // Compute stats from all jobs (if first page) or keep existing
//       if (page === 1) {
//         const allRes = await api.get(`/jobs?limit=999`);
//         const allJobs = Array.isArray(allRes.data)
//           ? allRes.data
//           : allRes.data?.data ?? [];

//         setStats({
//           totalServices: allJobs.length,
//           totalSpent: allJobs.reduce((sum, j) => sum + (j.totalAmount || 0), 0),
//           pendingCount: allJobs.filter((j) => j.status === "PENDING").length,
//           completedCount: allJobs.filter((j) => j.status === "COMPLETED").length,
//         });
//       }
//     } catch (err) {
//       console.error("Failed to fetch jobs:", err);
//       setError("Unable to load service history. Please try again.");
//       setJobs([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchJobs(activeTab, 1);
//   }, [activeTab]);

//   // ── Filtered Jobs ─────────────────────────────────────────────
//   const filteredJobs = useMemo(() => {
//     if (!searchQuery.trim()) return jobs;
//     const q = searchQuery.toLowerCase();
//     return jobs.filter(
//       (job) =>
//         job.title.toLowerCase().includes(q) ||
//         job.description.toLowerCase().includes(q) ||
//         job.status.toLowerCase().includes(q) ||
//         job.id.toLowerCase().includes(q)
//     );
//   }, [jobs, searchQuery]);

//   // ── Handlers ──────────────────────────────────────────────────
//   const handlePageChange = (newPage) => {
//     if (newPage < 1 || newPage > pagination.totalPages) return;
//     fetchJobs(activeTab, newPage);
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   const toggleRow = (id) => {
//     setExpandedRow((prev) => (prev === id ? null : id));
//   };

//   // ── Render ────────────────────────────────────────────────────
//   return (
//     <div className="min-h-screen bg-gray-50/50 pb-12">
//       {/* Page Header */}
//       <div className="">
//         <div className="max-w-7xl mx-auto px-6 py-6">
//           <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//             <div>
//               <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
//                 Service & Payment History
//               </h1>
//               <p className="text-sm text-gray-500 mt-1">
//                 Track all your service requests, payments, and provider assignments
//               </p>
//             </div>
//             <div className="flex items-center gap-3">
//               <button
//                 onClick={() => fetchJobs(activeTab, pagination.page)}
//                 className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-colors"
//               >
//                 <MdOutlineRefresh className="w-4 h-4" />
//                 Refresh
//               </button>
//               <button
//                 onClick={() => navigate("/book-service")}
//                 className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-[#1C52AF] rounded-lg hover:bg-[#164494] transition-colors shadow-sm"
//               >
//                 <MdOutlineLocalOffer className="w-4 h-4" />
//                 Book Service
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
//         {/* ═══ STAT CARDS ═══ */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
//           <StatCard
//             title="Total Services"
//             value={stats.totalServices}
//             subtitle="All time service requests"
//             icon={MdOutlineBuild}
//             accentColor="bg-[#1C52AF]"
//             delay={0}
//           />
//           <StatCard
//             title="Total Spent"
//             value={formatCurrency(stats.totalSpent)}
//             subtitle="Lifetime payment volume"
//             icon={MdOutlineAttachMoney}
//             accentColor="bg-emerald-500"
//             trend="+12% from last month"
//             trendUp={true}
//             delay={100}
//           />
//           <StatCard
//             title="Pending"
//             value={stats.pendingCount}
//             subtitle="Awaiting provider acceptance"
//             icon={MdOutlinePendingActions}
//             accentColor="bg-amber-500"
//             delay={200}
//           />
//           <StatCard
//             title="Completed"
//             value={stats.completedCount}
//             subtitle="Successfully finished"
//             icon={MdOutlineCheckCircle}
//             accentColor="bg-blue-500"
//             trend="On track"
//             trendUp={true}
//             delay={300}
//           />
//         </div>

//         {/* ═══ FILTERS & SEARCH ═══ */}
//         <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
//           {/* Tabs */}
//           <div className="border-b border-gray-100">
//             <div className="flex items-center gap-1 px-4 py-3 overflow-x-auto scrollbar-hide">
//               {tabs.map((tab) => (
//                 <button
//                   key={tab.key}
//                   onClick={() => {
//                     setActiveTab(tab.key);
//                     setExpandedRow(null);
//                   }}
//                   className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all whitespace-nowrap ${
//                     activeTab === tab.key
//                       ? "bg-blue-50 text-[#1C52AF]"
//                       : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
//                   }`}
//                 >
//                   {tab.label}
//                   {tab.count !== null && (
//                     <span className="ml-1.5 text-xs bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded-full">
//                       {tab.count}
//                     </span>
//                   )}
//                   {activeTab === tab.key && (
//                     <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-[#1C52AF] rounded-full" />
//                   )}
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Search & Filter Bar */}
//           <div className="px-6 py-4 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center gap-3">
//             <div className="relative flex-1 max-w-md">
//               <MdOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
//               <input
//                 type="text"
//                 placeholder="Search by service, vehicle, or status..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-gray-200 bg-gray-50 text-gray-900 placeholder:text-gray-400
//                   focus:bg-white focus:border-[#1C52AF]/40 focus:ring-2 focus:ring-[#1C52AF]/10 outline-none transition-all"
//               />
//               {searchQuery && (
//                 <button
//                   onClick={() => setSearchQuery("")}
//                   className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
//                 >
//                   ×
//                 </button>
//               )}
//             </div>
//             <div className="flex items-center gap-2">
//               <span className="text-xs text-gray-400">
//                 {filteredJobs.length} result{filteredJobs.length !== 1 ? "s" : ""}
//               </span>
//               <button className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-600 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors">
//                 <MdOutlineFilterList className="w-4 h-4" />
//                 Filter
//               </button>
//             </div>
//           </div>

//           {/* ═══ TABLE ═══ */}
//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead>
//                 <tr className="bg-gray-50/80 border-b border-gray-100">
//                   <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
//                     Service
//                   </th>
//                   <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
//                     Status
//                   </th>
//                   <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
//                     Amount
//                   </th>
//                   <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
//                     Scheduled
//                   </th>
//                   <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
//                     Provider
//                   </th>
//                   <th className="px-6 py-3.5 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">
//                     Actions
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-100">
//                 {loading ? (
//                   // Skeleton Loading
//                   Array.from({ length: 5 }).map((_, i) => (
//                     <tr key={i} className="animate-pulse">
//                       <td className="px-6 py-4">
//                         <div className="flex items-center gap-4">
//                           <div className="w-10 h-10 rounded-lg bg-gray-200" />
//                           <div className="space-y-2">
//                             <div className="w-32 h-4 bg-gray-200 rounded" />
//                             <div className="w-48 h-3 bg-gray-200 rounded" />
//                           </div>
//                         </div>
//                       </td>
//                       <td className="px-6 py-4"><div className="w-20 h-6 bg-gray-200 rounded-full" /></td>
//                       <td className="px-6 py-4"><div className="w-24 h-4 bg-gray-200 rounded" /></td>
//                       <td className="px-6 py-4"><div className="w-28 h-4 bg-gray-200 rounded" /></td>
//                       <td className="px-6 py-4"><div className="w-24 h-4 bg-gray-200 rounded" /></td>
//                       <td className="px-6 py-4"><div className="w-16 h-8 bg-gray-200 rounded ml-auto" /></td>
//                     </tr>
//                   ))
//                 ) : error ? (
//                   <tr>
//                     <td colSpan={6} className="px-6 py-16 text-center">
//                       <div className="flex flex-col items-center gap-3">
//                         <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center">
//                           <MdOutlineWarningAmber className="w-8 h-8 text-red-400" />
//                         </div>
//                         <p className="text-sm font-medium text-gray-700">{error}</p>
//                         <button
//                           onClick={() => fetchJobs(activeTab, 1)}
//                           className="text-sm text-[#1C52AF] hover:underline font-medium"
//                         >
//                           Try again
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ) : filteredJobs.length === 0 ? (
//                   <tr>
//                     <td colSpan={6} className="px-6 py-16 text-center">
//                       <div className="flex flex-col items-center gap-3">
//                         <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
//                           <MdOutlineReceiptLong className="w-8 h-8 text-gray-400" />
//                         </div>
//                         <p className="text-sm font-medium text-gray-700">
//                           No services found
//                         </p>
//                         <p className="text-xs text-gray-400 max-w-xs">
//                           {searchQuery
//                             ? "No results match your search. Try different keywords."
//                             : `You don't have any ${activeTab !== "ALL" ? activeTab.toLowerCase() : ""} services yet.`}
//                         </p>
//                         <button
//                           onClick={() => navigate("/book-service")}
//                           className="mt-2 px-4 py-2 text-sm font-medium text-[#1C52AF] bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
//                         >
//                           Book a Service
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ) : (
//                   filteredJobs.map((job, index) => (
//                     <ServiceRow
//                       key={job.id}
//                       job={job}
//                       index={index}
//                       isExpanded={expandedRow === job.id}
//                       onToggle={() => toggleRow(job.id)}
//                     />
//                   ))
//                 )}
//               </tbody>
//             </table>
//           </div>

//           {/* ═══ PAGINATION ═══ */}
//           {!loading && !error && filteredJobs.length > 0 && pagination.totalPages > 1 && (
//             <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
//               <p className="text-xs text-gray-500">
//                 Showing{" "}
//                 <span className="font-medium text-gray-700">
//                   {(pagination.page - 1) * pagination.limit + 1}
//                 </span>{" "}
//                 to{" "}
//                 <span className="font-medium text-gray-700">
//                   {Math.min(pagination.page * pagination.limit, pagination.total)}
//                 </span>{" "}
//                 of{" "}
//                 <span className="font-medium text-gray-700">{pagination.total}</span>{" "}
//                 results
//               </p>
//               <div className="flex items-center gap-2">
//                 <button
//                   onClick={() => handlePageChange(pagination.page - 1)}
//                   disabled={pagination.page <= 1}
//                   className="p-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
//                 >
//                   <MdOutlineChevronLeft className="w-4 h-4" />
//                 </button>
//                 {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((page) => (
//                   <button
//                     key={page}
//                     onClick={() => handlePageChange(page)}
//                     className={`min-w-[36px] h-9 px-3 rounded-lg text-sm font-medium transition-colors ${
//                       pagination.page === page
//                         ? "bg-[#1C52AF] text-white shadow-sm"
//                         : "border border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300"
//                     }`}
//                   >
//                     {page}
//                   </button>
//                 ))}
//                 <button
//                   onClick={() => handlePageChange(pagination.page + 1)}
//                   disabled={pagination.page >= pagination.totalPages}
//                   className="p-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
//                 >
//                   <MdOutlineChevronRight className="w-4 h-4" />
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ServiceHistory;

















import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import {
  MdOutlineBuild,
  MdOutlineAttachMoney,
  MdOutlinePendingActions,
  MdOutlineCheckCircle,
  MdOutlineCalendarMonth,
  MdOutlineArrowForward,
  MdOutlineFilterList,
  MdOutlineSearch,
  MdOutlineRefresh,
  MdOutlineChevronLeft,
  MdOutlineChevronRight,
  MdOutlineMoreVert,
  MdOutlineLocalOffer,
  MdOutlinePerson,
  MdOutlineSchedule,
  MdOutlineTrendingUp,
  MdOutlineReceiptLong,
  MdOutlineWarningAmber,
  MdOutlineCancel,
  MdOutlineHourglassEmpty,
  MdOutlineEngineering,
  MdOutlinePayment,
} from "react-icons/md";

/* ═══════════════════════════════════════════════════════════════
   STATUS CONFIGURATION
   ═══════════════════════════════════════════════════════════════ */
const statusConfig = {
  PENDING: {
    label: "Pending",
    icon: MdOutlineHourglassEmpty,
    color: "text-amber-600",
    bg: "bg-amber-50",
    border: "border-amber-200",
    dot: "bg-amber-500",
    chipBg: "bg-amber-100",
    chipText: "text-amber-700",
  },
  ACCEPTED: {
    label: "Accepted",
    icon: MdOutlineCheckCircle,
    color: "text-blue-600",
    bg: "bg-blue-50",
    border: "border-blue-200",
    dot: "bg-blue-500",
    chipBg: "bg-blue-100",
    chipText: "text-blue-700",
  },
  IN_PROGRESS: {
    label: "In Progress",
    icon: MdOutlineEngineering,
    color: "text-indigo-600",
    bg: "bg-indigo-50",
    border: "border-indigo-200",
    dot: "bg-indigo-500",
    chipBg: "bg-indigo-100",
    chipText: "text-indigo-700",
  },
  COMPLETED: {
    label: "Completed",
    icon: MdOutlineCheckCircle,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    dot: "bg-emerald-500",
    chipBg: "bg-emerald-100",
    chipText: "text-emerald-700",
  },
  CANCELLED: {
    label: "Cancelled",
    icon: MdOutlineCancel,
    color: "text-red-600",
    bg: "bg-red-50",
    border: "border-red-200",
    dot: "bg-red-500",
    chipBg: "bg-red-100",
    chipText: "text-red-700",
  },
  PAID: {
    label: "Paid",
    icon: MdOutlinePayment,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    dot: "bg-emerald-500",
    chipBg: "bg-emerald-100",
    chipText: "text-emerald-700",
  },
  UNPAID: {
    label: "Unpaid",
    icon: MdOutlineWarningAmber,
    color: "text-rose-600",
    bg: "bg-rose-50",
    border: "border-rose-200",
    dot: "bg-rose-500",
    chipBg: "bg-rose-100",
    chipText: "text-rose-700",
  },
};

const getStatusStyle = (status) =>
  statusConfig[status] || statusConfig.PENDING;

/* ═══════════════════════════════════════════════════════════════
   UTILITY HELPERS
   ═══════════════════════════════════════════════════════════════ */
const formatCurrency = (amount) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
  }).format(amount);

const formatDate = (dateString) => {
  if (!dateString) return "—";
  const d = new Date(dateString);
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const formatDateTime = (dateString) => {
  if (!dateString) return "—";
  const d = new Date(dateString);
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const timeAgo = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now - date) / 1000);
  if (seconds < 60) return "Just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return formatDate(dateString);
};

/* ═══════════════════════════════════════════════════════════════
   STAT CARD COMPONENT
   ═══════════════════════════════════════════════════════════════ */
const StatCard = ({ title, value, subtitle, icon: Icon, trend, trendUp, accentColor, delay }) => (
  <div
    className="relative overflow-hidden rounded-2xl bg-white border border-gray-100 p-6 shadow-sm hover:shadow-md transition-all duration-300 group"
    style={{ animationDelay: `${delay}ms` }}
  >
    <div className={`absolute top-0 left-0 w-full h-1 ${accentColor}`} />
    <div className="flex items-start justify-between">
      <div className="flex-1">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
          {title}
        </p>
        <h3 className="text-2xl font-bold text-gray-900 tracking-tight">
          {value}
        </h3>
        {subtitle && (
          <p className="text-xs text-gray-500 mt-1">{subtitle}</p>
        )}
        {trend && (
          <div className={`flex items-center gap-1 mt-2 text-xs font-medium ${trendUp ? "text-emerald-600" : "text-red-500"}`}>
            <MdOutlineTrendingUp className={`w-3.5 h-3.5 ${trendUp ? "" : "rotate-180"}`} />
            {trend}
          </div>
        )}
      </div>
      <div className={`flex items-center justify-center w-12 h-12 rounded-xl ${accentColor.replace("bg-", "bg-opacity-10 bg-")} text-gray-700 group-hover:scale-110 transition-transform duration-300`}>
        <Icon className="w-6 h-6 text-gray-600" />
      </div>
    </div>
  </div>
);

/* ═══════════════════════════════════════════════════════════════
   SERVICE ROW COMPONENT (static, no expand)
   ═══════════════════════════════════════════════════════════════ */
const ServiceRow = ({ job, index }) => {
  const status = getStatusStyle(job.status);
  const StatusIcon = status.icon;
  const navigate = useNavigate();

  return (
    <tr
      className={`group transition-colors duration-150 ${
        index % 2 === 0 ? "bg-white" : "bg-gray-50/50"
      } hover:bg-blue-50/40`}
    >
      {/* Service */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-4">
          <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center border border-blue-100">
            <MdOutlineBuild className="w-5 h-5 text-[#1C52AF]" />
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900 group-hover:text-[#1C52AF] transition-colors">
              {job.title}
            </p>
            <p className="text-xs text-gray-500 mt-0.5 line-clamp-1 max-w-[200px]">
              {job.description}
            </p>
          </div>
        </div>
      </td>

      {/* Status */}
      <td className="px-6 py-4">
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${status.chipBg} ${status.chipText} border ${status.border}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
          {status.label}
        </span>
      </td>

      {/* Amount */}
      <td className="px-6 py-4">
        <p className="text-sm font-bold text-gray-900">
          {formatCurrency(job.totalAmount)}
        </p>
        <p className="text-[10px] text-gray-400 mt-0.5">
          {job.isCompletedByProvider ? "Completed" : "Pending completion"}
        </p>
      </td>

      {/* Scheduled */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-1.5 text-sm text-gray-700">
          <MdOutlineCalendarMonth className="w-4 h-4 text-gray-400" />
          {formatDate(job.scheduledAt)}
        </div>
        <p className="text-[10px] text-gray-400 mt-0.5 ml-5">
          {timeAgo(job.scheduledAt)}
        </p>
      </td>

      {/* Provider */}
      <td className="px-6 py-4">
        {job.provider?.firstName ? (
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-[10px] font-bold text-gray-600">
              {job.provider.firstName[0]}{job.provider.lastName?.[0] || ""}
            </div>
            <span className="text-sm text-gray-700">
              {job.provider.firstName} {job.provider.lastName}
            </span>
          </div>
        ) : (
          <span className="text-sm text-gray-400 italic">Not assigned</span>
        )}
      </td>

      {/* Actions */}
      <td className="px-6 py-4">
        <div className="flex items-center justify-end gap-2">
          <button
            onClick={() => navigate(`/jobs/${job.id}`)}
            className="p-2 rounded-lg text-gray-400 hover:text-[#1C52AF] hover:bg-blue-50 transition-colors"
            title="View details"
          >
            <MdOutlineArrowForward className="w-4 h-4" />
          </button>
          <button
            className="p-2 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
            title="More options"
          >
            <MdOutlineMoreVert className="w-4 h-4" />
          </button>
        </div>
      </td>
    </tr>
  );
};

/* ═══════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════════════ */
const ServiceHistory = () => {
  const navigate = useNavigate();

  // ── State ─────────────────────────────────────────────────────
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1,
  });
  const [stats, setStats] = useState({
    totalServices: 0,
    totalSpent: 0,
    pendingCount: 0,
    completedCount: 0,
  });

  // ── Tabs ──────────────────────────────────────────────────────
  const tabs = [
    { key: "ALL", label: "All Services", count: null },
    { key: "PENDING", label: "Pending", count: null },
    { key: "ACCEPTED", label: "Accepted", count: null },
    { key: "IN_PROGRESS", label: "In Progress", count: null },
    { key: "COMPLETED", label: "Completed", count: null },
    { key: "CANCELLED", label: "Cancelled", count: null },
  ];

  // ── Fetch Data ────────────────────────────────────────────────
  const fetchJobs = async (status = "ALL", page = 1) => {
    setLoading(true);
    setError(null);
    try {
      const endpoint =
        status === "ALL"
          ? `/jobs?page=${page}&limit=${pagination.limit}`
          : `/jobs/status/${status}?page=${page}&limit=${pagination.limit}`;

      const { data } = await api.get(endpoint);
      const jobList = Array.isArray(data) ? data : data?.data ?? [];
      const pag = data?.pagination ?? {
        page: 1,
        limit: 10,
        total: jobList.length,
        totalPages: 1,
      };

      setJobs(jobList);
      setPagination(pag);

      if (page === 1) {
        const allRes = await api.get(`/jobs?limit=999`);
        const allJobs = Array.isArray(allRes.data)
          ? allRes.data
          : allRes.data?.data ?? [];

        setStats({
          totalServices: allJobs.length,
          totalSpent: allJobs.reduce((sum, j) => sum + (j.totalAmount || 0), 0),
          pendingCount: allJobs.filter((j) => j.status === "PENDING").length,
          completedCount: allJobs.filter((j) => j.status === "COMPLETED").length,
        });
      }
    } catch (err) {
      console.error("Failed to fetch jobs:", err);
      setError("Unable to load service history. Please try again.");
      setJobs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs(activeTab, 1);
  }, [activeTab]);

  // ── Filtered Jobs ─────────────────────────────────────────────
  const filteredJobs = useMemo(() => {
    if (!searchQuery.trim()) return jobs;
    const q = searchQuery.toLowerCase();
    return jobs.filter(
      (job) =>
        job.title.toLowerCase().includes(q) ||
        job.description.toLowerCase().includes(q) ||
        job.status.toLowerCase().includes(q) ||
        job.id.toLowerCase().includes(q)
    );
  }, [jobs, searchQuery]);

  // ── Handlers ──────────────────────────────────────────────────
  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > pagination.totalPages) return;
    fetchJobs(activeTab, newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ── Render ────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gray-50/50 pb-12">
      {/* Page Header */}
      <div className="">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
                Service & Payment History
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                Track all your service requests, payments, and provider assignments
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => fetchJobs(activeTab, pagination.page)}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-colors"
              >
                <MdOutlineRefresh className="w-4 h-4" />
                Refresh
              </button>
              <button
                onClick={() => navigate("/book-service")}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-[#1C52AF] rounded-lg hover:bg-[#164494] transition-colors shadow-sm"
              >
                <MdOutlineLocalOffer className="w-4 h-4" />
                Book Service
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* ═══ STAT CARDS ═══ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <StatCard
            title="Total Services"
            value={stats.totalServices}
            subtitle="All time service requests"
            icon={MdOutlineBuild}
            accentColor="bg-[#1C52AF]"
            delay={0}
          />
          <StatCard
            title="Total Spent"
            value={formatCurrency(stats.totalSpent)}
            subtitle="Lifetime payment volume"
            icon={MdOutlineAttachMoney}
            accentColor="bg-emerald-500"
            trend="+12% from last month"
            trendUp={true}
            delay={100}
          />
          <StatCard
            title="Pending"
            value={stats.pendingCount}
            subtitle="Awaiting provider acceptance"
            icon={MdOutlinePendingActions}
            accentColor="bg-amber-500"
            delay={200}
          />
          <StatCard
            title="Completed"
            value={stats.completedCount}
            subtitle="Successfully finished"
            icon={MdOutlineCheckCircle}
            accentColor="bg-blue-500"
            trend="On track"
            trendUp={true}
            delay={300}
          />
        </div>

        {/* ═══ FILTERS & SEARCH ═══ */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          {/* Tabs */}
          <div className="border-b border-gray-100">
            <div className="flex items-center gap-1 px-4 py-3 overflow-x-auto scrollbar-hide">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all whitespace-nowrap ${
                    activeTab === tab.key
                      ? "bg-blue-50 text-[#1C52AF]"
                      : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {tab.label}
                  {tab.count !== null && (
                    <span className="ml-1.5 text-xs bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded-full">
                      {tab.count}
                    </span>
                  )}
                  {activeTab === tab.key && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-[#1C52AF] rounded-full" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Search & Filter Bar */}
          <div className="px-6 py-4 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center gap-3">
            <div className="relative flex-1 max-w-md">
              <MdOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by service, vehicle, or status..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-gray-200 bg-gray-50 text-gray-900 placeholder:text-gray-400
                  focus:bg-white focus:border-[#1C52AF]/40 focus:ring-2 focus:ring-[#1C52AF]/10 outline-none transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              )}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-400">
                {filteredJobs.length} result{filteredJobs.length !== 1 ? "s" : ""}
              </span>
              <button className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-600 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors">
                <MdOutlineFilterList className="w-4 h-4" />
                Filter
              </button>
            </div>
          </div>

          {/* ═══ TABLE ═══ */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50/80 border-b border-gray-100">
                  <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Service
                  </th>
                  <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Scheduled
                  </th>
                  <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Provider
                  </th>
                  <th className="px-6 py-3.5 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {loading ? (
                  Array.from({ length: 5 }).map((_, i) => (
                    <tr key={i} className="animate-pulse">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-lg bg-gray-200" />
                          <div className="space-y-2">
                            <div className="w-32 h-4 bg-gray-200 rounded" />
                            <div className="w-48 h-3 bg-gray-200 rounded" />
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4"><div className="w-20 h-6 bg-gray-200 rounded-full" /></td>
                      <td className="px-6 py-4"><div className="w-24 h-4 bg-gray-200 rounded" /></td>
                      <td className="px-6 py-4"><div className="w-28 h-4 bg-gray-200 rounded" /></td>
                      <td className="px-6 py-4"><div className="w-24 h-4 bg-gray-200 rounded" /></td>
                      <td className="px-6 py-4"><div className="w-16 h-8 bg-gray-200 rounded ml-auto" /></td>
                    </tr>
                  ))
                ) : error ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-16 text-center">
                      <div className="flex flex-col items-center gap-3">
                        <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center">
                          <MdOutlineWarningAmber className="w-8 h-8 text-red-400" />
                        </div>
                        <p className="text-sm font-medium text-gray-700">{error}</p>
                        <button
                          onClick={() => fetchJobs(activeTab, 1)}
                          className="text-sm text-[#1C52AF] hover:underline font-medium"
                        >
                          Try again
                        </button>
                      </div>
                    </td>
                  </tr>
                ) : filteredJobs.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-16 text-center">
                      <div className="flex flex-col items-center gap-3">
                        <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
                          <MdOutlineReceiptLong className="w-8 h-8 text-gray-400" />
                        </div>
                        <p className="text-sm font-medium text-gray-700">
                          No services found
                        </p>
                        <p className="text-xs text-gray-400 max-w-xs">
                          {searchQuery
                            ? "No results match your search. Try different keywords."
                            : `You don't have any ${activeTab !== "ALL" ? activeTab.toLowerCase() : ""} services yet.`}
                        </p>
                        <button
                          onClick={() => navigate("/book-service")}
                          className="mt-2 px-4 py-2 text-sm font-medium text-[#1C52AF] bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                        >
                          Book a Service
                        </button>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredJobs.map((job, index) => (
                    <ServiceRow
                      key={job.id}
                      job={job}
                      index={index}
                    />
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* ═══ PAGINATION ═══ */}
          {!loading && !error && filteredJobs.length > 0 && pagination.totalPages > 1 && (
            <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
              <p className="text-xs text-gray-500">
                Showing{" "}
                <span className="font-medium text-gray-700">
                  {(pagination.page - 1) * pagination.limit + 1}
                </span>{" "}
                to{" "}
                <span className="font-medium text-gray-700">
                  {Math.min(pagination.page * pagination.limit, pagination.total)}
                </span>{" "}
                of{" "}
                <span className="font-medium text-gray-700">{pagination.total}</span>{" "}
                results
              </p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handlePageChange(pagination.page - 1)}
                  disabled={pagination.page <= 1}
                  className="p-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  <MdOutlineChevronLeft className="w-4 h-4" />
                </button>
                {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`min-w-[36px] h-9 px-3 rounded-lg text-sm font-medium transition-colors ${
                      pagination.page === page
                        ? "bg-[#1C52AF] text-white shadow-sm"
                        : "border border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300"
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <button
                  onClick={() => handlePageChange(pagination.page + 1)}
                  disabled={pagination.page >= pagination.totalPages}
                  className="p-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  <MdOutlineChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ServiceHistory;