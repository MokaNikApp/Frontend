
// import React, { useState } from "react";
// import {
//   HiOutlineFilter,
//   HiOutlineDownload,
//   HiOutlineClipboardCheck,
//   HiOutlineCash,
//   HiOutlineClock,
//   HiOutlineStar,
// } from "react-icons/hi";
// import api from "../../api/axios";

// const ServiceHistory = () => {
//   const [hoveredRow, setHoveredRow] = useState(null);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [showFilters, setShowFilters] = useState(false);
//   const [filterStatus, setFilterStatus] = useState("All");
//   const [filterMechanic, setFilterMechanic] = useState("All");
//   const itemsPerPage = 5;

//   const allServiceData = [
//     { id: 1, service: "Full Oil Change", vehicle: "Tesla Model 3", mechanic: "Marco Rossi", date: "18 Apr 2026", status: "Completed", amount: "$89.00" },
//     { id: 2, service: "Brake Repair", vehicle: "Honda Civic", mechanic: "Lara Smith", date: "16 Apr 2026", status: "Pending", amount: "$120.00" },
//     { id: 3, service: "AC Service", vehicle: "Toyota Camry", mechanic: "John Doe", date: "14 Apr 2026", status: "Completed", amount: "$75.00" },
//     { id: 4, service: "Engine Diagnostic", vehicle: "Tesla Model 3", mechanic: "Marco Rossi", date: "12 Apr 2026", status: "Completed", amount: "$99.00" },
//     { id: 5, service: "Tire Rotation", vehicle: "Honda Civic", mechanic: "Lara Smith", date: "10 Apr 2026", status: "Completed", amount: "$45.00" },
//     { id: 6, service: "Transmission Service", vehicle: "Toyota Camry", mechanic: "John Doe", date: "08 Apr 2026", status: "Cancelled", amount: "$200.00" },
//     { id: 7, service: "Battery Replacement", vehicle: "Tesla Model 3", mechanic: "Marco Rossi", date: "05 Apr 2026", status: "Completed", amount: "$150.00" },
//     { id: 8, service: "Suspension Service", vehicle: "Honda Civic", mechanic: "Lara Smith", date: "02 Apr 2026", status: "Completed", amount: "$180.00" },
//     { id: 9, service: "Wheel Alignment", vehicle: "Tesla Model 3", mechanic: "Marco Rossi", date: "30 Mar 2026", status: "Completed", amount: "$85.00" },
//     { id: 10, service: "Spark Plug Replacement", vehicle: "Honda Civic", mechanic: "Lara Smith", date: "28 Mar 2026", status: "Pending", amount: "$65.00" },
//     { id: 11, service: "Air Filter Replacement", vehicle: "Toyota Camry", mechanic: "John Doe", date: "25 Mar 2026", status: "Completed", amount: "$40.00" },
//     { id: 12, service: "Oil Change", vehicle: "Tesla Model 3", mechanic: "Marco Rossi", date: "22 Mar 2026", status: "Completed", amount: "$89.00" },
//   ];

//   // Filter logic
//   const serviceData = allServiceData.filter((item) => {
//     const statusMatch = filterStatus === "All" || item.status === filterStatus;
//     const mechanicMatch = filterMechanic === "All" || item.mechanic === filterMechanic;
//     return statusMatch && mechanicMatch;
//   });

//   // Export CSV function
//   const handleExportCSV = () => {
//     const headers = ["ID", "Service", "Vehicle", "Mechanic", "Date", "Status", "Amount"];
//     const csvContent = [
//       headers.join(","),
//       ...serviceData.map((row) =>
//         [row.id, row.service, row.vehicle, row.mechanic, row.date, row.status, row.amount].join(",")
//       ),
//     ].join("\n");

//     const element = document.createElement("a");
//     element.setAttribute("href", "data:text/csv;charset=utf-8," + encodeURIComponent(csvContent));
//     element.setAttribute("download", "service_history.csv");
//     element.style.display = "none";
//     document.body.appendChild(element);
//     element.click();
//     document.body.removeChild(element);
//   };

//   const resetFilters = () => {
//     setFilterStatus("All");
//     setFilterMechanic("All");
//     setCurrentPage(1);
//   };

//   const totalPages = Math.ceil(serviceData.length / itemsPerPage);
//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const endIndex = startIndex + itemsPerPage;
//   const currentData = serviceData.slice(startIndex, endIndex);

//   const handlePreviousPage = () => {
//     if (currentPage > 1) {
//       setCurrentPage(currentPage - 1);
//     }
//   };

//   const handleNextPage = () => {
//     if (currentPage < totalPages) {
//       setCurrentPage(currentPage + 1);
//     }
//   };

