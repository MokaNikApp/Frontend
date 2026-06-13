






// import React, { useState, useMemo } from "react";
// import {
//   HiOutlineDownload,
//   HiOutlineClipboardCheck,
//   HiOutlineCash,
//   HiOutlineStar,
//   HiOutlineChevronLeft,
//   HiOutlineChevronRight,
//   HiOutlineDocumentText,
//   HiOutlineX,
//   HiOutlinePrinter,
// } from "react-icons/hi";
// import {
//   FaFileAlt,
//   FaCreditCard,
//   FaFileInvoiceDollar,
// } from "react-icons/fa";
// import api from "../../api/axios";


// const Payment = () => {
//   const [activeTab, setActiveTab] = useState("History");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage, setItemsPerPage] = useState(5);
//   const [showStatementModal, setShowStatementModal] = useState(false);

//   const paymentRecords = [
//     { id: 1, service: "Oil Change", vehicle: "Tesla Model 3", mechanic: "Marco Rossi", date: "12 Mar 2026", status: "Completed", amount: "$89.00" },
//     { id: 2, service: "Brake Repair", vehicle: "Honda Civic", mechanic: "Lara Smith", date: "10 Mar 2026", status: "Pending", amount: "$120.00" },
//     { id: 3, service: "AC Service", vehicle: "Toyota Camry", mechanic: "John Doe", date: "08 Mar 2026", status: "Completed", amount: "$75.00" },
//     { id: 4, service: "Engine Diagnostic", vehicle: "Tesla Model 3", mechanic: "Marco Rossi", date: "06 Mar 2026", status: "Completed", amount: "$99.00" },
//     { id: 5, service: "Tire Rotation", vehicle: "Honda Civic", mechanic: "Lara Smith", date: "04 Mar 2026", status: "Completed", amount: "$45.00" },
//     { id: 6, service: "Transmission Service", vehicle: "Toyota Camry", mechanic: "John Doe", date: "02 Mar 2026", status: "Cancelled", amount: "$200.00" },
//     { id: 7, service: "Battery Replacement", vehicle: "Tesla Model 3", mechanic: "Marco Rossi", date: "28 Feb 2026", status: "Completed", amount: "$150.00" },
//     { id: 8, service: "Suspension Service", vehicle: "Honda Civic", mechanic: "Lara Smith", date: "25 Feb 2026", status: "Completed", amount: "$180.00" },
//     { id: 9, service: "Wheel Alignment", vehicle: "Tesla Model 3", mechanic: "Marco Rossi", date: "22 Feb 2026", status: "Completed", amount: "$85.00" },
//     { id: 10, service: "Spark Plug Replacement", vehicle: "Honda Civic", mechanic: "Lara Smith", date: "20 Feb 2026", status: "Pending", amount: "$65.00" },
//     { id: 11, service: "Air Filter Replacement", vehicle: "Toyota Camry", mechanic: "John Doe", date: "18 Feb 2026", status: "Completed", amount: "$40.00" },
//     { id: 12, service: "Full Oil Change", vehicle: "Tesla Model 3", mechanic: "Marco Rossi", date: "15 Feb 2026", status: "Completed", amount: "$89.00" },
//   ];

//   const invoices = [
//     { id: "INV-1234", status: "Paid", amount: "$450.00", date: "12 Mar 2026", service: "Full Service Package" },
//     { id: "INV-1235", status: "Draft", amount: "$300.00", date: "10 Mar 2026", service: "Brake System Overhaul" },
//     { id: "INV-1236", status: "Pending", amount: "$150.00", date: "08 Mar 2026", service: "AC Repair" },
//     { id: "INV-1237", status: "Paid", amount: "$89.00", date: "05 Mar 2026", service: "Oil Change" },
//     { id: "INV-1238", status: "Overdue", amount: "$200.00", date: "01 Mar 2026", service: "Transmission Service" },
//   ];

//   const paymentMethods = [
//     { type: "Visa", last4: "4242", primary: true, expiry: "12/28" },
//     { type: "MasterCard", last4: "9876", primary: false, expiry: "09/27" },
//     { type: "Amex", last4: "1234", primary: false, expiry: "03/29" },
//   ];

//   // ─── PAGINATION LOGIC ───
//   const totalPages = Math.ceil(paymentRecords.length / itemsPerPage);
//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const endIndex = startIndex + itemsPerPage;
//   const currentData = paymentRecords.slice(startIndex, endIndex);

//   const handlePageChange = (page) => {
//     if (page >= 1 && page <= totalPages) {
//       setCurrentPage(page);
//     }
//   };

//   // ─── CSV EXPORT ───
//   const handleExportCSV = () => {
//     const headers = ["ID", "Service", "Vehicle", "Mechanic", "Date", "Status", "Amount"];
//     const csvContent = [
//       headers.join(","),
//       ...paymentRecords.map((row) =>
//         [row.id, row.service, row.vehicle, row.mechanic, row.date, row.status, row.amount].join(",")
//       ),
//     ].join("\n");

//     const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
//     const url = URL.createObjectURL(blob);
//     const element = document.createElement("a");
//     element.setAttribute("href", url);
//     element.setAttribute("download", `payment_history_${new Date().toISOString().split("T")[0]}.csv`);
//     element.style.display = "none";
//     document.body.appendChild(element);
//     element.click();
//     document.body.removeChild(element);
//     URL.revokeObjectURL(url);
//   };

