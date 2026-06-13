import React, { useState, useEffect, useMemo, useCallback } from "react";
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
  MdKeyboardArrowDown,
  MdChevronLeft,
  MdChevronRight,
  MdRefresh,
} from "react-icons/md";
import { FaAward } from "react-icons/fa";
import api from "../../api/axios";

/* ------------------------------------------------------------------ */
/*  HELPERS                                                            */
/* ------------------------------------------------------------------ */

const fmtMoney = (v) => {
  const n = parseFloat(v || 0);
  return `$${n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

const fmtDate = (iso) => {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
};

const getInitials = (first = "", last = "") => {
  const f = (first || "")[0] || "";
  const l = (last || "")[0] || "";
  return `${f}${l}`.toUpperCase() || "?";
};

/* Map API transaction to UI row shape */
const mapTransaction = (t) => {
  const isPayment = t.type?.toLowerCase() === "payment";
  const person = t.customer || t.provider || t.user || {};
  const firstName = person.firstName || person.name?.split(" ")[0] || "";
  const lastName = person.lastName || person.name?.split(" ").slice(1).join(" ") || "";
  const fullName = person.name || `${firstName} ${lastName}`.trim() || "Unknown";
  const role = isPayment ? "Customer" : "Mechanic";

  let status = t.status?.toUpperCase() || "PENDING";
  if (status === "SUCCESS" || status === "SUCCEEDED") status = "SUCCESSFUL";
  if (status === "AWAITING_RELEASE" || status === "AWAITING RELEASE") status = "AWAITING RELEASE";

  return {
    id: t.id || t.transactionId || t.paymentId || `TXN-${Math.random().toString(36).substr(2, 8).toUpperCase()}`,
    type: isPayment ? "Payment" : "Payout",
    name: fullName,
    role,
    avatar: person.profileImage || person.avatar || null,
    initials: getInitials(firstName, lastName),
    date: fmtDate(t.createdAt || t.date || t.transactionDate),
    rawDate: new Date(t.createdAt || t.date || t.transactionDate || Date.now()),
    amount: parseFloat(t.amount || t.totalAmount || t.payoutAmount || 0),
    status,
    raw: t, // keep original for detail drawer
  };
};

/* ------------------------------------------------------------------ */
/*  NUMERIC COUNTER ANIMATION                                          */
/* ------------------------------------------------------------------ */

const useAnimatedNumber = (targetValue, duration = 1500) => {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const steps = 60;
    const interval = duration / steps;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setDisplay(targetValue * easeOut);
      if (step >= steps) clearInterval(timer);
    }, interval);
    return () => clearInterval(timer);
  }, [targetValue, duration]);

  return display;
};

/* ------------------------------------------------------------------ */
/*  MAIN COMPONENT                                                     */
/* ------------------------------------------------------------------ */

const LIMIT = 10;

export default function WalletPayments() {
  /* ── API Data ── */
  const [transactions, setTransactions] = useState([]);
  const [meta, setMeta] = useState(null);
  const [overview, setOverview] = useState(null);
  const [recent, setRecent] = useState([]);
  const [projection, setProjection] = useState(null);

  const [loadingList, setLoadingList] = useState(true);
  const [loadingStats, setLoadingStats] = useState(true);
  const [loadingRecent, setLoadingRecent] = useState(true);
  const [loadingProjection, setLoadingProjection] = useState(true);
  const [error, setError] = useState(null);

  /* ── UI State ── */
  const [typeFilter, setTypeFilter] = useState("ALL"); // "ALL", "PAYMENT", "PAYOUT"
  const [dateFilter, setDateFilter] = useState("ALL"); // "ALL", "30_DAYS"
  const [currentPage, setCurrentPage] = useState(1);
  const [isReleasingAll, setIsReleasingAll] = useState(false);
  const [activeReceipt, setActiveReceipt] = useState(null);

  /* ── Animated Stats ── */
  const totalRevenue = useAnimatedNumber(overview?.totalRevenue || 0);
  const pendingPayouts = useAnimatedNumber(overview?.totalProviderAmount || 0);
  const completedPayouts = useAnimatedNumber(
    (overview?.successfulTransactions || 0) > 0 ? overview.successfulTransactions * 50 : 0
  );

  /* ── Fetch List ── */
  const fetchTransactions = useCallback(async (page) => {
    setLoadingList(true); setError(null);
    try {
      const params = { page, limit: LIMIT };
      const res = await api.get("/admin/payments", { params });
      const raw = res.data.data ?? [];
      const mapped = raw.map(mapTransaction);
      setTransactions(mapped);
      setMeta(res.data.meta ?? null);
    } catch (e) {
      setError(e?.response?.data?.message || "Failed to load transactions.");
    } finally {
      setLoadingList(false);
    }
  }, []);

  /* ── Fetch Overview + Recent + Projection ── */
  const fetchStats = useCallback(async () => {
    setLoadingStats(true);
    setLoadingRecent(true);
    setLoadingProjection(true);
    try {
      const [ov, rc, pr] = await Promise.allSettled([
        api.get("/admin/payments/dashboard-overview"),
        api.get("/admin/payments/recent-transactions"),
        api.get("/admin/payments/revenue-projection"),
      ]);

      if (ov.status === "fulfilled") setOverview(ov.value.data);
      if (rc.status === "fulfilled") {
        const recentData = Array.isArray(rc.value.data) ? rc.value.data : (rc.value.data?.data ?? []);
        setRecent(recentData.map(mapTransaction));
      }
      if (pr.status === "fulfilled") setProjection(pr.value.data);
    } catch { /* non-critical */ }
    finally {
      setLoadingStats(false);
      setLoadingRecent(false);
      setLoadingProjection(false);
    }
  }, []);

  useEffect(() => { fetchTransactions(currentPage); }, [currentPage, fetchTransactions]);
  useEffect(() => { fetchStats(); }, [fetchStats]);

  /* ── Filter Logic ── */
  const filteredTransactions = useMemo(() => {
    return transactions.filter((item) => {
      if (typeFilter === "PAYMENT" && item.type !== "Payment") return false;
      if (typeFilter === "PAYOUT" && item.type !== "Payout") return false;
      if (dateFilter === "30_DAYS") {
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        return item.rawDate >= thirtyDaysAgo;
      }
      return true;
    });
  }, [transactions, typeFilter, dateFilter]);

  const paginatedData = useMemo(() => {
    const startIdx = (currentPage - 1) * LIMIT;
    return filteredTransactions.slice(startIdx, startIdx + LIMIT);
  }, [currentPage, filteredTransactions]);

  const totalPages = Math.ceil(filteredTransactions.length / LIMIT);

  /* Reset page on filter change */
  useEffect(() => { setCurrentPage(1); }, [typeFilter, dateFilter]);

  /* ── Actions ── */
  const handleReleaseAll = async () => {
    setIsReleasingAll(true);
    try {
      await api.post("/admin/payments/release-all");
      fetchTransactions(currentPage);
      fetchStats();
    } catch (e) {
      console.error("Release failed:", e);
    } finally {
      setIsReleasingAll(false);
    }
  };

  const handleSingleRelease = async (id) => {
    try {
      await api.post(`/admin/payments/${id}/release`);
      fetchTransactions(currentPage);
      fetchStats();
    } catch (e) {
      console.error("Single release failed:", e);
    }
  };

  const handleExportData = () => {
    const blob = new Blob([JSON.stringify(filteredTransactions, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = Object.assign(document.createElement("a"), { href: url, download: "MokaNik_Payments.json" });
    document.body.appendChild(a); a.click(); a.remove();
    URL.revokeObjectURL(url);
  };

  const cycleTypeFilter = () => {
    setTypeFilter(prev => prev === "ALL" ? "PAYMENT" : prev === "PAYMENT" ? "PAYOUT" : "ALL");
  };

  const cycleDateFilter = () => {
    setDateFilter(prev => prev === "ALL" ? "30_DAYS" : "ALL");
  };

  /* ── Pagination Pills ── */
  const pageNums = useMemo(() => {
    if (totalPages <= 5) return Array.from({ length: totalPages }, (_, i) => i + 1);
    const s = Math.max(1, currentPage - 2), e = Math.min(totalPages, s + 4);
    return Array.from({ length: e - s + 1 }, (_, i) => s + i);
  }, [totalPages, currentPage]);

  /* ── Projection Chart Data (fallback if API returns nothing) ── */
  const projectionData = projection?.data || projection?.months || [
    { month: "JUL", value: 40 },
    { month: "AUG", value: 55 },
    { month: "SEP", value: 45 },
    { month: "OCT", value: 65 },
    { month: "NOV", value: 60 },
    { month: "DEC", value: 82 },
    { month: "JAN", value: 65 },
  ];

  const maxProj = Math.max(...projectionData.map(d => d.value || d.percentage || 0));

  /* ================================================================ */
  return (
    <div className="bg-[#FAFBFD] min-h-screen p-4 lg:p-6 font-sans text-slate-700 antialiased space-y-5 animate-fade-in">

      {/* ── HEADER ── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-3">
        <div>
          <h1 className="text-xl font-bold text-[#111827] tracking-tight">Wallet & Payments</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Monitor revenue streams and manage mechanic payouts.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => { fetchTransactions(currentPage); fetchStats(); }}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold bg-white border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 active:scale-95 transition-all shadow-sm cursor-pointer"
          >
            <MdRefresh className="text-sm text-slate-500" /> Refresh
          </button>
          <button
            onClick={handleExportData}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold bg-[#E5EDFA] text-[#0B44A0] rounded-lg hover:bg-blue-100 transition-all active:scale-95 duration-200 cursor-pointer"
          >
            <MdDownload className="text-sm" /> Export Report
          </button>
          <button
            onClick={handleReleaseAll}
            disabled={isReleasingAll}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold bg-[#0B44A0] text-white rounded-lg shadow-sm hover:bg-blue-800 transition-all active:scale-95 duration-200 cursor-pointer disabled:opacity-70"
          >
            <MdAccountBalanceWallet className="text-sm" />
            {isReleasingAll ? "Processing..." : "Release Payment"}
          </button>
        </div>
      </div>

      {/* ── STATS CARDS ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Total Revenue */}
        <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-xs relative overflow-hidden flex flex-col justify-between min-h-[130px] transition-all duration-300 hover:-translate-y-1 hover:shadow-md group cursor-pointer animate-slide-up">
          <MdAccountBalance className="absolute -right-2 -bottom-2 text-slate-100/70 text-7xl pointer-events-none transform -rotate-12 group-hover:scale-110 duration-300 transition-transform" />
          <div>
            <div className="w-7 h-7 flex items-center justify-center rounded-lg bg-blue-50 text-[#0B44A0] mb-3">
              <MdTrendingUp className="text-base" />
            </div>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Total Revenue</p>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight mt-0.5">
              {loadingStats ? (
                <span className="inline-block w-24 h-7 bg-slate-100 rounded animate-pulse" />
              ) : (
                fmtMoney(totalRevenue)
              )}
            </h2>
          </div>
          <div className="mt-2.5 relative z-10">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-[#ECFFF4] text-[#00612D] text-[10px] font-bold rounded-full">
              ↑ 12.5% vs last month
            </span>
          </div>
        </div>

        {/* Pending Payouts */}
        <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-xs relative overflow-hidden flex flex-col justify-between min-h-[130px] transition-all duration-300 hover:-translate-y-1 hover:shadow-md group cursor-pointer animate-slide-up" style={{ animationDelay: "100ms" }}>
          <MdAccessTime className="absolute -right-2 -bottom-2 text-slate-100/60 text-7xl pointer-events-none transform rotate-12 group-hover:scale-110 duration-300 transition-transform" />
          <div>
            <div className="w-7 h-7 flex items-center justify-center rounded-lg bg-amber-50 text-amber-500 mb-3">
              <MdAccessTime className="text-base" />
            </div>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Pending Payouts</p>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight mt-0.5">
              {loadingStats ? (
                <span className="inline-block w-24 h-7 bg-slate-100 rounded animate-pulse" />
              ) : (
                fmtMoney(pendingPayouts)
              )}
            </h2>
          </div>
          <p className="text-[10px] text-slate-400 mt-2.5 font-bold uppercase tracking-wider">
            {overview?.pendingTransactions || 0} transactions awaiting release
          </p>
        </div>

        {/* Completed Payouts */}
        <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-xs relative overflow-hidden flex flex-col justify-between min-h-[130px] transition-all duration-300 hover:-translate-y-1 hover:shadow-md group cursor-pointer animate-slide-up" style={{ animationDelay: "200ms" }}>
          <FaAward className="absolute -right-2 -bottom-2 text-slate-100/60 text-7xl pointer-events-none group-hover:scale-110 duration-300 transition-transform" />
          <div>
            <div className="w-7 h-7 flex items-center justify-center rounded-lg bg-teal-50 text-teal-600 mb-3">
              <MdCheckCircle className="text-base" />
            </div>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Completed Payouts</p>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight mt-0.5">
              {loadingStats ? (
                <span className="inline-block w-24 h-7 bg-slate-100 rounded animate-pulse" />
              ) : (
                fmtMoney(completedPayouts)
              )}
            </h2>
          </div>
          <p className="text-[10px] text-slate-400 mt-2.5 font-bold uppercase tracking-wider">
            {overview?.successfulTransactions || 0} successful transactions
          </p>
        </div>
      </div>

      {/* ── TRANSACTIONS TABLE ── */}
      <div className="bg-white rounded-xl border border-slate-100 shadow-xs overflow-hidden transition-all duration-300 hover:shadow-sm animate-fade-in" style={{ animationDelay: "300ms" }}>

        {/* Toolbar */}
        <div className="flex justify-between items-center px-5 py-4 bg-white border-b border-slate-50">
          <h2 className="font-bold text-sm text-slate-900">Recent Transactions</h2>
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

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse min-w-[600px]">
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
              {loadingList ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    {Array.from({ length: 6 }).map((__, j) => (
                      <td key={j} className="px-5 py-3.5">
                        <div className="h-3 bg-slate-100 rounded w-3/4" />
                        {j === 1 && <div className="h-2 bg-slate-100 rounded w-1/2 mt-1.5" />}
                      </td>
                    ))}
                  </tr>
                ))
              ) : error ? (
                <tr>
                  <td colSpan="6" className="text-center py-8 text-slate-400 font-medium">
                    <p>{error}</p>
                    <button onClick={() => fetchTransactions(currentPage)} className="text-[#0B44A0] font-bold hover:underline mt-1 cursor-pointer">Retry</button>
                  </td>
                </tr>
              ) : paginatedData.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-14 text-slate-400 text-sm">
                    No transactions found for this filter.
                  </td>
                </tr>
              ) : (
                paginatedData.map((row) => (
                  <tr key={row.id} className="hover:bg-slate-50/40 transition-colors duration-150 animate-slide-up">
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
                        <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-500 border border-slate-200 shrink-0">
                          {row.initials}
                        </div>
                        <div>
                          <p className="font-bold text-slate-900 leading-none">{row.name}</p>
                          <p className="text-[10px] text-slate-400 font-medium mt-0.5">{row.role}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-slate-500 font-normal">{row.date}</td>
                    <td className="px-5 py-3.5 font-bold text-slate-900">{fmtMoney(row.amount)}</td>
                    <td className="px-5 py-3.5">
                      <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold tracking-wide transition-colors ${
                        row.status === "SUCCESSFUL" ? "bg-[#ECFFF4] text-[#00612D]" :
                        row.status === "PROCESSING" ? "bg-blue-50 text-[#0B44A0]" :
                        row.status === "AWAITING RELEASE" ? "bg-[#FFF4E5] text-[#B25E00]" :
                        "bg-slate-100 text-slate-600"
                      }`}>
                        {row.status}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      {row.status === "AWAITING RELEASE" ? (
                        <button
                          onClick={() => handleSingleRelease(row.id)}
                          className="bg-[#EAF1FF] text-[#0B44A0] hover:bg-[#D3E3FF] px-3 py-1 rounded-md text-[11px] font-bold transition-all active:scale-95 duration-150 shadow-sm cursor-pointer"
                        >
                          Release Now
                        </button>
                      ) : (
                        <button
                          onClick={() => setActiveReceipt(row)}
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

        {/* Pagination */}
        {!error && !loadingList && (
          <div className="flex justify-between items-center px-5 py-3 text-xs text-slate-400 border-t border-slate-100 bg-white select-none">
            <p className="font-medium">
              {filteredTransactions.length === 0 ? "No entries" : (
                <>Showing{" "}
                  <span className="font-bold text-slate-700">{((currentPage - 1) * LIMIT) + 1}–{Math.min(currentPage * LIMIT, filteredTransactions.length)}</span>{" "}
                  of <span className="font-bold text-slate-700">{filteredTransactions.length}</span> transactions
                </>
              )}
            </p>
            {totalPages > 1 && (
              <div className="flex items-center gap-1">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(p => p - 1)}
                  className="w-6 h-6 rounded flex items-center justify-center font-bold bg-slate-50 text-slate-500 hover:bg-slate-100 disabled:opacity-40 transition-colors border border-slate-200/60 active:scale-90 cursor-pointer"
                >
                  <MdChevronLeft className="text-sm" />
                </button>
                {pageNums.map((p) => (
                  <button
                    key={p}
                    onClick={() => setCurrentPage(p)}
                    className={`w-6 h-6 rounded flex items-center justify-center font-bold text-xs transition-all cursor-pointer ${
                      currentPage === p ? "bg-[#0B44A0] text-white shadow-sm" : "bg-slate-50 text-slate-500 hover:bg-slate-100"
                    }`}
                  >
                    {p}
                  </button>
                ))}
                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(p => p + 1)}
                  className="w-6 h-6 rounded flex items-center justify-center font-bold bg-slate-50 text-slate-500 hover:bg-slate-100 disabled:opacity-40 transition-colors border border-slate-200/60 active:scale-90 cursor-pointer"
                >
                  <MdChevronRight className="text-sm" />
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ── LOWER GRID ── */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">

        {/* Pending Payout Panel */}
        <div className="md:col-span-2 bg-[#0B44A0] text-white p-5 rounded-xl shadow-xs flex flex-col justify-between space-y-4 animate-slide-up" style={{ animationDelay: "400ms" }}>
          <div className="space-y-1">
            <h2 className="font-bold text-base tracking-tight text-white">Pending Payout Release</h2>
            <p className="text-xs text-blue-100/90 leading-relaxed font-medium pr-12">
              There are currently mechanics with verified completed services ready for payout totaling {fmtMoney(overview?.totalProviderAmount || 0)}.
            </p>
          </div>

          <div className="space-y-2">
            <div className="bg-white/10 px-3 py-2 rounded-lg flex justify-between items-center text-xs font-semibold border border-white/5">
              <span className="flex items-center gap-2 opacity-95">
                <MdVerified className="text-base text-blue-200" /> Verified Mechanics
              </span>
              <span className="font-bold text-sm">{overview?.pendingTransactions || 0}</span>
            </div>

            <div className="bg-white/10 px-3 py-2 rounded-lg flex justify-between items-center text-xs font-semibold border border-white/5">
              <span className="flex items-center gap-2 opacity-95">
                <MdAccountBalanceWallet className="text-base text-blue-200" /> Total Amount
              </span>
              <span className="font-bold text-sm">{fmtMoney(overview?.totalProviderAmount || 0)}</span>
            </div>
          </div>

          <button
            onClick={handleReleaseAll}
            disabled={isReleasingAll || (overview?.pendingTransactions || 0) === 0}
            className="w-full bg-white text-[#0B44A0] hover:bg-blue-50 py-2.5 rounded-lg flex items-center justify-center gap-2 text-xs font-bold transition-all duration-200 active:scale-[0.98] shadow-sm tracking-wider cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isReleasingAll ? (
              <div className="w-4 h-4 border-2 border-[#0B44A0] border-t-transparent rounded-full animate-spin" />
            ) : (
              <MdLockOpen className="text-sm" />
            )}
            {isReleasingAll ? "PROCESSING RELEASE..." : "RELEASE ALL PAYMENTS"}
          </button>
        </div>

        {/* Revenue Projection Chart */}
        <div className="md:col-span-3 bg-white p-5 rounded-xl border border-slate-100 shadow-xs flex flex-col justify-between space-y-4 animate-slide-up" style={{ animationDelay: "500ms" }}>

          <div className="flex justify-between items-start">
            <div>
              <h2 className="font-bold text-sm text-slate-900">Revenue Projection</h2>
              <p className="text-[11px] text-slate-400 mt-0.5 font-medium">Estimated growth trajectory</p>
            </div>
            <div className="flex gap-1 mt-1">
              <span className="w-1.5 h-1.5 bg-[#0B44A0] rounded-full animate-pulse" />
              <span className="w-1.5 h-1.5 bg-slate-200 rounded-full" />
            </div>
          </div>

          {loadingProjection ? (
            <div className="bg-[#EAF1FF]/60 rounded-xl px-4 pt-4 pb-2 h-36 flex items-center justify-center border border-blue-100/20">
              <div className="w-8 h-8 border-2 border-[#0B44A0] border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <div className="bg-[#EAF1FF]/60 rounded-xl px-4 pt-4 pb-2 h-36 flex items-end justify-between border border-blue-100/20">
              {projectionData.map((d, i) => {
                const month = d.month || d.label || "—";
                const val = d.value || d.percentage || 0;
                const heightPct = maxProj > 0 ? (val / maxProj) * 100 : 0;
                const isHighlight = val === maxProj;
                return (
                  <div key={i} className="flex flex-col items-center justify-end h-full w-14 relative group mx-0.5 sm:mx-1">
                    <div
                      className={`w-full rounded-t-md transition-all duration-1000 relative animate-grow-y cursor-pointer hover:brightness-95 ${
                        isHighlight ? "bg-[#0B44A0]" : "bg-[#CAD4E6]"
                      }`}
                      style={{ height: `${Math.max(heightPct, 8)}%`, animationDelay: `${i * 75}ms` }}
                    >
                      <span className={`absolute bottom-1 left-0 right-0 text-center text-[9px] font-bold tracking-tight ${isHighlight ? "text-white" : "text-slate-500"}`}>
                        {month}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          <div className="flex justify-between items-center pt-1 text-xs">
            <div className="space-y-0.5">
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Predicted</p>
              <p className="font-bold text-slate-900 text-sm">
                {projection?.predictedRevenue ? fmtMoney(projection.predictedRevenue) : "$14,500.00"}
              </p>
            </div>

            <div className="space-y-0.5">
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Confidence</p>
              <p className="text-emerald-600 font-bold text-sm">
                {projection?.confidence ? `${projection.confidence}%` : "92%"}
              </p>
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

      {/* ── RECEIPT MODAL ── */}
      {activeReceipt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/30 backdrop-blur-sm animate-fade-in" onClick={() => setActiveReceipt(null)}>
          <div className="bg-white rounded-xl border border-slate-100 shadow-xl max-w-sm w-full p-5 space-y-4 animate-scale-up relative" onClick={e => e.stopPropagation()}>
            <button
              onClick={() => setActiveReceipt(null)}
              className="absolute right-4 top-4 text-slate-400 hover:text-slate-600 cursor-pointer p-1 rounded-md transition-colors"
            >
              <MdClose className="text-lg" />
            </button>
            <div className="text-center border-b border-dashed border-slate-200 pb-3">
              <p className="text-[10px] text-slate-400 font-bold uppercase">Transaction Receipt</p>
              <h4 className="text-2xl font-bold text-slate-900 mt-1">{fmtMoney(activeReceipt.amount)}</h4>
              <span className="inline-block bg-slate-50 text-slate-400 text-[10px] px-2 py-0.5 font-mono rounded mt-1">{activeReceipt.id}</span>
            </div>
            <div className="space-y-2 text-xs font-medium text-slate-600">
              <div className="flex justify-between"><span>Recipient:</span><span className="text-slate-900 font-bold">{activeReceipt.name}</span></div>
              <div className="flex justify-between"><span>Date Logged:</span><span className="text-slate-900">{activeReceipt.date}</span></div>
              <div className="flex justify-between"><span>Method:</span><span className="text-slate-900">Direct Account Settlement</span></div>
              <div className="flex justify-between"><span>Type:</span><span className="text-slate-900">{activeReceipt.type}</span></div>
              <div className="flex justify-between"><span>Status:</span><span className="text-slate-900">{activeReceipt.status}</span></div>
            </div>
            <button
              onClick={() => setActiveReceipt(null)}
              className="w-full bg-[#0B44A0] hover:bg-blue-800 text-white text-xs font-bold py-2 rounded-lg shadow-sm active:scale-95 transition-all cursor-pointer"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      {/* ── KEYFRAMES ── */}
      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes scaleUp { from { opacity: 0; transform: scale(0.97); } to { opacity: 1; transform: scale(1); } }
        @keyframes growY { from { transform: scaleY(0); transform-origin: bottom; } to { transform: scaleY(1); transform-origin: bottom; } }
        .animate-fade-in { animation: fadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) both; }
        .animate-slide-up { animation: slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) both; }
        .animate-scale-up { animation: scaleUp 0.25s cubic-bezier(0.34, 1.56, 0.64, 1) both; }
        .animate-grow-y { animation: growY 0.7s cubic-bezier(0.16, 1, 0.3, 1) both; }
      `}</style>
    </div>
  );
}