//   const handlePageClick = (page) => {
//     setCurrentPage(page);
//   };

//   return (
//     <div className="py-8 min-h-screen px-4 bg-gradient-to-br from-slate-50 via-white to-slate-50">
//       <style>{`
//         @keyframes slideInDown {
//           from {
//             opacity: 0;
//             transform: translateY(-20px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }

//         @keyframes slideInUp {
//           from {
//             opacity: 0;
//             transform: translateY(20px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }

//         @keyframes fadeIn {
//           from {
//             opacity: 0;
//           }
//           to {
//             opacity: 1;
//           }
//         }

//         @keyframes scaleIn {
//           from {
//             opacity: 0;
//             transform: scale(0.95);
//           }
//           to {
//             opacity: 1;
//             transform: scale(1);
//           }
//         }

//         @keyframes shimmer {
//           0% {
//             background-position: -1000px 0;
//           }
//           100% {
//             background-position: 1000px 0;
//           }
//         }

//         .animate-slide-in-down {
//           animation: slideInDown 0.5s ease-out forwards;
//           opacity: 0;
//         }

//         .animate-slide-in-up {
//           animation: slideInUp 0.5s ease-out forwards;
//           opacity: 0;
//         }

//         .animate-fade-in {
//           animation: fadeIn 0.4s ease-out forwards;
//           opacity: 0;
//         }

//         .animate-scale-in {
//           animation: scaleIn 0.3s ease-out forwards;
//           opacity: 0;
//         }

//         .stagger-1 { animation-delay: 0.1s; }
//         .stagger-2 { animation-delay: 0.2s; }
//         .stagger-3 { animation-delay: 0.3s; }
//         .stagger-4 { animation-delay: 0.4s; }

//         .stat-card {
//           transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
//           position: relative;
//           overflow: hidden;
//         }

//         .stat-card:hover {
//           transform: translateY(-6px);
//           box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
//         }

//         .stat-card::before {
//           content: '';
//           position: absolute;
//           top: 0;
//           left: 0;
//           right: 0;
//           bottom: 0;
//           background: linear-gradient(135deg, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0));
//           opacity: 0;
//           transition: opacity 0.3s ease;
//         }

//         .stat-card:hover::before {
//           opacity: 1;
//         }

//         .btn-hover {
//           transition: all 0.3s ease;
//         }

//         .btn-hover:hover {
//           transform: translateY(-2px);
//           box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
//         }

//         .btn-hover:active {
//           transform: translateY(0);
//         }

//         .table-row-hover {
//           transition: all 0.25s ease;
//         }

//         .table-row-hover:hover {
//           background-color: #f9fafb;
//           box-shadow: inset 0 0 0 1px rgba(29, 82, 175, 0.1);
//         }

//         .status-badge {
//           transition: all 0.25s ease;
//         }

//         .table-row-hover:hover .status-badge {
//           transform: scale(1.05);
//         }
//       `}</style>

//       {/* HEADER */}
//       <div className="flex flex-col gap-6 mb-8 max-w-7xl mx-auto">

//         {/* TITLE SECTION */}
//         <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-6 animate-slide-in-down">
//           <div>
//             <h1 className="text-2xl font-bold text-gray-900 mb-2">
//               Service History
//             </h1>
//             <p className="text-sm text-gray-500">
//               Review all historical maintenance and repair services across your fleet.
//             </p>
//           </div>

//           {/* BUTTONS */}
//           <div className="flex flex-wrap gap-3 animate-fade-in">

//             <button 
//               onClick={() => setShowFilters(!showFilters)}
//               className="btn-hover flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white shadow-sm border border-gray-100 hover:shadow-md text-gray-700 text-sm font-medium"
//             >
//               <HiOutlineFilter className="text-lg text-[#1C52AF]" />
//               Filters
//             </button>

//             <button 
//               onClick={handleExportCSV}
//               className="btn-hover flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#1C52AF]/10 text-[#1C52AF] hover:bg-[#1C52AF]/15 text-sm font-medium border border-[#1C52AF]/20"
//             >
//               <HiOutlineDownload className="text-lg" />
//               Export CSV
//             </button>

//           </div>
//         </div>

//         {/* FILTER PANEL */}
//         {showFilters && (
//           <div className="mt-4 p-5 bg-white rounded-xl shadow-sm border border-gray-100 animate-slide-in-up">
//             <div className="flex items-center justify-between mb-4">
//               <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
//               <button 
//                 onClick={() => setShowFilters(false)}
//                 className="text-gray-400 hover:text-gray-600 text-2xl"
//               >
//                 ×
//               </button>
//             </div>