//   // ─── STATEMENTS PRINT ───
//   const handlePrintStatement = () => {
//     const printWindow = window.open("", "_blank");
//     const statementHTML = `
//       <!DOCTYPE html>
//       <html>
//         <head>
//           <title>Payment Statement - Mar 2026</title>
//           <style>
//             body { font-family: system-ui, -apple-system, sans-serif; padding: 40px; color: #1f2937; }
//             .header { border-bottom: 2px solid #1C52AF; padding-bottom: 20px; margin-bottom: 30px; }
//             .header h1 { color: #1C52AF; margin: 0; font-size: 28px; }
//             .header p { color: #6b7280; margin: 8px 0 0; }
//             table { width: 100%; border-collapse: collapse; margin-top: 20px; }
//             th { background: #f8fafc; text-align: left; padding: 12px; font-weight: 600; border-bottom: 2px solid #e5e7eb; }
//             td { padding: 12px; border-bottom: 1px solid #f1f5f9; }
//             .total { text-align: right; margin-top: 30px; font-size: 18px; font-weight: 700; color: #1C52AF; }
//             .status { display: inline-block; padding: 4px 12px; border-radius: 9999px; font-size: 12px; font-weight: 600; }
//             .status-completed { background: #d1fae5; color: #065f46; }
//             .status-pending { background: #fef3c7; color: #92400e; }
//             .status-cancelled { background: #fee2e2; color: #991b1b; }
//             @media print { body { padding: 20px; } }
//           </style>
//         </head>
//         <body>
//           <div class="header">
//             <h1>Payment Statement</h1>
//             <p>Generated on ${new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p>
//             <p>Period: March 2026</p>
//           </div>
//           <table>
//             <thead>
//               <tr>
//                 <th>#</th><th>Service</th><th>Vehicle</th><th>Mechanic</th><th>Date</th><th>Status</th><th>Amount</th>
//               </tr>
//             </thead>
//             <tbody>
//               ${paymentRecords.map(r => `
//                 <tr>
//                   <td>${String(r.id).padStart(2, "0")}</td>
//                   <td>${r.service}</td>
//                   <td>${r.vehicle}</td>
//                   <td>${r.mechanic}</td>
//                   <td>${r.date}</td>
//                   <td><span class="status status-${r.status.toLowerCase()}">${r.status}</span></td>
//                   <td>${r.amount}</td>
//                 </tr>
//               `).join("")}
//             </tbody>
//           </table>
//           <div class="total">
//             Total Records: ${paymentRecords.length} | Total Amount: $${paymentRecords.reduce((sum, r) => sum + parseFloat(r.amount.replace("$", "")), 0).toFixed(2)}
//           </div>
//         </body>
//       </html>
//     `;
//     printWindow.document.write(statementHTML);
//     printWindow.document.close();
//     printWindow.focus();
//     setTimeout(() => printWindow.print(), 250);
//   };

//   return (
//     <div className="py-8 min-h-screen px-4 bg-gradient-to-br from-slate-50 via-white to-slate-50">

//       {/* ANIMATIONS */}
//       <style>{`
//         @keyframes slideInDown {
//           from { opacity: 0; transform: translateY(-20px); }
//           to { opacity: 1; transform: translateY(0); }
//         }
//         @keyframes slideInUp {
//           from { opacity: 0; transform: translateY(20px); }
//           to { opacity: 1; transform: translateY(0); }
//         }
//         @keyframes scaleIn {
//           from { opacity: 0; transform: scale(0.95); }
//           to { opacity: 1; transform: scale(1); }
//         }
//         @keyframes fadeIn {
//           from { opacity: 0; }
//           to { opacity: 1; }
//         }

//         .animate-slide-in-down { animation: slideInDown 0.5s ease-out forwards; opacity: 0; }
//         .animate-slide-in-up { animation: slideInUp 0.5s ease-out forwards; opacity: 0; }
//         .animate-scale-in { animation: scaleIn 0.3s ease-out forwards; opacity: 0; }
//         .animate-fade-in { animation: fadeIn 0.4s ease-out forwards; opacity: 0; }

//         .stagger-1 { animation-delay: 0.1s; }
//         .stagger-2 { animation-delay: 0.2s; }
//         .stagger-3 { animation-delay: 0.3s; }

//         .stat-card {
//           transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
//         }
//         .stat-card:hover {
//           transform: translateY(-6px);
//           box-shadow: 0 12px 24px rgba(0,0,0,0.1);
//         }
//         .btn-hover {
//           transition: all 0.3s ease;
//         }
//         .btn-hover:hover {
//           transform: translateY(-2px);
//           box-shadow: 0 8px 16px rgba(0,0,0,0.1);
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
//       `}</style>

//       <div className="max-w-7xl mx-auto mb-4">

//         {/* HEADER */}
//         <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6 animate-slide-in-down">
//           <div>
//             <h1 className="text-2xl font-bold text-gray-900 mb-2">Payments</h1>
//             <p className="text-sm text-gray-500">
//               Manage your transactions, invoices, and payment methods.
//             </p>
//           </div>

//           <div className="flex gap-3">
//             <button
//               onClick={handleExportCSV}
//               className="btn-hover flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white shadow-sm text-gray-700 text-sm font-medium"
//             >
//               <HiOutlineDownload className="text-[#1C52AF]" />
//               Export
//             </button>

//             <button
//               onClick={() => setShowStatementModal(true)}
//               className="btn-hover flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#1C52AF]/10 text-[#1C52AF] text-sm font-medium"
//             >
//               <FaFileAlt />
//               Statements
//             </button>
//           </div>
//         </div>

//         {/* STAT CARDS */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-6">
//           <div className="stat-card animate-scale-in stagger-1 flex items-center gap-3 p-4 bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-xl">
//             <div className="p-2.5 text-[#1C52AF] bg-white rounded-full shadow-sm">
//               <HiOutlineClipboardCheck size={18} />
//             </div>
//             <div>
//               <p className="text-xs text-gray-600 font-semibold uppercase tracking-wide">Total Revenue</p>
//               <h2 className="text-xl font-bold text-gray-900 mt-0.5">$45,230</h2>
//             </div>
//           </div>

