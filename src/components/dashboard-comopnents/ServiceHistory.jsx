









import React, { useState } from "react";
import {
  HiOutlineFilter,
  HiOutlineDownload,
  HiOutlineClipboardCheck,
  HiOutlineCash,
  HiOutlineClock,
  HiOutlineStar,
} from "react-icons/hi";

const ServiceHistory = () => {
  const [hoveredRow, setHoveredRow] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterMechanic, setFilterMechanic] = useState("All");
  const itemsPerPage = 5;

  const allServiceData = [
    { id: 1, service: "Full Oil Change", vehicle: "Tesla Model 3", mechanic: "Marco Rossi", date: "18 Apr 2026", status: "Completed", amount: "$89.00" },
    { id: 2, service: "Brake Repair", vehicle: "Honda Civic", mechanic: "Lara Smith", date: "16 Apr 2026", status: "Pending", amount: "$120.00" },
    { id: 3, service: "AC Service", vehicle: "Toyota Camry", mechanic: "John Doe", date: "14 Apr 2026", status: "Completed", amount: "$75.00" },
    { id: 4, service: "Engine Diagnostic", vehicle: "Tesla Model 3", mechanic: "Marco Rossi", date: "12 Apr 2026", status: "Completed", amount: "$99.00" },
    { id: 5, service: "Tire Rotation", vehicle: "Honda Civic", mechanic: "Lara Smith", date: "10 Apr 2026", status: "Completed", amount: "$45.00" },
    { id: 6, service: "Transmission Service", vehicle: "Toyota Camry", mechanic: "John Doe", date: "08 Apr 2026", status: "Cancelled", amount: "$200.00" },
    { id: 7, service: "Battery Replacement", vehicle: "Tesla Model 3", mechanic: "Marco Rossi", date: "05 Apr 2026", status: "Completed", amount: "$150.00" },
    { id: 8, service: "Suspension Service", vehicle: "Honda Civic", mechanic: "Lara Smith", date: "02 Apr 2026", status: "Completed", amount: "$180.00" },
    { id: 9, service: "Wheel Alignment", vehicle: "Tesla Model 3", mechanic: "Marco Rossi", date: "30 Mar 2026", status: "Completed", amount: "$85.00" },
    { id: 10, service: "Spark Plug Replacement", vehicle: "Honda Civic", mechanic: "Lara Smith", date: "28 Mar 2026", status: "Pending", amount: "$65.00" },
    { id: 11, service: "Air Filter Replacement", vehicle: "Toyota Camry", mechanic: "John Doe", date: "25 Mar 2026", status: "Completed", amount: "$40.00" },
    { id: 12, service: "Oil Change", vehicle: "Tesla Model 3", mechanic: "Marco Rossi", date: "22 Mar 2026", status: "Completed", amount: "$89.00" },
  ];

  // Filter logic
  const serviceData = allServiceData.filter((item) => {
    const statusMatch = filterStatus === "All" || item.status === filterStatus;
    const mechanicMatch = filterMechanic === "All" || item.mechanic === filterMechanic;
    return statusMatch && mechanicMatch;
  });

  // Export CSV function
  const handleExportCSV = () => {
    const headers = ["ID", "Service", "Vehicle", "Mechanic", "Date", "Status", "Amount"];
    const csvContent = [
      headers.join(","),
      ...serviceData.map((row) =>
        [row.id, row.service, row.vehicle, row.mechanic, row.date, row.status, row.amount].join(",")
      ),
    ].join("\n");

    const element = document.createElement("a");
    element.setAttribute("href", "data:text/csv;charset=utf-8," + encodeURIComponent(csvContent));
    element.setAttribute("download", "service_history.csv");
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

  const totalPages = Math.ceil(serviceData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = serviceData.slice(startIndex, endIndex);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="py-8 min-h-screen px-4 bg-gradient-to-br from-slate-50 via-white to-slate-50">
      <style>{`
        @keyframes slideInDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes shimmer {
          0% {
            background-position: -1000px 0;
          }
          100% {
            background-position: 1000px 0;
          }
        }

        .animate-slide-in-down {
          animation: slideInDown 0.5s ease-out forwards;
          opacity: 0;
        }

        .animate-slide-in-up {
          animation: slideInUp 0.5s ease-out forwards;
          opacity: 0;
        }

        .animate-fade-in {
          animation: fadeIn 0.4s ease-out forwards;
          opacity: 0;
        }

        .animate-scale-in {
          animation: scaleIn 0.3s ease-out forwards;
          opacity: 0;
        }

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
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0));
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .stat-card:hover::before {
          opacity: 1;
        }

        .btn-hover {
          transition: all 0.3s ease;
        }

        .btn-hover:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
        }

        .btn-hover:active {
          transform: translateY(0);
        }

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

      {/* HEADER */}
      <div className="flex flex-col gap-6 mb-8 max-w-7xl mx-auto">

        {/* TITLE SECTION */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-6 animate-slide-in-down">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Service History
            </h1>
            <p className="text-sm text-gray-500">
              Review all historical maintenance and repair services across your fleet.
            </p>
          </div>

          {/* BUTTONS */}
          <div className="flex flex-wrap gap-3 animate-fade-in">

            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="btn-hover flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white shadow-sm border border-gray-100 hover:shadow-md text-gray-700 text-sm font-medium"
            >
              <HiOutlineFilter className="text-lg text-[#1C52AF]" />
              Filters
            </button>

            <button 
              onClick={handleExportCSV}
              className="btn-hover flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#1C52AF]/10 text-[#1C52AF] hover:bg-[#1C52AF]/15 text-sm font-medium border border-[#1C52AF]/20"
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
              {/* Status Filter */}
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">Status</label>
                <select 
                  value={filterStatus}
                  onChange={(e) => {
                    setFilterStatus(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full border border-gray-100 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                >
                  <option>All</option>
                  <option>Completed</option>
                  <option>Pending</option>
                  <option>Cancelled</option>
                </select>
              </div>

              {/* Mechanic Filter */}
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">Mechanic</label>
                <select 
                  value={filterMechanic}
                  onChange={(e) => {
                    setFilterMechanic(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full border border-gray-100 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                >
                  <option>All</option>
                  <option>Marco Rossi</option>
                  <option>Lara Smith</option>
                  <option>John Doe</option>
                </select>
              </div>
            </div>

            {/* Reset Button */}
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

          {/* Card 1 - Completed */}
          <div className="stat-card animate-scale-in stagger-1 flex items-center gap-3 p-4 bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-xl shadow-sm border border-blue-100/40">
            <div className="p-2.5 text-[#1C52AF] bg-white rounded-full shadow-sm border border-blue-100">
              <HiOutlineClipboardCheck size={18} />
            </div>
            <div className="flex-1">
              <p className="text-xs text-gray-600 font-semibold uppercase tracking-wide">Total Completed</p>
              <h2 className="text-xl font-bold text-gray-900 mt-0.5">1,284</h2>
              <p className="text-xs text-green-700 font-medium mt-0.5">+12% vs last month</p>
            </div>
          </div>

          {/* Card 2 - Cost */}
          <div className="stat-card animate-scale-in stagger-2 flex items-center gap-3 p-4 bg-gradient-to-br from-emerald-50 to-emerald-100/50 rounded-xl shadow-sm border border-emerald-100/40">
            <div className="p-2.5 text-emerald-700 bg-white rounded-full shadow-sm border border-emerald-100">
              <HiOutlineCash size={18} />
            </div>
            <div className="flex-1">
              <p className="text-xs text-gray-600 font-semibold uppercase tracking-wide">Avg. Service Cost</p>
              <h2 className="text-xl font-bold text-gray-900 mt-0.5">$186.50</h2>
              <p className="text-xs text-gray-600 font-medium mt-0.5">-3% vs last month</p>
            </div>
          </div>

          {/* Card 3 - Pending */}
          <div className="stat-card animate-scale-in stagger-3 flex items-center gap-3 p-4 bg-gradient-to-br from-amber-50 to-amber-100/50 rounded-xl shadow-sm border border-amber-100/40">
            <div className="p-2.5 text-amber-700 bg-white rounded-full shadow-sm border border-amber-100">
              <HiOutlineClock size={18} />
            </div>
            <div className="flex-1">
              <p className="text-xs text-gray-600 font-semibold uppercase tracking-wide">Pending Payments</p>
              <h2 className="text-xl font-bold text-gray-900 mt-0.5">18</h2>
              <p className="text-xs text-amber-700 font-medium mt-0.5">Action required</p>
            </div>
          </div>

          {/* Card 4 - Rating */}
          <div className="stat-card animate-scale-in stagger-4 flex items-center gap-3 p-4 bg-gradient-to-br from-purple-50 to-purple-100/50 rounded-xl shadow-sm border border-purple-100/40">
            <div className="p-2.5 text-purple-700 bg-white rounded-full shadow-sm border border-purple-100">
              <HiOutlineStar size={18} />
            </div>
            <div className="flex-1">
              <p className="text-xs text-gray-600 font-semibold uppercase tracking-wide">Satisfaction</p>
              <h2 className="text-xl font-bold text-gray-900 mt-0.5">4.9/5</h2>
              <p className="text-xs text-emerald-700 font-medium mt-0.5">Excellent</p>
            </div>
          </div>

        </div>

        {/* TABLE */}
        <div className="mt-8 bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 animate-slide-in-up">

          <div className="overflow-x-auto">
            <table className="min-w-full w-full text-sm">

              <thead className="bg-gradient-to-r from-gray-50 to-gray-50 border-b border-gray-100">
                <tr>
                  <th className="p-4 text-left font-semibold text-gray-700">#</th>
                  <th className="p-4 text-left font-semibold text-gray-700">Service</th>
                  <th className="p-4 text-left font-semibold text-gray-700">Vehicle</th>
                  <th className="p-4 text-left font-semibold text-gray-700">Mechanic</th>
                  <th className="p-4 text-left font-semibold text-gray-700">Date</th>
                  <th className="p-4 text-left font-semibold text-gray-700">Status</th>
                  <th className="p-4 text-left font-semibold text-gray-700">Amount</th>
                </tr>
              </thead>

              <tbody className="text-gray-700">

                {currentData.map((row, i) => (
                  <tr
                    key={row.id}
                    className="table-row-hover border-t border-gray-100"
                    onMouseEnter={() => setHoveredRow(row.id)}
                    onMouseLeave={() => setHoveredRow(null)}
                  >
                    <td className="p-4 whitespace-nowrap font-semibold text-gray-900">{String(row.id).padStart(2, '0')}</td>
                    <td className="p-4 whitespace-nowrap font-medium text-gray-900">{row.service}</td>
                    <td className="p-4 whitespace-nowrap text-gray-600">{row.vehicle}</td>
                    <td className="p-4 whitespace-nowrap text-gray-600">{row.mechanic}</td>
                    <td className="p-4 whitespace-nowrap text-gray-600">{row.date}</td>

                    <td className="p-4">
                      <span
                        className={`status-badge px-3 py-1.5 rounded-full text-xs font-semibold inline-block
                          ${row.status === "Completed"
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : row.status === "Pending"
                            ? "bg-amber-50 text-amber-700 border border-amber-200"
                            : "bg-red-50 text-red-700 border border-red-200"
                          }`}
                      >
                        {row.status}
                      </span>
                    </td>

                    <td className="p-4 font-bold text-gray-900">{row.amount}</td>
                  </tr>
                ))}

              </tbody>

            </table>
          </div>

          {/* Table Footer */}
          <div className="px-6 py-4 border-t border-gray-100 bg-gray-50/50 flex items-center justify-between text-sm text-gray-600">
            <p>Showing <span className="font-semibold text-gray-900">{startIndex + 1}</span>-<span className="font-semibold text-gray-900">{Math.min(endIndex, serviceData.length)}</span> of <span className="font-semibold text-gray-900">{serviceData.length}</span></p>
            <div className="flex items-center gap-2">
              <button 
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
                className="px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-white transition text-gray-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button 
                  key={page}
                  onClick={() => handlePageClick(page)}
                  className={`px-3 py-1.5 rounded-lg font-medium transition ${
                    currentPage === page
                      ? "bg-[#1C52AF] text-white"
                      : "border border-gray-200 hover:bg-white text-gray-700"
                  }`}
                >
                  {page}
                </button>
              ))}
              <button 
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className="px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-white transition text-gray-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default ServiceHistory;