//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
//               {/* Status Filter */}
//               <div>
//                 <label className="block text-sm font-semibold text-gray-800 mb-2">Status</label>
//                 <select 
//                   value={filterStatus}
//                   onChange={(e) => {
//                     setFilterStatus(e.target.value);
//                     setCurrentPage(1);
//                   }}
//                   className="w-full border border-gray-100 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
//                 >
//                   <option>All</option>
//                   <option>Completed</option>
//                   <option>Pending</option>
//                   <option>Cancelled</option>
//                 </select>
//               </div>

//               {/* Mechanic Filter */}
//               <div>
//                 <label className="block text-sm font-semibold text-gray-800 mb-2">Mechanic</label>
//                 <select 
//                   value={filterMechanic}
//                   onChange={(e) => {
//                     setFilterMechanic(e.target.value);
//                     setCurrentPage(1);
//                   }}
//                   className="w-full border border-gray-100 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
//                 >
//                   <option>All</option>
//                   <option>Marco Rossi</option>
//                   <option>Lara Smith</option>
//                   <option>John Doe</option>
//                 </select>
//               </div>
//             </div>

//             {/* Reset Button */}
//             <div className="mt-4 flex gap-2">
//               <button 
//                 onClick={resetFilters}
//                 className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 text-sm font-medium hover:bg-gray-50 transition"
//               >
//                 Reset Filters
//               </button>
//               <button 
//                 onClick={() => setShowFilters(false)}
//                 className="px-4 py-2 rounded-lg bg-[#1C52AF] text-white text-sm font-medium hover:bg-[#1645a0] transition"
//               >
//                 Done
//               </button>
//             </div>
//           </div>
//         )}

//         {/* STAT CARDS */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

//           {/* Card 1 - Completed */}
//           <div className="stat-card animate-scale-in stagger-1 flex items-center gap-3 p-4 bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-xl shadow-sm border border-blue-100/40">
//             <div className="p-2.5 text-[#1C52AF] bg-white rounded-full shadow-sm border border-blue-100">
//               <HiOutlineClipboardCheck size={18} />
//             </div>
//             <div className="flex-1">
//               <p className="text-xs text-gray-600 font-semibold uppercase tracking-wide">Total Completed</p>
//               <h2 className="text-xl font-bold text-gray-900 mt-0.5">1,284</h2>
//               <p className="text-xs text-green-700 font-medium mt-0.5">+12% vs last month</p>
//             </div>
//           </div>

//           {/* Card 2 - Cost */}
//           <div className="stat-card animate-scale-in stagger-2 flex items-center gap-3 p-4 bg-gradient-to-br from-emerald-50 to-emerald-100/50 rounded-xl shadow-sm border border-emerald-100/40">
//             <div className="p-2.5 text-emerald-700 bg-white rounded-full shadow-sm border border-emerald-100">
//               <HiOutlineCash size={18} />
//             </div>
//             <div className="flex-1">
//               <p className="text-xs text-gray-600 font-semibold uppercase tracking-wide">Avg. Service Cost</p>
//               <h2 className="text-xl font-bold text-gray-900 mt-0.5">$186.50</h2>
//               <p className="text-xs text-gray-600 font-medium mt-0.5">-3% vs last month</p>
//             </div>
//           </div>

//           {/* Card 3 - Pending */}
//           <div className="stat-card animate-scale-in stagger-3 flex items-center gap-3 p-4 bg-gradient-to-br from-amber-50 to-amber-100/50 rounded-xl shadow-sm border border-amber-100/40">
//             <div className="p-2.5 text-amber-700 bg-white rounded-full shadow-sm border border-amber-100">
//               <HiOutlineClock size={18} />
//             </div>
//             <div className="flex-1">
//               <p className="text-xs text-gray-600 font-semibold uppercase tracking-wide">Pending Payments</p>
//               <h2 className="text-xl font-bold text-gray-900 mt-0.5">18</h2>
//               <p className="text-xs text-amber-700 font-medium mt-0.5">Action required</p>
//             </div>
//           </div>

//           {/* Card 4 - Rating */}
//           <div className="stat-card animate-scale-in stagger-4 flex items-center gap-3 p-4 bg-gradient-to-br from-purple-50 to-purple-100/50 rounded-xl shadow-sm border border-purple-100/40">
//             <div className="p-2.5 text-purple-700 bg-white rounded-full shadow-sm border border-purple-100">
//               <HiOutlineStar size={18} />
//             </div>
//             <div className="flex-1">
//               <p className="text-xs text-gray-600 font-semibold uppercase tracking-wide">Satisfaction</p>
//               <h2 className="text-xl font-bold text-gray-900 mt-0.5">4.9/5</h2>
//               <p className="text-xs text-emerald-700 font-medium mt-0.5">Excellent</p>
//             </div>
//           </div>