//           <div className="stat-card animate-scale-in stagger-2 flex items-center gap-3 p-4 bg-gradient-to-br from-amber-50 to-amber-100/50 rounded-xl">
//             <div className="p-2.5 text-amber-700 bg-white rounded-full shadow-sm">
//               <HiOutlineCash size={18} />
//             </div>
//             <div>
//               <p className="text-xs text-gray-600 font-semibold uppercase tracking-wide">Pending</p>
//               <h2 className="text-xl font-bold text-gray-900 mt-0.5">$1,205</h2>
//             </div>
//           </div>

//           <div className="stat-card animate-scale-in stagger-3 flex items-center gap-3 p-4 bg-gradient-to-br from-purple-50 to-purple-100/50 rounded-xl">
//             <div className="p-2.5 text-purple-700 bg-white rounded-full shadow-sm">
//               <HiOutlineStar size={18} />
//             </div>
//             <div>
//               <p className="text-xs text-gray-600 font-semibold uppercase tracking-wide">Success Rate</p>
//               <h2 className="text-xl font-bold text-gray-900 mt-0.5">99.4%</h2>
//             </div>
//           </div>
//         </div>

//         {/* TABS */}
//         <div className="flex gap-2 p-1 mt-6 bg-gray-100 rounded-lg w-fit">
//           {["History", "Invoices", "Payment Methods"].map((tab) => (
//             <button
//               key={tab}
//               onClick={() => {
//                 setActiveTab(tab);
//                 setCurrentPage(1);
//               }}
//               className={`px-4 py-1.5 text-sm rounded-md transition-all ${
//                 activeTab === tab
//                   ? "bg-white shadow text-gray-900 font-medium"
//                   : "text-gray-500 hover:text-gray-700"
//               }`}
//             >
//               {tab}
//             </button>
//           ))}
//         </div>

//         {/* CONTENT */}
//         <div className="mt-6">

//           {/* HISTORY TABLE */}
//           {activeTab === "History" && (
//             <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden animate-slide-in-up">
//               <div className="overflow-x-auto">
//                 <table className="min-w-full text-sm">
//                   <thead className="bg-gradient-to-r from-gray-50 to-gray-50 border-b border-gray-100">
//                     <tr>
//                       <th className="p-4 text-left font-semibold text-gray-700">#</th>
//                       <th className="p-4 text-left font-semibold text-gray-700">Service</th>
//                       <th className="p-4 text-left font-semibold text-gray-700">Vehicle</th>
//                       <th className="p-4 text-left font-semibold text-gray-700">Mechanic</th>
//                       <th className="p-4 text-left font-semibold text-gray-700">Date</th>
//                       <th className="p-4 text-left font-semibold text-gray-700">Status</th>
//                       <th className="p-4 text-left font-semibold text-gray-700">Amount</th>
//                     </tr>
//                   </thead>

//                   <tbody className="text-gray-700">
//                     {currentData.map((r) => (
//                       <tr key={r.id} className="table-row-hover border-t border-gray-100">
//                         <td className="p-4 font-semibold text-gray-900">{String(r.id).padStart(2, "0")}</td>
//                         <td className="p-4 font-medium text-gray-900">{r.service}</td>
//                         <td className="p-4 text-gray-600">{r.vehicle}</td>
//                         <td className="p-4 text-gray-600">{r.mechanic}</td>
//                         <td className="p-4 text-gray-600">{r.date}</td>

//                         <td className="p-4">
//                           <span
//                             className={`px-3 py-1.5 rounded-full text-xs font-semibold inline-block ${
//                               r.status === "Completed"
//                                 ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
//                                 : r.status === "Pending"
//                                 ? "bg-amber-50 text-amber-700 border border-amber-200"
//                                 : "bg-red-50 text-red-700 border border-red-200"
//                             }`}
//                           >
//                             {r.status}
//                           </span>
//                         </td>

//                         <td className="p-4 font-bold text-gray-900">{r.amount}</td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>

//               {/* TABLE FOOTER / PAGINATION */}
//               <div className="px-6 py-4 border-t border-gray-100 bg-gray-50/50 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-600">
//                 <div className="flex items-center gap-3">
//                   <p>
//                     Showing <span className="font-semibold text-gray-900">{startIndex + 1}</span>-
//                     <span className="font-semibold text-gray-900">{Math.min(endIndex, paymentRecords.length)}</span> of{" "}
//                     <span className="font-semibold text-gray-900">{paymentRecords.length}</span>
//                   </p>
//                   <select
//                     value={itemsPerPage}
//                     onChange={(e) => {
//                       setItemsPerPage(Number(e.target.value));
//                       setCurrentPage(1);
//                     }}
//                     className="border border-gray-200 rounded-lg px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
//                   >
//                     {[5, 10, 15, 20].map((n) => (
//                       <option key={n} value={n}>{n} / page</option>
//                     ))}
//                   </select>
//                 </div>

//                 <div className="flex items-center gap-2">
//                   <button
//                     onClick={() => handlePageChange(currentPage - 1)}
//                     disabled={currentPage === 1}
//                     className="p-2 rounded-lg border border-gray-200 hover:bg-white transition text-gray-700 disabled:opacity-40 disabled:cursor-not-allowed"
//                   >
//                     <HiOutlineChevronLeft size={16} />
//                   </button>

//                   {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
//                     <button
//                       key={page}
//                       onClick={() => handlePageChange(page)}
//                       className={`px-3 py-1.5 rounded-lg font-medium transition min-w-[36px] ${
//                         currentPage === page
//                           ? "bg-[#1C52AF] text-white shadow-sm"
//                           : "border border-gray-200 hover:bg-white text-gray-700"
//                       }`}
//                     >
//                       {page}
//                     </button>
//                   ))}

