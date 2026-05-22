import React, { useState, useEffect, useMemo } from "react";
import {
  MdDownload,
  MdPayments,
  MdCheckCircle,
  MdAccessTime,
  MdArrowDownward,
  MdArrowUpward,
  MdVerified,
  MdAccountBalanceWallet,
  MdLockOpen,
  MdTrendingUp,
  MdAccountBalance,
  MdClose,
  MdKeyboardArrowDown
} from "react-icons/md";
import { FaAward } from "react-icons/fa";

export default function WalletPayments() {
  // --- NUMERIC COUNTER ANIMATION ENGINE ---
  const [animatedStats, setAnimatedStats] = useState({
    totalRevenue: 0,
    pendingPayouts: 0,
    completedPayouts: 0,
  });

  useEffect(() => {
    const duration = 1500;
    const steps = 60;
    const interval = duration / steps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      const easeOut = 1 - Math.pow(1 - progress, 3);

      setAnimatedStats({
        totalRevenue: 124592.00 * easeOut,
        pendingPayouts: 8240.50 * easeOut,
        completedPayouts: 96120.25 * easeOut,
      });

      if (step >= steps) clearInterval(timer);
    }, interval);

    return () => clearInterval(timer);
  }, []);

  // --- FILTER STATES ---
  const [typeFilter, setTypeFilter] = useState("ALL"); // "ALL", "PAYMENT", "PAYOUT"
  const [dateFilter, setDateFilter] = useState("ALL"); // "ALL", "30_DAYS"
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // --- INTERACTIVE OPERATIONS STATES ---
  const [isReleasingAll, setIsReleasingAll] = useState(false);
  const [activeReceipt, setActiveReceipt] = useState(null);

  // --- DATA REGISTRY (32 Rows) ---
  const [transactions, setTransactions] = useState([
    { id: "TXN-84201", type: "Payment", name: "Elena Rodriguez", role: "Customer", avatar: null, initials: "ER", date: "Oct 24, 2023", rawDate: new Date("2023-10-24"), amount: 245.00, status: "SUCCESSFUL" },
    { id: "TXN-84202", type: "Payout", name: "Marco Silva", role: "Mechanic", avatar: null, initials: "MS", date: "Oct 23, 2023", rawDate: new Date("2023-10-23"), amount: 1200.00, status: "PROCESSING" },
    { id: "TXN-84203", type: "Payment", name: "Thomas H.", role: "Customer", avatar: null, initials: "TH", date: "Oct 23, 2023", rawDate: new Date("2023-10-23"), amount: 89.00, status: "SUCCESSFUL" },
    { id: "TXN-84204", type: "Payout", name: "David Chen", role: "Mechanic", avatar: null, initials: "DC", date: "Oct 22, 2023", rawDate: new Date("2023-10-22"), amount: 750.40, status: "AWAITING RELEASE" },
    { id: "TXN-84205", type: "Payment", name: "Sarah Jenkins", role: "Customer", avatar: null, initials: "SJ", date: "Oct 22, 2023", rawDate: new Date("2023-10-22"), amount: 310.00, status: "SUCCESSFUL" },
    { id: "TXN-84206", type: "Payout", name: "Alex Mercer", role: "Mechanic", avatar: null, initials: "AM", date: "Oct 21, 2023", rawDate: new Date("2023-10-21"), amount: 450.00, status: "SUCCESSFUL" },
    { id: "TXN-84207", type: "Payment", name: "Michael Chang", role: "Customer", avatar: null, initials: "MC", date: "Oct 21, 2023", rawDate: new Date("2023-10-21"), amount: 125.50, status: "SUCCESSFUL" },
    { id: "TXN-84208", type: "Payout", name: "Marcus Vance", role: "Mechanic", avatar: null, initials: "MV", date: "Oct 20, 2023", rawDate: new Date("2023-10-20"), amount: 890.00, status: "AWAITING RELEASE" },
    { id: "TXN-84209", type: "Payment", name: "Amanda Ross", role: "Customer", avatar: null, initials: "AR", date: "Oct 20, 2023", rawDate: new Date("2023-10-20"), amount: 415.00, status: "SUCCESSFUL" },
    { id: "TXN-84210", type: "Payout", name: "Carlos Menendez", role: "Mechanic", avatar: null, initials: "CM", date: "Oct 19, 2023", rawDate: new Date("2023-10-19"), amount: 1320.00, status: "PROCESSING" },
    { id: "TXN-84211", type: "Payment", name: "David Kim", role: "Customer", avatar: null, initials: "DK", date: "Oct 19, 2023", rawDate: new Date("2023-10-19"), amount: 95.00, status: "SUCCESSFUL" },
    { id: "TXN-84212", type: "Payout", name: "Jason Briggs", role: "Mechanic", avatar: null, initials: "JB", date: "Oct 18, 2023", rawDate: new Date("2023-10-18"), amount: 620.00, status: "SUCCESSFUL" },
    { id: "TXN-84213", type: "Payment", name: "Emily Rodriguez", role: "Customer", avatar: null, initials: "ER", date: "Oct 18, 2023", rawDate: new Date("2023-10-18"), amount: 530.00, status: "SUCCESSFUL" },
    { id: "TXN-84214", type: "Payout", name: "Lawrence Cole", role: "Mechanic", avatar: null, initials: "LC", date: "Oct 17, 2023", rawDate: new Date("2023-10-17"), amount: 1100.00, status: "AWAITING RELEASE" },
    { id: "TXN-84215", type: "Payment", name: "Robert Chen", role: "Customer", avatar: null, initials: "RC", date: "Oct 17, 2023", rawDate: new Date("2023-10-17"), amount: 210.00, status: "SUCCESSFUL" },
    { id: "TXN-84216", type: "Payout", name: "Simon Adebayo", role: "Mechanic", avatar: null, initials: "SA", date: "Oct 16, 2023", rawDate: new Date("2023-10-16"), amount: 780.00, status: "SUCCESSFUL" },
    { id: "TXN-84217", type: "Payment", name: "Lisa Ray", role: "Customer", avatar: null, initials: "LR", date: "Oct 16, 2023", rawDate: new Date("2023-10-16"), amount: 185.00, status: "SUCCESSFUL" },
    { id: "TXN-84218", type: "Payout", name: "Viktor Krum", role: "Mechanic", avatar: null, initials: "VK", date: "Oct 15, 2023", rawDate: new Date("2023-10-15"), amount: 940.00, status: "PROCESSING" },
    { id: "TXN-84219", type: "Payment", name: "Bradley Cooper", role: "Customer", avatar: null, initials: "BC", date: "Oct 15, 2023", rawDate: new Date("2023-10-15"), amount: 320.00, status: "SUCCESSFUL" },
    { id: "TXN-84220", type: "Payout", name: "Nathan Drake", role: "Mechanic", avatar: null, initials: "ND", date: "Oct 14, 2023", rawDate: new Date("2023-10-14"), amount: 1450.00, status: "SUCCESSFUL" },
    { id: "TXN-84221", type: "Payment", name: "Sophia Martinez", role: "Customer", avatar: null, initials: "SM", date: "Oct 14, 2023", rawDate: new Date("2023-10-14"), amount: 420.00, status: "SUCCESSFUL" },
    { id: "TXN-84222", type: "Payout", name: "Oliver Queen", role: "Mechanic", avatar: null, initials: "OQ", date: "Oct 13, 2023", rawDate: new Date("2023-10-13"), amount: 670.00, status: "AWAITING RELEASE" },
    { id: "TXN-84223", type: "Payment", name: "James Wilson", role: "Customer", avatar: null, initials: "JW", date: "Oct 13, 2023", rawDate: new Date("2023-10-13"), amount: 150.00, status: "SUCCESSFUL" },
    { id: "TXN-84224", type: "Payout", name: "Bruce Wayne", role: "Mechanic", avatar: null, initials: "BW", date: "Oct 12, 2023", rawDate: new Date("2023-10-12"), amount: 2300.00, status: "SUCCESSFUL" },
    { id: "TXN-84225", type: "Payment", name: "Diana Prince", role: "Customer", avatar: null, initials: "DP", date: "Oct 12, 2023", rawDate: new Date("2023-10-12"), amount: 610.50, status: "SUCCESSFUL" },
    { id: "TXN-84226", type: "Payout", name: "Barry Allen", role: "Mechanic", avatar: null, initials: "BA", date: "Oct 11, 2023", rawDate: new Date("2023-10-11"), amount: 520.00, status: "SUCCESSFUL" },
    { id: "TXN-84227", type: "Payment", name: "Arthur Curry", role: "Customer", avatar: null, initials: "AC", date: "Oct 11, 2023", rawDate: new Date("2023-10-11"), amount: 98.00, status: "SUCCESSFUL" },
    { id: "TXN-84228", type: "Payout", name: "Clark Kent", role: "Mechanic", avatar: null, initials: "CK", date: "Oct 10, 2023", rawDate: new Date("2023-10-10"), amount: 1150.00, status: "SUCCESSFUL" },
    { id: "TXN-84229", type: "Payment", name: "Selina Kyle", role: "Customer", avatar: null, initials: "SK", date: "Oct 10, 2023", rawDate: new Date("2023-10-10"), amount: 340.00, status: "SUCCESSFUL" },
    { id: "TXN-84230", type: "Payout", name: "Hal Jordan", role: "Mechanic", avatar: null, initials: "HJ", date: "Oct 09, 2023", rawDate: new Date("2023-10-09"), amount: 810.00, status: "SUCCESSFUL" },
    { id: "TXN-84231", type: "Payment", name: "John Stewart", role: "Customer", avatar: null, initials: "JS", date: "Oct 09, 2023", rawDate: new Date("2023-10-09"), amount: 275.00, status: "SUCCESSFUL" },
    { id: "TXN-84232", type: "Payout", name: "Guy Gardner", role: "Mechanic", avatar: null, initials: "GG", date: "Oct 08, 2023", rawDate: new Date("2023-10-08"), amount: 490.00, status: "SUCCESSFUL" },
  ]);

  // --- DYNAMIC FILTER RUNTIME ENGINE ---
  const filteredTransactions = useMemo(() => {
    return transactions.filter((item) => {
      // Type matching
      if (typeFilter === "PAYMENT" && item.type !== "Payment") return false;
      if (typeFilter === "PAYOUT" && item.type !== "Payout") return false;

      // Date matching (Last 30 Days relative to our mock ceiling dataset max date Oct 24, 2023)
      if (dateFilter === "30_DAYS") {
        const boundaryDate = new Date("2023-09-24");
        return item.rawDate >= boundaryDate;
      }
      return true;
    });
  }, [transactions, typeFilter, dateFilter]);

  // --- MEMOIZED CALCULATION METRICS ---
  const paginatedData = useMemo(() => {
    const startIdx = (currentPage - 1) * itemsPerPage;
    return filteredTransactions.slice(startIdx, startIdx + itemsPerPage);
  }, [currentPage, filteredTransactions]);

  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);

  // Reset page index if filters reduce overall items count boundary
  useEffect(() => {
    setCurrentPage(1);
  }, [typeFilter, dateFilter]);

  // --- INTERACTION MUTATIONS ---
  const handleReleaseAll = () => {
    setIsReleasingAll(true);
    setTimeout(() => {
      setIsReleasingAll(false);
      setTransactions(prev =>
        prev.map(t => t.status === "AWAITING RELEASE" ? { ...t, status: "PROCESSING" } : t)
      );
    }, 1200);
  };

  const handleSingleRelease = (id) => {
    setTransactions(prev =>
      prev.map(t => t.id === id ? { ...t, status: "PROCESSING" } : t)
    );
  };

  // Helper cycle routines for table header filters
  const cycleTypeFilter = () => {
    if (typeFilter === "ALL") setTypeFilter("PAYMENT");
    else if (typeFilter === "PAYMENT") setTypeFilter("PAYOUT");
    else setTypeFilter("ALL");
  };

  const cycleDateFilter = () => {
    setDateFilter(prev => prev === "ALL" ? "30_DAYS" : "ALL");
  };

  // Export data handler (Constructs a simple mockup schema export download log console trigger)
  const handleExportData = () => {
    console.log("Exporting dataset configuration standard matrix stream summary...", filteredTransactions);
  };

  return (
    <div className="bg-[#FAFBFD] min-h-screen p-4 lg:p-6 font-sans text-slate-700 antialiased space-y-5 animate-fade-in">

      {/* DASHBOARD HEADER RE-CONFIGURED ACCORDING TO image_42bbeb.png */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-3">
        <div>
          <h1 className="text-xl font-bold text-[#111827] tracking-tight">Wallet & Payments</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Monitor revenue streams and manage mechanic payouts.
          </p>
        </div>

        {/* Buttons matching header row placement specs exactly */}
        <div className="flex items-center gap-2">
          <button 
            onClick={handleExportData}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold bg-[#E5EDFA] text-[#0B44A0] rounded-lg hover:bg-blue-100 transition-all active:scale-95 duration-200 cursor-pointer"
          >
            <MdDownload className="text-sm" /> Export Report
          </button>
          <button 
            onClick={handleReleaseAll}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold bg-[#0B44A0] text-white rounded-lg shadow-sm hover:bg-blue-800 transition-all active:scale-95 duration-200 cursor-pointer"
          >
            <MdAccountBalanceWallet className="text-sm" /> Release Payment
          </button>
        </div>
      </div>

      {/* TOP ANALYTICS METRIC CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        {/* CARD 1: TOTAL REVENUE */}
        <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-xs relative overflow-hidden flex flex-col justify-between min-h-32.5 transition-all duration-300 hover:-translate-y-1 hover:shadow-md group cursor-pointer animate-slide-up">
          <MdAccountBalance className="absolute -right-2 -bottom-2 text-slate-100/70 text-7xl pointer-events-none transform -rotate-12 group-hover:scale-110 duration-300 smooth-transition" />
          <div>
            <div className="w-7 h-7 flex items-center justify-center rounded-lg bg-blue-50 text-[#0B44A0] mb-3">
              <MdTrendingUp className="text-base" />
            </div>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Total Revenue</p>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight mt-0.5">
              ${animatedStats.totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </h2>
          </div>
          <div className="mt-2.5 relative z-10">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-[#ECFFF4] text-[#00612D] text-[10px] font-bold rounded-full">
              ↑ 12.5% vs last month
            </span>
          </div>
        </div>

        {/* CARD 2: PENDING PAYOUTS */}
        <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-xs relative overflow-hidden flex flex-col justify-between min-h-32.5 transition-all duration-300 hover:-translate-y-1 hover:shadow-md group cursor-pointer animate-slide-up [animation-delay:100ms]">
          <MdAccessTime className="absolute -right-2 -bottom-2 text-slate-100/60 text-7xl pointer-events-none transform rotate-12 group-hover:scale-110 duration-300 smooth-transition" />
          <div>
            <div className="w-7 h-7 flex items-center justify-center rounded-lg bg-amber-50 text-amber-500 mb-3">
              <MdAccessTime className="text-base" />
            </div>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Pending Payouts</p>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight mt-0.5">
              ${animatedStats.pendingPayouts.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </h2>
          </div>
          <p className="text-[10px] text-slate-400 mt-2.5 font-bold uppercase tracking-wider">
            12 mechanics awaiting release
          </p>
        </div>

        {/* CARD 3: COMPLETED PAYOUTS */}
        <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-xs relative overflow-hidden flex flex-col justify-between min-h-32.5 transition-all duration-300 hover:-translate-y-1 hover:shadow-md group cursor-pointer animate-slide-up [animation-delay:200ms]">
          <FaAward className="absolute -right-2 -bottom-2 text-slate-100/60 text-7xl pointer-events-none group-hover:scale-110 duration-300 smooth-transition" />
          <div>
            <div className="w-7 h-7 flex items-center justify-center rounded-lg bg-teal-50 text-teal-600 mb-3">
              <MdCheckCircle className="text-base" />
            </div>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Completed Payouts</p>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight mt-0.5">
              ${animatedStats.completedPayouts.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </h2>
          </div>
          <p className="text-[10px] text-slate-400 mt-2.5 font-bold uppercase tracking-wider">
            Processed this year
          </p>
        </div>
      </div>

      {/* CENTRAL TRANSACTIONS INTERACTIVE WORKSPACE GRID */}
      <div className="bg-white rounded-xl border border-slate-100 shadow-xs overflow-hidden transition-all duration-300 hover:shadow-sm animate-fade-in [animation-delay:300ms]">
        
        {/* ROW INTERACTION MANAGER CONTEXT HEAD */}
        <div className="flex justify-between items-center px-5 py-4 bg-white border-b border-slate-50">
          <h2 className="font-bold text-sm text-slate-900">
            Recent Transactions
          </h2>
          <div className="flex gap-2">
            <button 
              onClick={cycleTypeFilter}
              className={`px-3 py-1 rounded-md text-[11px] font-semibold transition-all active:scale-95 duration-150 cursor-pointer flex items-center gap-1 border border-slate-100 ${
                typeFilter === "ALL" ? "bg-slate-100 text-slate-700 font-bold" : "bg-[#0B44A0] text-white"
              }`}
            >
              Type: {typeFilter === "ALL" ? "All Types" : typeFilter === "PAYMENT" ? "Payments" : "Payouts"}
              <MdKeyboardArrowDown className="text-xs" />
            </button>
            <button 
              onClick={cycleDateFilter}
              className={`px-3 py-1 rounded-md text-[11px] font-semibold transition-all active:scale-95 duration-150 cursor-pointer flex items-center gap-1 border border-slate-100 ${
                dateFilter === "ALL" ? "bg-slate-100 text-slate-700 font-bold" : "bg-[#0B44A0] text-white"
              }`}
            >
              {dateFilter === "ALL" ? "All Time" : "Last 30 Days"}
              <MdKeyboardArrowDown className="text-xs" />
            </button>
          </div>
        </div>

        {/* DATA MATRIX INSTANCE TABLE */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse min-w-150">
            <thead className="bg-slate-50/70 border-b border-slate-100 text-[10px] font-bold tracking-wider text-slate-400 uppercase">
              <tr>
                <th className="px-5 py-3">Type</th>
                <th className="px-5 py-3">User</th>
                <th className="px-5 py-3">Date</th>
                <th className="px-5 py-3">Amount</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700 font-medium bg-white">
              {paginatedData.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-8 text-slate-400 font-medium">No results matched the specified query options.</td>
                </tr>
              ) : (
                paginatedData.map((row) => (
                  <tr key={row.id} className="hover:bg-slate-50/40 transition-colors duration-150">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2 text-slate-900 font-semibold">
                        {row.type === "Payment" ? (
                          <span className="bg-emerald-50 p-1.5 rounded-lg shrink-0">
                            <MdArrowDownward className="text-emerald-600 text-xs" />
                          </span>
                        ) : (
                          <span className="bg-blue-50 p-1.5 rounded-lg shrink-0">
                            <MdArrowUpward className="text-[#0B44A0] text-xs" />
                          </span>
                        )}
                        {row.type}
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-500 border border-slate-200">
                          {row.initials}
                        </div>
                        <div>
                          <p className="font-bold text-slate-900 leading-none">{row.name}</p>
                          <p className="text-[10px] text-slate-400 font-medium mt-0.5">{row.role}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-slate-500 font-normal">{row.date}</td>
                    <td className="px-5 py-3.5 font-bold text-slate-900">${row.amount.toFixed(2)}</td>
                    <td className="px-5 py-3.5">
                      <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold tracking-wide duration-300 transition-colors ${
                        row.status === "SUCCESSFUL" ? "bg-[#ECFFF4] text-[#00612D]" :
                        row.status === "PROCESSING" ? "bg-blue-50 text-[#0B44A0]" : "bg-[#FFF4E5] text-[#B25E00]"
                      }`}>
                        {row.status}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      {row.status === "AWAITING RELEASE" ? (
                        <button 
                          onClick={() => handleSingleRelease(row.id)}
                          className="bg-[#EAF1FF] text-[#0B44A0] hover:bg-[#D3E3FF] px-3 py-1 rounded-md text-[11px] font-bold transition-all active:scale-95 duration-150 shadow-2xs cursor-pointer"
                        >
                          Release Now
                        </button>
                      ) : (
                        <button 
                          onClick={() => setActiveReceipt({ name: row.name, amount: `$${row.amount.toFixed(2)}`, date: row.date, id: row.id })}
                          className="text-[#0B44A0] hover:underline hover:text-blue-800 text-[11px] font-bold active:scale-95 duration-150 cursor-pointer"
                        >
                          View Receipt
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINATION FOOTER - MATRICALLY MATCHED AND RE-INDEXED */}
        <div className="flex justify-between items-center px-5 py-3 text-xs text-slate-400 border-t border-slate-100 bg-white select-none">
          <p className="font-medium">
            Showing <span className="font-bold text-slate-700">{paginatedData.length}</span> of <span className="font-bold text-slate-700">{filteredTransactions.length}</span> transactions
          </p>

          {totalPages > 1 && (
            <div className="flex items-center gap-1">
              <button 
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} 
                className="w-6 h-6 rounded flex items-center justify-center font-bold bg-slate-50 text-slate-500 hover:bg-slate-100 disabled:opacity-40 transition-colors border border-slate-200/60 active:scale-90 cursor-pointer"
              >
                ‹
              </button>
              
              {Array.from({ length: totalPages }, (_, idx) => (
                <button
                  key={idx + 1}
                  onClick={() => setCurrentPage(idx + 1)}
                  className={`w-6 h-6 rounded flex items-center justify-center font-bold transition-all cursor-pointer ${
                    currentPage === idx + 1 
                      ? "bg-[#0B44A0] text-white shadow-xs" 
                      : "bg-slate-50 text-slate-500 hover:bg-slate-100"
                  }`}
                >
                  {idx + 1}
                </button>
              ))}

              <button 
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} 
                className="w-6 h-6 rounded flex items-center justify-center font-bold bg-slate-50 text-slate-500 hover:bg-slate-100 disabled:opacity-40 transition-colors border border-slate-200/60 active:scale-90 cursor-pointer"
              >
                ›
              </button>
            </div>
          )}
        </div>

      </div>

      {/* LOWER GRID LAYOUT ACTION & DATA PROJECTIONS SECTION */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">

        {/* LEFT COMPONENT COLUMN PANEL */}
        <div className="md:col-span-2 bg-[#0B44A0] text-white p-5 rounded-xl shadow-xs flex flex-col justify-between space-y-4 animate-slide-up [animation-delay:400ms]">
          <div className="space-y-1">
            <h2 className="font-bold text-base tracking-tight text-white">
              Pending Payout Release
            </h2>
            <p className="text-xs text-blue-100/90 leading-relaxed font-medium pr-12">
              There are currently mechanics with verified completed services ready for payout totaling $8,240.50.
            </p>
          </div>

          <div className="space-y-2">
            <div className="bg-white/10 px-3 py-2 rounded-lg flex justify-between items-center text-xs font-semibold border border-white/5">
              <span className="flex items-center gap-2 opacity-95">
                <MdVerified className="text-base text-blue-200" /> Verified Mechanics
              </span>
              <span className="font-bold text-sm">12</span>
            </div>

            <div className="bg-white/10 px-3 py-2 rounded-lg flex justify-between items-center text-xs font-semibold border border-white/5">
              <span className="flex items-center gap-2 opacity-95">
                <MdAccountBalanceWallet className="text-base text-blue-200" /> Total Amount
              </span>
              <span className="font-bold text-sm">$8,240.50</span>
            </div>
          </div>

          <button 
            onClick={handleReleaseAll}
            disabled={isReleasingAll}
            className="w-full bg-white text-[#0B44A0] hover:bg-blue-50 py-2.5 rounded-lg flex items-center justify-center gap-2 text-xs font-bold transition-all duration-200 active:scale-[0.98] shadow-sm tracking-wider cursor-pointer disabled:opacity-80 disabled:cursor-wait"
          >
            {isReleasingAll ? (
              <div className="w-4 h-4 border-2 border-[#0B44A0] border-t-transparent rounded-full animate-spin" />
            ) : (
              <MdLockOpen className="text-sm" />
            )}
            {isReleasingAll ? "PROCESSING RELEASE..." : "RELEASE ALL PAYMENTS"}
          </button>
        </div>

        {/* RIGHT METRICS PROJECTION PLOT COMPONENT BAR CHART */}
        <div className="md:col-span-3 bg-white p-5 rounded-xl border border-slate-100 shadow-xs flex flex-col justify-between space-y-4 animate-slide-up [animation-delay:500ms]">

          <div className="flex justify-between items-start">
            <div>
              <h2 className="font-bold text-sm text-slate-900">Revenue Projection</h2>
              <p className="text-[11px] text-slate-400 mt-0.5 font-medium">Estimated growth for Q4 2023</p>
            </div>

            <div className="flex gap-1 mt-1">
              <span className="w-1.5 h-1.5 bg-[#0B44A0] rounded-full animate-pulse"></span>
              <span className="w-1.5 h-1.5 bg-slate-200 rounded-full"></span>
            </div>
          </div>

          <div className="bg-[#EAF1FF]/60 rounded-xl px-4 pt-4 pb-2 h-36 flex items-end justify-between border border-blue-100/20">
            {[
              ["JUL", "40%", "bg-[#CAD4E6]"],
              ["AUG", "55%", "bg-[#CAD4E6]"],
              ["SEP", "45%", "bg-[#CAD4E6]"],
              ["OCT", "65%", "bg-[#CAD4E6]"],
              ["NOV", "60%", "bg-[#CAD4E6]"],
              ["DEC", "82%", "bg-[#0B44A0]"],
              ["JAN", "65%", "bg-[#CAD4E6]"],
            ].map(([month, height, color], i) => (
              <div key={i} className="flex flex-col items-center justify-end h-full w-14 relative group mx-0.5 sm:mx-1">
                <div 
                  className={`w-full ${color} rounded-t-md transition-all duration-1000 relative animate-grow-y cursor-pointer hover:brightness-95`} 
                  style={{ height, animationDelay: `${i * 75}ms` }}
                >
                  <span className={`absolute bottom-1 left-0 right-0 text-center text-[9px] font-bold tracking-tight ${month === "DEC" ? "text-white" : "text-slate-500"}`}>
                    {month}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center pt-1 text-xs">
            <div className="space-y-0.5">
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Predicted</p>
              <p className="font-bold text-slate-900 text-sm">$14,500.00</p>
            </div>

            <div className="space-y-0.5">
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Confidence</p>
              <p className="text-emerald-600 font-bold text-sm">92%</p>
            </div>

            <button 
              onClick={handleExportData}
              className="text-[#0B44A0] hover:underline text-[11px] font-bold tracking-tight transition-transform active:translate-x-0.5 duration-150 cursor-pointer"
            >
              Full Projection Report →
            </button>
          </div>

        </div>

      </div>

      {/* --- OVERLAY MODAL FOR VIEW RECEIPT HANDLERS --- */}
      {activeReceipt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/30 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-xl border border-slate-100 shadow-xl max-w-sm w-full p-5 space-y-4 animate-scale-up relative">
            <button 
              onClick={() => setActiveReceipt(null)}
              className="absolute right-4 top-4 text-slate-400 hover:text-slate-600 cursor-pointer p-1 rounded-md"
            >
              <MdClose className="text-lg" />
            </button>
            <div className="text-center border-b border-dashed border-slate-200 pb-3">
              <p className="text-[10px] text-slate-400 font-bold uppercase">Transaction Receipt</p>
              <h4 className="text-2xl font-bold text-slate-900 mt-1">{activeReceipt.amount}</h4>
              <span className="inline-block bg-slate-50 text-slate-400 text-[10px] px-2 py-0.5 font-mono rounded mt-1">{activeReceipt.id}</span>
            </div>
            <div className="space-y-2 text-xs font-medium text-slate-600">
              <div className="flex justify-between"><span>Recipient:</span><span className="text-slate-900 font-bold">{activeReceipt.name}</span></div>
              <div className="flex justify-between"><span>Date Logged:</span><span className="text-slate-900">{activeReceipt.date}</span></div>
              <div className="flex justify-between"><span>Method:</span><span className="text-slate-900">Direct Account Settlement</span></div>
            </div>
            <button 
              onClick={() => setActiveReceipt(null)}
              className="w-full bg-[#0B44A0] hover:bg-blue-800 text-white text-xs font-bold py-2 rounded-lg shadow-2xs active:scale-95 transition-all cursor-pointer"
            >
              Dismiss Ledger View
            </button>
          </div>
        </div>
      )}

      {/* STYLE ELEMENT STAGED TIMERS KEYFRAMES FOR ANIMATIONS */}
      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes scaleUp { from { opacity: 0; transform: scale(0.97); } to { opacity: 1; transform: scale(1); } }
        @keyframes growY { from { transform: scaleY(0); transform-origin: bottom; } to { transform: scaleY(1); transform-origin: bottom; } }
        .animate-fade-in { animation: fadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) both; }
        .animate-slide-up { animation: slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) both; }
        .animate-scale-up { animation: scaleUp 0.25s cubic-bezier(0.34, 1.56, 0.64, 1) both; }
        .animate-grow-y { animation: growY 0.7s cubic-bezier(0.16, 1, 0.3, 1) both; }
        .smooth-transition { transition-property: all; cubic-bezier(0.4, 0, 0.2, 1); }
      `}</style>

    </div>
  );
}