//         </div>

//         {/* TABLE */}
//         <div className="mt-8 bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 animate-slide-in-up">

//           <div className="overflow-x-auto">
//             <table className="min-w-full w-full text-sm">

//               <thead className="bg-gradient-to-r from-gray-50 to-gray-50 border-b border-gray-100">
//                 <tr>
//                   <th className="p-4 text-left font-semibold text-gray-700">#</th>
//                   <th className="p-4 text-left font-semibold text-gray-700">Service</th>
//                   <th className="p-4 text-left font-semibold text-gray-700">Vehicle</th>
//                   <th className="p-4 text-left font-semibold text-gray-700">Mechanic</th>
//                   <th className="p-4 text-left font-semibold text-gray-700">Date</th>
//                   <th className="p-4 text-left font-semibold text-gray-700">Status</th>
//                   <th className="p-4 text-left font-semibold text-gray-700">Amount</th>
//                 </tr>
//               </thead>

//               <tbody className="text-gray-700">

//                 {currentData.map((row, i) => (
//                   <tr
//                     key={row.id}
//                     className="table-row-hover border-t border-gray-100"
//                     onMouseEnter={() => setHoveredRow(row.id)}
//                     onMouseLeave={() => setHoveredRow(null)}
//                   >
//                     <td className="p-4 whitespace-nowrap font-semibold text-gray-900">{String(row.id).padStart(2, '0')}</td>
//                     <td className="p-4 whitespace-nowrap font-medium text-gray-900">{row.service}</td>
//                     <td className="p-4 whitespace-nowrap text-gray-600">{row.vehicle}</td>
//                     <td className="p-4 whitespace-nowrap text-gray-600">{row.mechanic}</td>
//                     <td className="p-4 whitespace-nowrap text-gray-600">{row.date}</td>

//                     <td className="p-4">
//                       <span
//                         className={`status-badge px-3 py-1.5 rounded-full text-xs font-semibold inline-block
//                           ${row.status === "Completed"
//                             ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
//                             : row.status === "Pending"
//                             ? "bg-amber-50 text-amber-700 border border-amber-200"
//                             : "bg-red-50 text-red-700 border border-red-200"
//                           }`}
//                       >
//                         {row.status}
//                       </span>
//                     </td>

//                     <td className="p-4 font-bold text-gray-900">{row.amount}</td>
//                   </tr>
//                 ))}

//               </tbody>

//             </table>
//           </div>

//           {/* Table Footer */}
//           <div className="px-6 py-4 border-t border-gray-100 bg-gray-50/50 flex items-center justify-between text-sm text-gray-600">
//             <p>Showing <span className="font-semibold text-gray-900">{startIndex + 1}</span>-<span className="font-semibold text-gray-900">{Math.min(endIndex, serviceData.length)}</span> of <span className="font-semibold text-gray-900">{serviceData.length}</span></p>
//             <div className="flex items-center gap-2">
//               <button 
//                 onClick={handlePreviousPage}
//                 disabled={currentPage === 1}
//                 className="px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-white transition text-gray-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 Previous
//               </button>
//               {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
//                 <button 
//                   key={page}
//                   onClick={() => handlePageClick(page)}
//                   className={`px-3 py-1.5 rounded-lg font-medium transition ${
//                     currentPage === page
//                       ? "bg-[#1C52AF] text-white"
//                       : "border border-gray-200 hover:bg-white text-gray-700"
//                   }`}
//                 >
//                   {page}
//                 </button>
//               ))}
//               <button 
//                 onClick={handleNextPage}
//                 disabled={currentPage === totalPages}
//                 className="px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-white transition text-gray-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 Next
//               </button>
//             </div>
//           </div>

//         </div>

//       </div>
//     </div>
//   );
// };

// export default ServiceHistory;








import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
  HiOutlineFilter,
  HiOutlineDownload,
  HiOutlineClipboardCheck,
  HiOutlineCash,
  HiOutlineClock,
  HiOutlineStar,
  HiOutlineRefresh,
  HiOutlineExclamationCircle,
  HiOutlineDocumentText,
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
} from "react-icons/hi";
import api from "../../api/axios";