//                   <button
//                     onClick={() => handlePageChange(currentPage + 1)}
//                     disabled={currentPage === totalPages}
//                     className="p-2 rounded-lg border border-gray-200 hover:bg-white transition text-gray-700 disabled:opacity-40 disabled:cursor-not-allowed"
//                   >
//                     <HiOutlineChevronRight size={16} />
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* INVOICES */}
//           {activeTab === "Invoices" && (
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 animate-slide-in-up">
//               {invoices.map((inv) => (
//                 <div
//                   key={inv.id}
//                   className="p-5 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 group"
//                 >
//                   <div className="flex items-start justify-between">
//                     <div className="p-2.5 bg-blue-50 rounded-lg">
//                       <FaFileInvoiceDollar className="text-[#1C52AF] text-lg" />
//                     </div>
//                     <span
//                       className={`px-3 py-1 rounded-full text-xs font-semibold ${
//                         inv.status === "Paid"
//                           ? "bg-emerald-50 text-emerald-700"
//                           : inv.status === "Draft"
//                           ? "bg-gray-100 text-gray-600"
//                           : inv.status === "Overdue"
//                           ? "bg-red-50 text-red-700"
//                           : "bg-amber-50 text-amber-700"
//                       }`}
//                     >
//                       {inv.status}
//                     </span>
//                   </div>
//                   <p className="font-semibold mt-3 text-gray-900">{inv.id}</p>
//                   <p className="text-sm text-gray-500 mt-1">{inv.service}</p>
//                   <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-50">
//                     <span className="text-sm text-gray-500">{inv.date}</span>
//                     <span className="font-bold text-gray-900">{inv.amount}</span>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}

//           {/* PAYMENT METHODS */}
//           {activeTab === "Payment Methods" && (
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 animate-slide-in-up">
//               {paymentMethods.map((pm, i) => (
//                 <div
//                   key={i}
//                   className={`p-5 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 relative ${
//                     pm.primary ? "ring-2 ring-[#1C52AF]/20" : ""
//                   }`}
//                 >
//                   {pm.primary && (
//                     <span className="absolute top-4 right-4 px-2 py-0.5 bg-[#1C52AF]/10 text-[#1C52AF] text-xs font-semibold rounded-full">
//                       Primary
//                     </span>
//                   )}
//                   <div className="p-2.5 bg-blue-50 rounded-lg w-fit">
//                     <FaCreditCard className="text-[#1C52AF] text-lg" />
//                   </div>
//                   <p className="font-semibold mt-3 text-gray-900">{pm.type}</p>
//                   <p className="text-sm text-gray-500 mt-1">**** {pm.last4}</p>
//                   <p className="text-xs text-gray-400 mt-2">Expires {pm.expiry}</p>
//                 </div>
//               ))}
//             </div>
//           )}

//         </div>
//       </div>

//       {/* STATEMENT MODAL */}
//       {showStatementModal && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
//           <div
//             className="absolute inset-0 bg-black/40 backdrop-blur-sm"
//             onClick={() => setShowStatementModal(false)}
//           />
//           <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden animate-scale-in">
//             <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
//               <div className="flex items-center gap-3">
//                 <HiOutlineDocumentText className="text-[#1C52AF] text-xl" />
//                 <h3 className="text-lg font-bold text-gray-900">Payment Statement</h3>
//               </div>
//               <button
//                 onClick={() => setShowStatementModal(false)}
//                 className="p-2 hover:bg-gray-100 rounded-lg transition text-gray-500"
//               >
//                 <HiOutlineX size={20} />
//               </button>
//             </div>

//             <div className="p-6 max-h-[60vh] overflow-y-auto">
//               <div className="flex items-center justify-between mb-6 p-4 bg-blue-50 rounded-xl">
//                 <div>
//                   <p className="text-sm text-gray-600">Statement Period</p>
//                   <p className="font-semibold text-gray-900">March 2026</p>
//                 </div>
//                 <div className="text-right">
//                   <p className="text-sm text-gray-600">Total Transactions</p>
//                   <p className="font-semibold text-gray-900">{paymentRecords.length}</p>
//                 </div>
//               </div>

//               <div className="space-y-3">
//                 {paymentRecords.slice(0, 5).map((r) => (
//                   <div key={r.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition">
//                     <div className="flex items-center gap-3">
//                       <div className={`w-2 h-2 rounded-full ${
//                         r.status === "Completed" ? "bg-emerald-500" : r.status === "Pending" ? "bg-amber-500" : "bg-red-500"
//                       }`} />
//                       <div>
//                         <p className="font-medium text-sm text-gray-900">{r.service}</p>
//                         <p className="text-xs text-gray-500">{r.date} • {r.vehicle}</p>
//                       </div>
//                     </div>
//                     <span className="font-semibold text-sm text-gray-900">{r.amount}</span>
//                   </div>
//                 ))}
//                 {paymentRecords.length > 5 && (
//                   <p className="text-center text-sm text-gray-500 py-2">
//                     + {paymentRecords.length - 5} more transactions
//                   </p>
//                 )}
//               </div>
//             </div>

//             <div className="px-6 py-4 border-t border-gray-100 bg-gray-50/50 flex gap-3">
//               <button
//                 onClick={handlePrintStatement}
//                 className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#1C52AF] text-white text-sm font-medium hover:bg-[#1645a0] transition"
//               >
//                 <HiOutlinePrinter size={18} />
//                 Print / Save PDF
//               </button>
//               <button
//                 onClick={() => setShowStatementModal(false)}
//                 className="px-4 py-2.5 rounded-lg border border-gray-300 text-gray-700 text-sm font-medium hover:bg-gray-50 transition"
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//     </div>
//   );
// };

// export default Payment;






import React, { useState, useMemo, useEffect, useCallback } from "react";
import {
  HiOutlineDownload,
  HiOutlineClipboardCheck,
  HiOutlineCash,
  HiOutlineStar,
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
  HiOutlineDocumentText,
  HiOutlineX,
  HiOutlinePrinter,
  HiOutlineRefresh,
  HiOutlineExclamationCircle,
} from "react-icons/hi";
import {
  FaFileAlt,
  FaCreditCard,
  FaFileInvoiceDollar,
} from "react-icons/fa";
import api from "../../api/axios";

const Payment = () => {
  const [activeTab, setActiveTab] = useState("History");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [showStatementModal, setShowStatementModal] = useState(false);

  const [paymentRecords, setPaymentRecords] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [loading, setLoading] = useState({
    history: true,
    invoices: true,
    methods: true,
  });
  const [error, setError] = useState({
    history: null,
    invoices: null,
    methods: null,
  });
  const [refreshing, setRefreshing] = useState(false);

  const normalizePayments = (data) => {
    if (!Array.isArray(data)) return [];
    return data.map((item) => ({
      id: item.id || item.payment_id,
      service: item.service_name || item.service || item.title,
      vehicle: item.vehicle_name || item.vehicle || item.car,
      mechanic: item.mechanic_name || item.mechanic || item.provider,
      date: item.service_date || item.date || item.created_at || item.payment_date,
      status: item.status || "Completed",
      amount: typeof item.amount === "number"
        ? `$${item.amount.toFixed(2)}`
        : item.amount?.startsWith("$")
          ? item.amount
          : `$${parseFloat(item.amount || 0).toFixed(2)}`,
    }));
  };

  const normalizeInvoices = (data) => {
    if (!Array.isArray(data)) return [];
    return data.map((item) => ({
      id: item.invoice_number || item.id || item.invoice_id,
      status: item.status || "Draft",
      amount: typeof item.amount === "number"
        ? `$${item.amount.toFixed(2)}`
        : item.amount?.startsWith("$")
          ? item.amount
          : `$${parseFloat(item.amount || 0).toFixed(2)}`,
      date: item.invoice_date || item.date || item.created_at || item.due_date,
      service: item.service_name || item.service || item.description,
    }));
  };

  const normalizePaymentMethods = (data) => {
    if (!Array.isArray(data)) return [];
    return data.map((item) => ({
      type: item.card_type || item.type || item.brand,
      last4: item.last_four || item.last4 || item.card_last4,
      primary: item.is_primary || item.primary || item.default,
      expiry: item.expiry_date || item.expiry || item.expiration,
    }));
  };

  const fetchPaymentHistory = useCallback(async () => {
    setLoading((prev) => ({ ...prev, history: true }));
    setError((prev) => ({ ...prev, history: null }));
    try {
      const res = await api.get("/payments");
      setPaymentRecords(normalizePayments(res.data));
    } catch (err) {
      setPaymentRecords([]);
      const msg = err.response?.status === 404
        ? "Payments endpoint not found"
        : err.response?.status === 401
          ? "Unauthorized — please log in again"
          : err.response?.status >= 500
            ? "Server error"
            : err.message || "Failed to load payments";
      setError((prev) => ({ ...prev, history: msg }));
      console.error("Payments fetch failed:", err);
    } finally {
      setLoading((prev) => ({ ...prev, history: false }));
    }
  }, []);

  const fetchInvoices = useCallback(async () => {
    setLoading((prev) => ({ ...prev, invoices: true }));
    setError((prev) => ({ ...prev, invoices: null }));
    try {
      const res = await api.get("/invoices");
      setInvoices(normalizeInvoices(res.data));
    } catch (err) {
      setInvoices([]);
      const msg = err.response?.status === 404
        ? "Invoices endpoint not found"
        : err.response?.status === 401
          ? "Unauthorized"
          : err.message || "Failed to load invoices";
      setError((prev) => ({ ...prev, invoices: msg }));
      console.error("Invoices fetch failed:", err);
    } finally {
      setLoading((prev) => ({ ...prev, invoices: false }));
    }
  }, []);

  const fetchPaymentMethods = useCallback(async () => {
    setLoading((prev) => ({ ...prev, methods: true }));
    setError((prev) => ({ ...prev, methods: null }));
    try {
      const res = await api.get("/payment-methods");
      setPaymentMethods(normalizePaymentMethods(res.data));
    } catch (err) {
      setPaymentMethods([]);
      const msg = err.response?.status === 404
        ? "Payment methods endpoint not found"
        : err.response?.status === 401
          ? "Unauthorized"
          : err.message || "Failed to load payment methods";
      setError((prev) => ({ ...prev, methods: msg }));
      console.error("Payment methods fetch failed:", err);
    } finally {
      setLoading((prev) => ({ ...prev, methods: false }));
    }
  }, []);

  useEffect(() => {
    fetchPaymentHistory();
    fetchInvoices();
    fetchPaymentMethods();
  }, [fetchPaymentHistory, fetchInvoices, fetchPaymentMethods]);

  const handleRefresh = async () => {
    setRefreshing(true);
    await Promise.all([
      fetchPaymentHistory(),
      fetchInvoices(),
      fetchPaymentMethods(),
    ]);
    setTimeout(() => setRefreshing(false), 500);
  };

  const stats = useMemo(() => {
    const totalRevenue = paymentRecords
      .filter((r) => r.status === "Completed")
      .reduce((sum, r) => sum + parseFloat(r.amount.replace("$", "")), 0);
    const pendingAmount = paymentRecords
      .filter((r) => r.status === "Pending")
      .reduce((sum, r) => sum + parseFloat(r.amount.replace("$", "")), 0);
    const completedCount = paymentRecords.filter((r) => r.status === "Completed").length;
    const totalCount = paymentRecords.length;
    const successRate = totalCount > 0 ? ((completedCount / totalCount) * 100).toFixed(1) : "0.0";

    return {
      totalRevenue: `$${totalRevenue.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      pending: `$${pendingAmount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      successRate: `${successRate}%`,
    };
  }, [paymentRecords]);

  const totalPages = Math.ceil(paymentRecords.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = paymentRecords.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleExportCSV = () => {
    if (paymentRecords.length === 0) return;
    const headers = ["ID", "Service", "Vehicle", "Mechanic", "Date", "Status", "Amount"];
    const csvContent = [
      headers.join(","),
      ...paymentRecords.map((row) =>
        [row.id, row.service, row.vehicle, row.mechanic, row.date, row.status, row.amount].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const element = document.createElement("a");
    element.setAttribute("href", url);
    element.setAttribute("download", `payment_history_${new Date().toISOString().split("T")[0]}.csv`);
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    URL.revokeObjectURL(url);
  };

  const handlePrintStatement = () => {
    if (paymentRecords.length === 0) return;
    const printWindow = window.open("", "_blank");
    const statementHTML = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Payment Statement - ${new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" })}</title>
          <style>
            body { font-family: system-ui, -apple-system, sans-serif; padding: 40px; color: #1f2937; }
            .header { border-bottom: 2px solid #1C52AF; padding-bottom: 20px; margin-bottom: 30px; }
            .header h1 { color: #1C52AF; margin: 0; font-size: 28px; }
            .header p { color: #6b7280; margin: 8px 0 0; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th { background: #f8fafc; text-align: left; padding: 12px; font-weight: 600; border-bottom: 2px solid #e5e7eb; }
            td { padding: 12px; border-bottom: 1px solid #f1f5f9; }
            .total { text-align: right; margin-top: 30px; font-size: 18px; font-weight: 700; color: #1C52AF; }
            .status { display: inline-block; padding: 4px 12px; border-radius: 9999px; font-size: 12px; font-weight: 600; }
            .status-completed { background: #d1fae5; color: #065f46; }
            .status-pending { background: #fef3c7; color: #92400e; }
            .status-cancelled { background: #fee2e2; color: #991b1b; }
            @media print { body { padding: 20px; } }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Payment Statement</h1>
            <p>Generated on ${new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p>
            <p>Period: ${new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" })}</p>
          </div>
          <table>
            <thead>
              <tr>
                <th>#</th><th>Service</th><th>Vehicle</th><th>Mechanic</th><th>Date</th><th>Status</th><th>Amount</th>
              </tr>
            </thead>
            <tbody>
              ${paymentRecords.map(r => `
                <tr>
                  <td>${String(r.id).padStart(2, "0")}</td>
                  <td>${r.service}</td>
                  <td>${r.vehicle}</td>
                  <td>${r.mechanic}</td>
                  <td>${r.date}</td>
                  <td><span class="status status-${r.status.toLowerCase()}">${r.status}</span></td>
                  <td>${r.amount}</td>
                </tr>
              `).join("")}
            </tbody>
          </table>
          <div class="total">
            Total Records: ${paymentRecords.length} | Total Amount: $${paymentRecords.reduce((sum, r) => sum + parseFloat(r.amount.replace("$", "")), 0).toFixed(2)}
          </div>
        </body>
      </html>
    `;
    printWindow.document.write(statementHTML);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => printWindow.print(), 250);
  };

  const ErrorBanner = ({ message, onRetry }) => (
    <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3 animate-slide-in-down">
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
          <div className="h-4 bg-gray-200 rounded w-8" />
          <div className="h-4 bg-gray-200 rounded w-32 flex-1" />
          <div className="h-4 bg-gray-200 rounded w-24" />
          <div className="h-4 bg-gray-200 rounded w-24" />
          <div className="h-4 bg-gray-200 rounded w-20" />
          <div className="h-4 bg-gray-200 rounded w-16" />
          <div className="h-4 bg-gray-200 rounded w-16" />
        </div>
      ))}
    </div>
  );

  const CardSkeleton = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="p-5 bg-white rounded-xl shadow-sm animate-pulse">
          <div className="h-10 w-10 bg-gray-200 rounded-lg mb-3" />
          <div className="h-4 bg-gray-200 rounded w-24 mb-2" />
          <div className="h-3 bg-gray-200 rounded w-16" />
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
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .animate-slide-in-down { animation: slideInDown 0.5s ease-out forwards; opacity: 0; }
        .animate-slide-in-up { animation: slideInUp 0.5s ease-out forwards; opacity: 0; }
        .animate-scale-in { animation: scaleIn 0.3s ease-out forwards; opacity: 0; }
        .animate-fade-in { animation: fadeIn 0.4s ease-out forwards; opacity: 0; }
        .animate-spin-slow { animation: spin 1s linear infinite; }

        .stagger-1 { animation-delay: 0.1s; }
        .stagger-2 { animation-delay: 0.2s; }
        .stagger-3 { animation-delay: 0.3s; }

        .stat-card {
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .stat-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 12px 24px rgba(0,0,0,0.1);
        }
        .btn-hover {
          transition: all 0.3s ease;
        }
        .btn-hover:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 16px rgba(0,0,0,0.1);
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
      `}</style>

      <div className="max-w-7xl mx-auto mb-4">

        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6 animate-slide-in-down">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Payments</h1>
            <p className="text-sm text-gray-500">
              Manage your transactions, invoices, and payment methods.
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleRefresh}
              disabled={refreshing}
              className="btn-hover flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white shadow-sm text-gray-700 text-sm font-medium disabled:opacity-50"
            >
              <HiOutlineRefresh className={`text-[#1C52AF] ${refreshing ? "animate-spin-slow" : ""}`} />
              {refreshing ? "Refreshing..." : "Refresh"}
            </button>

            <button
              onClick={handleExportCSV}
              disabled={paymentRecords.length === 0}
              className="btn-hover flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white shadow-sm text-gray-700 text-sm font-medium disabled:opacity-40"
            >
              <HiOutlineDownload className="text-[#1C52AF]" />
              Export
            </button>

            <button
              onClick={() => setShowStatementModal(true)}
              disabled={paymentRecords.length === 0}
              className="btn-hover flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#1C52AF]/10 text-[#1C52AF] text-sm font-medium disabled:opacity-40"
            >
              <FaFileAlt />
              Statements
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-6">
          <div className="stat-card animate-scale-in stagger-1 flex items-center gap-3 p-4 bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-xl">
            <div className="p-2.5 text-[#1C52AF] bg-white rounded-full shadow-sm">
              <HiOutlineClipboardCheck size={18} />
            </div>
            <div>
              <p className="text-xs text-gray-600 font-semibold uppercase tracking-wide">Total Revenue</p>
              <h2 className="text-xl font-bold text-gray-900 mt-0.5">
                {loading.history ? "—" : stats.totalRevenue}
              </h2>
            </div>
          </div>

          <div className="stat-card animate-scale-in stagger-2 flex items-center gap-3 p-4 bg-gradient-to-br from-amber-50 to-amber-100/50 rounded-xl">
            <div className="p-2.5 text-amber-700 bg-white rounded-full shadow-sm">
              <HiOutlineCash size={18} />
            </div>
            <div>
              <p className="text-xs text-gray-600 font-semibold uppercase tracking-wide">Pending</p>
              <h2 className="text-xl font-bold text-gray-900 mt-0.5">
                {loading.history ? "—" : stats.pending}
              </h2>
            </div>
          </div>

          <div className="stat-card animate-scale-in stagger-3 flex items-center gap-3 p-4 bg-gradient-to-br from-purple-50 to-purple-100/50 rounded-xl">
            <div className="p-2.5 text-purple-700 bg-white rounded-full shadow-sm">
              <HiOutlineStar size={18} />
            </div>
            <div>
              <p className="text-xs text-gray-600 font-semibold uppercase tracking-wide">Success Rate</p>
              <h2 className="text-xl font-bold text-gray-900 mt-0.5">
                {loading.history ? "—" : stats.successRate}
              </h2>
            </div>
          </div>
        </div>

        <div className="flex gap-2 p-1 mt-6 bg-gray-100 rounded-lg w-fit">
          {["History", "Invoices", "Payment Methods"].map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                setCurrentPage(1);
              }}
              className={`px-4 py-1.5 text-sm rounded-md transition-all ${
                activeTab === tab
                  ? "bg-white shadow text-gray-900 font-medium"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="mt-6">

          {activeTab === "History" && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden animate-slide-in-up">
              {error.history && (
                <ErrorBanner message={error.history} onRetry={fetchPaymentHistory} />
              )}

              <div className="overflow-x-auto">
                {loading.history ? (
                  <TableSkeleton />
                ) : paymentRecords.length === 0 ? (
                  <div className="p-12 text-center">
                    <HiOutlineDocumentText className="mx-auto text-gray-300 text-4xl mb-3" />
                    <p className="text-gray-500 font-medium">No payment records</p>
                    <p className="text-sm text-gray-400 mt-1">
                      {error.history ? "Fix the error above to load data" : "Your transaction history is empty"}
                    </p>
                  </div>
                ) : (
                  <table className="min-w-full text-sm">
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
                      {currentData.map((r) => (
                        <tr key={r.id} className="table-row-hover border-t border-gray-100">
                          <td className="p-4 font-semibold text-gray-900">{String(r.id).padStart(2, "0")}</td>
                          <td className="p-4 font-medium text-gray-900">{r.service}</td>
                          <td className="p-4 text-gray-600">{r.vehicle}</td>
                          <td className="p-4 text-gray-600">{r.mechanic}</td>
                          <td className="p-4 text-gray-600">{r.date}</td>

                          <td className="p-4">
                            <span
                              className={`px-3 py-1.5 rounded-full text-xs font-semibold inline-block ${
                                r.status === "Completed"
                                  ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                  : r.status === "Pending"
                                  ? "bg-amber-50 text-amber-700 border border-amber-200"
                                  : "bg-red-50 text-red-700 border border-red-200"
                              }`}
                            >
                              {r.status}
                            </span>
                          </td>

                          <td className="p-4 font-bold text-gray-900">{r.amount}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>

              {paymentRecords.length > 0 && (
                <div className="px-6 py-4 border-t border-gray-100 bg-gray-50/50 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-3">
                    <p>
                      Showing <span className="font-semibold text-gray-900">{startIndex + 1}</span>-
                      <span className="font-semibold text-gray-900">{Math.min(endIndex, paymentRecords.length)}</span> of{" "}
                      <span className="font-semibold text-gray-900">{paymentRecords.length}</span>
                    </p>
                    <select
                      value={itemsPerPage}
                      onChange={(e) => {
                        setItemsPerPage(Number(e.target.value));
                        setCurrentPage(1);
                      }}
                      className="border border-gray-200 rounded-lg px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                    >
                      {[5, 10, 15, 20].map((n) => (
                        <option key={n} value={n}>{n} / page</option>
                      ))}
                    </select>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="p-2 rounded-lg border border-gray-200 hover:bg-white transition text-gray-700 disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      <HiOutlineChevronLeft size={16} />
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`px-3 py-1.5 rounded-lg font-medium transition min-w-[36px] ${
                          currentPage === page
                            ? "bg-[#1C52AF] text-white shadow-sm"
                            : "border border-gray-200 hover:bg-white text-gray-700"
                        }`}
                      >
                        {page}
                      </button>
                    ))}

                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="p-2 rounded-lg border border-gray-200 hover:bg-white transition text-gray-700 disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      <HiOutlineChevronRight size={16} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === "Invoices" && (
            <div className="animate-slide-in-up">
              {error.invoices && (
                <ErrorBanner message={error.invoices} onRetry={fetchInvoices} />
              )}
              {loading.invoices ? (
                <CardSkeleton />
              ) : invoices.length === 0 ? (
                <div className="p-12 text-center bg-white rounded-xl shadow-sm border border-gray-100">
                  <FaFileInvoiceDollar className="mx-auto text-gray-300 text-4xl mb-3" />
                  <p className="text-gray-500 font-medium">No invoices</p>
                  <p className="text-sm text-gray-400 mt-1">
                    {error.invoices ? "Fix the error above to load data" : "No invoices available"}
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {invoices.map((inv) => (
                    <div
                      key={inv.id}
                      className="p-5 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 group"
                    >
                      <div className="flex items-start justify-between">
                        <div className="p-2.5 bg-blue-50 rounded-lg">
                          <FaFileInvoiceDollar className="text-[#1C52AF] text-lg" />
                        </div>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            inv.status === "Paid"
                              ? "bg-emerald-50 text-emerald-700"
                              : inv.status === "Draft"
                              ? "bg-gray-100 text-gray-600"
                              : inv.status === "Overdue"
                              ? "bg-red-50 text-red-700"
                              : "bg-amber-50 text-amber-700"
                          }`}
                        >
                          {inv.status}
                        </span>
                      </div>
                      <p className="font-semibold mt-3 text-gray-900">{inv.id}</p>
                      <p className="text-sm text-gray-500 mt-1">{inv.service}</p>
                      <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-50">
                        <span className="text-sm text-gray-500">{inv.date}</span>
                        <span className="font-bold text-gray-900">{inv.amount}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === "Payment Methods" && (
            <div className="animate-slide-in-up">
              {error.methods && (
                <ErrorBanner message={error.methods} onRetry={fetchPaymentMethods} />
              )}
              {loading.methods ? (
                <CardSkeleton />
              ) : paymentMethods.length === 0 ? (
                <div className="p-12 text-center bg-white rounded-xl shadow-sm border border-gray-100">
                  <FaCreditCard className="mx-auto text-gray-300 text-4xl mb-3" />
                  <p className="text-gray-500 font-medium">No payment methods</p>
                  <p className="text-sm text-gray-400 mt-1">
                    {error.methods ? "Fix the error above to load data" : "Add a payment method to get started"}
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {paymentMethods.map((pm, i) => (
                    <div
                      key={i}
                      className={`p-5 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 relative ${
                        pm.primary ? "ring-2 ring-[#1C52AF]/20" : ""
                      }`}
                    >
                      {pm.primary && (
                        <span className="absolute top-4 right-4 px-2 py-0.5 bg-[#1C52AF]/10 text-[#1C52AF] text-xs font-semibold rounded-full">
                          Primary
                        </span>
                      )}
                      <div className="p-2.5 bg-blue-50 rounded-lg w-fit">
                        <FaCreditCard className="text-[#1C52AF] text-lg" />
                      </div>
                      <p className="font-semibold mt-3 text-gray-900">{pm.type}</p>
                      <p className="text-sm text-gray-500 mt-1">**** {pm.last4}</p>
                      <p className="text-xs text-gray-400 mt-2">Expires {pm.expiry}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        </div>
      </div>

      {showStatementModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setShowStatementModal(false)}
          />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden animate-scale-in">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
              <div className="flex items-center gap-3">
                <HiOutlineDocumentText className="text-[#1C52AF] text-xl" />
                <h3 className="text-lg font-bold text-gray-900">Payment Statement</h3>
              </div>
              <button
                onClick={() => setShowStatementModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition text-gray-500"
              >
                <HiOutlineX size={20} />
              </button>
            </div>

            <div className="p-6 max-h-[60vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6 p-4 bg-blue-50 rounded-xl">
                <div>
                  <p className="text-sm text-gray-600">Statement Period</p>
                  <p className="font-semibold text-gray-900">{new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" })}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Total Transactions</p>
                  <p className="font-semibold text-gray-900">{paymentRecords.length}</p>
                </div>
              </div>

              <div className="space-y-3">
                {paymentRecords.slice(0, 5).map((r) => (
                  <div key={r.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition">
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${
                        r.status === "Completed" ? "bg-emerald-500" : r.status === "Pending" ? "bg-amber-500" : "bg-red-500"
                      }`} />
                      <div>
                        <p className="font-medium text-sm text-gray-900">{r.service}</p>
                        <p className="text-xs text-gray-500">{r.date} • {r.vehicle}</p>
                      </div>
                    </div>
                    <span className="font-semibold text-sm text-gray-900">{r.amount}</span>
                  </div>
                ))}
                {paymentRecords.length > 5 && (
                  <p className="text-center text-sm text-gray-500 py-2">
                    + {paymentRecords.length - 5} more transactions
                  </p>
                )}
              </div>
            </div>

            <div className="px-6 py-4 border-t border-gray-100 bg-gray-50/50 flex gap-3">
              <button
                onClick={handlePrintStatement}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#1C52AF] text-white text-sm font-medium hover:bg-[#1645a0] transition"
              >
                <HiOutlinePrinter size={18} />
                Print / Save PDF
              </button>
              <button
                onClick={() => setShowStatementModal(false)}
                className="px-4 py-2.5 rounded-lg border border-gray-300 text-gray-700 text-sm font-medium hover:bg-gray-50 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Payment;