const ServiceHistory = () => {
  const [hoveredRow, setHoveredRow] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterMechanic, setFilterMechanic] = useState("All");
  const itemsPerPage = 5;

  const [serviceData, setServiceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  // ─── FORMAT DATE ───
  const formatDate = (dateString) => {
    if (!dateString) return "—";
    try {
      const d = new Date(dateString);
      if (isNaN(d.getTime())) return dateString;
      return d.toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    } catch {
      return dateString;
    }
  };

  // ─── FORMAT AMOUNT ───
  const formatAmount = (value) => {
    if (value === null || value === undefined) return "$0.00";
    const num = typeof value === "string" ? parseFloat(value) : value;
    if (isNaN(num)) return "$0.00";
    return `$${num.toFixed(2)}`;
  };

  // ─── NORMALIZE BOOKINGS FROM API ───
  const normalizeBookings = (data) => {
    if (!Array.isArray(data)) return [];

    return data.map((item, index) => {
      // Service name from nested object
      const serviceName =
        item.service && typeof item.service === "object"
          ? item.service.name || item.service.description || "Unknown Service"
          : item.serviceName || item.service || "Unknown Service";

      // Vehicle from nested object
      let vehicleName = "Unknown Vehicle";
      if (item.vehicle && typeof item.vehicle === "object") {
        const { brand, model, year } = item.vehicle;
        const parts = [year, brand, model].filter(Boolean);
        vehicleName = parts.length > 0 ? parts.join(" ") : "Unknown Vehicle";
      } else {
        vehicleName = item.vehicleName || item.vehicle || "Unknown Vehicle";
      }

      // Mechanic / Provider from nested object
      let mechanicName = "Unassigned";
      if (item.provider && typeof item.provider === "object") {
        const { firstName, lastName, name, email } = item.provider;
        mechanicName =
          [firstName, lastName].filter(Boolean).join(" ").trim() ||
          name ||
          email ||
          "Unassigned";
      } else if (item.mechanic && typeof item.mechanic === "object") {
        const { firstName, lastName, name, email } = item.mechanic;
        mechanicName =
          [firstName, lastName].filter(Boolean).join(" ").trim() ||
          name ||
          email ||
          "Unassigned";
      } else {
        mechanicName =
          item.mechanicName || item.mechanic || item.providerName || "Unassigned";
      }

      // Use totalAmount as the display amount
      const amount = formatAmount(item.totalAmount || item.subtotal || item.amount);

      // Use scheduledDate for display
      const date = formatDate(item.scheduledDate || item.createdAt);

      // Status from API (pending, completed, cancelled, etc.)
      const status = item.status
        ? item.status.charAt(0).toUpperCase() + item.status.slice(1)
        : "Pending";

      // Use bookingNumber or index for display ID
      const displayId = item.bookingNumber || `#${String(index + 1).padStart(3, "0")}`;

      return {
        id: item.id || index,
        displayId,
        service: serviceName,
        vehicle: vehicleName,
        mechanic: mechanicName,
        date,
        status,
        amount,
        raw: item, // keep raw data for export
      };
    });
  };

  // ─── FETCH BOOKINGS ───
  const fetchBookings = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get("/bookings");
      setServiceData(normalizeBookings(res.data));
    } catch (err) {
      setServiceData([]);
      const status = err.response?.status;
      const msg =
        status === 404
          ? "Bookings endpoint not found"
          : status === 401
          ? "Unauthorized — please log in again"
          : status >= 500
          ? "Server error — try again later"
          : err.message || "Failed to load bookings";
      setError(msg);
      console.error("Bookings fetch failed:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchBookings();
    setTimeout(() => setRefreshing(false), 500);
  };

  // ─── FILTERED DATA ───
  const filteredData = useMemo(() => {
    return serviceData.filter((item) => {
      const statusMatch = filterStatus === "All" || item.status === filterStatus;
      const mechanicMatch =
        filterMechanic === "All" || item.mechanic === filterMechanic;
      return statusMatch && mechanicMatch;
    });
  }, [serviceData, filterStatus, filterMechanic]);

  // ─── DYNAMIC STATS ───
  const stats = useMemo(() => {
    const completed = serviceData.filter((r) => r.status === "Completed").length;
    const pending = serviceData.filter((r) => r.status === "Pending").length;
    const cancelled = serviceData.filter((r) => r.status === "Cancelled").length;

    const completedTotal = serviceData
      .filter((r) => r.status === "Completed")
      .reduce((sum, r) => {
        const val = parseFloat(r.amount.replace("$", ""));
        return sum + (isNaN(val) ? 0 : val);
      }, 0);

    const avgCost = completed > 0 ? completedTotal / completed : 0;

    return {
      completed,
      pending,
      cancelled,
      avgCost: formatAmount(avgCost),
    };
  }, [serviceData]);

  // ─── UNIQUE VALUES FOR FILTERS ───
  const mechanics = useMemo(() => {
    const names = [
      ...new Set(serviceData.map((item) => item.mechanic).filter(Boolean)),
    ];
    return names.sort();
  }, [serviceData]);

  const statuses = useMemo(() => {
    const s = [
      ...new Set(serviceData.map((item) => item.status).filter(Boolean)),
    ];
    return s.length > 0 ? s : ["Completed", "Pending", "Cancelled"];
  }, [serviceData]);

  // ─── EXPORT CSV ───
  const handleExportCSV = () => {
    if (filteredData.length === 0) return;
    const headers = [
      "Booking ID",
      "Service",
      "Vehicle",
      "Mechanic",
      "Date",
      "Status",
      "Amount",
    ];
    const csvContent = [
      headers.join(","),
      ...filteredData.map((row) =>
        [
          row.displayId,
          row.service,
          row.vehicle,
          row.mechanic,
          row.date,
          row.status,
          row.amount,
        ].join(",")
      ),
    ].join("\n");

    const element = document.createElement("a");
    element.setAttribute(
      "href",
      "data:text/csv;charset=utf-8," + encodeURIComponent(csvContent)
    );
    element.setAttribute(
      "download",
      `service_history_${new Date().toISOString().split("T")[0]}.csv`
    );
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const resetFilters = () => {
    setFilterStatus("All");
    setFilterMechanic("All");
    setCurrentPage(1);
  };

  // ─── PAGINATION ───
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = filteredData.slice(startIndex, endIndex);

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  // ─── UI COMPONENTS ───
  const ErrorBanner = ({ message, onRetry }) => (
    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3 animate-slide-in-down">
      <HiOutlineExclamationCircle className="text-red-500 text-xl flex-shrink-0" />
      <div className="flex-1">
        <p className="text-sm font-medium text-red-800">Failed to load data</p>
        <p className="text-xs text-red-600 mt-0.5">{message}</p>
      </div>
      <button
        onClick={onRetry}
        className="px-3 py-1.5 text-xs font-medium bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition"
      >
        Retry
      </button>
    </div>
  );

  const TableSkeleton = () => (
    <div className="animate-pulse">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="flex gap-4 p-4 border-b border-gray-100">
          <div className="h-4 bg-gray-200 rounded w-24" />
          <div className="h-4 bg-gray-200 rounded w-32 flex-1" />
          <div className="h-4 bg-gray-200 rounded w-28" />
          <div className="h-4 bg-gray-200 rounded w-24" />
          <div className="h-4 bg-gray-200 rounded w-20" />
          <div className="h-4 bg-gray-200 rounded w-16" />
          <div className="h-4 bg-gray-200 rounded w-16" />
        </div>
      ))}
    </div>
  );

  return (
    <div className="py-8 min-h-screen px-4 bg-gradient-to-br from-slate-50 via-white to-slate-50">
      <style>{`
        @keyframes slideInDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .animate-slide-in-down { animation: slideInDown 0.5s ease-out forwards; opacity: 0; }
        .animate-slide-in-up { animation: slideInUp 0.5s ease-out forwards; opacity: 0; }
        .animate-fade-in { animation: fadeIn 0.4s ease-out forwards; opacity: 0; }
        .animate-scale-in { animation: scaleIn 0.3s ease-out forwards; opacity: 0; }
        .animate-spin-slow { animation: spin 1s linear infinite; }

        .stagger-1 { animation-delay: 0.1s; }
        .stagger-2 { animation-delay: 0.2s; }
        .stagger-3 { animation-delay: 0.3s; }
        .stagger-4 { animation-delay: 0.4s; }

        .stat-card {
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
          position: relative;
          overflow: hidden;
        }
        .stat-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
        }
        .stat-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0));
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .stat-card:hover::before { opacity: 1; }

        .btn-hover {
          transition: all 0.3s ease;
        }
        .btn-hover:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
        }
        .btn-hover:active { transform: translateY(0); }

        .table-row-hover {
          transition: all 0.25s ease;
        }
        .table-row-hover:hover {
          background-color: #f9fafb;
          box-shadow: inset 0 0 0 1px rgba(29, 82, 175, 0.1);
        }
        .status-badge {
          transition: all 0.25s ease;
        }
        .table-row-hover:hover .status-badge {
          transform: scale(1.05);
        }
      `}</style>

      <div className="flex flex-col gap-6 mb-8 max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-6 animate-slide-in-down">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Service History</h1>
            <p className="text-sm text-gray-500">
              Review all historical maintenance and repair services across your fleet.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 animate-fade-in">
            <button
              onClick={handleRefresh}
              disabled={refreshing}
              className="btn-hover flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white shadow-sm border border-gray-100 hover:shadow-md text-gray-700 text-sm font-medium disabled:opacity-50"
            >
              <HiOutlineRefresh
                className={`text-lg text-[#1C52AF] ${refreshing ? "animate-spin-slow" : ""}`}
              />
              {refreshing ? "Refreshing..." : "Refresh"}
            </button>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className="btn-hover flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white shadow-sm border border-gray-100 hover:shadow-md text-gray-700 text-sm font-medium"
            >
              <HiOutlineFilter className="text-lg text-[#1C52AF]" />
              Filters
            </button>

            <button
              onClick={handleExportCSV}
              disabled={filteredData.length === 0}
              className="btn-hover flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#1C52AF]/10 text-[#1C52AF] hover:bg-[#1C52AF]/15 text-sm font-medium border border-[#1C52AF]/20 disabled:opacity-40"
            >
              <HiOutlineDownload className="text-lg" />
              Export CSV
            </button>
          </div>
        </div>

        {/* FILTER PANEL */}
        {showFilters && (
          <div className="mt-4 p-5 bg-white rounded-xl shadow-sm border border-gray-100 animate-slide-in-up">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
              <button
                onClick={() => setShowFilters(false)}
                className="text-gray-400 hover:text-gray-600 text-2xl"
              >
                ×
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">
                  Status
                </label>
                <select
                  value={filterStatus}
                  onChange={(e) => {
                    setFilterStatus(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full border border-gray-100 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                >
                  <option>All</option>
                  {statuses.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">
                  Mechanic
                </label>
                <select
                  value={filterMechanic}
                  onChange={(e) => {
                    setFilterMechanic(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full border border-gray-100 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                >
                  <option>All</option>
                  {mechanics.map((name) => (
                    <option key={name} value={name}>
                      {name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-4 flex gap-2">
              <button
                onClick={resetFilters}
                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 text-sm font-medium hover:bg-gray-50 transition"
              >
                Reset Filters
              </button>
              <button
                onClick={() => setShowFilters(false)}
                className="px-4 py-2 rounded-lg bg-[#1C52AF] text-white text-sm font-medium hover:bg-[#1645a0] transition"
              >
                Done
              </button>
            </div>
          </div>
        )}

        {/* STAT CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="stat-card animate-scale-in stagger-1 flex items-center gap-3 p-4 bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-xl shadow-sm border border-blue-100/40">
            <div className="p-2.5 text-[#1C52AF] bg-white rounded-full shadow-sm border border-blue-100">
              <HiOutlineClipboardCheck size={18} />
            </div>
            <div className="flex-1">
              <p className="text-xs text-gray-600 font-semibold uppercase tracking-wide">
                Total Completed
              </p>
              <h2 className="text-xl font-bold text-gray-900 mt-0.5">
                {loading ? "—" : stats.completed}
              </h2>
              <p className="text-xs text-green-700 font-medium mt-0.5">
                +12% vs last month
              </p>
            </div>
          </div>

          <div className="stat-card animate-scale-in stagger-2 flex items-center gap-3 p-4 bg-gradient-to-br from-emerald-50 to-emerald-100/50 rounded-xl shadow-sm border border-emerald-100/40">
            <div className="p-2.5 text-emerald-700 bg-white rounded-full shadow-sm border border-emerald-100">
              <HiOutlineCash size={18} />
            </div>
            <div className="flex-1">
              <p className="text-xs text-gray-600 font-semibold uppercase tracking-wide">
                Avg. Service Cost
              </p>
              <h2 className="text-xl font-bold text-gray-900 mt-0.5">
                {loading ? "—" : stats.avgCost}
              </h2>
              <p className="text-xs text-gray-600 font-medium mt-0.5">
                -3% vs last month
              </p>
            </div>
          </div>

          <div className="stat-card animate-scale-in stagger-3 flex items-center gap-3 p-4 bg-gradient-to-br from-amber-50 to-amber-100/50 rounded-xl shadow-sm border border-amber-100/40">
            <div className="p-2.5 text-amber-700 bg-white rounded-full shadow-sm border border-amber-100">
              <HiOutlineClock size={18} />
            </div>
            <div className="flex-1">
              <p className="text-xs text-gray-600 font-semibold uppercase tracking-wide">
                Pending
              </p>
              <h2 className="text-xl font-bold text-gray-900 mt-0.5">
                {loading ? "—" : stats.pending}
              </h2>
              <p className="text-xs text-amber-700 font-medium mt-0.5">
                Action required
              </p>
            </div>
          </div>

          <div className="stat-card animate-scale-in stagger-4 flex items-center gap-3 p-4 bg-gradient-to-br from-purple-50 to-purple-100/50 rounded-xl shadow-sm border border-purple-100/40">
            <div className="p-2.5 text-purple-700 bg-white rounded-full shadow-sm border border-purple-100">
              <HiOutlineStar size={18} />
            </div>
            <div className="flex-1">
              <p className="text-xs text-gray-600 font-semibold uppercase tracking-wide">
                Satisfaction
              </p>
              <h2 className="text-xl font-bold text-gray-900 mt-0.5">4.9/5</h2>
              <p className="text-xs text-emerald-700 font-medium mt-0.5">
                Excellent
              </p>
            </div>
          </div>
        </div>

        {/* ERROR BANNER */}
        {error && <ErrorBanner message={error} onRetry={fetchBookings} />}

        {/* TABLE */}
        <div className="mt-8 bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 animate-slide-in-up">
          <div className="overflow-x-auto">
            {loading ? (
              <TableSkeleton />
            ) : serviceData.length === 0 ? (
              <div className="p-12 text-center">
                <HiOutlineDocumentText className="mx-auto text-gray-300 text-4xl mb-3" />
                <p className="text-gray-500 font-medium">No service history</p>
                <p className="text-sm text-gray-400 mt-1">
                  {error
                    ? "Fix the error above to load data"
                    : "Your bookings will appear here"}
                </p>
              </div>
            ) : (
              <table className="min-w-full w-full text-sm">
                <thead className="bg-gradient-to-r from-gray-50 to-gray-50 border-b border-gray-100">
                  <tr>
                    <th className="p-4 text-left font-semibold text-gray-700">
                      Booking ID
                    </th>
                    <th className="p-4 text-left font-semibold text-gray-700">
                      Service
                    </th>
                    <th className="p-4 text-left font-semibold text-gray-700">
                      Vehicle
                    </th>
                    <th className="p-4 text-left font-semibold text-gray-700">
                      Mechanic
                    </th>
                    <th className="p-4 text-left font-semibold text-gray-700">
                      Date
                    </th>
                    <th className="p-4 text-left font-semibold text-gray-700">
                      Status
                    </th>
                    <th className="p-4 text-left font-semibold text-gray-700">
                      Amount
                    </th>
                  </tr>
                </thead>

                <tbody className="text-gray-700">
                  {currentData.map((row) => (
                    <tr
                      key={row.id}
                      className="table-row-hover border-t border-gray-100"
                      onMouseEnter={() => setHoveredRow(row.id)}
                      onMouseLeave={() => setHoveredRow(null)}
                    >
                      <td className="p-4 whitespace-nowrap font-semibold text-gray-900 font-mono text-xs">
                        {row.displayId}
                      </td>
                      <td className="p-4 whitespace-nowrap font-medium text-gray-900">
                        {row.service}
                      </td>
                      <td className="p-4 whitespace-nowrap text-gray-600">
                        {row.vehicle}
                      </td>
                      <td className="p-4 whitespace-nowrap text-gray-600">
                        {row.mechanic}
                      </td>
                      <td className="p-4 whitespace-nowrap text-gray-600">
                        {row.date}
                      </td>

                      <td className="p-4">
                        <span
                          className={`status-badge px-3 py-1.5 rounded-full text-xs font-semibold inline-block
                          ${
                            row.status === "Completed"
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                              : row.status === "Pending"
                              ? "bg-amber-50 text-amber-700 border border-amber-200"
                              : row.status === "Cancelled"
                              ? "bg-red-50 text-red-700 border border-red-200"
                              : "bg-gray-50 text-gray-700 border border-gray-200"
                          }`}
                        >
                          {row.status}
                        </span>
                      </td>

                      <td className="p-4 font-bold text-gray-900">
                        {row.amount}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* TABLE FOOTER */}
          {filteredData.length > 0 && (
            <div className="px-6 py-4 border-t border-gray-100 bg-gray-50/50 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-600">
              <p>
                Showing{" "}
                <span className="font-semibold text-gray-900">
                  {startIndex + 1}
                </span>
                -
                <span className="font-semibold text-gray-900">
                  {Math.min(endIndex, filteredData.length)}
                </span>{" "}
                of{" "}
                <span className="font-semibold text-gray-900">
                  {filteredData.length}
                </span>
              </p>
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePreviousPage}
                  disabled={currentPage === 1}
                  className="p-2 rounded-lg border border-gray-200 hover:bg-white transition text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <HiOutlineChevronLeft size={16} />
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => handlePageClick(page)}
                      className={`px-3 py-1.5 rounded-lg font-medium transition min-w-[36px] ${
                        currentPage === page
                          ? "bg-[#1C52AF] text-white shadow-sm"
                          : "border border-gray-200 hover:bg-white text-gray-700"
                      }`}
                    >
                      {page}
                    </button>
                  )
                )}

                <button
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-lg border border-gray-200 hover:bg-white transition text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <HiOutlineChevronRight size={16} />
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









